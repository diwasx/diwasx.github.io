var vehicles = [];
var food = [];
var poison = [];
var debug;
function setup(){
    titleLabel=createP("Evolving Rockets");

    // createCanvas(640,360);
    // createCanvas(800,600);
    createCanvas(1024,768);

    debug = createCheckbox('debug');
    infoLabel=createP("Drag mouse to create more rocket");

    //Vehicle generate
    for(var i=0; i<50; i++){
        vehicles[i] = new Vehicle(random(width), random(height)); 
    }

    //Food generate
    for (var i = 0; i<50; i++){
        var x = random(width);
        var y = random(height);
        food.push(createVector(x,y));
    }

    //poison generate
    for (var i = 0; i<30; i++){
        var x = random(width);
        var y = random(height);
        poison.push(createVector(x,y));
    }

}

function mouseDragged(){
    vehicles.push(new Vehicle(mouseX,mouseY));
}

function draw(){
    background(21);

    //Random food spawn
    if(random(1)<0.060){
        var x = random(width);
        var y = random(height);
        food.push(createVector(x,y));
    }

    //Random poison spawn
    if(poison.length < 100){
        if(random(1)<0.02){
            var x = random(width);
            var y = random(height);
            poison.push(createVector(x,y));
        }
    }

    let target = createVector(mouseX, mouseY);

    //Draw food
    for (var i = 0; i<food.length; i++){
        fill(0,255,0);
        noStroke();
        ellipse(food[i].x, food[i].y, 4, 4);
    }

    //Draw poison
    for (var i = 0; i<poison.length; i++){
        fill(255,0,0);
        noStroke();
        ellipse(poison[i].x, poison[i].y, 4, 4);
    }

    //Draw vehicles
    // for(var i=0; i<vehicles.length; i++){
    for(var i=vehicles.length-1; i>=0; i--){
        vehicles[i].boundaries();
        vehicles[i].behaviors(food, poison);
        vehicles[i].update();
        vehicles[i].display();

        //Cloning
        var newVehicle = vehicles[i].clone();
        //Cloning limit
        if(vehicles.length < 12){
            if (newVehicle != null){
                vehicles.push(newVehicle);
            }
        }

        if (vehicles[i].dead()){
            var x = vehicles[i].position.x;
            var y = vehicles[i].position.y;
            food.push(createVector(x,y));
            vehicles.splice(i,1);
        }
    }

}
