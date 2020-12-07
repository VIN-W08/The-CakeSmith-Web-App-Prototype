if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);
    console.log("A");
}
else{
    ready();
    console.log("B");
}

function ready(){
    showItem();
    updateQty();
    calculateTotalPrice();
    removeItems();
}

function showItem(){
    if(localStorage.length!=0){
        var cartItems = JSON.parse(localStorage.getItem("cartList"));
    }

    if(cartItems!=undefined&&cartItems!=0){
        for(var i=0; i<cartItems.length; i++){
            var totalPriceRow = document.getElementById("total_price_row");

            var dataItemHtml = 
            `<tr class="item_row">
                <td class="remove_btn_cell"><img src="../assets/close icon.png" class="close_icon"></td>
                <td class="product_cart"><img src="${cartItems[i].image}" alt="Image" class="item_img_cart"><div class="name_product_cart">${cartItems[i].name}</div></td>
                <td class="quantity_cart"><button class=button_min>-</button><input type="number" name="qty" class="qty" value=1 onKeyDown="return false"><button class=button_pos>+</button></td>
                <td class="price_each_cart">${cartItems[i].price}</td>
                <td class="pricePerItem">${cartItems[i].price}</td>
            </tr>`

            totalPriceRow.insertAdjacentHTML("beforebegin",dataItemHtml);
        }
    }
    else if(cartItems==undefined||cartItems==0){
        document.getElementById("cart_title").innerHTML="";
        document.getElementById("cart_items").textContent = "No Item Added to Cart";
    }
}

function updateQty(){
    var cartItems = JSON.parse(localStorage.getItem("cartList"));

    if(cartItems!=undefined&&cartItems!=0){
        var lessButton = document.querySelectorAll(".button_min");
        var moreButton = document.querySelectorAll(".button_pos");

        for(var i=0; i<cartItems.length; i++){
            lessButton[i].addEventListener("click",function(){
                var qtyValue = event.target.nextSibling.value;
                event.target.nextSibling.value = qtyValue - 1;
                if(event.target.nextSibling.value < 1){
                    event.target.nextSibling.value = 1;
                }
                calculatePricePerItem();
                calculateTotalPrice();
            });

            moreButton[i].addEventListener("click",function(){
                var qtyValue = parseInt(event.target.previousSibling.value);
                event.target.previousSibling.value = qtyValue + 1;
                calculatePricePerItem();
                calculateTotalPrice();
            });
        }
    }
}

function calculatePricePerItem(){
    var cartItems = JSON.parse(localStorage.getItem("cartList"));
    if(cartItems!=undefined&&cartItems!=0){
        var pricePerItem = document.querySelectorAll(".pricePerItem");
        for(var i=0; i<cartItems.length; i++){
            var priceEach = parseInt(pricePerItem[i].previousElementSibling.textContent);
            var qtyValue =  parseInt(pricePerItem[i].previousElementSibling.previousElementSibling.childNodes[1].value);
            pricePerItem[i].textContent = (priceEach * qtyValue)+",00";
        }
    }
}

function calculateTotalPrice(){
    var cartItems = JSON.parse(localStorage.getItem("cartList"));
    if(cartItems!=undefined&&cartItems!=0){
        var pricePerItem = document.querySelectorAll(".pricePerItem");
        var totalPrice = 0;
        for(var i=0; i<cartItems.length; i++){
            totalPrice = totalPrice + parseInt(pricePerItem[i].textContent);
        }
        totalPriceElmnt = document.getElementById("total_price");
        totalPriceElmnt.textContent = totalPrice+",00";
    }
}

function removeItems(){
    var btnRemove = document.querySelectorAll(".close_icon");
    var cartItems = JSON.parse(localStorage.getItem("cartList"));

    for(var i=0; i<btnRemove.length; i++){
        btnRemove[i].addEventListener("click",function(){
            var itemRow = event.target.parentElement.parentElement;
            var itemName = event.target.parentElement.nextSibling.nextSibling.textContent;

            itemRow.remove();

            for(var j=0; j<cartItems.length; j++){
                if(cartItems[j].name==itemName){
                    cartItems.splice(j,1);
                }
            }
            localStorage.setItem("cartList",JSON.stringify(cartItems));

            calculateTotalPrice();

            if(cartItems == 0){
                document.getElementById("cart_title").innerHTML="";
                document.getElementById("cart_items").textContent = "No Item in the Cart";
            }
        });
    }
}


