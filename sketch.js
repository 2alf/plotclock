//author : alfcode2
//http://xladn0.rf.gd/
//https://github.com/2alf
//FMK*DU >> 2023


//globals
let hourTrail = [];
let minuteTrail = [];
let secondTrail = [];
let handOpacity = 255;
let timeScale = 1;
let scaleFactor = 2; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(22);
  let currentTime = new Date();
  let timeString = getTimeString(currentTime);
  textFont('monospace');
  textSize(24);
  noStroke();
  var w = textWidth(timeString);
  fill(220);
  text(timeString, width/2 - 20, 100);
  translate(width / 2, height / 2);
  rotate(270);
  // Draw hour hand
  let hourAngle = map(hour() % 12, 0, 12, 0, 360);
  // let hourAngle = map((minute() * timeScale) % 12, 0, 12, 0, 360);

  // let hourAngle = map((second()/6 * timeScale), 0, 60, 0, 360);
  push();
  rotate(hourAngle);
  stroke(99, 74, 54, handOpacity); // hour hand
  strokeWeight(40 * scaleFactor); // Scale up the stroke weight
  line(0, 0, 60 * scaleFactor, 0); // Scale up the line length
  pop();

  // Draw minute hand
  // let minuteAngle = map(minute(), 0, 60, 0, 360);
  let minuteAngle = map((minute() * timeScale), 0, 60, 0, 360);
  let minuteLength = 80 * scaleFactor; // Scale up the hand length
  let hourLength = 60 * scaleFactor; // Scale up the hand length
  let minuteX = cos(minuteAngle) * minuteLength + cos(hourAngle) * hourLength;
  let minuteY = sin(minuteAngle) * minuteLength + sin(hourAngle) * hourLength;
  stroke(150, 118, 92, handOpacity); // Green color for minute hand
  strokeWeight(30);
  line(cos(hourAngle) * hourLength, sin(hourAngle) * hourLength, minuteX, minuteY);

  // Draw second hand
  let secondAngle = map((second() * timeScale), 0, 60, 0, 360);
  // let secondAngle = map((millis() * timeScale), 0, 1000, 0, 360);
  let secondLength = 100 * scaleFactor; // Scale up the hand length

  let secondX = cos(secondAngle) * secondLength + cos(minuteAngle) * minuteLength + cos(hourAngle) * hourLength;
  let secondY = sin(secondAngle) * secondLength + sin(minuteAngle) * minuteLength + sin(hourAngle) * hourLength;
  stroke(179, 175, 171, handOpacity); // second hand
  strokeWeight(20);
  line(minuteX, minuteY, secondX, secondY);

  // Add current positions to the trails
  hourTrail.push(createVector(cos(hourAngle) * hourLength, sin(hourAngle) * hourLength));
  minuteTrail.push(createVector(minuteX, minuteY));
  secondTrail.push(createVector(secondX, secondY));

  // Draw trails
  noFill();
  strokeWeight(2 * scaleFactor);
  // Hour trail
  stroke(255, 0, 0, 255); // hour trail
  beginShape();
  for (let i = 0; i < hourTrail.length; i++) {
    vertex(hourTrail[i].x, hourTrail[i].y);
  }
  endShape();

  // Minute trail
  stroke(0, 255, 0, 255); // minute trail
  beginShape();
  for (let i = 0; i < minuteTrail.length; i++) {
    vertex(minuteTrail[i].x, minuteTrail[i].y);
  }
  endShape();

  // Second trail
  stroke(255, 255, 255, 255); // second trail
  beginShape();
  for (let i = 0; i < secondTrail.length; i++) {
    vertex(secondTrail[i].x, secondTrail[i].y);
  }
  endShape();

}

function keyTyped() { // save
  if (key == 's') save(random(20) + '.png'); //save
  if (key == 'h') if (handOpacity == 255) {handOpacity = 0} else {handOpacity = 255}; // hide
}

function getTimeString(currentTime) {
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  return nf(hours, 2) + ":" + nf(minutes, 2) + ":" + nf(seconds, 2);
  console.log(nf(hours, 2) + ":" + nf(minutes, 2) + ":" + nf(seconds, 2));
}
