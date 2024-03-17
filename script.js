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

let cartItems = []; // Массив для хранения выбранных товаров

// Функция для обновления отображения корзины
function updateCart() {
    const cartCount = document.querySelector('.cart-count');
    const cartList = document.querySelector('.cart-list');

    // Обновляем счетчик товаров в корзине
    cartCount.textContent = cartItems.length;

    // Очищаем список товаров в корзине
    cartList.innerHTML = '';

    // Добавляем выбранные товары в список корзины
    cartItems.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = item.name;
        cartList.appendChild(cartItem);
    });
}

// Функция для добавления товара в корзину
function addToCartCatalog(event) {
    const productId = event.target.getAttribute('data-id');

    // Находим товар по идентификатору
    const product = products.find(item => item.id === productId);

    // Добавляем товар в массив корзины
    cartItems.push(product);

    // Обновляем отображение корзины
    updateCart();
}

// Функция для отображения товаров
function displayProducts() {
    const productContainer = document.querySelector('.products');
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

    // Добавляем обработчик события для кнопок "Добавить в корзину"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCartCatalog);
    });
}

// Вызываем функцию для отображения товаров
displayProducts();