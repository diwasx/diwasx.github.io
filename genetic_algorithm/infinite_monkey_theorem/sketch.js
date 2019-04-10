let population;
let target;
let populationSize;
let mutationRate;

let bestPhrase;
let limitedP;
let allP;
let stats;
let timer;
let timerValue;

function setup(){
    bestPhrase = createP("Best phrase:");
    bestPhrase.id("best");

    limitedP= createP("Limited Phrase");
    limitedP.position(1000,10);
    limitedP.id("limited");

    allP= createP("All phrase:");
    allP.position(1000,10);
    // allP.class("all");
    allP.id("all");
    
    stats = createP("Stats");
    stats.id("stats");
    
    timer = createP("Timer");
    timer.id("timer");
    
    
    target = "I am the Badass programmer in the World ";
    populationSize = 3000;
    mutationRate = 0.01;
    buttonToogle = createButton('Show/Hide all population');
    buttonToogle.position(800,25)
    buttonToogle.mousePressed(toogle);
    buttonToogle.hide();

    population = new Population(target, mutationRate, populationSize);
    timerStart();

}

function draw(){
    population.naturalSelection();
    population.generate();
    population.calcFitness();
    population.evaluate();
    if(population.isFinished()){
        noLoop();
        buttonToogle.show();
    }
    displayInfo();
}

function displayInfo() {
    // Display current status of population
    let answer = population.getBest();

    bestPhrase.html("Best phrase:<br><h3>" + answer+"</h3>");

    timer.html("Timer: " + timerValue + " s");

    let statstext = "total generations:     " + population.getGenerations() + "<br>";
    statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
    statstext += "total population:      " + populationSize + "<br>";
    statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

    stats.html(statstext);

    allP.hide();
    limitedP.html("Limited phrases: (Limited to 50 to save memory)<br><br>" + population.limitedPhrases())
}
function timerStart(){
    var start = Date.now();
    var intervalId = setInterval(function() {
        var delta = Date.now() - start; // milliseconds elapsed since start
        // let output=(Math.floor(delta / 1000)); // in seconds
        // alternatively just show wall clock time:
        // output(new Date().toUTCString());
        timer
        // console.log(delta/1000);
        timerValue=delta/1000;
        if(population.isFinished()){
            clearInterval(intervalId);
        }
    }, 1); // update about every second

    return;
    // if(population.isFinished()){
}


function toogle(id) {
    var a = document.getElementById("all");
    var l = document.getElementById("limited");
    if(a.style.display == 'block') {
        a.style.display = 'none';
        l.style.display = 'block';
    }
    else{
        a.style.display = 'block';
        l.style.display = 'none';
        allP.html("All population: <br><br>" + population.allPhrases())
    }
}
