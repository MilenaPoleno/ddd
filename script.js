const products = [
    { id: "p1", name: "Корзинка малая", price: "399", image: "images/gallery-image-1.jpg" },
    { id: "p2", name: "Полочка для специй", price: "1499", image: "images/featured/1.jpg" },
    { id: "p3", name: "Корзина большая", price: "5499", image: "images/featured/2.jpg" },
    { id: "p4", name: "Тарелочки", price: "299", image: "images/featured/6.jpg" },
    { id: "p5", name: "Набор подставок под горячее", price: "999", image: "images/featured/3.jpg" },
    { id: "p6", name: "Парящая полка", price: "3299", image: "images/featured/4.jpg" },
    { id: "p7", name: "Набор бомбочек для ванн", price: "999", image: "images/gallery-image-2.jpg" },
    { id: "p8", name: "Пара деревянных ложек", price: "299", image: "images/gallery-image-3.jpg" },
    { id: "p9", name: "Бамбуковая полочка", price: "1799", image: "images/gallery-image-4.jpg" },
    { id: "p10", name: "Ловец снов 30см", price: "2199", image: "images/gallery-image-5.jpg" },
    { id: "p11", name: "Гобеленовый коврик", price: "13199", image: "images/products/1.jpg" },
    { id: "p13", name: "Полотенце", price: "399", image: "images/products/3.jpg" },
    { id: "p12", name: "Умный диффузор", price: "1899", image: "images/products/2.jpg" }
];

let cartItems = [];

function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    const product = products.find(item => item.id === productId);
    const cartItemIndex = cartItems.findIndex(item => item.id === productId);

    if (cartItemIndex === -1) {
        cartItems.push({ ...product, quantity: 1 });
    } else {
        cartItems[cartItemIndex].quantity++;
    }

    updateCart();
    saveCartToLocalStorage(); // Сохраняем корзину в localStorage
}

function updateCart() {
    const cartCount = document.querySelectorAll('.cart-count');
    const cartList = document.querySelector('.cart-list');
    const totalPrice = document.querySelector('.total-price');

    cartCount.forEach(count => {
        count.textContent = getTotalQuantity();
    });

    cartList.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h5>${item.name}</h5>
                <p>Цена: ${item.price}р</p>
                <p>Количество: ${item.quantity}</p>
            </div>
            <div class="quantity-control">
                <button class="decrease-quantity" data-id="${item.id}"> - </button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase-quantity" data-id="${item.id}"> + </button>
            </div>
            <button class="remove-item" data-id="${item.id}"> Удалить </button>
        `;
        cartList.appendChild(cartItem);
        total += parseInt(item.price) * item.quantity;
    });

    totalPrice.textContent = total + ' р';

    addCartEventListeners(); // Назначаем обработчики событий для кнопок в корзине

}

function removeFromCart(event) {
    const productId = event.target.getAttribute('data-id');
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCart();
    saveCartToLocalStorage();
}

function displayProducts() {
    const productContainer = document.querySelector('.products');
    productContainer.innerHTML = '';

    products.forEach(product => {
        productContainer.innerHTML += `
            <div class="product" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h5>${product.name}</h5>
                <span class="price">${product.price}р</span>
                <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
            </div>
        `;
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function getTotalQuantity() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
}

displayProducts();

function handleQuantityChange(event) {
    const productId = event.target.getAttribute('data-id');
    const cartItemIndex = cartItems.findIndex(item => item.id === productId);

    if (cartItemIndex !== -1) {
        const cartItem = cartItems[cartItemIndex];

        if (event.target.classList.contains('increase-quantity')) {
            cartItem.quantity++;
        } else if (event.target.classList.contains('decrease-quantity')) {
            cartItem.quantity--;
            if (cartItem.quantity < 1) {
                cartItems = cartItems.filter(item => item.id !== productId);
            }
        }

        updateCart();
        saveCartToLocalStorage(); // Сохраняем изменения в localStorage
    }
}

function removeItem(event) {
    const productId = event.target.getAttribute('data-id');
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCart();
    saveCartToLocalStorage(); // Сохраняем изменения в localStorage
}

function addCartEventListeners() {
    const quantityButtons = document.querySelectorAll('.quantity-control button');
    quantityButtons.forEach(button => {
        button.addEventListener('click', handleQuantityChange);
    });

    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = savedCartItems;
    updateCart();
}

window.addEventListener('load', loadCartFromLocalStorage); // Загружаем корзину из localStorage при загрузке любой страницы
window.addEventListener('beforeunload', saveCartToLocalStorage); // Сохраняем корзину в localStorage перед закрытием страницы