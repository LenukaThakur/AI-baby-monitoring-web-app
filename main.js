Status = ""
object = []
function setup() {
    canvas = createCanvas(400, 400)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    coco = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Object Detected"
}

function modelLoaded() {
    console.log('coco is initialised')
    Status = true
}

function draw() {
    image(video, 0, 0, 400, 400)
    noFill()
    stroke('black')
    if (Status != "") {
        coco.detect(video, gotResults)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Object Detected"
            

            rect(object[i].x, object[i].y, object[i].width, object[i].height)
            confidence = Math.floor(object[i].confidence * 100)
            text(object[i].label + " " + confidence + "%", object[i].x + 10, object[i].y + 20)
            if(object[i].label=="person"){
                document.getElementById("Object").innerHTML="Baby Found"
                alarm.stop()
            }
            else{
                document.getElementById("Object").innerHTML="Baby Not Found"
                alarm.play()
            }
        }
        if(object.length < 0){
            document.getElementById("Object").innerHTML="Baby Not Found"
                alarm.play()
        }
    }
    
}

function preload() {
    alarm = loadSound("animal_bgm.mp3")
}


function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        object = results
    }
}

