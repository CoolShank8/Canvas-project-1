Cords = []

var database

var ColorInput

var ChooseColorText

function setup() {
  database = firebase.database();

  var canvas = createCanvas(displayWidth, 400);

  canvas.parent('canvascontainer')

  var ClearButton = createButton('Clear canvas');
  ClearButton.position(displayWidth/2, 200);

  ColorInput = createInput("red")
  ColorInput.position(displayWidth/2, 400)

  var ChooseColorText = createElement("h2")
  ChooseColorText.html("Choose a color below!")
  ChooseColorText.position(displayWidth/2 - 30, 350);

  StrokeSizeInput = createInput("8")
  StrokeSizeInput.position(displayWidth/2 - 400, 400)

  var StrokeSizeText = createElement("h2")
  StrokeSizeText.html("Choose a stroke size below!")
  StrokeSizeText.position(displayWidth/2 - 450  , 350);

  ClearButton.mousePressed(
    function()
    {

      clear()
      Cords = []
    }
  )

  var Drawing_ref = database.ref("drawings")

  Drawing_ref.on("value", function(data)
  {
    var pos = data.val()
    


    //console.log(pos)

    //console.log(x)

    //console.log(data.val())

  })
}

function draw()
{

  for (var i = 0; i < Cords.length; i ++)
  {
    push()
    stroke(Cords[i].color)
    strokeWeight(Cords[i].strokeSize)
    line(Cords[i].x, Cords[i].y, Cords[i].x + 10, Cords[i].y)
    pop()
  }

 //console.log(Cords.length)
  
}


function mouseDragged() 
{ 
 strokeWeight(10);

 //StoreCordLine(Cords, mouseX, mouseX, mouseY)

 var CordDetails = {
   x: mouseX,
   y: mouseY,
  color: ColorInput.value(),
  strokeSize: StrokeSizeInput.value()
 }

 var ref = database.ref('drawings')

 Cords.push(CordDetails)

 ref.push(CordDetails)
 //line(mouseX, mouseY, mouseX + 10, mouseY); // double lines for smooth


}

function StoreCordLine(Array, x1, x2,FixedY)
{
  var ref = database.ref('drawings')

  var GreaterX 
  var LowX


  if (x1 > x2)
  {
    GreaterX = x1
    LowX = x2
  }
  else
  {
    GreaterX = x2
    LowX = x1
  }

  for (var i = LowX; i <= GreaterX; i++)
  {

    var Pos = {
      x: i,
      y: FixedY
    }
    Array.push(Pos)
    ref.push(Pos)
  }

}
