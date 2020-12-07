if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);
    console.log("A");
}
else{
    ready();
    console.log("B");
}

function ready(){
    var btnAddToCart = document.getElementsByClassName("btn_addItem");
    for(i=0; i<btnAddToCart.length; i++){
        var button = btnAddToCart[i];
        button.addEventListener("click",addItemToCart);
    }
}

var maintainItem;
if(localStorage.getItem("cartList")!=null){
    maintainItem = JSON.parse(localStorage.getItem("cartList"));
    localStorage.setItem("maintainItem",JSON.stringify(maintainItem));
}

var cartList = [];
if(maintainItem!=undefined){
    for(i=0; i<maintainItem.length; i++){
        cartList.push(maintainItem[i]);
    }
}

function addItemToCart(event){
    console.log("clicked");
    var button = event.target;
    var item = button.parentElement.parentElement;
    var itemImg = item.querySelector(".img_menu").src;
    var itemName = item.querySelector(".name_product").textContent;
    var itemPrice = item.querySelector(".price_product").textContent;

    var exist = 0;
    for(i=0; i<cartList.length; i++){
        if(itemName == cartList[i].name){
            exist = 1;
        }
    }
    if(exist==0){
        cartList.push({name: itemName, price: itemPrice, image: itemImg});
    }

    localStorage.setItem("cartList",JSON.stringify(cartList));
}


