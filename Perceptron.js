/**
 * Created by scott on 2016/1/7.
 */
function Perceptron(learning_rate){
    this.learning_rate = learning_rate;     //learning rate should be the real number between 0 and 1
    this.dimension = 0;                     //dimension is the dimension of training data
    this.weight = new Array();              //the weight array is used to store the weight and activation threshold
    this.trainSet = new Array();
}

Perceptron.prototype.addData = function(item){
    if(this.dimension == 0){
        this.dimension = item.dimension;
        for(var i=0;i<=this.dimension;i++){     //initial value for weight and threshold between -0.5 and 0.5
            this.weight[i] = Math.random()-0.5;
        }
    }
    this.trainSet.push(item);
}

Perceptron.prototype.clearData = function () {
    this.trainSet= [];
    this.weight = [];
    this.dimension = 0;
}

Perceptron.prototype.update = function(item){
    if(item.dimension!=this.dimension)
        return;
    //traning rule: w(p+1) = w(p) + learning_rate*xj*classj(p is the iteration number, j is the jth data in train_set)
    for(var i = 0;i<=this.dimension;i++){
        // the ith dimension in w
        this.weight[i] = this.weight[i] + this.learning_rate*item.data[i]*item.result;
    }
}

Perceptron.prototype.cal = function(item){
    var res = 0;
    if(item.dimension!=this.dimension){
        console.log("data dimension mismatch");
        return;
    }
    for(var i = 0;i<=this.dimension;i++){
        res+=item.data[i]*this.weight[i];
    }
    res*=item.result;   //test whether the calculated result is the same sign as actual result
    return res;
}

Perceptron.prototype.train = function () {
    if(this.trainSet.length == 0){
        console.log("No available traning data");
        return false;
    }
    for(var i = 0;i<1000;i++){
        var error = 0;          //the misclassfied number
        for(item in this.trainSet){
            if(this.cal(this.trainSet[item])<=0){
                error++;
                this.update(this.trainSet[item]);
            }
        }
        if(error == 0){
            console.log("w:",this.weight.slice(0,this.dimension)," b:",this.weight[this.dimension]);
            return true;
        }
    }
    console.log("the data is non-linear separable");
    return false;
}

//the input data
function Item(data){
    this.result = data.pop();
    this.data = data;
    this.dimension = data.length;
    this.data.push(1);
}

Item.prototype.check = function(){
    if(this.result==1||this.result==-1)
        return true;
    else
        return false;
}

set = [[3, 3, 1], [4, 3, 1], [1, 1, -1]];
myPerceptron = new Perceptron(0.6);
for(i in set){
    var item = new Item(set[i]);
    if(item.check())
        myPerceptron.addData(item);
}
myPerceptron.train();


var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
