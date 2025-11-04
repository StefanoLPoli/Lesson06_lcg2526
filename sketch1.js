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

  checkbox_alfa = createCheckbox('Alfa', true);
  checkbox_alfa.position(165, yMax+10);
  
  checkbox_bravo = createCheckbox('Bravo');
  checkbox_bravo.position(165, yMax+30);

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



function draw() {
  background(220);
  if (checkbox_alfa.checked()) {
      drawPlot(x_pos_alfa, y_pos_alfa, [255, 0, 0], true);
    }
    if (checkbox_bravo.checked()) {
      drawPlot(x_pos_bravo, y_pos_bravo, [255, 0, 255], true);
    }
}
