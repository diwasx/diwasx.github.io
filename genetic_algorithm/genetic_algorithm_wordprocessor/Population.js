class Population{
    constructor(t, mr, ps){
        this.population;
        this.matingPool;
        this.generations=0;
        this.finished=false;
        this.target=t;
        this.mutationRate=mr;
        this.perfectScore=1;
        this.maxFitness=0;

        this.best="";
        this.population=[];
        this.populationSize=ps;
        // console.log(this.target);
        // console.log(this.target.length);
        // console.log(this.populationSize);
        // console.log(this.mutationRate);
        for(let i=0; i<this.populationSize; i++){
            this.population[i] = new Dna(this.target.length);
            //population[12] = dna [10] 
            
        }
        this.matingPool = [];
        this.calcFitness();
    }
    calcFitness(){
        for(let i=0; i<this.populationSize; i++){
            this.population[i].calcFitness(target);
        }
    }

    //Selection of fitnessness function is very important
    naturalSelection(){
        this.matingPool = [];
        // maxFitness = 0;
        for(let i=0; i<this.populationSize; i++){
            if(this.population[i].fitness > this.maxFitness){
                this.maxFitness = this.population[i].fitness;
            }
        }
        // console.log("Max fitness = "+this.maxFitness);
        for(let i=0; i<this.populationSize; i++){
            //Based on wheel of fortune
            let fitness = map(this.population[i].fitness, 0, this.maxFitness, 0, 1); //Normalizing between 0 to 1
            let n = floor(fitness * 100); //This multiplier defines population with hightest fitness has mulipilier amount in matingPool(Eg; 100 space is allocated for hightest fitness)
            // console.log(this.population[i].gene_joint+"=>"+this.population[i].fitness);
            // console.log("Fitness = "+fitness);
            // console.log("n = "+n);
            for(let j=0; j<n; j++){
                this.matingPool.push(this.population[i]);
            }

        }
        // console.log("MatingPool = "+this.matingPool);
        // console.log("MatingPoolLength = "+this.matingPool.length);
    }

    generate(){
        for(let i=0; i<this.populationSize; i++){
            let a = floor(random(this.matingPool.length));
            let b = floor(random(this.matingPool.length));
            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];
            // console.log("Partner A = "+partnerA);
            // console.log("Partner B = "+partnerB);
            let child = partnerA.crossover(partnerB);
            // console.log("child = "+child);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        this.generations++;
    }

    evaluate(){
        let worldrecord = 0.0;
        let index = 0;
        for (let i = 0; i < this.populationSize; i++){

            // console.log(this.population[i].fitness)
            if (this.population[i].fitness > worldrecord){
                index = i;
                worldrecord = this.population[i].fitness;
            }
        }
        this.best=this.population[index].getPhrase();
        // console.log(this.best);
        if( worldrecord === this.perfectScore){
            this.finished = true;
        }
        // console.log("WR = "+worldrecord);
        // console.log(this.perfectScore);
        // console.log(this.finished);
    }

    isFinished(){
        return this.finished;
    }

    getGenerations(){
        return this.generations;
    }

    getBest() {
    return this.best;
    }

    getAverageFitness(){
        let total = 0;
        for(let i=0; i<this.populationSize; i++){
            total+= this.population[i].fitness;
        }
        return total / (this.populationSize);
    }

    getMaxFitness(){
        return this.maxFitness;
    }

    limitedPhrases(){
        let everything="";
        let displayLimit = min(this.populationSize, 50);
        for (let i = 0; i<displayLimit; i++){
            everything += this.population[i].getPhrase() + "<br>";
        }
        return everything;
    }

    allPhrases(){
        let everything="";
        let displayLimit = this.populationSize;
        for (let i = 0; i<displayLimit; i++){
            everything += this.population[i].getPhrase() + "<br>";
        }
        return everything;
    }

}
