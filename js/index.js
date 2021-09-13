window.addEventListener("load", () =>{

let tablePostIt = [];

tablePostIt.push(new PostIt(0, 7, 100, 150, 300, 300, "#CCFFCC", "#0000FF", "Ceci est un test", 24, 5, 1));
tablePostIt.push(new PostIt(1, 2, 10, 300, 70, 70, "#FFCCCC", "#0000FF", "Ceci est encore un test", 12, -10, 1));
tablePostIt.push(new PostIt(2, 2, 800, 400, 50, 50, "#CCCCFF", "#000000", "Autre", 16, 0, 1));

function displayPostIt(){
    for(let p = 0; p < tablePostIt.length; p++){
        tablePostIt[p].display(p);  
    }
}
displayPostIt();

// Testing my classes

tablePostIt[0].move(300, 100);
tablePostIt[0].resize(50, 50);
tablePostIt[0].forward(0, tablePostIt);
tablePostIt[1].sendToTrash();


tablePostIt[0].changeBackgroundColor("#BBBBFF");
tablePostIt[0].changeColor("#662299");
tablePostIt[0].changeFontSize(36);
tablePostIt[0].changeText("Yo new text here");
displayPostIt();


})