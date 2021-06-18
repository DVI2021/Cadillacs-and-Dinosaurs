function loadComida(Q){
    
    Q.compileSheets("objetos/comida.png","objetos/comida.json");
    
    Q.Sprite.extend("Comida",{
        
        init: function(p) {
            this._super(p, {
				sheet: "comida",
                points: [[30,20],[30,0],[-30,0],[-30,20]], // CAMBIAR CUANDO TENGAMOS LOS SPRITES MONTADOS
                gravity: 0,
                
                funcionObjeto: "comer"
			});
            this.p.z = this.p.y - 35;
            this.add("objeto");
        }
        
    });
    
    Q.Comida.extend("Langosta",{
        init: function(p) {
            this._super(p);
            this.p.frame = 0;
            this.p.vida = 10;
        }
    });
    Q.Comida.extend("Ensalada",{
        init: function(p) {
            this._super(p);
            this.p.frame = 1;
            this.p.vida = 15;
        }
    });
    Q.Comida.extend("Sushi",{
        init: function(p) {
            this._super(p);
            this.p.frame = 2;
            this.p.vida = 20;
        }
    });
    Q.Comida.extend("Patatas",{
        init: function(p) {
            this._super(p);
            this.p.frame = 3;
            this.p.vida = 10;
        }
    });
    Q.Comida.extend("Hamburguesa",{
        init: function(p) {
            this._super(p);
            this.p.frame = 4;
            this.p.vida = 15;
        }
    });
    Q.Comida.extend("Perrito",{
        init: function(p) {
            this._super(p);
            this.p.frame = 5;
            this.p.vida = 10;
        }
    });
    Q.Comida.extend("Pizza",{
        init: function(p) {
            this._super(p);
            this.p.frame = 6;
            this.p.vida = 20;
        }
    });
    Q.Comida.extend("Croissant",{
        init: function(p) {
            this._super(p);
            this.p.frame = 7;
            this.p.vida = 10;
        }
    });
    Q.Comida.extend("Helado",{
        init: function(p) {
            this._super(p);
            this.p.frame = 8;
            this.p.vida = 10;
        }
    });
    Q.Comida.extend("Tarta",{
        init: function(p) {
            this._super(p);
            this.p.frame = 9;
            this.p.vida = 20;
        }
    });
    Q.Comida.extend("Cafe",{
        init: function(p) {
            this._super(p);
            this.p.frame = 10;
            this.p.vida = 10;
        }
    });
    Q.Comida.extend("Chocolate",{
        init: function(p) {
            this._super(p);
            this.p.frame = 11;
            this.p.vida = 5;
        }
    });
    Q.Comida.extend("Donut",{
        init: function(p) {
            this._super(p);
            this.p.frame = 12;
            this.p.vida = 5;
        }
    });
    
}