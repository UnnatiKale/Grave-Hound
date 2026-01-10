let cart = JSON.parse(localStorage.getItem('gravehoundCart')) || [];

function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return; 

    cartContainer.innerHTML = ''; 
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">₹${item.price}</span>
            </div>
            <button class="remove-item" data-index="${index}">&times;</button>
        `;
        cartContainer.appendChild(div);
    });

    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = total;

    const removeBtns = cartContainer.querySelectorAll('.remove-item');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            cart.splice(idx, 1);
            localStorage.setItem('gravehoundCart', JSON.stringify(cart));
            updateCartDisplay();
        });
    });
}

function addToCart(item) {
    cart.push(item);
    localStorage.setItem('gravehoundCart', JSON.stringify(cart));
    updateCartDisplay();
}

const addToCartBtns = document.querySelectorAll('.add-to-cart');
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const item = {
            name: btn.dataset.name,
            price: parseInt(btn.dataset.price),
            image: btn.dataset.image
        };
        addToCart(item);
    });
});

window.addEventListener('DOMContentLoaded', updateCartDisplay);
