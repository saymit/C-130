song= "";
song1= "";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
scoreleftWrist= 0;
scorerightWrist= 0;
 
function preLoad(){
song= loadSound("music.mp3");
song1= loadSound("music2.mp3")
}


function setup(){
    canvas= createCanvas(600,500);
    canvas.center();


    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);

   poseNet.on("pose", gotPoses);
}

function draw(){
    image( video , 0, 0, 600,500);
    status_song= song.isPlaying();
    status_song1= song1.isPlaying();

    fill("red");
    stroke("red");

    if( scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY , 20);
        song1.stop();

        if( status_song == "false"){
            song.play();
            document.getElementById("song_name").innerHTML= "Peter Pan";
        }

    }
    if( scorerightWrist > 0.2){
        circle(rightWristX,rightWristY , 20);
        song.stop();

        if( status_song1 == "false"){
            song1.play();
            document.getElementById("song_name").innerHTML= "Harry poter theme ";
        }

    }



    }

   
function modelLoaded(){
    console.log(" Model is Loaded");
}

function gotPoses(results){
    if( results.length > 0 ){
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log(  "Rightwrist  x = " + rightWristX + " y = " + rightWristY);

        scoreleftWrist=  results[0].pose.keypoints[9].score;
        console.log(" leftwrist Score =" + scoreleftWrist);

        scorerightWrist= results[0].pose.keypoints[10].score;
        console.log("rightWrist Score = " + scorerightWrist);

    }
}
        
