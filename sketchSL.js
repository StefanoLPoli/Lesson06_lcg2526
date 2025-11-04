let alfa_data;
let bravo_data;
let dataset_name_alfa = 'drone_alfa_data.csv';
let dataset_name_bravo = 'drone_bravo_data.csv';

let yMax = 400;
let xMax = 400;

let x_pos_alfa = [];
let y_pos_alfa = [];
let z_pos_alfa = [];
let x_vel_alfa = [];
let y_vel_alfa = [];

let x_pos_bravo = [];
let y_pos_bravo = [];
let z_pos_bravo = [];
let x_vel_bravo = [];
let y_vel_bravo = [];

let steps = [];

let checkbox_alfa;
let checkbox_bravo;
let mySelect;

let pressed_x = -1;
let pressed_y = -1;

function preload() {
  alfa_data = loadTable(dataset_name_alfa, 'csv', 'header');
  bravo_data = loadTable(dataset_name_bravo, 'csv', 'header');
}

function setup() {
  frameRate(30);
  createCanvas(xMax, yMax);

  for(let i = 0; i < alfa_data.getRowCount(); i++) {
    x_pos_alfa.push(alfa_data.getNum(i, 'x_pos'));
    y_pos_alfa.push(alfa_data.getNum(i, 'y_pos'));
    z_pos_alfa.push(alfa_data.getNum(i, 'z_pos'));
    x_vel_alfa.push(alfa_data.getNum(i, 'x_vel'));
    y_vel_alfa.push(alfa_data.getNum(i, 'y_vel'));
    steps.push(alfa_data.getNum(i, 'steps'));
  }

  for( let i = 0; i < bravo_data.getRowCount(); i++) {
    x_pos_bravo.push(bravo_data.getNum(i, 'x_pos'));
    y_pos_bravo.push(bravo_data.getNum(i, 'y_pos'));
    z_pos_bravo.push(bravo_data.getNum(i, 'z_pos'));
    x_vel_bravo.push(bravo_data.getNum(i, 'x_vel'));
    y_vel_bravo.push(bravo_data.getNum(i, 'y_vel'));
  }

  checkbox_alfa = createCheckbox('Alfa', true);
  checkbox_bravo = createCheckbox('Bravo', true);

  checkbox_alfa.position(10, yMax + 10);
  checkbox_bravo.position(10, yMax + 30);

  mySelect = createSelect();
  mySelect.position(5, yMax + 50);
  mySelect.option('trajectory');
  mySelect.option('x position');
  mySelect.option('y position');
  mySelect.option('z position');
  mySelect.option('x velocity');
  mySelect.option('y velocity');

  mySelect.selected('trajectory');
}

function printData(value_array, label, offset = 0){
    textSize(16);
    let index = floor(map(pressed_x, 0, width, 0, value_array.length-1));
    let value = value_array[index];
    fill(0,0,0);
    noStroke();
    if(pressed_x + 150 > width){
        pressed_x = width - 150;
    }
    rect(pressed_x, pressed_y - offset, 150, 25);
    fill(255,255,255);
    text(label + nf(value,1,2), pressed_x + 5, pressed_y + 17 - offset);
}

function drawPlot(values1, values2, hover_positions=true, color=[255,0,0]) {
    push();
    stroke(color[0], color[1], color[2]);
    noFill();

    beginShape();
    for(let i=0; i<values1.length; i++){
        let px = map(values1[i], min(values1), max(values1), 0, xMax);
        let ts = map(values2[i], max(values2), min(values2), 0, yMax);
        vertex(px, ts);
    }
    endShape();

    pop();

    if(hover_positions){
        push();
        fill(0,255,0);
        stroke(0,0,0);
        xi = map(values1[0], min(values1), max(values1), 0, xMax);
        yi = map(values2[0], max(values2), min(values2), 0, yMax);
        circle(xi, yi, 10);
        pop();

        push();
        fill(255,255,0);
        stroke(0,0,0);
        xf = map(values1[values1.length-1], min(values1), max(values1), 0, xMax);
        yf = map(values2[values2.length-1], max(values2), min(values2), 0, yMax);
        circle(xf, yf, 10);
        pop();
    }
}

function mouseClicked(){
    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
        pressed_x = mouseX;
        pressed_y = mouseY;
    }
}

function draw() {
    background(220);

    let selected_option = mySelect.value();

    if (selected_option == 'trajectory'){
        if (checkbox_alfa.checked()){
            drawPlot(x_pos_alfa, y_pos_alfa);
        }
        if (checkbox_bravo.checked()){
            drawPlot(x_pos_bravo, y_pos_bravo, true, [0,0,255]);
        }
    } else if (selected_option == 'x position'){
        if (pressed_x != -1 && pressed_y != -1){
            stroke(0,0,0);
            line(pressed_x, 0, pressed_x, height);
            //line(0, pressed_y, width, pressed_y);
        }

        if (checkbox_alfa.checked()){
            drawPlot(steps, x_pos_alfa, hover_positions=false);
            if(pressed_x != -1 && pressed_y != -1){
                printData(x_pos_alfa, 'Alfa x pos: ');
            }
        }
        if (checkbox_bravo.checked()){
            drawPlot(steps, x_pos_bravo, hover_positions=false, [0,0,255]);
            if(pressed_x != -1 && pressed_y != -1){
                printData(x_pos_bravo, 'Bravo x pos: ', 25);
            }
        }
    }
}