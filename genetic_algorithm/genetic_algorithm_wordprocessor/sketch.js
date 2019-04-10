let population;
let target;
let populationSize;
let mutationRate;
let started=false;
let bestPhrase;
let limitedP;
let allP;
let stats;
let timer;
let timerValue;
let mf;

function setup(){
    bestPhrase = createP("Best phrase:");
    bestPhrase.position(10,10);
    bestPhrase.id("best");

    txtPercent = createP("%");
    txtPercent.position(170,620);
    txtPercent.id("percent");

    txtPopWarn = createP("Too much population size can hang you brower or computer");
    txtPopWarn.position(210,584);
    txtPopWarn.id("percent");

    sourceLink=createA('http://github.com/diwasx/genetic_algorithm_wordprocessor', 'Source Code: http://github.com/diwasx/genetic_algorithm_wordprocessor')
    sourceLink.id("source");
    sourceLink.position(300,'100%');
    // sourceLink.style('position', 'fixed');
    // sourceLink.style('position', 'absolute');
    sourceLink.style('bottom', '10px');
    // window.open("https://www.w3schools.com");



    limitedP= createP("Limited Phrase");
    limitedP.position(700,10);
    limitedP.id("limited");
    limitedP.hide();

    allP= createP("All phrase:");
    allP.position(700,10);
    allP.class("all");
    allP.id("all");
    allP.hide();
    
    stats = createP("Stats");
    stats.position(10,200);
    stats.id("stats");
    
    timer = createP("Timer");
    timer.position(10,280);
    timer.id("timer");
    

    buttonToogle = createButton('Show/Hide all population');
    buttonToogle.position(470,25)
    buttonToogle.mousePressed(toogle);
    buttonToogle.hide();

    //Input Section

    inputP = createP("Input");
    inputP.position(10,500);
    inputP.id("input");

    let inputText = "<h2>Phrases: </h2><br>"
    inputText += "Population: <br><br>"
    inputText += "Mutation rate: <br>"
    inputP.html(inputText);

    inputPhrase = createInput();
    // inputPhrase = createInput().attribute('placeholder', 'Hello World');
    inputPhrase.position(120, 532);
    inputPhrase.style('width', '550px');
    inputPhrase.style('height', '3%');
    inputPhrase.style('font-size', '16px');
    inputPhrase.attribute('placeholder', 'Hello World! I am genetic_algorithm');
    inputPhrase.attribute('value','Hello World! I am genetic_algorithm');

    // if(inputPhrase.attribute('value') == 'Hello World! I am genetic_algorithm'){
        // inputPhrase.attribute('onfocus','this.value=""');
    // }
    // if(inputPhrase.attribute('value') == ''){
        // inputPhrase.attribute('onblur','this.value="Hello World! I am genetic_algorithm"');
    // }
    
    inputPop = createInput();
    inputPop.position(120, 598);
    inputPop.style('width', '70px');
    inputPop.style('height', '2%');
    inputPop.style('font-size', '12px');
    inputPop.attribute('placeholder', '2000');
    inputPop.attribute('value','2000');
    // inputPop.attribute('onfocus','this.value=""');

    inputMR = createInput();
    inputMR.position(120, 632);
    inputMR.style('width', '30px');
    inputMR.style('height', '2%');
    inputMR.style('font-size', '12px');
    inputMR.attribute('placeholder', '0.15');
    inputMR.attribute('value','0.15');
    // inputMR.attribute('onfocus','this.value=""');

    
    buttonStart = createButton('Start Algorithm');
    // buttonStart.position(width/2,height);
    buttonStart.position(10,670);
    buttonStart.mousePressed(startProgram);
    buttonStart.class="input";
    buttonStart.id("btnStart");
    startProgram();

}

function draw(){
    if(started){
        population.naturalSelection();
        population.generate();
        population.calcFitness();
        population.evaluate();
        displayInfo();

        if(population.isFinished()){
            noLoop();
            buttonToogle.show();
        }
   }
}

function displayInfo() {
    // Display current status of population
    let answer = population.getBest();

    bestPhrase.html("Best phrase:<br><h3>" + answer+"</h3>");

    timer.html("Timer: " + timerValue + " s");

    let statstext = "total generations:     " + population.getGenerations() + "<br>";
    statstext += "max fitness:       " + nf(population.getMaxFitness()) + "<br>";
    statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
    statstext += "total population:      " + populationSize + "<br>";
    statstext += "mutation rate:         " + (mutationRate * 100) + "%";
    stats.html(statstext);

    allP.hide();
    limitedP.html("Limited phrases(Limited to 50 to save memory)<br><br>" + population.limitedPhrases())
}
function timerStart(){
    var start = Date.now();
    var intervalId = setInterval(function() {
        var delta = Date.now() - start; // milliseconds elapsed since start
        timer
        timerValue=delta/1000;
        if(population.isFinished()){
            clearInterval(intervalId);
        }
    }, 1); // update about every second
    return;
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

function startProgram(){
    //avg time 127.4s
    // target = "The Quick Brown Fox jumps over a Lazy Dog. 1234567890!@#$%^&*()_+-=`~\"';<>?/\\|";
    // target = "Hello World! I am genetic_algorithm";
    // populationSize = 2000;
    // mutationRate = 0.15;
    // || inputPop.value() !="" || inputMR.value() !="")
    if(inputPhrase.value()!=""){
        if(inputPop.value()!=""){
            if(inputMR.value()!=""){
                target = inputPhrase.value();
                populationSize = inputPop.value();
                mutationRate = inputMR.value();
                mutationRate = mutationRate/100;

                population = new Population(target, mutationRate, populationSize);
                loop();
                started=true;
                timerStart();
                limitedP.show();
            }
            else{
                alert("Enter mutation rate");
            }
        }else{
            alert("Enter population size");
        }
    }else{
        alert("Enter Phrases");
    }
}
