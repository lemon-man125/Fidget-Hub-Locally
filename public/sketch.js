let player1;
let player2;

let acceptedFont = 0;

let accept1 = false;
let accept2 = false;

let input1, input2;

// let fidget1 = "";
// let fidget2 = "";

// let fidget1X, fidget2X;

// function preload() {
//   popIt = loadImage("rainbow_pop_it.png");
// }

async function addFidgets() {
  if (mouseY > height / 2) {
    const formattedName = input1.value.split(/\s+/).join("");
    console.log(formattedName);
    const file = await fetch(`/getFidget/${formattedName}`);
    const blob = await file.blob();
    player1.addFidget(createImg(URL.createObjectURL(blob), "fidget").hide());
  } else {
    const formattedName = input2.value.split(/\s+/).join("");
    console.log(formattedName);
    const file = await fetch(`/getFidget/${formattedName}`);
    const blob = await file.blob();
    player2.addFidget(createImg(URL.createObjectURL(blob), "fidget").hide());
  }
  // console.log(player1);
  // console.log(player2);
}

// function keyPressed() {
//   switch (key) {
//     case " ": {
//       accept1 = true;
//       break;
//     }
//     case "k": {
//       accept2 = true;
//     }
//   }
// }

function setup() {
  createCanvas(windowWidth, 400).mousePressed(addFidgets);
  const acceptB1 = document.body.querySelector(".accept1");
  const acceptB2 = document.body.querySelector(".accept2");
  input1 = document.body.querySelector(".fidget1");
  input2 = document.body.querySelector(".fidget2");

  //createButton("Decline").mousePressed
  // const submit1 = document.body.querySelector(".submit1");
  // const submit2 = document.body.querySelector(".submit2");

  player1 = new Player((height / 4) * 3);
  player2 = new Player(height / 4);

  // submit1.addEventListener("click", () => (fidget1 = input1.value));
  // submit2.addEventListener("click", () => (fidget2 = input2.value));

  acceptB1.addEventListener("click", () => {
    player1.accept();
    if (!accept2) return;
    //[fidgets2, fidgets1] = [fidgets1, fidgets2];
  });
  acceptB2.addEventListener("click", () => {
    player2.accept();
    if (!accept1) return;
    //[fidgets2, fidgets1] = [fidgets1, fidgets2];
  });
  //fidget.resize(100, 100);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  line(0, height / 2, width, height / 2);
  imageMode(CENTER);
  noStroke();

  player1.show();
  player2.show();

  if (!player1.accepted || !player2.accepted) return;
  player1.lerpY(height / 4);
  player2.lerpY((height / 4) * 3);

  acceptedFont = lerp(acceptedFont, 64, 0.02);
  textSize(acceptedFont);
  textAlign(CENTER, CENTER);
  fill(0, 255, 0);
  text("Trade Accepted!", width / 2, height / 2);
  const d = abs(acceptedFont - 64);
  if (d > 2) return;
  acceptedFont = 0;
  player1.accepted = false;
  player2.accepted = false;
  player1.revert();
  player2.revert();
  player1.clear();
  player2.clear();
  fidgets1 = [];
  fidgets2 = [];
}
