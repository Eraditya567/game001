// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total.toFixed(2);
}

// Add to cart function
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        const id = parseInt(productCard.dataset.id);
        const name = productCard.dataset.name;
        const price = parseFloat(productCard.dataset.price);
        
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
        alert(`${name} added to cart!`);
    }
});

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

// Checkout
document.getElementById('checkout').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Checkout successful! Thank you for shopping at Engineer Store 001.');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateCartDisplay();
});