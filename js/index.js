let indexPostIt = -1;
let actualId = -1;
let action = "none";
let mouseX = 0;
let mouseY = 0;
let mouseXsave = 0;
let mouseYsave = 0;
let widthMenu = 0;
let heightBanner = 0;
let tablePostIt = [];
let optionsList = [
    {
        nom : "sendToTrash",
        logo : '<i class="far fa-trash-alt"></i>'
    },
    {
        nom : "forward",
        logo : '<i class="fas fa-share-square"></i>'
    },
    {
        nom : "move",
        logo : '<i class="fas fa-arrows-alt"></i>'
    },
    {
        nom : "resize",
        logo : '<i class="fas fa-expand-arrows-alt"></i>'
    }
];


/**
 * Margins for top and left of the text container
 */
let postItContainer = {
    top : 5,
    left : 5
}
/**
 * @namespace
 * @property {number} height - of the options div
 * @property {number} top - margin of top (and bot)
 * @property {number} left - margin of left (and right)
 * 
 */
let postItOptions = {
    height : 30,
    bottom : 5,
    left : 5, 
    marginLeft : 10,
    width : 30,
    borderSize : 1
};
// bug doit cliquer 2 fois pour ne plus avoir le post-it sticky


window.addEventListener("load", () =>{

widthMenu = document.getElementById("menu").offsetWidth;
heightBanner = document.getElementById("banner").offsetHeight;

function handlerMouseMove(e){
    document.getElementById("mouse_x").innerHTML = "Mouse X : "+e.clientX;
    document.getElementById("mouse_y").innerHTML = "Mouse Y : "+e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    // console.log("actualId: "+actualId+" / mouseX: "+mouseX+" / mouseY: "+mouseY+" / widthMenu: "+widthMenu+" / heightBanner: "+heightBanner);
    if(actualId != -1){
        switch(action){
            case "move":
                tablePostIt[actualId].move(actualId, mouseX, mouseY, widthMenu, heightBanner);
                break;
            
            case "resize":
                tablePostIt[actualId].resize();
                break;

            case "none":
                break;
        }
    }else{
        // If the actualId is -1 it means we're not doing anything
        action = "none";
    }
    // console.log("ACTION IS : "+action);
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
        if(tablePostIt[p] != null){
            tablePostIt[p].display(p);
        }
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