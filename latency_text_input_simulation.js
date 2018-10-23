	var paragraph;// = document.getElementById("p");
	var entryField;
	var added_text = "";
	var initial_output_message;

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
		setTimeout(() => entryField.value = "",1);
  }

	$(document).ready(function () {
	    $("#textEntry").keydown(function(e) {
				var keynum = e.keyCode;

				if(keynum == 13){
					paragraph.innerHTML = initial_output_message;
				}
			else {
				//Delete on Backspace
				added_text += String.fromCharCode(keynum).toLowerCase();
				setTimeout(() => entryField.value = "",1);
			}
	    });
	});

  function start()
  {
  	paragraph = document.getElementById("p");
		entryField = document.getElementById("textEntry");
		initial_output_message = paragraph.innerHTML;
  }

  function drawWLatency()
  {
		var current_text = added_text;
		setTimeout(() => draw(current_text), latency);
		added_text = "";
  }

  function draw(inputText)
  {
		var newOutputText = paragraph.innerHTML + inputText;
		newOutputText = DeleteBackspace(newOutputText);
		paragraph.innerHTML = newOutputText;
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

	function DeleteBackspace(s)
	{
		var base_length = initial_output_message.length;
		var backspace_index = s.indexOf("\b");
		while(backspace_index != -1)
		{
			if(backspace_index <= base_length)
			{
				s = s.slice(0,backspace_index) + s.slice(backspace_index + 1);
			}
			else {
				s = s.slice(0,backspace_index - 1) + s.slice(backspace_index + 1);
			}
			backspace_index = s.indexOf("\b");
		}
		return s;
	}
