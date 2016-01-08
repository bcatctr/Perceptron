/**
 * Created by scott on 2016/1/8.
 */
function Location(x,y){
    this.x = x;
    this.y = y;
}

function DrawPerceptron(perceptron,context,item){
    if(perceptron.dimension==0){
        alert("请添加训练集！");
        return;
    }
    var width = context.canvas.width;
    var height = context.canvas.height;
    var radius1 = width/50;         //input layer and x layer
    var radius2 = 40;               //combine layer
    var radius3 = 30;               //output layer
    var w_interval = (width - 2*perceptron.dimension*radius1)/(perceptron.dimension+1);
    var h_interval = (height - 2*radius1*2 - 2*radius2 - 2*radius3 - 2*5)/3;
    var input_layer = [];       //the input x values
    var x_layer = [];           //the x symbols
    var combine_layer = [];     //the activation layer
    var output_layer = [];       //the output layer
    //set input layer and x layer
    for(var i = 0;i<perceptron.dimension;i++){
        input_layer.push(new Location(w_interval+radius1+i*(w_interval+2*radius1),5+radius1));
        x_layer.push(new Location(w_interval+radius1+i*(w_interval+2*radius1),5+3*radius1+h_interval));
    }
    //set combine layer
    combine_layer.push(new Location(width/2,5+4*radius1+2*h_interval+radius2));
    combine_layer.push(new Location(width/2+radius2+radius3+w_interval,5+4*radius1+2*h_interval+radius2));
    //circle for b
    context.beginPath();
    context.arc(combine_layer[1].x,combine_layer[1].y,radius3,0,2*Math.PI);
    context.fillStyle="#AC58FA";
    context.fill();
    //draw line
    context.beginPath();
    context.moveTo(combine_layer[0].x+radius2,combine_layer[0].y);
    context.lineTo(combine_layer[1].x-radius3,combine_layer[1].y);
    context.lineWidth=3;
    context.strokeStyle="#585858";
    context.stroke();
    for(var i=0;i<perceptron.dimension;i++){
        //line between input layer and x layer
        context.beginPath();
        context.moveTo(input_layer[i].x,input_layer[i].y+radius1);
        context.lineTo(x_layer[i].x,x_layer[i].y-radius1);
        context.lineWidth=2;
        context.stroke();
        //line between x layer and combine layer
        context.beginPath();
        context.moveTo(x_layer[i].x,x_layer[i].y+radius1);
        context.lineTo(combine_layer[0].x,combine_layer[0].y);
        context.lineWidth=3;
        context.stroke();
        //circle in input layer
        context.beginPath();
        context.arc(input_layer[i].x,input_layer[i].y,radius1,0,2*Math.PI);
        context.fillStyle="#F7819F";
        context.fill();
        //circle in x layer
        context.beginPath();
        context.arc(x_layer[i].x,x_layer[i].y,radius1,0,2*Math.PI);
        context.fillStyle="#AC58FA";
        context.fill();
    }
    context.beginPath();
    context.arc(combine_layer[0].x,combine_layer[0].y,radius2,0,2*Math.PI);
    context.fillStyle="#58FA58";
    context.fill();
    //circle for output layer
    output_layer.push(new Location(width/2,5+4*radius1+3*h_interval+radius2*2+radius3))
    context.beginPath();
    context.arc(output_layer[0].x,output_layer[0].y,radius3,0,2*Math.PI);
    context.fillStyle="#1C1C1C";
    context.fill();
    //draw line
    context.beginPath();
    context.moveTo(combine_layer[0].x,combine_layer[0].y+radius2);
    context.lineTo(output_layer[0].x,output_layer[0].y-radius3);
    context.lineWidth=5;
    context.stroke();
    //draw text in input layer and output layer
    if(item == null){
        for(var i=0;i<perceptron.dimension;i++){
            context.font="20px Verdana";
            var size = 20;
            var text = "?";
            context.fillText(text,input_layer[i].x-size*text.length/4,input_layer[i].y+size/3);
        }
        //draw predict class
        context.font="20px Verdana";
        context.fillStyle = "#FFFFFF";
        var size = 20;
        var text = "?";
        context.fillText(text,output_layer[0].x-size*text.length/4,output_layer[0].y+size/3);
        context.fillStyle = "#000000";
    }else{
        for(var i=0;i<perceptron.dimension;i++){
            context.font="20px Verdana";
            var size = 20;
            var text = ""+item.data[i];
            context.fillText(text,input_layer[i].x-size*text.length/4,input_layer[i].y+size/3);
        }
        //draw actual class
        context.font="20px Verdana";
        var size = 20;
        var text = "Actual class is "+item.result;
        context.fillText(text,output_layer[0].x+size*text.length/8,output_layer[0].y+size/3);
        //draw predict class
        context.font="20px Verdana";
        context.fillStyle = "#FFFFFF";
        var size = 20;
        if(perceptron.cal(item)<=0)
            var text = ""+(-item.result);
        else
            var text = ""+item.result;
        context.fillText(text,output_layer[0].x-size*text.length/4,output_layer[0].y+size/3);
        context.fillStyle = "#000000";
    }
    //draw text in x layer
    for(var i=0;i<perceptron.dimension;i++){
        context.font="20px Verdana";
        var size = 20;
        var text = "x"+i;
        context.fillText("x",x_layer[i].x-size*text.length/4,x_layer[i].y+size/3);
        context.font="10px Verdana";
        var size = 10;
        var text = ""+i;
        context.fillText(text,x_layer[i].x+size*text.length/4,x_layer[i].y+size/1.5);
    }
    //draw combine layer
    var image = new Image();
    image.src = "summation.png";
    image.onload = function(){
        //以Canvas画布上的坐标(10,10)为起始点，绘制图像
        context.drawImage(image, combine_layer[0].x-radius2*0.6, combine_layer[0].y-radius2*0.75,48,60);
    };
    context.font="20px Verdana";
    var size = 20;
    var text = "b="+(new Number(perceptron.weight[perceptron.dimension])).toFixed(1);
    context.fillText(text,combine_layer[1].x-size*text.length/5,combine_layer[1].y+size/3);

}

function addTrain(){
    var text = add_set.value;
    var train_set = text.split(";");
    for(i in train_set){
        var a = train_set[i].split(" ");
        var data = [];
        for(j in a){
            var value = parseInt(a[j]);
            if(value!=NaN)
                data.push(value);
        }
        console.log(a);
        console.log(data);
    }
}
var add_set = document.getElementById("trainSet");

set = [[3, 3, 3, 1], [4, 3, 2, 1], [1, 1, -1, -1]];
myPerceptron = new Perceptron(0.6);
for(i in set){
    var item = new Item(set[i]);
    if(item.check())
        myPerceptron.addData(item);
}
myPerceptron.train();

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

DrawPerceptron(myPerceptron,ctx,myPerceptron.trainSet[0]);
