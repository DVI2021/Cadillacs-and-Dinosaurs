
1. Diseño del juego. 

    1. Objetivo del juego: cómo se gana, cómo se pierde.

    	Nuestra principal fuente de inspiración a la hora de realizar nuestro juego ha sido el famoso "Cadillacs and Dinosaurs" de Capcom. Dicho juego pertenece al género de los beat'em up, donde el principal objetivo es derrotar a todos los enemigos que aparecen en pantalla e ir superando los distintos niveles que se presentan. Por lo general, en estos videojuegos, al igual que en el nuestro, se intenta imitar una especie de 3D para dar la sensación de profundidad y libertad al jugador a la hora de moverse por el escenario.

    		- Cómo se gana: hemos implementado 3 niveles en los que la dificultad irá en aumento, tanto por ser más largos como por tener más enemigos. El jugador ganará cuando termine todos los niveles sin que le hayan matado.

    		- Cómo se pierde: el jugador perderá cuando alguno de los enemigos consiga derrotarle al vaciar por completo su barra de vida.

        Controles:
            - Movimiento: ←, ↓, ↑, → o W, A, S, D
            - Ataques y agacharse: Z, X, C

    2. Principales mecánicas

    	Las mecánicas principales del juego vienen dadas por el control del personaje principal y el comportamiento de los enemigos.

    	- Personaje principal (Mustapha)

    		- Movimiento del personaje: el jugador podrá moverse con total libertad por el escenario utilizando el panel direccional ←, ↓, ↑, → o las teclas W, A, S, D. Los límites están fijados por bloques de colisión invisibles con los que chocará el jugador.
    		- Ataque básico: el jugador podrá lanzar un puñetazo rápido (ataque básico), pulsando en la Z. Dicho ataque quitará 1 punto de vida al enemigo.
    		- Ataque fuerte: el jugador podrá dar una patada (ataque fuerte), pulsando la X. Dicho ataque quitará 3 puntos de vida, es decir, 2 más que el ataque anterior porque al ser más largo, el jugador será vulnerable durante más tiempo y la recompensa será mayor.
    		- Agacharse: el jugador podrá agacharse pulsando la C para poder coger algún alimento del suelo que restaurará parte de su vida.

    		Cuando el jugador está realizando alguna acción, ya sea cualquier ataque o agacharse, no se podrá mover en ninguna dirección hasta que se termine de realizar la acción.

    	- Enemigos

    		- Estáticos: al comenzar el juego o al pasar a un nuevo escenario, los enemigos estarán en una posición estática esperando a que el jugador entre en su espacio de visión.
    		- Perseguir: una vez que el jugador haya entrado en su espacio de visión, el enemigo comenzará a seguirle para poder ejecutar los ataques cuerpo a cuerpo.
    		- Ataque: cuando el enemigo se encuentre a una distancia determinada del jugador, comenzará a realizar las distintas combinaciones de ataque propias del enemigo en cuestión, ya que cada enemigo tiene diferentes ataques, con animaciones distintas y daños distintos.

    3. Mecánicas adicionales

    	- HUD del personaje principal:
				- Nombre del personaje (Mustapha)
				- Puntuación del personaje. El jugador podrá obtener y perder puntos de diferentes formas:
						- Golpear a los enemigos otorga puntación relativa al daño causado por el jugador, es decir, si el jugador realiza un ataque básico a un enemigo obtendrá 10 puntos, ya que el ataque básico quita 1 punto de vida (1 x 10)
						- Derrotar a los enemigos. Cada enemigo otorga una puntuación distinta al ser derrotado
						- Coger los objetos comida del escenario. Se utiliza el mismo método que al hacer daño a los enemigos.
						- El jugador al recibir daño de los enemigos también pierde puntos.
				- Barra de vida. Representa la vida del jugador principal. Cuando se vacía por completo se termina el juego y el jugador pierde. La vida restante se mostrará de color amarillo, mientras que el daño realizado por los enemigos se mostrará de color rojo.

    	- Barra de vida de los enemigos: cada uno de los enemigos tendrá una barra de vida encima de su cabeza. Dicha barra representa el porcentaje de vida restante de cada uno de ellos, ya que cada enemigo tiene una vida máxima diferente. La vida restante se mostrará de color amarillo, mientras que el daño realizado por el jugador se mostrará de color rojo.

    	- Comida: a lo largo de cada uno de los escenarios estarán distribuidos diferentes objetos "comida" que restaurarán una cantidad de vida al jugador tras interactuar con ellos. Dicha cantidad de vida es única para cada alimento, es decir, restaura una cantidad de vida específica.

    	- Tiempo de invulnerabilidad: cuando uno de los enemigos hace daño al jugador, habrá un breve periodo de tiempo en el que éste no puede volver a ser golpeado. Concretamente son 0,5s que se verá reflejado con el jugador siendo semitransparente.

    	- Transición entre niveles: para pasar al siguiente nivel hay que llegar hasta el final del nivel actual. En el caso del primer nivel hay que romper la puerta realizando un ataque y entrar. 

    	- Audio: hay música de fondo en cada uno de los diferentes niveles y pantallas, además de efectos de sonido que acompañan a las diferentes acciones que se lleven a cabo.

    4. Personajes

    	- Mustapha: es el personaje principal que controlará el jugador.

    	- Ferris (Clase 1):
    		Vida: 6
    		Ataques:
    			- Puñetazos: combinación de dos puñetazos con daño 1 y 2, respectivamente.
    			- Patada: 3 de daño.

    	- Elmer (Clase 2):
    		Vida: 8
    		Ataques:
    			- Embestida: 4 de daño.
    			- Puñetazo: 1 de daño.
    			- Ataque combinado: 2 de daño.
    			- Patada: 4 de daño.

    	- Lash (Clase 3):
    		Vida: 7
    		Ataques:
    			- Mazazo: 1 de daño.
    			- Mazazo 2: 2 de daño. 
    			- Mazo Largo: 5 de daño. 
    			- Patada: 2 de daño.

    	- Morgan (Clase 4):
    		Vida: 30
    		Ataques:
    			- Zarpa: 2 de daño.
    			- Cabezazo: 3 de daño.
    			- Envestida: 5 de daño.

2. Diseño de la implementación: arquitectura y principales componentes.

    El proyecto se encuentra estructurado de la siguiente manera:
        - "game.js" carga todos los módulos iniciales y recursos necesarios para la ejecución del juego
        - "enemigos.js" contiene el componente "enemigo" que implementa la mayoría de las funcionalidades de un enemigo cualquiera. Este componente hace que para añadir un nievo enemigo haga falta poco más que definir sus ataques y animaciones. El componente se encarga de definir diversos comportamientos (recibir daño, elegir ataque, atacar, animar, etc) y atributos que se incluyen, si no vienen ya definidos de la clase padre (vida, velocidad, etc). El archivo también se encarga de cargar todas las clases que utilizan este componenete (los enemigos), cada una definida en su propio archivo dentro del directorio "enemigos/"
        - "escenarios.js" contiene la definicion de las pantallas de inicio, derrota y victoria. También se encarga de cargar los distintos niveles, cada uno definido en su propio archivo dentro del directorio "escenarios/"
        - "creditos.js" contiene la definición de una variable global que se utiliza para mostrar los créditos. Y la definición de lo que tiene que poner en cada línea, su color y tamaño
        - "personajes.js" iba a tener en un principio una estructura similar a "enemigos.js" pero con los personajes jugables. Como el alcance del proyecto no ha acabado siendo tan grande, y solo hay un personaje, este archivo solo se encarga de cargar a "mustapha.js" que se encuentra en el directorio "personajes/"
        - "objetos.js" contiene la definición de otro componente "objeto" que facilita la implementación de entidades que necesitan llamar a funciones de las entidades con las que colisionan. Un ejemplo de esto es "comida.js" dentro del directorio "objetos/"
        - "comida.js" se encarga de definir una clase padre "Comida" que contiene el componente "objeto" y tiene la función de otorgar la misma funcionalidad a los distintos tipos de comida. Luego se definen todos los tipos de comida del juego. Debido a la estructura de clases implementada, solo es necesario indicar el sprite y los puntos de salud que cura para crear un nuevo tipo de comida.
        - "entidadesGlobales.js" es un archivo que define entidades globales que no entran dentro de ninguna de las categorías anteriores. Estas son:
            - BloqueColisión: un bloque invisible utilizado para marcar los límites de cada mapa introduciendo las coordenadas a mano. Esta clase ha sido necesaria implementarla porque el juego no utiliza "tiles" sino un pseudo-3d
            - ImagenDeFondo: entidad utilizada para tener algunas propiedades predefinidas cuando se quería insertar una imagen de fondo.
            - Ataque: un bloque invisible con un tiempo de vida limitado, utilizado para llevar a cabo los ataques. Cuando un personaje o enemigo ataca, se crea una instancia de este objeto en el lugar del "impacto", este objeto se encarga de intentar dañar todo con lo que colisione que no pertenezca a la misma "facción" que la persona que lo lanzó, es decir, un personaje no podrá hacerse daño a si mismo con su propio ataque.
        
3. Mejoras implementadas de cara a la entrega final del proyecto

	- Todo el audio del juego.
	- Dos escenarios nuevos (acantilado rocoso y jungla) con sus respectivos límites de colisión.
	- Pantalla de muerte y de victoria.
    - Créditos en la pantalla de victoria.
	- Transición entre niveles y destrucción de la puerta del primer nivel.
	- Dos enemigos nuevos (Lash y Morgan)
    - Animación de muerte de Mustapha y de los enemigos, que transcurridos 6 segundos desaparecen del escenario.
	- Puntuación
	- Barras de vida del personaje principal y los enemigos.
	- Más objetos de comida
	- Modificación del motor para cambiar el orden de renderizado de las entidades dependiendo de su posición. Con esto se da una mayor sensación de 3D.
	- Organización y mejora de los niveles, estableciendo a todos los enemigos y objetos.
    - Enfrentamiento con un jefe final

4. Equipo de trabajo y reparto de tareas: descripción del trabajo realizado por cada uno de los integrantes del grupo y carga de trabajo realizada (0%-100%)

    En términos generales, todos los integrantes hemos trabajado de manera conjunta y al mismo tiempo mediante un canal de Discord, exceptuando el tramo final, donde debido a la temporada de exámenes no siempre hemos podido trabajar juntos y cada uno se ha especializado en distintas áreas para finalizar el proyecto, que son las siguientes:

    - Jorge Borja García: creación de los nuevos escenarios, adición de nuevos elementos a los niveles y más objetos comida.
    - Fernando González Zamorano: creación de los nuevos escenarios, adición del sistema de puntuación al personaje y más objetos comida.
    - Javier Del Río López: modificación del motor del juego para añadir eje z, creación de barra de vida de los enemigos, cambio de nivel 1 a nivel 2 mediante la rotura de la puerta, adición de la pelea final (mecánicas de implementación).
    - Alberto Moreno Gracia: creación de los nuevos enemigos, incluyendo sprites y ataques, adición de la música y efectos de sonido del juego, adición de la pelea final (enemigo).

    Porcentajes aproximados:
    - Jorge: 23%
    - Fernando: 23%
    - Javier: 31%
    - Alberto: 23%

5. Fuentes y referencias: Referencias a todos los assets utilizados en la realización del juego.

    - Voces, efectos, sprites y Mapas: https://www.sounds-resource.com/arcade/cadillacdino/
        Sonidos Voces y efectos:
        "efectos/punioSinColision.mp3",
        "efectos/damageToEnemy.mp3",
        "efectos/vida.mp3",
        "efectos/romperPuertaLoud.mp3",
        "voces/deadEnemyFerris.mp3",
        "voces/deadEnemyElmer.mp3",
        "voces/deadEnemyLash.mp3",
        "voces/deadEnemyMorgan.mp3",
        "voces/risaElmer.mp3",
        "voces/deadMustapha.mp3",
        "voces/rugidoBoss.mp3",
        "interfaz.png","interfaz.json", //interfaz
        "stages/stage1_background1.png", //background del mar
        "stages/stage1_Intro_fondo.png", //fondo primer nivel
        "stages/stage1_Intro_puerta-fondo.png", //puerta cambiada
        "stages/stage1_Intro_puerta-fondo-over.png", //para visionado con la puerta
        Mapas:
        "stages/rocas.png", //background del campo
        "stages/background3.png", //background del campo
        "stages/stage2_background2.png", //background de la jungla
        "stages/jungle.png", // nivel 3
        "stages/mainTittle_Cadillacs.png", //pantalla de inicio
        "stages/gameOver-500x330.png", //pantalla de fin
        "stages/fondo-victoria500x330.png", //pantalla de fin
        Sprites:
        "mustapha.png", "mustapha.json", //personaje mustapha
        "enemigos/ferris.png", "enemigos/ferris.json", //enemigo ferris
        "enemigos/elmer.png", "enemigos/elmer.json",
        "enemigos/morgan2.png", "enemigos/morgan.json",
        "enemigos/lash2.png","enemigos/lash.json",
        "objetos/comida.png", "objetos/comida.json",
        "mustapha-retrato.png", "mustapha-retrato.json",
        "mustapha-busto.png"
        
    - Musica de fondo por nivel: https://www.youtube.com/watch?v=elhtiEqj-M0&list=PLUPwBkQKCRM4eDDkYV-P0DS-dTBATrevx
        "mainTittle.mp3",
        "musicaFondo_2.mp3",
        "musicaFondo_3.mp3",
        "musicaFondo_4.mp3",
        "bossSong.mp3",
        "gameOver.mp3",
        "victoryEnding.mp3"
