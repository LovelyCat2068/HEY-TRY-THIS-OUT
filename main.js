prediction_1 = "";
prediction_2 = "";

Webcam.set({
    height: 300,
    width: 300,
    image_format: 'jpeg',
    jpeg_quality: 91
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(Sc){
        document.getElementById("result").innerHTML = '<img id="img_hd" src="'+Sc+'"/>';
    });
}

console.log("ML5."+ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yb38UW-xV/model.json',ModelLoaded);

function ModelLoaded(){
    console.log("Model Loaded");
}


function speak(){
    var synth = window.SpeechSynthesis;
    first_line = "You can be" + prediction_1;
    second_line = "Or you can be" + prediction_2;
    all_lines = new SpeechSynthesisUtterance(first_line + second_line);
    synth.speak(all_lines);
}

function check(){
    image_holder = document.getElementById("img_hd");
    classifier.classify(image_holder, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("name-1").innerHTML = results[0].label;
        document.getElementById("name-2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
    //I have very bad internet issues, and so I think I won't be able to finish the code properly; I have piece of code left and I hope to complete it as soon as I can with your help.👍
    }
    
}