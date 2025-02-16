document.addEventListener("DOMContentLoaded", function () {
    let cart = [];

    function updateCartDisplay() {
        let cartBody = document.getElementById("cart-body");
        let cartCount = document.getElementById("cart-count");
        let cartTotal = document.getElementById("cart-total");

        cartBody.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" class="cart-quantity" data-index="${index}">
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button></td>
            `;
            cartBody.appendChild(row);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
    }

    function addToCart(name, price) {
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartDisplay();
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let name = this.parentElement.querySelector(".card-title").innerText;
            let price = parseFloat(this.parentElement.querySelector("strong").innerText.replace("$", ""));
            addToCart(name, price);
        });
    });

    document.getElementById("cart-body").addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            let index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCartDisplay();
        }
    });

    document.getElementById("cart-body").addEventListener("input", function (event) {
        if (event.target.classList.contains("cart-quantity")) {
            let index = event.target.getAttribute("data-index");
            let newQuantity = parseInt(event.target.value);
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                updateCartDisplay();
            }
        }
    });

    // Checkout Button - Show Payment Modal
    document.getElementById("checkout-btn").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            let paymentModal = new bootstrap.Modal(document.getElementById("paymentModal"));
            paymentModal.show();
        }
    });

    // Payment Form Submission
    document.getElementById("payment-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let cardName = document.getElementById("card-name").value.trim();
        let cardNumber = document.getElementById("card-number").value.trim();
        let cardExpiry = document.getElementById("card-expiry").value.trim();
        let cardCvv = document.getElementById("card-cvv").value.trim();

        // Basic validation
        if (cardName === "" || cardNumber.length !== 16 || cardExpiry.length !== 5 || cardCvv.length !== 3) {
            alert("Please enter valid payment details.");
            return;
        }

        // Simulate payment process
        setTimeout(() => {
            alert("Payment Successful! Your order has been placed.");
            cart = [];
            updateCartDisplay();
            let successModal = new bootstrap.Modal(document.getElementById("successModal"));
            successModal.show();
        }, 2000); // Simulating 2 seconds payment processing delay
    });
});
