class PostIt{
    id;
    indexu;
    x;
    y;
    width;
    height;
    backgroundColor;
    color;
    text;
    fontSize;
    rotation;
    status;

    constructor(id, indexu, x, y, width, height, backgroundColor, color, text, fontSize, rotation, status){
        this.id = id;
        this.indexu = indexu;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.color = color;
        this.text = text;
        this.fontSize = fontSize;
        this.rotation = rotation;
        this.status = status;
    }

    display(){
        let myPostIt = document.createElement("div");
        myPostIt.id = "PostIt_"+this.id;
        myPostIt.classList.add("post_it");
        myPostIt.style.zIndex = this.indexu;
        myPostIt.style.left = this.x+"px";
        myPostIt.style.top = this.y+"px";
        myPostIt.style.width = this.width+"px";
        myPostIt.style.height = this.height+"px";
        myPostIt.style.backgroundColor = this.backgroundColor;
        myPostIt.style.color = this.color;
        myPostIt.innerHTML = this.text;
        myPostIt.style.fontSize = this.fontSize+"px";
        myPostIt.style.transform = "rotate("+this.rotation+"deg)";
        myPostIt.style.position = "absolute";
        document.getElementById("zone_post_it").appendChild(myPostIt);
    }

    move(id, moveX, moveY){
        let myPostIt = document.getElementById("PostIt_"+id);
        myPostIt.style.left = (this.x+moveX)+"px";
        myPostIt.style.top = (this.y+moveY)+"px";
    }

    resize(id, resizeWidth, resizeHeight){
        let myPostIt = document.getElementById("PostIt_"+id);
        myPostIt.style.width = (this.width+resizeWidth)+"px";
        myPostIt.style.height = (this.height+resizeHeight)+"px";
    }

    // We check the entire tablePostIt to see the highest index and add 1 to it for our post-it
    forward(id, tablePostIt){
        let myPostIt = document.getElementById("PostIt_"+id);
        let maxIndex = 0;
        for(let p = 0; p < tablePostIt.length; p++){
            let singlePostIt = document.getElementById("PostIt_"+tablePostIt[p].id);
            if(singlePostIt.style.zIndex > maxIndex){
                maxIndex = singlePostIt.style.zIndex;
            }
        }
        myPostIt.style.zIndex = maxIndex++;
    }

    sendToTrash(){
        this.status = 0;
    }

    // rotate a faire ou pas ?

    // changeBackgroundColor(){
    //     this
    // }


}