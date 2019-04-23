
class Bird{
    constructor(brain) {
        this.y = height / 2;
        this.x = 64;

        this.gravity = 0.7;
        this.lift = -18;
        this.velocity = 0;
        
        this.score = 0;
        this.fitness = 0;

        this.r = random(0,255);
        this.g = random(0,255);
        this.b = random(0,255);
        // fill(255,50);

        if(brain){
            this.brain = brain.copy()
        }else{
            this.brain = new NeuralNetwork(5,8,2);
        }
    }

    show(){
        stroke(255);
        fill(this.r,this.g,this.b);
        ellipse(this.x, this.y, 42, 42);

        //Text color according to ball color
        noStroke();
        if((this.r+this.g+this.g+this.b)/2 > 382){
            fill(0);
        }else{
            fill(255);
        }
        text(this.brain.bId,this.x-6,this.y);
    }

    up(){
        this.velocity += this.lift;
    }

    mutate(){
        this.brain.mutate(0.1);
    }

    think(pipes){

        //Geting closest pipe
        let closest = null;
        let closestD = Infinity;
        for(let i = 0; i< pipes.length; i++){
            let d = (pipes[i].x + pipes[i].w)- this.x;
            if (d < closestD && d > 0){
                closest = pipes[i];
                closestD = d;
            }
        }
        let inputs = [];
        inputs[0] = this.y/height;
        inputs[1] = closest.top/height;
        inputs[2] = closest.bottom/height;
        inputs[3] = closest.x/width;
        inputs[4] = this.velocity / 10;
        // console.log(inputs[0])
        // console.log("top "+inputs[1])
        // console.log("bottom "+inputs[2])
        // console.log("pipeX "+inputs[3])

        let output = this.brain.predict(inputs);
        // if (output[0] > 0.5){
        if (output[0] > output[1] && this.velocity >=0){
        // if (output[0] > output[1]){
            this.up();
        }
    }

    offScreen(){
        return(this.y>height || this.y <0);
    }

    update(){
        this.score++;
        this.velocity += this.gravity;
        // this.velocity *= 0.9;
        this.y += this.velocity;

    }
}
