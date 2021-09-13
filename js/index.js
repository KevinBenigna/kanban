window.addEventListener("load", () =>{

let tablePostIt = [];

tablePostIt.push(new PostIt(1, 7, 100, 150, 300, 300, "#CCFFCC", "#0000FF", "Ceci est un test", 24, 5, 1));
tablePostIt.push(new PostIt(2, 2, 10, 300, 70, 70, "#FFCCCC", "#0000FF", "Ceci est encore un test", 12, -10, 1));

function displayPostIt(){
    for(let p = 0; p < tablePostIt.length; p++){
        if(tablePostIt[p].status == 1){
            tablePostIt[p].display();
        }
    }
}
displayPostIt();

// Testing my classes

tablePostIt[0].move(1, 200, 100);
tablePostIt[0].resize(1, 50, 50);
tablePostIt[0].forward(1, tablePostIt);
console.log(tablePostIt[1].status);
tablePostIt[1].sendToTrash();
console.log(tablePostIt[1].status);


})