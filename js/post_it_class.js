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
        console.log("Actual id"+actualId)
        console.log("Ancien id index : "+indexPostIt);
        console.log("Nouvel id this.id : "+this.id);
        
        if((actualId == -1) || (actualId != this.id)){
            actualId = this.id;
        }else if(actualId == this.id){
            if(actualId == -1){
                // This test is for the very first time we clic on a post-it so we don't have to clic twice to select it
                actualId = this.id;
            }else{
                actualId = -1;
            }
        }
        document.getElementById("post_it_id").innerHTML = "Post-it id : "+actualId;
        //indexPostIt = actualId;
        console.log("Id que l'on garde : "+actualId);
        return actualId;
    }

    myActionValue(leAction){
        if(action == "move" || action == "resize"){
            actualId = this.getId();
        }else{
            actualId = this.id;
        }
        
        console.log("YO "+actualId);
        action = leAction;
        console.log("MYACTIONVALUE action is : "+leAction+" // actualId "+actualId);
        document.getElementById("post_it_id").innerHTML = "Post-it id : "+actualId;
        if(actualId != -1){
            switch(action){
                case "move":
                    this.move(actualId, mouseX, mouseY, widthMenu, heightBanner);
                    break;
                
                case "resize":
                    this.resize();
                    break;
    
                case "sendToTrash":
                    this.sendToTrash();
                    break;
                    
                case "none":
                    break;
            }
        }else{
            // If the actualId is -1 it means we're not doing anything
            action = "none";
        }
    }

    createContainerText(){
        let containerText = document.createElement("div");
        containerText.classList.add("container_text");
        containerText.id = "ContainerText_"+this.id;
        containerText.innerHTML = this.text;
        containerText.style.height = this.height - postItOptions.height - (postItContainer.top*3)+"px";
        containerText.style.width = this.width - (postItContainer.left *2)+"px";
        containerText.style.top = postItContainer.top+"px";
        containerText.style.left = postItContainer.left+"px";
        document.getElementById("PostIt_"+this.id).appendChild(containerText);
    }

    createOptionsMenu(){
        let optionsMenu = document.createElement("div");
        optionsMenu.classList.add("options_menu");
        optionsMenu.id = "OptionPostIt_"+this.id;
        optionsMenu.style.height = postItOptions.height+"px";
        optionsMenu.style.width = this.width - (postItOptions.left * 2)+"px";
        optionsMenu.style.bottom = postItOptions.bottom+"px";
        optionsMenu.style.left = postItOptions.left+"px";
        document.getElementById("PostIt_"+this.id).appendChild(optionsMenu);
    }

    createTheOptions(){
        for(let options of optionsList){
            let mydiv = document.createElement("div");
            mydiv.classList.add("option");
            mydiv.id = "Option_"+options.nom;
            mydiv.height = postItOptions.height+"px";
            mydiv.style.marginLeft = postItOptions.marginLeft+"px";
            mydiv.style.width = postItOptions.width+"px";
            mydiv.style.border = postItOptions.borderSize+"px solid var(--var-gray1)";
            mydiv.innerHTML = options.logo;
            mydiv.onclick = ()=>{ this.myActionValue(options.nom);} ;
            document.getElementById("OptionPostIt_"+this.id).appendChild(mydiv);
        }
    }

    display(idDuPostIt){
        let myPostIt;
        let isNew;
        if(tablePostIt[idDuPostIt] == null){
            console.log("yeah it works");
        }
        if (document.getElementById("PostIt_"+idDuPostIt) == null){
            // The post it doesn't exist so we create it
            myPostIt = document.createElement("div");
            isNew = 1;
            console.log("IS NEW ?!");
            console.log("ID POST IT : "+idDuPostIt)
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
        // Anonymous function doesn't knows about .this
        //myPostIt.onclick = ()=>{ this.getId();} ;
        myPostIt.onclick = ()=>{ this.myActionValue("none");} ;
        event.stopPropagation();

        if(isNew){
            document.getElementById("zone_post_it").appendChild(myPostIt);
            this.createContainerText();
            this.createOptionsMenu();
            this.createTheOptions();
        }else if(this.status == 0){
            // document.getElementById("zone_post_it").removeChild(myPostIt);
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
        this.x = newX-widthMenu-(this.width-(postItOptions.left+postItOptions.marginLeft+postItOptions.width+(postItOptions.width/2)+(postItOptions.borderSize*3)));
        this.y = newY-heightBanner-(this.height-((postItOptions.bottom)+(postItOptions.height/2)+postItOptions.borderSize));
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
        // console.log("MOVE actualId "+actualId);
        this.display(idDuPostIt);
        // console.log("DISPLAY actualId "+actualId);
    }

    resize(){
        action = "resize";
        // this.width = 0;


        // if(this.width > 100){
        //     this.width = newWidth+"px";
        // }else{
        //     this.width = 100;
        // }
        // if(this.height > 100){
        //     this.height = newHeight+"px";
        // }else{
        //     this.height = 100;
        // }

        // if(this.id !== actualId){
        //     // We save the click position
        //     mouseXsave = mouseX;
        //     mouseYsave = mouseY;
        // }else if(this.id === actualId){
        //     // 2nd time we clic, we compare both
        //     let newWidth = mouseX - mouseXsave;
        //     let newHeight = mouseY - mouseYsave;

        //     if(this.width > 100){
        //         this.width = newWidth+"px";
        //     }else{
        //         this.width = 100;
        //     }
        //     if(this.height > 100){
        //         this.height = newHeight+"px";
        //     }else{
        //         this.height = 100;
        //     }
        // }

        console.log("this width "+this.width+" // this height "+this.height);
    }

    // We check the entire tablePostIt to see the highest index and add 1 to it for our post-it
    forward(id, tablePostIt){
        action = "forward";
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
        action = "none";
        console.log("send to trash action"+action);

        delete tablePostIt[this.id];

        this.display(this.id);
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