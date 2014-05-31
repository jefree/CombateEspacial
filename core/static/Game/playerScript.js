/*
 * Script jugador del juego
 *
 * Este script contiene todo lo relacionado a una
 * instancia de un jugador, es decir, define las clases
 * y metodos que permiten a un cliente interactuar
 * con el juego. 
 *
 */

/*
 * Constantes relacionadas con el jugador
 */

const MAX_VELOCIDAD = 10;
const MIN_VELOCIDAD = -5;
const MAX_VIDA = 4; 
const CONST_PUNTAJE = 10;

/*
 * Clase Jugador
 * 
 * Esta clase representa a un jugador, es decir, a una nave
 * que se deslaza por el mundo y la cual puede interactuar 
 * con los demas jugadores y con el escenario del mundo.
 *
 */
function Nave(id, img, x, y, r, ang, v){
        
        /*
         * id de el jugador asociado a esta nave
         */
        this.id = id;
        
        /*
         * coordenada x de la nave 
         */
		this.x = x;
		
		/*
         * coordenada y de la nave 
         */
		this.y = y;
		
		/*
		 * angulo en que se encuentra la nave 
		 */
        this.angulo = ang;
        
        /*
         * radio de la nave 
         */
        this.radio = r;
        
        /*
         * velocidad asociada a la nave 
         */
        this.velocidad = 0;
        
        /*
         * ancho de la nave 
         */
        this.ancho = this.radio*2;
        
        /*
         * alto de la nave 
         */
        this.alto = this.radio*2;
        
        /*
         * numero de vidas de la nave 
         */
		this.vidas = v;
		
		/*
		 * puntaje que ha ganado esta nave 
		 */
		this.puntaje = 0;
        
        /*
         * Imagen que representa esta nave 
         */
        this.img = img;
        
        /*
         * Indica si esta nave tiene el escudo activado 
         */
        this.escudo = false;
        
        /*
         * velocidad de esta nave en el eje x 
         */
        this.velocidadX = Math.sin(this.angulo)*this.velocidad;
        
        /*
         * velocidad de esta nave en el eje y 
         */
        this.velocidadY = -Math.cos(this.angulo)*this.velocidad;
        
        
        /*
         * Retorna el id del jugador asociado a esta nave 
         */
        this.getId = function(){
            return this.id;
        }
        
        /*
         * Retorna la imagen que representa esta nave 
         */
		this.getImg = function(){
            return this.img;
        }
		
		/*
		 * Aumenta la velocida con que s emueve la nave 
		 */
		this.acelerar = function(){
            
            //aumentar velocidad
            if (this.velocidad < MAX_VELOCIDAD){
                this.velocidad++;
            }
            
            //recalcular velocidades en los ejes
            this.velocidadX = Math.sin(this.angulo)*this.velocidad;
            this.velocidadY = -Math.cos(this.angulo)*this.velocidad;
         }
	
	
		/*
		 * Disminuya la velocidad con que se mueve la nave 
		 */
		this.desacelerar = function(){
            
            //disminuir la velocidad
            if (this.velocidad > MIN_VELOCIDAD){
                this.velocidad--;
            }
            
            //recalcular velocidades en los ejes
            this.velocidadX = Math.sin(this.angulo)*this.velocidad;
            this.velocidadY = -Math.cos(this.angulo)*this.velocidad;
        }
		
		/*
		 * Establece el angulo en que se encuentra la nave  
		 */
		
		this.rotar = function(ang){

            /* modificado por jefferson - 28-01-2012-15:35*/
            
            //invertir la angulo, si se va en reversa
            //alert(this.velocidad);
            
            /*if (this.velocidad < 0){
                
                ang *= -1;
           }*/
            
            //cambiamos el angulo
            this.angulo += ang;

            //miramos si el angulo es mayor que 360 o menor que 0
            if(this.angulo >= Math.PI*2){
                this.angulo -= Math.PI*2;
            }else{
                if(this.angulo < 0){
                    this.angulo = Math.PI*2 + this.angulo;
                }
            }

            //recalculamos las velocidades
            this.velocidadX = Math.sin(this.angulo)*this.velocidad;
            this.velocidadY = -Math.cos(this.angulo)*this.velocidad;

        }
		
		
		/*
		 * Aumenta la vitalidad de la nave 
		 */	
		this.sumarVida = function(){
            this.vidas++;
        }
		
		/*
		 * Disminuye la vitalidad de la nave 
		 */	
		this.restarVida = function(){
            this.vidas--;
        }
	
		/*
		 * Retorna el numero de vidas de la nave 
		 */
        this.getVidas = function(){
            return this.vidas
        }
		
		
		/*
		 * Retorna la coordenada en x de la nave 
		 */
		this.getX = function(){
			return this.x;
		}
		
		
		/*
		 * Retorna la coordenada en y de la nave 
		 */
		this.getY = function(){
			return this.y;
		}
        
        /*
         * Retorna el ancho de la nave
         */        
        this.getAncho = function(){
            return this.ancho;
        }        
       	
       	 /*
         * Retorna el alto de la nave
         */ 
        this.getAlto = function(){
            return this.alto;
        }
        
        /*
         * Establece el angulo en que se encuentra la nave
         */ 
        this.setAngulo = function(ang){
            
            this.angulo = ang;
        }
        
        /*
         * Retorna  
         */
		this.getAngulo = function(){
			return this.angulo;
		}
	     
	    /*
	     * Desplaza la nave
	     */    
        this.mover = function(){
            
            this.x += this.getVelocidadX();
            this.y += this.getVelocidadY();
        }
        
        /*
         * Retorna la velocidad con que se mueve la nave 
         */
        this.getVelocidad = function(){
            return this.velocidad;
        }
        
        /*
         * Retorna la velocidad con que se mueve la nave en el eje x
         */
        this.getVelocidadX = function(){
            return this.velocidadX;
        }
        
        /*
         * Retorna la velocidad con que se mueve la nave en el eje y 
         */
        this.getVelocidadY = function(){
            return this.velocidadY;
        }
        
        /*
         * Establece la coordenada en x de la nave 
         */
        this.setY = function(y){
            this.y = y;
        }
        
        /*
         * Establece la coordenada y de la nave 
         */
        this.setX = function(x){
            this.x = x;
        }
        
        /*
         * Asigna la posicion de la nave
         */
        this.setPosicion = function(x, y){
            
            this.x = x;
            this.y = y;
        }
        
        
        /*this.setVelocidad = function(velocidad){
            this.velocidad = velocidad;
        }*/
        
        this.getRadio = function(){
            return this.radio;
        }
        
        /*
         * Activa o desactiva el escudo para esta nave 
         */
        this.setEscudo = function(e){
            
            this.escudo = e;
        } 
        
        /*
         * Retorna el estado del escudo para esta nave  
         */
        this.getEscudo = function(){
            return this.escudo;
        }
        
        /*
         * Aumenta el puntaje asociado a esta nave 
         */
        this.addPuntaje = function(p){
            
            this.puntaje += p;
        }
        
        /*
         * Retorna el puntaje asociado a esta nave 
         */
        this.getPuntaje = function(){
            return this.puntaje;
        }
}
