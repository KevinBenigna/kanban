let indexPostIt = -1;
let actualId = -1;
let action = "move";
let mouseX = 0;
let mouseY = 0;


/**
 * regarder comment faire ça pour les variables 
 */
let postItContainer = {
    top : 5,
    left : 5
}
/**
 * height - of the options div
 * top - margin of top (and bot)
 * left - margin of left (and right)
 */
let postItOptions = {
    height : 40,
    top : 5,
    left : 5
};


window.addEventListener("load", () =>{

let tablePostIt = [];
let widthMenu = document.getElementById("menu").offsetWidth;
let heightBanner = document.getElementById("banner").offsetHeight;

function handlerMouseMove(e){
    document.getElementById("mouse_x").innerHTML = "Mouse X : "+e.clientX;
    document.getElementById("mouse_y").innerHTML = "Mouse Y : "+e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    if(actualId != -1){
        switch(action){
            case "move":
                tablePostIt[actualId].move(actualId, mouseX, mouseY, widthMenu, heightBanner);
                break;
            
            case "resize":
                break;

            case "none":
                break;
        }
    }
}

document.addEventListener("mousemove", handlerMouseMove, false);
// document.addEventListener("keypress", handlerKey, false);

document.getElementById("create_button").onclick = function (){ createPostIt(); };


function createPostIt(){
    // Default values for any post-it
    indexPostIt++;
    let id = tablePostIt.length;
    let width = 250;
    let height = 250;
    let indexu = indexPostIt;
    let x = Math.floor(Math.random() * (window.innerWidth - width - widthMenu));
    let y = Math.floor(Math.random() * (window.innerHeight - height - heightBanner));
    let backgroundColor = "#FFFF00";
    let color = "#0000FF";
    let text = "Ceci est un test";
    let fontSize = 24;
    let rotation = 0;
    let status = 1;
    tablePostIt.push(new PostIt(id, indexu, x, y, width, height, backgroundColor, color, text, fontSize, rotation, status));
    displayPostIt();
}

// tablePostIt.push(new PostIt(0, 7, 100, 150, 300, 300, "#CCFFCC", "#0000FF", "Ceci est un test", 24, 5, 1));
// tablePostIt.push(new PostIt(1, 2, 10, 300, 70, 70, "#FFCCCC", "#0000FF", "Ceci est encore un test", 12, -10, 1));
// tablePostIt.push(new PostIt(2, 2, 800, 400, 50, 50, "#CCCCFF", "#000000", "Autre", 16, 0, 1));

function displayPostIt(){
    for(let p = 0; p < tablePostIt.length; p++){
        tablePostIt[p].display(p);  
    }
}








// Testing my classes

// tablePostIt[0].move(300, 100);
// tablePostIt[0].resize(50, 50);
// tablePostIt[0].forward(0, tablePostIt);
// tablePostIt[1].sendToTrash();


// tablePostIt[0].changeBackgroundColor("#BBBBFF");
// tablePostIt[0].changeColor("#662299");
// tablePostIt[0].changeFontSize(36);
// tablePostIt[0].changeText("Yo new text here");
// displayPostIt();

})