function loadObjects(Q) {
    
    //Se generan los compnentes que se utilicen
    
    Q.component("objeto",{
        added: function(){

            this.entity.add("2d, animation");

            this.entity.p.vx = 0;
            this.entity.p.vy = 0;
            this.entity.p.gravity = 0;
            this.entity.p.sensor = true;
            this.entity.p.isDead = false;
            this.entity.p.sensor = true;

            if(!this.entity.procesarAccion) this.entity.procesarAccion = this.procesarAccion;
            if(!this.entity.p.funcionObjeto) this.entity.p.funcionObjeto = this.p.funcionObjeto;

            this.entity.on("sensor", this.entity, "procesarAccion");
        },

        procesarAccion: function(collision) {

            if(collision[this.p.funcionObjeto]){
                if(collision[this.p.funcionObjeto](this.p.vida)){
                    Q.audio.play("efectos/vida.mp3");
                    this.destroy();
                } 
            }
        }

    })
    
    //Llama a las funciones de carga de cada objeto
    loadComida(Q);
}