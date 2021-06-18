var game = function() {
// Set up an instance of the Quintus engine and include
// the Sprites, Scenes, Input and 2D module. The 2D module
// includes the `TileLayer` class as well as the `2d` componet.
PUNTOS_GLOBALES = 0;
    
var Q = window.Q = Quintus()
		.include(["Sprites", "Scenes", "Input", "UI", "2D", "Anim", "TMX", "Audio", "Touch"])
		.setup("myGame", {
			width: 500,
			height: 330,
			scaleToFit: true
		})
		.controls()
		.enableSound()//Sonido
		.touch();

    //DEBUG
    Q.debug = Q.debugFill = false;

    var imagenes = [
        "interfaz.png","interfaz.json", //interfaz
        "stages/stage1_background1.png", //background del mar
        "stages/stage1_Intro_fondo.png", //fondo primer nivel
        "stages/stage1_Intro_puerta-fondo.png", //puerta cambiada
        "stages/stage1_Intro_puerta-fondo-over.png", //para visionado con la puerta
        
        "stages/rocas.png", //background del campo
        "stages/background3.png", //background del campo

        "stages/stage2_background2.png", //background de la jungla
        "stages/jungle.png", // nivel 3
        
        "stages/mainTittle_Cadillacs.png", //pantalla de inicio
        "stages/gameOver-500x330.png", //pantalla de fin
        "stages/fondo-victoria500x330.png", //pantalla de fin
        
        "mustapha.png", "mustapha.json", //personaje mustapha
        "enemigos/ferris.png", "enemigos/ferris.json", //enemigo ferris
        "enemigos/elmer.png", "enemigos/elmer.json",
        "enemigos/morgan2.png", "enemigos/morgan.json",
        "enemigos/lash2.png","enemigos/lash.json",
        "objetos/comida.png", "objetos/comida.json",
        
        "mustapha-retrato.png", "mustapha-retrato.json",
        "mustapha-busto.png"
    ];
    
    var sonidos = [
        "mainTittle.mp3",
        "musicaFondo_2.mp3",
        "musicaFondo_3.mp3",
        "musicaFondo_4.mp3",
        "bossSong.mp3",
        "gameOver.mp3",
        "victoryEnding.mp3",
        "efectos/punioSinColision.mp3",
        "efectos/damageToEnemy.mp3",
        "efectos/vida.mp3",
        "efectos/romperPuertaLoud.mp3",
        "voces/deadEnemyFerris.mp3",
        "voces/deadEnemyElmer.mp3",
        "voces/deadEnemyLash.mp3",
        "voces/deadEnemyMorgan.mp3",
        "voces/deadMustapha.mp3",
        "voces/rugidoBoss.mp3",
    ];
    
    var assets = imagenes.concat(sonidos);
    
	Q.load( assets , 
		function() {

            loadEntidadesGlobales(Q);
            loadEscenarios(Q);    
            loadCharacters(Q);   
            loadEnemies(Q);
            loadObjects(Q);  
        
			Q.compileSheets("interfaz.png", "interfaz.json");
			Q.compileSheets("mustapha-retrato.png", "mustapha-retrato.json");

			
			Q.stageScene("mainTitle",1);
	});
    
    Q.input.keyboardControls({
        //las teclas direccionales se definen automaticamente
        W: "up",
        S: "down",
        A: "left",
        D: "right",
        Z: "disparar",
        X: "saltar",
        C: "agacharse"
    });
    
    

}

//función para calcular la distancia entre 2 sprites
function distanciaEntre(A, B) {
    
    return Math.sqrt((A.p.x-B.p.x)*(A.p.x-B.p.x) + (A.p.y-B.p.y)*(A.p.y-B.p.y));
    
}
