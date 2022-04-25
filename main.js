video = "";
object = [];
function preload(){
    video = createCapture('video.mp4');
    video.hide();
}

function setup(){
   canvas= createCanvas(480,380);
   canvas.center();
}

function draw(){
    image(video,0,0,480,380);
     if(status != ""){
         objectDetector.detect(video,gotResult);
         for(i = 0; i < object.length;i++){
             document.getElementById("status").innerHTML = "Status = object detected ol";
             document.getElementById("number_of_objects").innerHTML = "Number of objects detected are ="+object.length;
             fill("#FF0000");
             percent =floor(object[i].confidence*100);
             text(object[i].label+ " "+percent+"%",object[i].x+15,object[i].y+15);
             noFill();
             stroke("#FF0000");
             rect(object[i].x,object[i].y,object[i].width,object[i].height);
         }
     }
     
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}

function modelLoaded(){
    console.log("Model is loaded!");
    status = true;
    video.play();
    video.speed(1);
    video.volume(0);
    
    
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
     console.log(results);
     object = results;
    
}