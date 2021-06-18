function loadEntidadesGlobales(Q) {
    
    //Bloques de colisión para crear a mano las colisiones de un mapa
    
    Q.Sprite.extend("BloqueColision",{
        
        init:  function(p) {
            this._super(p, {
				x: 0,
				y: 0,
                z: 1000000000,
                h: 9000,
                w: 9000,
                cx: 0,
                cy: 0,
                ignorarColision: true,
                sensor: true,
                maxMagnitud: 3
			});
        },
        step: function(dt) {
            
            var maxCol = 3, collided = false, p = this.p;
            p.hit = false;
            while((collided = this.stage.search(this)) && maxCol > 0) {
            if(collided) {
                if(
                    !collided.obj.p.ignorarColision
                ){ 
                    //move other objects
                    //console.log(collided.separate);
                    collided.obj.p.x += Math.max(-this.p.maxMagnitud,Math.min(this.p.maxMagnitud,collided.separate[0]));
                    collided.obj.p.y += Math.max(-this.p.maxMagnitud,Math.min(this.p.maxMagnitud,collided.separate[1]));
                }
            }
            maxCol--;
            }
            
        }
        
    });
    
    //Esqueleto del fondo, necesita especificar el asset
    Q.Sprite.extend("ImagenDeFondo",{
        
        init:  function(p) {
            if(!p.x) p.x = 0;
            if(!p.y) p.y = 0;
            if(!p.cx) p.cx = 0;
            if(!p.cy) p.cy = 0;
            this._super(p, {
                points: [[-1000,-1000],[-999,-1000],[-999,-999],[-1000,-999]],
                ignorarColision: true,
                sensor: true
			});
            this.add("tween");
        }
        
    });
    
    Q.Sprite.extend("Ataque",{
    
        init: function(p) {
            
            if(!p.x) p.x = 0;
            if(!p.y) p.y = 0;
            if(!p.h) p.h = 0;
            if(!p.w) p.w = 0;
            if(!p.damage) p.damage = 1;
            if(!p.nockback) p.nockback = false;
            if(!p.faccion) p.faccion = 0;
            
            this._super(p, {
                ignorarColision: true,
                sensor: true,
                duracion: 0.1,
                tiempoAcumulado: 0,
                gravity: 0
            });
            this.on("sensor", this, "hit");
            this.add("2d");
        },
        
        hit: function( collision ) {
            
            //console.log(collision);
            if( !collision.damage ) return;
            
            collision.damage(this.p.damage,this.p.nockback,this.p.faccion);
            
        },
        
        step: function(dt) {
            
            if(this.p.tiempoAcumulado >= this.p.duracion) {
                this.destroy();
            }
            
            this.p.tiempoAcumulado += dt;
            
        }
        
    });
    
}