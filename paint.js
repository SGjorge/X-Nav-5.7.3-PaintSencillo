/* Asociamos función canvasApp a carga de página */
window.addEventListener('load', canvasApp, false);	

function canvasApp(){  
    /* Inicializamos el canvas */
	var theCanvas = document.getElementById('canvas');
	var context = theCanvas.getContext('2d');

    /* Inicializamos el valor del color */
	var colorChosen = document.getElementById("color_chosen");

    /* Tomamos los botones de colores por su id */
	var redButton = document.getElementById("Red");
	var greenButton = document.getElementById("Green");
	var blueButton = document.getElementById("Blue");
	var blackButton = document.getElementById("Black");
	var whiteButton = document.getElementById("White");
    /* Asociamos función colorPressed a pulsación de botón */
    redButton.addEventListener('click', colorPressed, false);
    greenButton.addEventListener('click', colorPressed, false);
    blueButton.addEventListener('click', colorPressed, false);
    blackButton.addEventListener('click', colorPressed, false);
    whiteButton.addEventListener('click', colorPressed, false);

    function colorPressed(e) {
	  var color_button_selected = e.target;
	  var color_id = color_button_selected.getAttribute('id');
	  colorChosen.innerHTML = color_id;
    }

    /* Botón de reseteo */
	var resetButton = document.getElementById("reset_image");
    resetButton.addEventListener('click', resetPressed, false);

    /* Asociamos función colorPressed a pulsación de botón */
    function resetPressed(e) {
      theCanvas.width = theCanvas.width; // Borramos canvas
      drawScreen();
    }

    // For the mouse_moved event handler.
    var begin_drawing = false;

 	drawScreen();

    function drawScreen() {
	  theCanvas.addEventListener('mousedown', mouse_pressed_down, false);
	  theCanvas.addEventListener('mousemove', mouse_moved, false);
	  theCanvas.addEventListener('mouseup', mouse_released, false);
    }

    function mouse_pressed_down(ev) {
  	  begin_drawing = true;
	  context.fillStyle = colorChosen.innerHTML;
    }

    function mouse_released(ev) {
	  begin_drawing = false;
    }

    // Find the mouse position
    function findPos(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    };

    function mouse_moved(ev) {
	  var x, y,pixP,pos;	
	  // Get the mouse position in the canvas
      pos = findPos(this);
	  x = ev.pageX - pos.x;
	  y = ev.pageY - pos.y;
      pixP = document.getElementById("brocha");
      pixP = pixP.value;
	  if (begin_drawing) {
	    context.beginPath();
	    context.arc(x, y, pixP, (Math.PI/180)*0, (Math.PI/180)*360, false);
	    context.fill();
        context.closePath();
	  }
    }
}
