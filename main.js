function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    objectdetector = ml5.objectDetector('cocssd', modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}

check = "";
img = "";
objects = [];

function preload(){
    img = loadImage("images.jpeg");
}

function draw(){
    image(img, 0, 0, 600, 500);
    //fill("#FF0000");
    //text("Dog", 50, 90);
    //noFill();
    //stroke("#FF0000");
    //rect(30, 50, 450, 437);

    //fill("#AA0000");
    //text("Cat", 500, 90);
    //noFill();
    //stroke("#AA0000");
    //rect(280, 80, 270, 390);

    if(check == true){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected!"
            fill("#AA0000");
            percent = Math.floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#AA0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded");
    check = true;
    objectdetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}