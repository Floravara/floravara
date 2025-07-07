document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeButton = document.querySelector('.close-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.querySelector('.checkout-button');

    let cart = JSON.parse(localStorage.getItem('flowerShopCart')) || [];

    const products = [
        { id: 1, name: 'Buket Mawar Merah Klasik', price: 150000, image: 'images/1.jpeg', description: 'Buket mawar merah klasik yang melambangkan cinta abadi.' },
        { id: 2, name: 'Buket Lily Putih Elegan', price: 115000, image: 'images/2.jpeg', description: 'Kesucian dan keanggunan lily putih dalam satu buket.' },
        { id: 3, name: 'Buket Bunga Campur Warna-warni', price: 100000, image: 'images/3.jpeg', description: 'Kombinasi bunga cerah untuk keceriaan setiap hari.' },
        { id: 4, name: 'Buket Tulip Belanda', price: 250000, image: 'images/4.jpeg', description: 'Keindahan tulip impor langsung dari Belanda.' },
        { id: 5, name: 'Buket Anggrek Phalaenopsis', price: 150000, image: 'images/5.jpeg', description: 'Keanggunan anggrek yang tahan lama dan menawan.' },
        { id: 6, name: 'Buket Bunga Matahari Ceria', price: 120000, image: 'images/6.jpeg', description: 'Bunga matahari yang cerah, cocok untuk semangat baru.' },
    ];

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                    <button class="button add-to-cart-button" data-id="${product.id}">Tambahkan ke Keranjang</button>
                </div>
            `;
            productList.appendChild(productCard);
        });

        document.querySelectorAll('.add-to-cart-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.id);
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
            alert(`${product.name} telah ditambahkan ke keranjang!`);
        }
    }

    function updateCart() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        localStorage.setItem('flowerShopCart', JSON.stringify(cart));
        renderCartItems();
        calculateCartTotal();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Rp ${item.price.toLocaleString('id-ID')}</p>
                    </div>
                    <div class="cart-item-actions">
                        <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="remove-item" data-id="${item.id}">Hapus</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });

            document.querySelectorAll('.cart-item-actions input[type="number"]').forEach(input => {
                input.addEventListener('change', (event) => {
                    const productId = parseInt(event.target.dataset.id);
                    const newQuantity = parseInt(event.target.value);
                    updateCartItemQuantity(productId, newQuantity);
                });
            });

            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = parseInt(event.target.dataset.id);
                    removeFromCart(productId);
                });
            });
        }
    }

    function updateCartItemQuantity(productId, newQuantity) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity = newQuantity;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1); // Remove if quantity is 0 or less
            }
            updateCart();
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    function calculateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toLocaleString('id-ID');
    }

    // Event Listeners
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
        renderCartItems();
        calculateCartTotal();
    });

    closeButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Keranjang Anda masih kosong. Silakan tambahkan produk terlebih dahulu.');
            return;
        }
        alert('https://wa.me/62814934055');
        // Di sini Anda bisa mengarahkan ke halaman pembayaran atau memproses pesanan
        cart = []; // Clear cart after checkout (for demonstration)
        updateCart();
        cartModal.style.display = 'none';
    });
    document.addEventListener('DOMContentLoaded', () => {
        const productList = document.getElementById('product-list');
        const cartIcon = document.getElementById('cart-icon');
        const cartCount = document.getElementById('cart-count');
        const cartModal = document.getElementById('cart-modal');
        const closeButton = document.querySelector('.close-button');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const checkoutButton = document.querySelector('.checkout-button');
    
        let cart = JSON.parse(localStorage.getItem('flowerShopCart')) || [];
    
        const products = [
            {
                id: 1,
                name: 'Buket Mawar Merah Klasik',
                price: 250000,
                image: 'images/buket1.jpg',
                description: 'Buket mawar merah klasik yang melambangkan cinta abadi.',
                subProducts: [
                    { id: '1-a', name: 'Ukuran Standar', price: 0 }, // Harga tambahan dari produk utama
                    { id: '1-b', name: 'Ukuran Besar (+Rp 75.000)', price: 75000 },
                    { id: '1-c', name: 'Dengan Cokelat (+Rp 50.000)', price: 50000 }
                ]
            },
            {
                id: 2,
                name: 'Buket Lily Putih Elegan',
                price: 300000,
                image: 'images/buket2.jpg',
                description: 'Kesucian dan keanggunan lily putih dalam satu buket.',
                subProducts: [
                    { id: '2-a', name: 'Tanpa Vas', price: 0 },
                    { id: '2-b', name: 'Dengan Vas Kristal (+Rp 100.000)', price: 100000 }
                ]
            },
            {
                id: 3,
                name: 'Buket Bunga Campur Warna-warni',
                price: 280000,
                image: 'images/buket3.jpg',
                description: 'Kombinasi bunga cerah untuk keceriaan setiap hari.',
                subProducts: [
                    { id: '3-a', name: 'Tanpa Kartu Ucapan', price: 0 },
                    { id: '3-b', name: 'Dengan Kartu Ucapan (+Rp 15.000)', price: 15000 }
                ]
            },
            { id: 4, name: 'Buket Tulip Belanda', price: 350000, image: 'images/buket4.jpg', description: 'Keindahan tulip impor langsung dari Belanda.' },
            { id: 5, name: 'Buket Anggrek Phalaenopsis', price: 400000, image: 'images/buket5.jpg', description: 'Keanggunan anggrek yang tahan lama dan menawan.' },
            { id: 6, name: 'Buket Bunga Matahari Ceria', price: 200000, image: 'images/buket6.jpg', description: 'Bunga matahari yang cerah, cocok untuk semangat baru.' },
        ];
    
        function renderProducts() {
            productList.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
    
                let subProductOptions = '';
                if (product.subProducts && product.subProducts.length > 0) {
                    subProductOptions = `<div class="sub-product-options">
                        <label for="sub-product-${product.id}">Pilih Variasi:</label>
                        <select id="sub-product-${product.id}" data-product-id="${product.id}">
                            ${product.subProducts.map(sub => `<option value="${sub.id}">${sub.name}</option>`).join('')}
                        </select>
                    </div>`;
                }
    
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                        ${subProductOptions}
                        <button class="button add-to-cart-button" data-id="${product.id}">Tambahkan ke Keranjang</button>
                    </div>
                `;
                productList.appendChild(productCard);
            });
    
            document.querySelectorAll('.add-to-cart-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = parseInt(event.target.dataset.id);
                    const selectElement = document.getElementById(`sub-product-${productId}`);
                    let selectedSubProductId = null;
                    if (selectElement) {
                        selectedSubProductId = selectElement.value;
                    }
                    addToCart(productId, selectedSubProductId);
                });
            });
        }
    
        function addToCart(productId, selectedSubProductId = null) {
            const product = products.find(p => p.id === productId);
            if (product) {
                let finalPrice = product.price;
                let subProductName = null;
                let itemIdentifier = productId; // Untuk identifikasi unik dalam keranjang
    
                if (selectedSubProductId && product.subProducts) {
                    const selectedSubProduct = product.subProducts.find(sub => sub.id === selectedSubProductId);
                    if (selectedSubProduct) {
                        finalPrice += selectedSubProduct.price;
                        subProductName = selectedSubProduct.name;
                        itemIdentifier = `${productId}-${selectedSubProductId}`; // Kombinasi ID produk dan sub-produk
                    }
                }
    
                const existingItem = cart.find(item => item.identifier === itemIdentifier);
    
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        id: productId, // ID produk utama
                        identifier: itemIdentifier, // ID unik untuk item di keranjang
                        name: product.name,
                        subProductName: subProductName, // Nama sub-produk terpilih
                        price: finalPrice, // Harga sudah termasuk sub-produk
                        basePrice: product.price, // Harga produk dasar
                        image: product.image,
                        quantity: 1
                    });
                }
                updateCart();
                alert(`${product.name}${subProductName ? ` (${subProductName})` : ''} telah ditambahkan ke keranjang!`);
            }
        }
    
        function updateCart() {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
            localStorage.setItem('flowerShopCart', JSON.stringify(cart));
            renderCartItems();
            calculateCartTotal();
        }
    
        function renderCartItems() {
            cartItemsContainer.innerHTML = '';
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
            } else {
                cart.forEach(item => {
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.classList.add('cart-item');
                    cartItemDiv.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name} ${item.subProductName ? `<br><small>(${item.subProductName})</small>` : ''}</h4>
                            <p>Rp ${item.price.toLocaleString('id-ID')}</p>
                        </div>
                        <div class="cart-item-actions">
                            <input type="number" value="${item.quantity}" min="1" data-identifier="${item.identifier}">
                            <button class="remove-item" data-identifier="${item.identifier}">Hapus</button>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItemDiv);
                });
    
                document.querySelectorAll('.cart-item-actions input[type="number"]').forEach(input => {
                    input.addEventListener('change', (event) => {
                        const itemIdentifier = event.target.dataset.identifier;
                        const newQuantity = parseInt(event.target.value);
                        updateCartItemQuantity(itemIdentifier, newQuantity);
                    });
                });
    
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const itemIdentifier = event.target.dataset.identifier;
                        removeFromCart(itemIdentifier);
                    });
                });
            }
        }
    
        function updateCartItemQuantity(itemIdentifier, newQuantity) {
            const itemIndex = cart.findIndex(item => item.identifier === itemIdentifier);
            if (itemIndex > -1) {
                cart[itemIndex].quantity = newQuantity;
                if (cart[itemIndex].quantity <= 0) {
                    cart.splice(itemIndex, 1);
                }
                updateCart();
            }
        }
    
        function removeFromCart(itemIdentifier) {
            cart = cart.filter(item => item.identifier !== itemIdentifier);
            updateCart();
        }
    
        function calculateCartTotal() {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = total.toLocaleString('id-ID');
        }
    
        // Event Listeners
        cartIcon.addEventListener('click', () => {
            cartModal.style.display = 'block';
            renderCartItems();
            calculateCartTotal();
        });
    
        closeButton.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    
        window.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    
        checkoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Keranjang Anda masih kosong. Silakan tambahkan produk terlebih dahulu.');
                return;
            }
            alert('https://wa.me/6282114934055');
            cart = [];
            updateCart();
            cartModal.style.display = 'none';
        });
    
        // Initial render
        renderProducts();
        updateCart();
    });

    // Initial render
    renderProducts();
    updateCart(); // To load cart items from localStorage on page load
});