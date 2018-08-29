	var paragraph;// = document.getElementById("p");
	var added_text = "";

	var frameTime = 100;
	var latency = 50;
	var update = setInterval(drawWLatency, frameTime);

  function myKeyPress(e)
  {
    var keynum;

    if(window.event) { // IE
      keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera
      keynum = e.which;
    }

	added_text += String.fromCharCode(keynum);
  }

  function start()
  {
  	paragraph = document.getElementById("p");
  }

  function drawWLatency()
  {
	var current_text = added_text;
	setTimeout(() => draw(current_text), latency);
	added_text = "";
  }


  function draw(inputText)
  {
	paragraph.innerHTML += inputText;
  }

  function editFrameRate()
  {
	frameTime = parseInt(document.getElementById("FrameTime").value, 10);
	clearInterval(update);
	update = setInterval(drawWLatency, frameTime);
  }

  function editLatency()
  {

	latency = parseInt(document.getElementById("Latency").value, 10);
  }
