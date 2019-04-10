function newChar() {
    var text = "";
    var possible = " 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,;:'\"?{}[]\\/|!@#$%^&*()_+-=~`";
    text = possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// function newChar() {
//   let c = floor(random(63, 122));
//   if (c === 63) c = 32;
//   if (c === 64) c = 46;

//   return String.fromCharCode(c);
// }

class Dna{
    constructor(num){
        this.genes = [];
        this.fitness = 0;

        for (let i=0; i<num; i++){
            this.genes[i]=newChar();
        }
        
    }
    getPhrase(){
        return this.genes.join("");
    }

    calcFitness(target){
        let score = 0;
        for (let i=0; i<this.genes.length; i++){
            if(this.genes[i] == target.charAt(i)){
                score++;
            }
        }
        this.fitness= score / target.length;
        // console.log("this.fitness = "+this.fitness);
    }

    crossover(partner){
        let child = new Dna(this.genes.length);
        let midpoint = floor(random(this.genes.length));

        for(let i=0; i<this.genes.length; i++){
            if(i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];

        }
        return child;
    }

    mutate(mutationRate){
        for(let i=0; i<this.genes.length; i++){
            if (random(1) < mutationRate){
                this.genes[i] = newChar();
            }
        }
        
    }

}
