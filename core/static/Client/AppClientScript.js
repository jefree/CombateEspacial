/*
 * Script del lado del cliente
 *
 */

/*
 * Constantes
 */
const EVT_MOVER = 0;
const EVT_DISPARO = 1;

/*
 * Estructura Info
 * 
 * Esta estructura representa la informacion minima y vital
 * que el cliente y servidor usan para representar a un
 * usuario, por medio de esta se puede llegar a saber que
 * accion  realizado un usuario y asi difundir esta accion
 */ 

function Info(id, idSala, x, y, ang, escudo, img, tipo){
    
    /*
     * el identificador de quien envio el mensaje
     */
    this.id = id;

    /*
     *
     */
    this.idSala = idSala;
    
    /*
     * La coordena x del usuario que genero el evento
     */
    this.x = x;
    
    /*
     * La coordena y del usuario que genero el evento
     */
    this.y = y;
    
    /*
     * El angulo del usuario que genero el evento
     */
    this.ang = ang;
    
    /*
     * indica si el usuario que genro el evento tiene el
     * escudo activado
     */
    this.escudo = escudo;
    
    /*
     * identifcador de la imagen de quien denero el 
     * evento
     */
    this.img = img;
    
    /*
     * el tipo de evento que genero el usuario
     */
    this.tipo = tipo;
    
}

/*
 * Variables
 */
var myInfo;

/*
 * Funciones
 */

/*
 * Esta funcion genera evento MOVER y lo envia al servidor
 * para este sea enviado a los demas jugadores
 */
enviarMover = function(){
    
    myInfo.tipo = EVT_MOVER;
    
    myInfo.x = jugadores[0].getX();
    myInfo.y = jugadores[0].getY();
    myInfo.ang = jugadores[0].getAngulo();
    myInfo.escudo = jugadores[0].getEscudo();
    
    socket.emit('accion', myInfo);
}

/*
 * Esta funcion genera evento DISPARO y lo envia al servidor
 * para este sea enviado a los demas jugadores
 */
enviarDisparo = function(){
    
    myInfo.tipo = EVT_DISPARO;
    socket.emit('accion', myInfo);
}


/*
 * Esta funcion se encarga de informar que nos hemos
 * conectado, para los demas juagdores sepan de nuestra
 * existencia  
 */
enviarIdentificar = function(id){
    
    idCliente = id;
    
    conectar();
    
    crearJugador(idCliente ,imgJug, CNV_ANCHO*Math.random(), CNV_ALTO*Math.random(), 0);

    myInfo = new Info(idCliente, idSala, jugadores[0].getX(), jugadores[0].getY(), jugadores[0].getAngulo(), false, imgJug, null);  
  
    socket.emit('identificar', myInfo);
}


/*
 * Variables del lado del cliente
 */
var socket = null;

conectar = function(){
    
    socket = io.connect('http://localhost:8085/');
    
    /*
     * Aqui se procesa el evento de la llegada de un nuevo
     * jugador 
     */
    
    socket.on('nuevo', function(info){
        
        if(info.idSala == idSala){
            
            var yaExiste = false;

            for (i = 0; i < jugadores.length; i++) {

                if(jugadores[i].id == info.id){

                    yaExiste = true;
                    i = jugadores.length;
                }
            }

            if(!yaExiste){
                
                crearJugador(info.id, info.img, info.x, info.y, info.ang);
                socket.emit('identificar', myInfo/*new Info(idCliente, idSala, jugadores[0].getX(), jugadores[0].getY(), jugadores[0].getAngulo(), false, imgJug, null)*/);
            }
        }
    
    });
    
    /*
     * Aqui se procesa el evento de cuando un jugador abandona
     * el juego 
     */
    socket.on('abandono', function(info){
        
        if(info.idSala == idSala){
            
            for (var i = 0; i < jugadores.length; i++) {

                if(jugadores[i].getId() == info.id){
                    
                    jugadores.splice(i, 1);
                    
                }
            }
        }
    });
	
	
	/*
	 * Aqui se procesa los eventos de acciones generados por
	 * otros jugadores 
	 */
    socket.on('accion', function(info){
        
        if(info.idSala == idSala){
            
            if(info.tipo == EVT_MOVER){

                for (i = 0; i < jugadores.length; i++) {

                    if(info.id == jugadores[i].id){

                        jugadores[i].setPosicion(info.x, info.y);
                        jugadores[i].setAngulo(info.ang);
                        jugadores[i].setEscudo(info.escudo)

                        i = jugadores.length;
                        
                    }

                }   
            } else if(info.tipo == EVT_DISPARO){

                for (i = 0; i < jugadores.length; i++) {

                    if(info.id == jugadores[i].id){

                        crearDisparo(jugadores[i]);

                        i = jugadores.length;
                    }

                }   
            }
        }
   
    });
}

