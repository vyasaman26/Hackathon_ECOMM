const cartIcon = document.querySelector("#cart-icon") as HTMLElement;
const cart = document.querySelector(".cart") as HTMLElement;
const cartClose = document.querySelector("#cart-close") as HTMLElement;
const cartContent = document.querySelector(".cart-content") as HTMLElement;


cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));


const addCartButtons = document.querySelectorAll(".add-to-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = (event.target as HTMLElement).closest(".card") as HTMLElement;
        if (productBox) {
            addToCart(productBox);
        }
    });
});

const addToCart = (productBox: HTMLElement): void => {
    const productImgSrc = (productBox.querySelector("img") as HTMLImageElement).src;
    const productTitle = (productBox.querySelector(".product-title") as HTMLElement).textContent || "";
    const productPrice = (productBox.querySelector(".price") as HTMLElement).textContent || "";

    const cartItems = cartContent.querySelectorAll(".cart-product-title");

    // @ts-ignore
    for (const item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This item already exists in the cart.");
            return;
        }
    }


    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" alt="product image" class="cart-img">
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

    const removeButton = cartBox.querySelector(".cart-remove") as HTMLElement;
    removeButton.addEventListener("click", () => {
        cartBox.remove();
        updateTotalPrice();
    });


    const quantityContainer = cartBox.querySelector(".cart-quantity") as HTMLElement;
    quantityContainer.addEventListener("click", event => {
        const target = event.target as HTMLElement;
        const numberElement = cartBox.querySelector(".number") as HTMLElement;
        const decrementButton = cartBox.querySelector("#decrement") as HTMLButtonElement;
        let quantity = parseInt(numberElement.textContent || "1");

        if (target.id === "increment" && quantity >= 5) {
            alert("Out of stock");
        } else if (target.id === "decrement" && quantity > 1) {
            quantity--;
            decrementButton.style.color = quantity === 1 ? "#999" : "#333";
        } else if (target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity.toString();

        updateTotalPrice();
    });

    updateTotalPrice();
};


const updateTotalPrice = (): void => {
    const totalPriceElement = document.querySelector(".total-price") as HTMLElement;
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;


    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price") as HTMLElement;
        const quantityElement = cartBox.querySelector(".number") as HTMLElement;
        const price = parseFloat(priceElement.textContent?.replace("$", "") || "0");
        const quantity = parseInt(quantityElement.textContent || "0");
        total += price * quantity;
    });


    totalPriceElement.textContent = `$${total.toFixed(2)}`;
};
