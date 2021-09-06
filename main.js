var SpeechRecognition  = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start()
}

recognition.onresult = function(event) {
    console.log(event);
    var Content = event.results[0][0].transcript;
    console.log(Content);
    if(Content == "take my selfie") {
        console.log("taking my selfie----");
        speak();
    }
    document.getElementById("textbox").innerHTML = Content;  
}

function speak() {
    synthesis = window.speechSynthesis;
    speak_data = "taking your selfie in 5 seconds"
    utter_this = new SpeechSynthesisUtterance(speak_data);
    synthesis.speak(utter_this);
    Webcam.attach(camera);
    setTimeout(function(){
        take_snapshot();
        save();
    },5000);
    
}

Webcam.set({
    width:360,
    height:250,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'"/>';
    }); 
}

function save() {
    link = document.getElementById("link").innerHTML;
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}