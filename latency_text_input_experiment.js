var entryField;
var inputParagraph;// = document.getElementById("p");
var targetParagraph;// = document.getElementById("target");
var results = "";
var added_text = "";

var frameTime = 100;
var latency = 50;
var update = setInterval(drawWLatency, frameTime);

var stimulusTime = 5000;
var nTrials = 48;
var trialNumber = 0;
var targetText = "";
var inputText = "";
var displayingTarget = false;

function myKeyPress(e)
{
  if(!displayingTarget)
  {
    var keynum;

    if(window.event) { // IE
      keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera
      keynum = e.which;
    }

    if(keynum == 13){
      newTrial()
    }
    added_text += String.fromCharCode(keynum);
  }
  setTimeout(() => entryField.value = "",1);
}

function start()
{
  entryField = document.getElementById("textEntry");
  inputParagraph = document.getElementById("inputReadout");
  targetParagraph = document.getElementById("target");
}

function drawWLatency()
{
  var current_text = added_text;
  setTimeout(() => draw(current_text), latency);
  added_text = "";
}


function draw(inputText)
{
  inputParagraph.innerHTML += inputText;
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



function newTrial()
{
  LogResult();
  trialNumber += 1;
  if(trialNumber > nTrials)
  {
    downloadTextFile(results, "trialData.txt")
  }
  else
  {
    targetText = GenerateTargetString();
    SetLag();
    DisplayStimulusCountdown(stimulusTime);
    setTimeout(EndPresentation, stimulusTime)
    displayingTarget = true;
    entryField.value = "";
    //inputParagraph.innerHTML = "Output: ";
    targetParagraph.innerHTML = "Target: " + targetText;
  }
}

function DisplayStimulusCountdown(stimulusTimeRemaining)
{

  var timeRemainingText = String(stimulusTimeRemaining/1000);
  console.log(timeRemainingText);
  inputParagraph.innerHTML = "STIMULUS TIME: " + timeRemainingText;
  if(stimulusTimeRemaining >= 1000)
  {
    setTimeout(() => DisplayStimulusCountdown(stimulusTimeRemaining - 1000), 1000);
  }
  else
  {
    inputParagraph.innerHTML = "Output: ";
  }
}

function EndPresentation()
{
  displayingTarget = false;
  entryField.value = "";
  inputParagraph.innerHTML = "Output: ";
  targetParagraph.innerHTML = "";
}

function SetLag()
{
  var latencies = [0, 25, 50, 75, 120, 160];
  var frameTimes = [0, 16, 32, 64, 100, 150];
  frameTime = frameTimes[Math.floor(Math.random() * frameTimes.length)];
  latency = latencies[Math.floor(Math.random() * latencies.length)];

  clearInterval(update);
  update = setInterval(drawWLatency, frameTime);
}


function LogResult()
{
  try {
    results += "Latency:" + String(latency) + "#FrameTime:" + String(frameTime) + "#" + String(targetText) + "#" + String(inputParagraph.innerHTML) + "\n";
    }
    catch
    {
      results += "";
    }
}


function downloadTextFile(text, name)
{
  const a = document.createElement('a');
  const type = name.split(".").pop();
  a.href = URL.createObjectURL( new Blob([text], { type:`text/${type === "txt" ? "plain" : type}` }) );
  a.download = name;
  a.click();
}

function GenerateTargetString()
{
var targets = ["at the far end of town where the grickle-grass grows", "the wind smells slow-and-sour when it blows", "no birds ever sing excepting old crows",
"is the Street of the Lifted Lorax", "And deep in the Grickle-grass some people say", "if you look deep enough you can still see today", "where the Lorax once stood just as long as it could",
"before somebody lifted the Lorax away", "What was the Lorax?", "And why was it there?", "And why was it lifted and taken somewhere", "from the far end of town where the Grickle-grass grows",
"The old Onceler still lives here", "You wont see the Once-ler. Don't knock at his door", "He stays in his Lerkim on top of his store", "He lurks in his Lerkim, cold under the roof",
"where he makes his own clothes out of miff-muffered moof", "And on special dank midnights in August", "he peeks out of the shutters and sometimes he speaks", "and tells how the Lorax was lifted away",
"He'll tell you, perhaps if you're willing to pay", "On the end of a rope he lets down a tin pail", "and you have to toss in fifteen cents and a nail", "and the shell of a great-greatgrandfather snail",
"Then he pulls up the pail, makes a most careful count", "to see if you've paid him the proper amount", "Then he hides what you paid him away in his Snuv", "since they have to come down through a snergelly hose",
"and he sounds as if he had smallish bees up his nose", "Now I'll tell you, he says, with his teeth sounding gray", "how the Lorax got lifted and taken away", "It all started way back, such a long, long time back",
"Way back in the days when the grass was still green", "the pond was still wet", "and the clouds were still clean", "the song of the Swomee-Swans rang out in space", "one morning, I came to this glorious place",
"And I first saw the trees, the Truffula Trees", "The bright colored tufts of the Truffula Trees", "Mile after mile in the fresh morning breeze"];
var randInd = Math.floor(Math.random() * targets.length);
console.log(targets[randInd]);
return targets[randInd];
}
