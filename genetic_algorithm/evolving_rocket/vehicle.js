var mr = 0.01;
class Vehicle {
    constructor(x,y,dna){
        //Physic properties
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, -2);
        this.position = createVector(x, y);
        this.r = 4;
        this.maxspeed = 3;
        this.maxforce = 0.2;
        this.health = 1;
        this.size = 1;

        this.dna = [];
        
        if(dna === undefined){
            //Food weight
            this.dna[0] = random(-2,2);

            //Poison weight
            this.dna[1] = random(-2,2);

            //Food perception
            this.dna[2] = random(0,100);

            //Poison perception
            this.dna[3] = random(10,100);

        }else {

            //Mutation
            this.dna[0] = dna[0];
            if(random(1)<mr){
                this.dna[0]+=random(-0.1,0.1);
            }

            this.dna[1] = dna[1];
            if(random(1)<mr){
                this.dna[1]+=random(-0.1,0.1);
            }
            this.dna[2] = dna[2];
            if(random(1)<mr){
                this.dna[2]+=random(-10,10);
            }
            this.dna[3] = dna[3];
            if(random(1)<mr){
                this.dna[3]+=random(-10,10);
            }
        }
    }

    update(){
    // Displacement is a vector which points from the initial position of an object to its final position
    // Velocity is a vector which shows the direction and rate of motion
    // Acceleration is a vector which shows the direction and magnitude of changes in velocity
        this.position.add(this.velocity);

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.acceleration.mult(0);
        this.health -=0.005;
        this.size +=0.006;
    }

    applyForce(force){
        this.acceleration.add(force);
    }

    behaviors(good, bad){
        var steerG = this.eat(food,0.35, this.dna[2]);
        var steerB = this.eat(poison,-0.4, this.dna[3]);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        this.applyForce(steerG);
        this.applyForce(steerB);
    }

    clone(){
        if(random(1) <= this.health){
            if (random(1)<0.01){
                return new Vehicle(this.position.x, this.position.y, this.dna);
            } else {
                return null;
            }
        }
    }

    eat(list, nutrition, perception){
        var record = Infinity;
        var closest = null;
        for ( var i=list.length-1; i>=0; i--){
            var d = this.position.dist(list[i]);

            if(d < this.maxspeed){
                list.splice(i,1);
                this.health += nutrition;
            }else {
                if(d < record && d < perception){
                    record = d;
                    closest = list[i];
                }
            }
        }
        ////This is the moment of eating!
        //if(record < 5){
        //    list.splice(closest,1);
        //    this.health +=nutrition;
        //}else if (closest >-1){
        //    return this.seek(list[closest]);
        //}
        if (closest != null){
           return this.seek(closest);
        }
        return createVector(0,0);
    }

    seek(target){  
        //disired velocity towards target
        var desired = p5.Vector.sub(target, this.position);
        // console.log(desired);
        desired.setMag(this.maxspeed);

        //desired steering force
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);

        // this.applyForce(steer); //applying steering force to accelation
        // this.acceleration.add(steer);
        return steer;
    }

    dead(){
        return(this.health < 0)
    }

    display(){
        var angle = this.velocity.heading() + PI / 2;
        fill(127);
        stroke(200);
        strokeWeight(1);
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);

        if(debug.checked()){
            strokeWeight(3);
            stroke(0,255,0);
            noFill();
            line(0,0,0,-this.dna[0]*20);

            strokeWeight(2);
            ellipse(0,0,this.dna[2]*2);

            stroke(255,0,0);
            line(0,0,0,-this.dna[1]*20);
            ellipse(0,0,this.dna[3]*2);
        }

        var gr = color(0,255,0);
        var rd = color(255,0,0);
        var col = lerpColor(rd, gr, this.health);

        fill(col);
        stroke(col);
        strokeWeight(this.size);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
        endShape(CLOSE);
        
        pop();
    }

    boundaries() {
        var d = 25;
        let desired = null;

        if (this.position.x < d) {
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.position.x > width - d) {
            desired = createVector(-this.maxspeed, this.velocity.y);
        }

        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxspeed);
        } else if (this.position.y > height - d) {
            desired = createVector(this.velocity.x, -this.maxspeed);
        }

        if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxspeed);
            let steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }
}
