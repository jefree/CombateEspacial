/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * CONSTANTES
 */
const RADIO_BALA = 3;

function Bala(imgSrc){
		
		
		/*
		 * id de la nave que lanzo esta bala
		 */
        this.idJugador = null;
        
        /*
         * Imagen que representa esta bala
         */
		this.img = new Image();
        this.img.src = imgSrc;
        
        /*
         * Coordenada x de la bala 
         */
		this.x = 0;
		
		/*
         * Coordenada y de la bala 
         */
		this.y = 0;
		
		/*
         * Velocidad total de la bala 
         */
        this.velocidad = 15;
        
        /*
         * Velocidad en el eje x de la bala 
         */
        this.velocidadX = 0;
        
        /*
         * Velocidad en el eje y de la bala 
         */
        this.velocidadY = 0;
        
        /*
         * Rdio asociado a esta bala 
         */
        this.radio = RADIO_BALA;
        
        /*
         * Indica si la bala esta activa o no 
         */
        this.disparado = false;
        
        /*
         * Retorna la imgen que representa esta bala 
         */
        this.getImagen = function(){
            return this.img;
        }
        
        /*
         * establece la coordenada en x de la bala 
         */
        this.setX = function(x){
            this.x = x;
        }
        
        /*
         * Retorna la coordenada en x de la bala 
         */
        this.getX = function(){
            return this.x;
        }
        
        /*
         * Establece la coordenada y de la bala
         */
		this.setY = function(y){
            this.y = y;
        }
        
        /*
         * Retorna la coordenada y de la bala
         */
        this.getY = function(){
            return this.y;
        }
        
        /*
         * Retorna el raidio de esta bala 
         */
        this.getRadio = function(){
            
            return this.radio;
        }
        
        /*
         * Establece la velocidad en x de la bala 
         */
        this.setVelocidadX = function(vx){
            this.velocidadX = vx;
        }
        
        /*
         * Establece la velocidad en y de la bala 
         */
        this.setVelocidadY = function(vy){
            this.velocidadY = vy;
        }
        
        /*
         * Activa la bala para que sea usada 
         */
        this.lanzar = function(idJ, x, y, dx, dy, ang){
            
            this.idJugador = idJ;
            this.velocidadX = Math.sin(ang)*this.velocidad;
            this.velocidadY = -Math.cos(ang)*this.velocidad;
            
            this.x = x + (dx/this.velocidad)*this.velocidadX;
            this.y = y + (dy/this.velocidad)*this.velocidadY;
            
            this.disparado = true;
        }
        
        /*
         * Desplaza la bala 
         */
		this.avanzar = function(){
            if(this.disparado){
                this.x += this.velocidadX;
                this.y += this.velocidadY;
            } 
        }
        
        /*
         * Activa o desactiva la bala
         */ 
        this.setDisparado = function(disp){
            this.disparado = disp;
        }
        
        /*
         * Retorna el estado de la bala 
         */
        this.isDisparado = function(){
            return this.disparado;
        }
        
        this.setIdJugador = function(id){
            this.idJugador = id;
        }
        
        /*
         * Retorna el id de la nave que disparo esta bala 
         */
        this.getIdJugador = function(){
            return this.idJugador;
        }
}
