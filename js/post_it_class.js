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

    getId(){
        console.log("Ancien id : "+indexPostIt);
        console.log("Nouvel id : "+this.id);
        if((indexPostIt == -1) || (indexPostIt != this.id)){
            actualId = this.id;
        }else if(indexPostIt == this.id){
            actualId = -1;
        }
        document.getElementById("post_it_id").innerHTML = "Post-it id : "+actualId;
        indexPostIt = actualId;
        console.log("Id que l'on garde : "+actualId);
    }



    createOptions(myPostIt){
        optionsMenu = document.createElement("div");
        optionsMenu.id = "OptionPostIt_"+this.id;
        optionsMenu.classList.add("options_post_it");

        //boutonResize = document.createElement("div");

        myPostIt.appendChild(optionsMenu);
    }

    display(idDuPostIt){
        let myPostIt;
        let isNew;
        let containerText;
        if (document.getElementById("PostIt_"+idDuPostIt) == null){
            // The post it doesn't exist so we create it
            myPostIt = document.createElement("div");
            isNew = 1;
            containerText = document.createElement("div");
            containerText.classList.add("container_text");
            containerText.id = "ContainerText_"+this.id;
            containerText.innerHTML = this.text;

        }else{
            myPostIt = document.getElementById("PostIt_"+idDuPostIt);
            isNew = 0;
        }
        myPostIt.id = "PostIt_"+this.id;
        myPostIt.classList.add("post_it");
        myPostIt.style.zIndex = this.indexu;
        myPostIt.style.left = this.x+"px";
        myPostIt.style.top = this.y+"px";
        myPostIt.style.width = this.width+"px";
        myPostIt.style.height = this.height+"px";
        myPostIt.style.backgroundColor = this.backgroundColor;
        myPostIt.style.color = this.color;
        myPostIt.style.fontSize = this.fontSize+"px";
        myPostIt.style.transform = "rotate("+this.rotation+"deg)";
        myPostIt.style.position = "absolute";
        // Annonymous function doesn't knows about .this
        myPostIt.onclick = ()=>{ this.getId();} ;

        if(isNew){
            document.getElementById("zone_post_it").appendChild(myPostIt);
            document.getElementById("PostIt_"+this.id).appendChild(containerText);
            //this.createOptions(myPostIt);
        }else if(this.status == 0){
            myPostIt.style.display = "none";
        }
    }

    /**
     * function that moves the post it according to the cursor position
     * 
     * @param {number} idDuPostIt - id of the post it that we are moving
     * @param {number} newX - X value of the cursor
     * @param {number} newY - Y value of the cursor
     * @param {number} widthMenu - width of the left menu of the website
     * @param {number} heightBanner - height of the top banner of the website
     */
    move(idDuPostIt, newX, newY, widthMenu, heightBanner){
        this.x = newX-widthMenu-(this.width/2);
        this.y = newY-heightBanner-(this.height/2);
        if(this.x <= 0){
            this.x = 0;
        }else if(this.x+this.width+widthMenu > window.innerWidth){
            this.x = window.innerWidth-this.width-widthMenu;
        }
        if(this.y <= 0){
            this.y = 0;
        }else if(this.y+this.height+heightBanner > window.innerHeight){
            this.y = window.innerHeight-this.height-heightBanner;
        }
        this.display(idDuPostIt);
        // console.log("this x "+this.x+" // this y "+this.y);
    }

    resize(newWidth, newHeight){
        if(this.width > 100){
            this.width = newWidth+"px";
        }else{
            this.width = 100;
        }
        if(this.height > 100){
            this.height = newHeight+"px";
        }else{
            this.height = 100;
        }
        console.log("this width "+this.width+" // this height "+this.height);
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

    changeBackgroundColor(newColor){
        this.backgroundColor = newColor;
    }

    changeColor(newColor){
        this.color = newColor;
    }

    changeFontSize(newSize){
        this.fontSize = newSize;
    }

    changeText(newText){
        this.text = newText;
    }

}