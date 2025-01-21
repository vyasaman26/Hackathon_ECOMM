var cartIcon = document.querySelector("#cart-icon");
var cart = document.querySelector(".cart");
var cartClose = document.querySelector("#cart-close");
var cartContent = document.querySelector(".cart-content");
cartIcon.addEventListener("click", function () { return cart.classList.add("active"); });
cartClose.addEventListener("click", function () { return cart.classList.remove("active"); });
var addCartButtons = document.querySelectorAll(".add-to-cart");
addCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        var productBox = event.target.closest(".card");
        if (productBox) {
            addToCart(productBox);
        }
    });
});
var addToCart = function (productBox) {
    var productImgSrc = productBox.querySelector("img").src;
    var productTitle = productBox.querySelector(".product-title").textContent || "";
    var productPrice = productBox.querySelector(".price").textContent || "";
    var cartItems = cartContent.querySelectorAll(".cart-product-title");
    // @ts-ignore
    for (var _i = 0, cartItems_1 = cartItems; _i < cartItems_1.length; _i++) {
        var item = cartItems_1[_i];
        if (item.textContent === productTitle) {
            alert("This item already exists in the cart.");
            return;
        }
    }
    var cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = "\n        <img src=\"".concat(productImgSrc, "\" alt=\"product image\" class=\"cart-img\">\n        <div class=\"cart-detail\">\n            <h2 class=\"cart-product-title\">").concat(productTitle, "</h2>\n            <span class=\"cart-price\">").concat(productPrice, "</span>\n            <div class=\"cart-quantity\">\n                <button id=\"decrement\">-</button>\n                <span class=\"number\">1</span>\n                <button id=\"increment\">+</button>\n            </div>\n        </div>\n        <i class=\"fa fa-trash-o cart-remove\"></i>\n    ");
    cartContent.appendChild(cartBox);
    var removeButton = cartBox.querySelector(".cart-remove");
    removeButton.addEventListener("click", function () {
        cartBox.remove();
        updateTotalPrice();
    });
    var quantityContainer = cartBox.querySelector(".cart-quantity");
    quantityContainer.addEventListener("click", function (event) {
        var target = event.target;
        var numberElement = cartBox.querySelector(".number");
        var decrementButton = cartBox.querySelector("#decrement");
        var quantity = parseInt(numberElement.textContent || "1");
        if (target.id === "increment" && quantity >= 5) {
            alert("Out of stock");
        }
        else if (target.id === "decrement" && quantity > 1) {
            quantity--;
            decrementButton.style.color = quantity === 1 ? "#999" : "#333";
        }
        else if (target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }
        numberElement.textContent = quantity.toString();
        updateTotalPrice();
    });
    updateTotalPrice();
};
var updateTotalPrice = function () {
    var totalPriceElement = document.querySelector(".total-price");
    var cartBoxes = cartContent.querySelectorAll(".cart-box");
    var total = 0;
    cartBoxes.forEach(function (cartBox) {
        var _a;
        var priceElement = cartBox.querySelector(".cart-price");
        var quantityElement = cartBox.querySelector(".number");
        var price = parseFloat(((_a = priceElement.textContent) === null || _a === void 0 ? void 0 : _a.replace("$", "")) || "0");
        var quantity = parseInt(quantityElement.textContent || "0");
        total += price * quantity;
    });
    totalPriceElement.textContent = "$".concat(total.toFixed(2));
};
