const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
const cartContent = document.querySelector(".cart-content");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-to-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".card");
        addToCart(productBox);
    });
});
// const cartContent=document.querySelector(".cart-content");
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItem = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItem) {
        if (item.textContent === productTitle) {
            alert("This item already exist in cart");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
                <img src = "${productImgSrc}" alt = "product image" srcset = "" class="cart-img" >
                <div class="cart-detail">
                    <h2 class="cart-product-title">${productTitle}</h2>
                    <span class="cart-price">${productPrice}</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="fa fa-trash-o cart-remove"></i>
                
            `;
    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", evevt => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }else if (event.target.id === "increment" && quantity > 1) {
            alert("out of stock")
        }
        numberElement.textContent = quantity;

        updateTotalPrice();
    });
    updateTotalPrice();
};
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBox = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBox.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("$", "");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `$${total}`;
};
