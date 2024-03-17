const products = [
    { id: "p1", name: "Корзинка малая", price: "399р", image: "images/gallery-image-1.jpg" },
    { id: "p2", name: "Полочка для специй", price: "1499р", image: "images/featured/1.jpg" },
    { id: "p3", name: "Корзина большая", price: "5499р", image: "images/featured/2.jpg" },
    { id: "p4", name: "Тарелочки", price: "299р", image: "images/featured/6.jpg" },
    { id: "p5", name: "Набор подставок под горячее", price: "999р", image: "images/featured/3.jpg" },
    { id: "p6", name: "Парящая полка", price: "3299р", image: "images/featured/4.jpg" },
    { id: "p7", name: "Набор бомбочек для ванн", price: "999р", image: "images/gallery-image-2.jpg" },
    { id: "p8", name: "Пара деревянных ложек", price: "299р", image: "images/gallery-image-3.jpg" },
    { id: "p9", name: "Бамбуковая полочка", price: "1799р", image: "images/gallery-image-4.jpg" },
    { id: "p10", name: "Ловец снов 30см", price: "2199р", image: "images/gallery-image-5.jpg" },
    { id: "p11", name: "Гобеленовый коврик", price: "13199р", image: "images/products/1.jpg" },
    { id: "p12", name: "Умный диффузор", price: "1899р", image: "images/products/2.jpg" }
];

function displayProducts() {
    const productContainer = document.querySelector('.products');
    products.forEach(product => {
        productContainer.innerHTML += `
            <div class="product" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h5>${product.name}</h5>
                <span class="price">${product.price}р</span>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
    });
}

let cart = [];


function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingCartItem = cart.find(item => item.id === productId);
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        alert(`${quantity} x ${product.name} добавлен в корзину.`);
        displayCart();
    }
}

// Function to display cart items
function displayCart() {
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = ''; // Clear the container before rendering

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Ваша корзина пуста.</p>';
        return;
    }

    let totalCost = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalCost += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" width="100">
                <div class="item-info">
                    <h5>${item.name}</h5>
                    <p>${item.price}р x ${item.quantity} = ${itemTotal}р</p>
                </div>
                <div class="quantity-control">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">Удалить</button>
            </div>
        `;
    });

    cartContainer.innerHTML += `
        <div class="cart-total">
            <h4>Итого:</h4>
            <p>${totalCost}р</p>
        </div>
    `;
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Function to increase quantity
function increaseQuantity(index) {
    const cartItem = cart[index];
    cartItem.quantity++;
    displayCart();
}

// Function to decrease quantity
function decreaseQuantity(index) {
    const cartItem = cart[index];
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
        displayCart();
    } else {
        removeFromCart(index);
    }
}

// Display products on the catalog page
if (window.location.pathname.endsWith('catalog.html')) {
    const productsContainer = document.querySelector('.products');
    document.addEventListener('DOMContentLoaded', () => displayProducts(productsContainer, products));
}

// Display featured products on the home page
if (window.location.pathname.endsWith('index.html')) {
    const featuredProductsContainer = document.querySelector('.featured-products .products');
    const featuredProducts = products.slice(0, 4); // Получить первые 4 товара из массива
    document.addEventListener('DOMContentLoaded', () => displayProducts(featuredProductsContainer, featuredProducts));
}

// Display cart items when on the cart page
if (window.location.pathname.endsWith('cart.html')) {
    document.addEventListener('DOMContentLoaded', displayCart);
}

// Add event listeners for "Add to Cart" buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.parentElement.getAttribute('data-id');
        addToCart(productId);
    }
});