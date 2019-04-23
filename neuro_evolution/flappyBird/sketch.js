const TOTAL = 500;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0
let cycles = 100;
let title;
let slider;
let sliderPipe;
let sliderPipeP;
let genP;
let birdId=1;

function setup() {
    title = createP("Machine learn to play Flappy bird");
    title.id("title");
    title.position(5,0);

    // createCanvas(640, 480);
    var cnv = createCanvas(1024,768);
    cnv.position(0, 40);

    var txt=createP("Speed slider");
    txt.position(0,800);
    slider = createSlider(1,100,1);
    slider.position(0,850);

    sliderPipeP=createP("Pipe gap");
    sliderPipeP.position(width+40,200);
    sliderPipe = createSlider(100,300,180);
    sliderPipe.id("sliderPipe");
    sliderPipe.position(width,100);

    for (var i = 0; i< TOTAL; i++) {
        birds[i] = new Bird();
    }

    genP = createP("Generation");
    genP.id("gen");
    genP.position(0,900);
}

function draw() {

    genP.html("Generation: " + gen);

    for (let n = 0; n<slider.value(); n++){
        if (counter % 75 == 0) {
            pipes.push(new Pipe());
        }
        counter++;

        for (var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
            
            for (var j = birds.length - 1; j >= 0; j--) {
                if (pipes[i].hits(birds[j])) {
                    savedBirds.push(birds.splice(j,1)[0]);
                }
            }
            
            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }
        }

        for (var i = birds.length - 1; i >= 0; i--) {
            if(birds[i].offScreen()){
                savedBirds.push(birds.splice(i,1)[0]);
            }
        }

        for(let bird of birds){
            bird.think(pipes);
            bird.update();
        }
        if(birds.length === 0){
            counter = 0;
            nextGeneration();
            pipes = [];
        }
    }

    background(0);
    for(let bird of birds){
        bird.show();
    }

    for(let pipe of pipes){
        pipe.show();
    }

}
//Save bird
// function keyPressed(){
//     if(key ==='s'){
//         let bird = birds[0];
//         // let json = bird.brain.serialize();
//         saveJSON(bird.brain,'bird.json');
//     }
// }


//function keyPressed() {
//  if (key == ' ') {
//    bird.up();
//    //console.log("SPACE");
//  }
// }/ }
