/**
 * Created by scott on 2016/1/7.
 */
function Perceptron(learning_rate){
    this.learning_rate = learning_rate;     //learning rate should be the real number between 0 and 1
    this.dimension = 0;                     //dimension is the dimension of training data
    this.weight = new Array();              //the weight array is used to store the weight and activation threshold
    this.trainSet = new Array();            //data set used to train perceptron
    this.iteration_num = 0;                 //the iteration number
    this.data_num = 0;                      //the number of data used to train in one iteration
    this.error = 0;                         //the error number in one iteration
}

Perceptron.prototype.addData = function(item){
    if(this.dimension == 0){
        this.dimension = item.dimension;
        for(var i=0;i<=this.dimension;i++){     //initial value for weight and threshold between -0.5 and 0.5
            this.weight[i] = Math.random()-0.5;
        }
    }
    if(item.dimension == this.dimension){
        this.trainSet.push(item);
        return true;
    }else{
        return false;
    }
}

Perceptron.prototype.clearData = function () {
    this.trainSet= [];
    this.weight = [];
    this.dimension = 0;
    this.iteration_num = 0;
    this.data_num = 0;
    this.error = 0;
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
        console.log("Please add train set!");
        return false;
    }
    for(this.iteration_num = 0; this.iteration_num < 1000; this.iteration_num++){
        this.error = 0;          //the misclassfied number
        for(this.data_num = 0; this.data_num < this.trainSet.length; this.data_num++){
            if(this.cal(this.trainSet[this.data_num])<=0){
                this.error++;
                this.update(this.trainSet[this.data_num]);
            }
        }
        if(this.error == 0){
            console.log("w:",this.weight.slice(0,this.dimension)," b:",this.weight[this.dimension]);
            return true;
        }
    }
    alert("The data is non-linear separable");
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


