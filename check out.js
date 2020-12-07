if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);
    console.log("A");
}
else{
    ready();
    console.log("B");
}

function ready(){
    requireCboxText();
}

function requireCboxText(){
    cboxes = document.querySelectorAll(".cbox_social_media");
    textIn = document.querySelectorAll(".text_input");
    
    for(var i=0; i<cboxes.length; i++){
        cboxes[i].addEventListener("change",function(){ 
            if(event.target.nextSibling.nextSibling.tagName!="INPUT"){
                textInput = event.target.nextSibling.nextSibling.nextSibling.nextSibling;
            }
            else{
                textInput = event.target.nextSibling.nextSibling;
            }
            
            if(textInput.hasAttribute("required")==false){
                textInput.setAttribute("required","required");
                textInput.removeAttribute("disabled","disabled");
            }
            else if(textInput.hasAttribute("required")==true){
                textInput.removeAttribute("required");
                textInput.setAttribute("disabled","disabled");
            }
        })
    }
}
