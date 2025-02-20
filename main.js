let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart ");
let closeCart = document.querySelector("#close-cart ");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    read();
}

function ready() {
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    let addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
    alert("Your Order is placed");
    let cartBoxContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChilnodes()) {
        cartContent.removeCild(cartContent.firstChild);
    }
    updatetotal();
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let CartItems = document.getElementsByClassName("cart-content")[0];
    let CartItemsNames = CartItems.getElementsByClassName("cart-product-title");

    Array.from(CartItemsNames).map((CartItemName) => {
        if (CartItemName == title) {
            alert("You have already add this item to cart ");
            return null;
        }
    });
    let cartBoxContent = ` 
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                        <div class="cart-product-title">${title} </div>
                        <div class="cart-price">${price}</div>
                         <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    CartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
}

function updatetotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    Array.from(cartBoxes).map((cartBox) => {
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + price * quantity;
    });
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}