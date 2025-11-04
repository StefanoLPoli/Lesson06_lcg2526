let x_pos_alfa = [];
let y_pos_alfa = [];
let z_pos_alfa = [];

let x_pos_bravo = [];
let y_pos_bravo = [];
let z_pos_bravo = [];

let x_vel_alfa = [];
let y_vel_alfa = [];

let x_vel_bravo = [];
let y_vel_bravo = [];

let steps = [];
let alfa_data;
let bravo_data;

let yMax = 400;
let xMax = 400;

let mySelect;
let applyButton;
let checkbox_alfa;
let checkbox_bravo;

let pressed_x = -1;
let pressed_y = -1;

function preload() {
  alfa_data = loadTable('drone_alfa_data.csv', 'csv', 'header');
  bravo_data = loadTable('drone_bravo_data.csv', 'csv', 'header');
}

function setup() {
  frameRate(60);
  createCanvas(xMax, yMax);

  for (let i = 0; i < alfa_data.getRowCount(); i++) {
      x_pos_alfa.push(alfa_data.getNum(i, 'x_pos'));
      y_pos_alfa.push(alfa_data.getNum(i, 'y_pos'));
      z_pos_alfa.push(alfa_data.getNum(i, 'z_pos'));
      x_vel_alfa.push(alfa_data.getNum(i, 'x_vel'));
      y_vel_alfa.push(alfa_data.getNum(i, 'y_vel'));
      steps.push(i);
  }

  for (let i = 0; i < bravo_data.getRowCount(); i++) {
      x_pos_bravo.push(bravo_data.getNum(i, 'x_pos'));
      y_pos_bravo.push(bravo_data.getNum(i, 'y_pos'));
      z_pos_bravo.push(bravo_data.getNum(i, 'z_pos'));
      x_vel_bravo.push(bravo_data.getNum(i, 'x_vel'));
      y_vel_bravo.push(bravo_data.getNum(i, 'y_vel'));
      
  }

  mySelect = createSelect();
  mySelect.position(5, yMax + 10);

  // Add options.
  mySelect.option('pos');
  mySelect.option('pos_x');
  mySelect.option('pos_y');
  mySelect.option('pos_z');
  mySelect.option('vel_x');
  mySelect.option('vel_y');

  // Set the selected option to "pos".
  mySelect.selected('pos');

  clearButton = createButton('Clear');
  clearButton.position(mySelect.x + 350, yMax + 10);
  clearButton.mousePressed(clearGraph);

  applyButton = createButton('Apply');
  applyButton.position(mySelect.x + 70, yMax + 10);
  applyButton.mousePressed(applySelection);

  checkbox_alfa = createCheckbox('Alfa', true);
  checkbox_alfa.position(165, yMax+10);
  
  checkbox_bravo = createCheckbox('Bravo');
  checkbox_bravo.position(165, yMax+30);
  
  applySelection();

}

function clearGraph() {
  resetPressed();
  mySelect.selected('pos');
  applySelection();
}

function resetPressed() {
  pressed_x = -1;
  pressed_y = -1;
}

function printData(value_array, label, offset=0) {
  if (pressed_x > 0 && pressed_x < width) {
    textSize(16);
    let index = floor(map(pressed_x, 0, width, 0, value_array.length));
    let value = value_array[index];
    fill(0, 0, 0);
    noStroke();
    if (pressed_x + 150 > width) {
      rect(pressed_x - 150, pressed_y - 30 - offset, 150, 24);
      fill(255, 255, 255);
      text(label + ': ' + nf(value, 1, 2), pressed_x - 145, pressed_y - 12 - offset);
    } else {
      rect(pressed_x, pressed_y - 30 - offset, 150, 24);
      fill(255, 255, 255);
      text(label + ': ' + nf(value, 1, 2), pressed_x + 5, pressed_y - 12 - offset);
    }
  }
}


function applySelection() {
  let selected = mySelect.value();
  background(220);

  if (selected === 'pos') {
    resetPressed();
    if (checkbox_alfa.checked()) {
      drawPlot(x_pos_alfa, y_pos_alfa, [255, 0, 0], true);
    }
    if (checkbox_bravo.checked()) {
      drawPlot(x_pos_bravo, y_pos_bravo, [255, 0, 255], true);
    }

  } else if (selected === 'pos_x') {
    if (checkbox_alfa.checked()) {
      drawPlot(x_pos_alfa, steps, [255, 0, 0]);
      printData(x_pos_alfa, 'x_pos_alfa');
    }
    if (checkbox_bravo.checked()) {
      drawPlot(x_pos_bravo, steps, [255, 0, 255]);
      printData(x_pos_bravo, 'x_pos_bravo', offset=50);
    }
  } else if (selected === 'pos_y') {
    if (checkbox_alfa.checked()) {
      drawPlot(y_pos_alfa, steps, [255, 0, 0]);
      printData(y_pos_alfa, 'y_pos_alfa');
    }
    if (checkbox_bravo.checked()) {
      drawPlot(y_pos_bravo, steps, [255, 0, 255]);
      printData(y_pos_bravo, 'y_pos_bravo', offset=50);
    }
  } else if (selected === 'pos_z') {
    if (checkbox_alfa.checked()) {
      drawPlot(z_pos_alfa, steps, [255, 0, 0]);
      printData(z_pos_alfa, 'z_pos_bravo');
    }
    if (checkbox_bravo.checked()) {
      drawPlot(z_pos_bravo, steps, [255, 0, 255]);
      printData(z_pos_bravo, 'z_pos_bravo', offset=50);
    }
  } else if (selected === 'vel_x') {
    if (checkbox_alfa.checked()) {
      drawPlot(x_vel_alfa, steps, [255, 0, 0]);
      printData(x_vel_alfa, 'x_vel_alfa');
    }
    if (checkbox_bravo.checked()) {
      drawPlot(x_vel_bravo, steps, [255, 0, 255]);
      printData(x_vel_bravo, 'x_vel_bravo', offset=50);
    }
  } else if (selected === 'vel_y') {
    if (checkbox_alfa.checked()) {
      drawPlot(y_vel_alfa, steps, [255, 0, 0]);
      printData(y_vel_alfa, 'y_vel_alfa');
    }
    if (checkbox_bravo.checked()) {
      drawPlot(y_vel_bravo, steps, [255, 0, 255]);
      printData(y_vel_bravo, 'y_vel_bravo', offset=50);
    }
  } 

  stroke(0, 0, 0);
  line(pressed_x, 0, pressed_x, height);
}

function drawPlot(values1, values2, color=[255, 0, 0], hover_positions=false) {
  stroke(color[0], color[1], color[2]);
  noFill();
  beginShape();
  for (let i = 0; i < values1.length; i++) {
    let px = map(values1[i], max(values1), min(values1), 0, width);
    let ts = map(values2[i], min(values2), max(values2), 0, height);
    vertex(ts, px);
  }
  endShape();

  if (hover_positions) {
    push();
    xi = map(values1[0], max(values1), min(values1), 0, width)
    yi = map(values2[0], min(values2), max(values2), 0, height)

    xf = map(values1[values1.length - 1], max(values1), min(values1), 0, width)
    yf = map(values2[values2.length - 1], min(values2), max(values2), 0, height)

    
    stroke(0, 0, 0);
    fill(0, 220, 15);
    circle(yi, xi, 10);

    fill(0, 15, 220);
    circle(yf, xf, 10);
    pop();
  }
}


function mouseClicked() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    pressed_x = mouseX;
    pressed_y = mouseY;
    applySelection();
    stroke(0, 0, 0);
    line(pressed_x, 0, pressed_x, height);
  }
}

function draw() {
  noLoop();
}
