const TOTAL = 300;
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
let scoreVal=0;
let scoreP;
let scoreMax=0;
let scoreMaxP;

function setup() {
    title = createP("Machine learn to play Flappy bird");
    title.id("title");
    title.position(5,0);
    // var cnv = createCanvas(1024,768);
    var cnv = createCanvas(1000,570);
    cnv.position(0, 40);


    scoreP = createP("");
    scoreP.id("scoreP");
    scoreP.position(200,600);
    scoreMaxP = createP("");
    scoreMaxP.id("scoreMaxP");
    scoreMaxP.position(300,600);

    var txt=createP("Speed slider");
    txt.position(0,600);
    slider = createSlider(1,100,1);
    slider.position(0,630);

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
    genP.position(500,600);
}

function draw() {

    genP.html("Generation: " + gen);
    scoreP.html("Score: " + scoreVal);
    scoreMaxP.html("Highest Score: " + scoreMax);

    for (let n = 0; n<slider.value(); n++){
        scoreVal++;
        if(scoreVal>scoreMax){
            scoreMax = scoreVal;
        }

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
            scoreVal=0;
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
