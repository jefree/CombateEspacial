
/*
 * Script principal del juego
 * 
 * Este script inicializa todo lo necesario para que el
 * juego funcione, cosas como obtener el contexto y carga
 * de recursos van en este script.
 *
 */

/*
 * Constantes Globales
 */
const ARRIBA = 38;
const ABAJO = 40;
const IZQUIERDA = 37;
const DERECHA = 39;
const ESPACIO = 32;
const CONTROL = 17;

//const WIDTH_PLAYER = 60;
//const HEIGHT_PLAYER = 60;

const RADIO_JUG = 15;

const MAX_BALAS = 30;
const CNV_ANCHO = 700;
const CNV_ALTO = 450;

const TIEMPO_BUCLE = 40;
/*
 * Variables Globales del Juego
 */
var canvas;
var contexto;
var imgFondo;
var fondo;

var jugadores = new Array();
var balas = new Array(MAX_BALAS);
var idBuclePrincipal = null;

var tiempo = 0;
var dAcertados = 0;

var sondDisparo = null;

/*
 * Estado de la teclas de accion
 * 
 * FUERON AÑADIDAS
 */
var arriba = false;
var abajo = false;
var derecha = false;
var izquierda = false;
var space_bar = false;
var disparo = false;
var permitirDisparo = true;
var escudo = false;
/*
 * Funcion cargarJuego
 *
 * Esta funcion es la que el navagador llamara al cargar
 * la pagina y sera la encargada de inicializar algunas
 * partes fundamentales del juego. 
 *
 */
cargarJuego = function(){
    
    var validado = 'esperando';
		
	$.get("validarJuego/"+idCliente+"/", function(data){
		
		validado = data;
		
	});
	
	alert('Validado');
	
	while(validado == 'esperando');
	
	if(validado == 'True'){
		
		canvas = document.getElementById('gameCanvas');
		
		if(canvas != null){
			contexto = canvas.getContext('2d');
			
			if(contexto == null){
				alert('Error al cargar elemento contexto');
			}

			iniciarJuego();
			
		} else {
			alert('Error al cargar elemento Canvas');
		}
		
	} else {
			
		alert('Ingrese Correctamente');
	}
}

/*
 * Funcion iniciarJuego
 *
 * Esta funcion se encarga de inicializar los objetos
 * necesarios para que el juego funcione correctamente,
 * esto es, cargar recursos como imagenes y sonidos, ademas
 * de inicializar el objeto que representa la logica del
 * juego y al jugador.
 */
iniciarJuego = function(){
    
	sondDisparo = document.getElementById("sondDisparo");
    
    imgFondo = new Image();
    imgFondo.src = STATIC_URL+'fondoCanvas.png';
   
    iniciarBalas();
    enviarIdentificar(idCliente);
    
    idBuclePrincipal = setInterval(bucleJuego, TIEMPO_BUCLE);
}

/*
 * Funcion crearJugador
 * 
 * Crea un nuevo jugador, el cual interactuara con el jugador
 * actual
 */

crearJugador = function(id, imgSrc, x, y, ang){
    
    var img = new Image();
    img.src = imgSrc;
    
    var p = new Nave(id, img, x, y, RADIO_JUG, ang, MAX_VIDA);
    
    jugadores.push(p);
}

/*
 * Funcion crearDisparo
 * 
 * crea un nuevo disparo y lo asocia a el jugador
 * que lo genero 
 */
crearDisparo = function(jug){
    
    sondDisparo.play();

    var found = -1;
    for (i = 0; i < MAX_BALAS; i++) {
        if(!balas[i].isDisparado()){
            found = i;
            i = MAX_BALAS;
        }
    } 

    if(found != -1){

        balas[found].lanzar(jug.getId(), jug.getX(), jug.getY(), jug.getAncho()/2, jug.getAlto()/2, jug.getAngulo());
        //balas[found].setIdJugador(jug.getId());
        //balas[found].setDisparado(true);
    }

   
}

/*
 * funcion iniciarBalas
 * 
 * Inicializa los objetos bala para que puedan ser usados
 * por las naves cuando disparen 
 */
iniciarBalas = function(){
    
    for (i = 0; i < MAX_BALAS; i++) {
    
        balas[i] = new Bala(STATIC_URL+"bala.PNG");
    }
}
        
/*
 * Funcion bucleJuego
 * 
 * Esta funcion es la encargada de procesar el bucle principal
 * del juego, en ella se toman las decisiones relacionadas con
 * la logica del juego, asi como repintar el canvas.
 */
bucleJuego = function(){
    
    limpiar();
    actualizarEscenario();
    detectarColisiones();
    dibujarEscenario();
    
    tiempo += TIEMPO_BUCLE;    
}
        
 /*
 * Funcion dibujarEscenario
 * 
 * Esta funcion se encarga de repintar el canvas para que
 * se vean reflejados los cambios en el mundo.
 *
 */
dibujarEscenario = function(){
     
    for (var i = 0; i < jugadores.length; i++){

        dibujarJugador(jugadores[i]);  
    }

    dibujarBalas();

    /*dibujar datos de la vidas*/
    contexto.font = 'bold 15px Arial';
    contexto.textAlin = 'left';
    contexto.fillStyle = 'rgb(255, 0, 0)';
    contexto.fillText("Vidas: ", 0, 15);
    contexto.fillStyle = 'rgb(255, 255, 255)'; 
    contexto.fillText(jugadores[0].getVidas(), 50, 15);


    /*dibujar datos del puntaje*/
    contexto.textAlin = 'left';
    contexto.fillStyle = 'rgb(255, 0, 0)';
    contexto.fillText("Puntaje: ", CNV_ANCHO-120, 15);
    contexto.fillStyle = 'rgb(255, 255, 255)'; 
    contexto.fillText(jugadores[0].getPuntaje(), CNV_ANCHO-50, 15);
}


/*
 * funcion actualizarEscenario 
 * 
 * Analiza las acciones del jugador actual y determina 
 * las acciones correspondientes para que el juego funcione
 * adecuadamente
 */
actualizarEscenario = function(){

    
    if(arriba){
        
        jugadores[0].acelerar();
        
    } else if(abajo){
        
        jugadores[0].desacelerar(); 
    }
    
    if(izquierda){
        
        jugadores[0].rotar(-0.05)
        
    } else if(derecha){
            
        jugadores[0].rotar(0.05)
        
    }
   
    /* Generar nuevos disparos */
    
    if(!jugadores[0].getEscudo() && disparo && permitirDisparo ){
            
         crearDisparo(jugadores[0]);
         enviarDisparo();
          
         permitirDisparo = false;
    }
    
    jugadores[0].mover();
    enviarMover();
    
    for (i = 0; i < MAX_BALAS; i++) {
        balas[i].avanzar();
    }
    
    if(jugadores[0].getVidas() <= 0){
        
        if(idBuclePrincipal){
            socket.disconnect();
            clearInterval(idBuclePrincipal);
            
            regresar = true;
            
            alert('Fue Aniquilado ');
            location.href = "/regresar/"+jugadores[0].getPuntaje()+"/"+tiempo+"/"+dAcertados+"/"+idSala+"/derrotado/"
        } 
    }
    
    /* se asigna el estado del escudo */
    jugadores[0].setEscudo(escudo);
}


/*
 * Funcion dibujarJugador 
 * 
 * Dibuja un jugador de acuerdo a las variables de su nave
 * asociada.
 */
dibujarJugador = function(player){
    
    contexto.save();
    contexto.translate(player.getX(), player.getY());
    contexto.rotate(player.getAngulo())
    contexto.translate(-player.getX()-player.getAncho()/2, -player.getY()-player.getAlto()/2);
    contexto.drawImage(player.getImg(), player.getX(), player.getY());
    contexto.restore();
    
    if(player.getEscudo()){
        
        contexto.beginPath();
        contexto.strokeStyle = 'rgb(255, 255, 255)';
        contexto.arc(player.getX(),player.getY(),player.getRadio()+2,0,Math.PI*2,false);
        contexto.stroke();
    }
}        

/*
 * Funcion dibujarBalas 
 * 
 * Recorre el areglo de balas y las dibujan segun sus
 * variables si estan activas
 */
dibujarBalas = function(){
    
    for (i = 0; i < MAX_BALAS; i++) {
        
        if (balas[i].isDisparado()){
            contexto.drawImage(balas[i].getImagen(),balas[i].getX(), balas[i].getY());
            
        }
    }
    
}

/*
 * Funcion limpiar
 * 
 * limpia el canavas para poder dibujar sobre el  
 */
limpiar = function(){
    
    contexto.drawImage(imgFondo, 0, 0);
}


/* Funcion detectarColisiones
 *
 * Se encarga de llamar a las funciones que detectan
 * las colisiones entre los diferentes objetos del 
 * juego 
 */        
detectarColisiones = function(){
    colJugador();
    colBala();
}
 
/*
 * Funcion colJugador
 * 
 * detecta si el jugador ha colisionado con los
 * extremos de el mundo y toma las decisiones 
 * adecuadas a estos eventos 
 */ 
        
colJugador = function(){
    
    if(jugadores[0].getY() <= jugadores[0].getRadio()){
        jugadores[0].setY(jugadores[0].getRadio());
        //jugadores[0].setSpeed(0);
    }
    
    if(jugadores[0].getY() >= CNV_ALTO - jugadores[0].getRadio()){
        jugadores[0].setY(CNV_ALTO - jugadores[0].getRadio());
        //jugadores[0].setSpeed(0);
    }
    
    if(jugadores[0].getX() <= jugadores[0].getRadio()){
        jugadores[0].setX(jugadores[0].getRadio());
        //jugadores[0].setSpeed(0);
    }
    
    if(jugadores[0].getX() >= CNV_ANCHO - jugadores[0].getRadio()){
        jugadores[0].setX(CNV_ANCHO - jugadores[0].getRadio());
        //jugadores[0].setSpeed(0);
    }
}

/*
 * Funcion colBala
 * 
 * se encarga de llamar a las funciones que detectan
 * colisiones entre las balas y otros objetos del escenario 
 */

colBala = function(){
    colBalEscen();
    colBalNave();
}
/*
 * Funcion colBalEscen
 * 
 * detecta las colisiones entre las balas y los extremos el 
 * escenario y las desactiva si han chocado 
 */

colBalEscen = function(){
    
    for (var i = 0; i < MAX_BALAS; i++){
        
        if(balas[i].isDisparado()){
        
            if (balas[i].getX() > CNV_ANCHO
                    || balas[i].getX() < 0 
                    || balas[i].getY() > CNV_ALTO 
                    || balas[i].getY() < 0){
                
                balas[i].setDisparado(false);
            }
        }
    }
}

/*
 * Funcion colBalNave
 * 
 * Detecta las colisiones entre las balas y las naves de los
 * jugadores que se encuentra en el escenario
 * 
 */
colBalNave = function(){
    
    for(var i1=0; i1 < balas.length; i1++){
        
        var b = balas[i1];
        
        if(b.isDisparado()){
            
            for(var i2=0; i2<jugadores.length; i2++){

                var j = jugadores[i2];

                if(calcularDistancia(b.getX(), b.getY(), j.getX(), j.getY()) < b.getRadio() + j.getRadio()){
                    
                    if(!j.getEscudo()){
                        
                        j.restarVida();
                        
                        if(b.getIdJugador() == jugadores[0].getId()){
                            jugadores[0].addPuntaje(CONST_PUNTAJE);
                            dAcertados++;
                        }
                    }
                    
                    b.setDisparado(false);
                }
            }
        }
    }
    
}

/*
 * Funcion calcularDistancia
 * 
 * calcula la distancia entre 2 puntos del escenario 
 */

calcularDistancia = function(x1, y1, x2, y2) {
    
    var sumCatetos = Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2);
    
    return Math.sqrt(sumCatetos);
    
}

/*
 * Oyente del teclado, es llamado cuando una tecla es
 * presionada
 */
document.onkeydown = function(event){
    
    var tecla = event.keyCode;    
        
    switch (tecla) {
        
	case ARRIBA:arriba = true;
            break;
        case IZQUIERDA:izquierda = true;
            break;
	case ABAJO:abajo = true;
            break;
        case DERECHA:derecha = true;
            break;
        case ESPACIO:disparo = true;
            break;
        case CONTROL:escudo = true;
            break;
    }
}

/*
 * Oyente del teclado, es llamado cuando una tecla es 
 * soltada 
 */
document.onkeyup = function(event){
    
    var tecla = event.keyCode; 
    
    switch (tecla) {
        
	case ARRIBA:arriba = false;
            break;
        case IZQUIERDA:izquierda = false;
            break;
	case ABAJO:abajo = false;
            break;
        case DERECHA:derecha = false;
            break;
        case ESPACIO:permitirDisparo = true;
                    disparo = false;
            break;
        case CONTROL:escudo = false;    
            break;
    }
}

function sleep(milliseconds) {

  var start = new Date().getTime();

  for (var i = 0; i < 1e7; i++) {

    if ((new Date().getTime() - start) > milliseconds){

      break;
    }
  }
}


