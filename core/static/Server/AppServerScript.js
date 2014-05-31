
/* 
 * Script del lado del sevidor 
 * 
 * controla la llegada de nuevos clientes e informa
 * a los ya conectados del suceso.
 *
 */

/*
 * Variables del Servidor
 */
var io = require('socket.io')(8085);
var http = require('http');
var usuarios = new Array();

console.log("server initialized");

/*
 * Oyentes
 * 
 * Esta seccion de codigo esta dedicada a recibir los
 * mensajes que llegan de los clientes y en funcion de
 * estos enviar mensajes a los clientes.
 */
io.on('connection', function(socket){
   
   console.log("alguien llego")

    /*
     * Evento identify
     * 
     * este evento indica que un nuevo usuario esta
     * intentando acceder a la aplicacion, por lo tanto el
     * servidor se encargara de registrarlo en una sala
     * para que pueda comenzar a jugar.
     */
    socket.on('identificar', function(info){
        
        var nuevoUsuario = {id: info.id, idC: socket.id, idSala: info.idSala};
        
        usuarios.push(nuevoUsuario);
        
        console.log('id: '+nuevoUsuario.id + '\tidC:' + nuevoUsuario.idC);
        
        socket.broadcast.emit('nuevo', info);
    });
    
    /*
     * Evento message
     * 
     * Este evento se genera cuando un jugador ha realizado
     * alguna accion, el servidor se encargara de informar
     * a los demas jugadores de esta accion para que
     * actualicen correctamente su informacion
     */
    socket.on('accion', function(info){
        
        socket.broadcast.emit('accion', info);
        
    });
    
    
    /*
     *
     */
    socket.on('disconnect', function(idDesc){
			
		var id_abandono;
		var id_sala_abandono;
		
		for(var i=0; i<usuarios.length; i++){
			
			if(usuarios[i].idC == socket.id){
				
				socket.broadcast.emit('abandono', usuarios[i]);
				console.log('se fue '+usuarios[i].id);
				
				id_abandono = usuarios[i].id;
				id_sala_abandono = usuarios[i].idSala;
				
				usuarios.splice(i, 1);
			}
		}
		
		if(idDesc == null){
			
			var opciones = {
				host: 'localhost',
				path: '/CombateEspacial/abandonarForzado/' + id_abandono + '/' + id_sala_abandono + '/',
				port: 8000,
			};
			
			http.get(opciones, function(res) {
			  console.log("Got response: " + res.statusCode);
			}).on('error', function(e) {
			  console.log("Got error: " + e.message);
			});
		}
			
	});
   
});
