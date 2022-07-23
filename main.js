var timer_counter=0;
var timer_check="";
var drawn_sketch="";
var answer_holder="";
score=0;

function preload(){
    classify = ml5.imageClassifier("DoodleNet")
}

function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    canvas = mouseReleased(classify.canvas)
    synth = window.speechSynthesis
    background("white")
}

function clear_canvas(){
    background("white")
}

function draw(){
    stroke-weight(12)
    stroke(0)
    if (mouseIsPressed){
        line(pMouseX, pMouseY, mouseX, mouseY)
    }

    check_sketch()

    if (draw_sketch == sketch){
        answer_holder = "set"
        score++;
        document.getElementById('score').innerHTML = 'score:'+score;
    }
}

function classifyCanvas(){
classify.classify(canvas, gotResult)
}

function gotResult(error, results){
if (error){
    console.error(error)
}
}
function updateCanvas(){
background("white");
random_number = math.floor((math.random()*quick_draw_data_set.link)+1);
console.log(quick_draw_data_set[random_number]);
sketch = quick_draw_data_set[random_number];
document.getElementById('sketch_name').innerHTML = 'Sketch to be Drawn:'+sketch;
}


function check_sketch(){
timer_counter++;
document.getElementById('time').innerHTML = 'Timer:'+ timer_counter;
console.log(timer_counter);

if(timer_counter > 400){
    timer_counter=0;
    timer_check="completed";
}

if(timer_check == "completed"|| answer_holder == "set"){
    timer_check="";
    answer_holder="";
    updateCanvas();
}
}

{
    console.log(results)
    document.getElementById("label").innerHTML = "label"+results[0].label
    document.getElementById("confidence").innerHTML = "confidence"+Math.round(results[0].confidence*100)+"%"
    utterThis = new SpeechSynthesisUtterance(results[0].label)
    synth.speak(utterThis)

}
