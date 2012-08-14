
// open -a 'Google Chrome' --args --allow-file-access-from-files
// http://www.google.com/webfonts/#UsePlace:use/Collection:Nova+Oval|Averia+Sans+Libre|Nixie+One|Droid+Sans|Lato|Economica|Rammetto+One|Poiret+One|PT+Sans+Narrow|Philosopher|Ubuntu:700|Wire+One|Magra|Peralta|Spirax|Nunito|Marmelad|Love+Ya+Like+A+Sister|Share|Play|Comfortaa|Lancelot|Abril+Fatface|Hammersmith+One|Jura|Vollkorn

$(function() {

  var rc = 0;  // resize counter
  var oc = 0;  // orientiation counter
  var ios = navigator.userAgent.match(/(iPhone)|(iPod)/); // is iPhone
  
  $('#Tools').tabs();
  $("#combobox").combobox();

  var canvas = new fabric.Canvas('canvas'),
  	  ctx = (function(){
		  return canvas.getContext 
			? canvas.getContext('2d') 
			: typeof G_vmlCanvasManager != 'undefined' 
			  ? G_vmlCanvasManager.initElement(canvas).getContext('2d')
			  : null;
		})();
	if (!ctx) return;
    
	var rect = new fabric.Rect({
	  top: 100,
	  left: 100,
	  width: 60,
	  height: 70,
	  fill: 'red',
	  cornersize: 28
	});
	canvas.add(rect);
	
  	fabric.loadSVGFromURL("img/test.svg", function(objects, options) {
      var shape = fabric.util.groupSVGElements(objects, options);
      canvas.add(shape).centerObjectH(shape).centerObjectV(shape).renderAll();
      shape.setCoords();
      shape.set({cornersize: 28});
      canvas.calcOffset();
    });
    
    canvas.add(new fabric.Text('Insert Text Here', { 
	  fontFamily: 'Arial', 
	  left: 400, 
	  top: 300,
	  fontFamily: 'Nova Oval',
	  useNative: true
	}));
	
	resizeCanvas();
    
	
  function orientationChange() {
	  // inc orientation counter
	  oc++;
  }
  
  function resizeCanvas() {
	  // inc resize counter
	  rc++;
	  
	  if (ios) {
		  // increase height to get rid off ios address bar
		  $("#container").height($(window).height() + 60)
	  }
	  
	  var width = $("#container").width();
	  var height = $("#container").height();
	  cheight = height - 122; // subtract the fix height
	  cwidth = width;
	  
	  // set canvas width and height
	  canvas.setWidth(cwidth);
	  canvas.setHeight(cheight);
	  canvas.calcOffset();

	  // hides the WebKit url bar
	  if (ios) {
		  setTimeout(function() {
			  window.scrollTo(0, 1);
		  }, 100);   
	  }
  }

  var resizeTimeout;
  $(window).resize(function() {
	  clearTimeout(resizeTimeout);
	  resizeTimeout = setTimeout(resizeCanvas, 100);
	  resizeCanvas();
  });
  
  var otimeout;
  window.onorientationchange = function() {
	  clearTimeout(otimeout);
	  otimeout = setTimeout(orientationChange, 50);
  }
  
});
