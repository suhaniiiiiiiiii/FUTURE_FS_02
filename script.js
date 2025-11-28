// ===== PRODUCT DATA =====
const products = [
    // Electronics
    {
        id: 1,
        name: "Wireless Headphones Pro",
        category: "electronics",
        price: 16499,
        rating: 4.8,
        reviews: 1250,
        icon: "🎧",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Smart Watch Ultra",
        category: "electronics",
        price: 28999,
        rating: 4.9,
        reviews: 890,
        icon: "⌚",
        badge: "New"
    },
    {
        id: 3,
        name: "Laptop Pro 15\"",
        category: "electronics",
        price: 107999,
        rating: 4.7,
        reviews: 650,
        icon: "💻",
        badge: "Hot"
    },
    {
        id: 4,
        name: "Wireless Mouse",
        category: "electronics",
        price: 4149,
        rating: 4.6,
        reviews: 2100,
        icon: "🖱️"
    },
    {
        id: 5,
        name: "4K Camera",
        category: "electronics",
        price: 74699,
        rating: 4.9,
        reviews: 430,
        icon: "📷",
        badge: "Pro"
    },
    {
        id: 6,
        name: "Gaming Console",
        category: "electronics",
        price: 41499,
        rating: 4.8,
        reviews: 1800,
        icon: "🎮",
        badge: "Popular"
    },

    // Fashion
    {
        id: 7,
        name: "Designer Sunglasses",
        category: "fashion",
        price: 13249,
        rating: 4.7,
        reviews: 920,
        icon: "🕶️",
        badge: "Trending"
    },
    {
        id: 8,
        name: "Leather Jacket",
        category: "fashion",
        price: 20749,
        rating: 4.8,
        reviews: 560,
        icon: "🧥",
        badge: "New"
    },
    {
        id: 9,
        name: "Running Shoes",
        category: "fashion",
        price: 10799,
        rating: 4.6,
        reviews: 1450,
        icon: "👟"
    },
    {
        id: 10,
        name: "Luxury Watch",
        category: "fashion",
        price: 49799,
        rating: 4.9,
        reviews: 340,
        icon: "⌚",
        badge: "Premium"
    },
    {
        id: 11,
        name: "Designer Handbag",
        category: "fashion",
        price: 33199,
        rating: 4.7,
        reviews: 780,
        icon: "👜",
        badge: "Exclusive"
    },
    {
        id: 12,
        name: "Casual T-Shirt",
        category: "fashion",
        price: 2499,
        rating: 4.5,
        reviews: 2300,
        icon: "👕"
    },

    // Home & Living
    {
        id: 13,
        name: "Smart LED Lamp",
        category: "home",
        price: 6649,
        rating: 4.6,
        reviews: 1120,
        icon: "💡",
        badge: "Smart"
    },
    {
        id: 14,
        name: "Coffee Maker Pro",
        category: "home",
        price: 12449,
        rating: 4.8,
        reviews: 890,
        icon: "☕",
        badge: "Best Seller"
    },
    {
        id: 15,
        name: "Decorative Plant",
        category: "home",
        price: 3319,
        rating: 4.7,
        reviews: 670,
        icon: "🪴"
    },
    {
        id: 16,
        name: "Wall Clock Modern",
        category: "home",
        price: 4979,
        rating: 4.5,
        reviews: 540,
        icon: "🕐"
    },
    {
        id: 17,
        name: "Throw Pillow Set",
        category: "home",
        price: 4149,
        rating: 4.6,
        reviews: 920,
        icon: "🛋️"
    },
    {
        id: 18,
        name: "Aromatherapy Diffuser",
        category: "home",
        price: 3739,
        rating: 4.8,
        reviews: 1340,
        icon: "🕯️",
        badge: "Popular"
    },

    // Beauty
    {
        id: 19,
        name: "Skincare Set Premium",
        category: "beauty",
        price: 7469,
        rating: 4.9,
        reviews: 1560,
        icon: "💄",
        badge: "Best Seller"
    },
    {
        id: 20,
        name: "Hair Dryer Pro",
        category: "beauty",
        price: 9959,
        rating: 4.7,
        reviews: 780,
        icon: "💇",
        badge: "New"
    },
    {
        id: 21,
        name: "Makeup Brush Set",
        category: "beauty",
        price: 4564,
        rating: 4.8,
        reviews: 1230,
        icon: "🖌️"
    },
    {
        id: 22,
        name: "Perfume Luxury",
        category: "beauty",
        price: 10799,
        rating: 4.9,
        reviews: 890,
        icon: "🌸",
        badge: "Premium"
    },
    {
        id: 23,
        name: "Face Mask Set",
        category: "beauty",
        price: 2904,
        rating: 4.6,
        reviews: 2100,
        icon: "✨"
    },
    {
        id: 24,
        name: "Nail Polish Collection",
        category: "beauty",
        price: 3319,
        rating: 4.5,
        reviews: 670,
        icon: "💅"
    }
];


// ===== STATE MANAGEMENT =====
let cart = [];
let currentFilter = 'all';
let currentSort = 'featured';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    try {
        // Initialize database
        await Database.init();

        // Check if products exist in database
        const dbProducts = await Database.getProducts();
        if (dbProducts.length === 0) {
            // First time - save products to database
            await Database.saveProducts(products);
            console.log('✅ Products saved to database');
        } else {
            // Load products from database
            products.length = 0;
            products.push(...dbProducts);
            console.log('✅ Loaded products from database');
        }

        // Load cart from database
        const dbCart = await Database.getCart();
        if (dbCart.length > 0) {
            cart = dbCart;
            console.log('✅ Cart loaded from database');
        }

    } catch (error) {
        console.log('⚠️ Database not available, using memory only');
    }

    // Render and setup
    renderProducts();
    setupEventListeners();
    setupScrollEffects();
    updateCartBadge();
}


// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });

    // Sort select
    document.getElementById('sortSelect').addEventListener('change', handleSortChange);

    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);

    // Cart modal
    document.getElementById('cartBtn').addEventListener('click', openCartModal);
    document.getElementById('closeCartModal').addEventListener('click', closeCartModal);
    document.getElementById('cartModalOverlay').addEventListener('click', closeCartModal);

    // Checkout modal
    document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);
    document.getElementById('closeCheckoutModal').addEventListener('click', closeCheckoutModal);
    document.getElementById('checkoutModalOverlay').addEventListener('click', closeCheckoutModal);

    // Checkout form
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);

    // Newsletter form
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletter);

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Profile modal
    document.getElementById('profileBtn').addEventListener('click', openProfileModal);
    document.getElementById('closeProfileModal').addEventListener('click', closeProfileModal);
    document.getElementById('profileModalOverlay').addEventListener('click', closeProfileModal);

    // Auth tabs
    document.getElementById('loginTab').addEventListener('click', () => switchAuthTab('login'));
    document.getElementById('signupTab').addEventListener('click', () => switchAuthTab('signup'));
    document.getElementById('switchToSignup').addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthTab('signup');
    });
    document.getElementById('switchToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthTab('login');
    });

    // Auth forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Success modal
    document.getElementById('closeSuccessModal').addEventListener('click', closeSuccessModal);
    document.getElementById('successModalOverlay').addEventListener('click', closeSuccessModal);

    // Mobile menu
    document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.category-card, .product-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== NAVIGATION =====
function handleNavClick(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.target.classList.add('active');

    const target = e.target.getAttribute('href');
    if (target.startsWith('#')) {
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ===== USER PROFILE =====
let currentUser = null;

function openProfileModal() {
    document.getElementById('profileModal').classList.add('active');

    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    } else {
        showAuthView();
    }
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.remove('active');
}

function switchAuthTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (tab === 'login') {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }
}

function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Simple demo login (in real app, verify with backend)
    currentUser = {
        name: email.split('@')[0],
        email: email
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    showNotification('Login successful! Welcome back! 👋');
    showDashboard();
    form.reset();
}

function handleSignup(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    // Simple demo signup (in real app, send to backend)
    currentUser = {
        name: name,
        email: email
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    showNotification('Account created successfully! Welcome to Shop Mart! 🎉');
    showDashboard();
    form.reset();
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully! Come back soon! 👋');
    showAuthView();
}

function showAuthView() {
    document.getElementById('authView').classList.remove('hidden');
    document.getElementById('dashboardView').classList.add('hidden');
}

async function showDashboard() {
    document.getElementById('authView').classList.add('hidden');
    document.getElementById('dashboardView').classList.remove('hidden');

    // Update user info
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userEmail').textContent = currentUser.email;

    // Load user orders
    try {
        const orders = await Database.getOrders();
        const userOrdersDiv = document.getElementById('userOrders');

        if (orders.length === 0) {
            userOrdersDiv.innerHTML = '<p class="empty-message">No orders yet. Start shopping!</p>';
        } else {
            userOrdersDiv.innerHTML = orders.slice(0, 5).map(order => `
                <div class="order-item">
                    <div class="order-header">
                        <span class="order-id">Order #${order.orderId}</span>
                        <span class="order-status">Confirmed</span>
                    </div>
                    <div class="order-details">
                        ${order.items.length} items • ₹${order.total.toLocaleString('en-IN')}
                        <br>
                        ${new Date(order.date).toLocaleDateString('en-IN')}
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.log('Could not load orders');
    }
}

// ===== CONTACT FORM =====
function handleContactForm(e) {
    e.preventDefault();

    const form = e.target;
    const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };

    // Log the contact form data (in a real app, send to backend)
    console.log('Contact Form Submission:', formData);

    // Show success notification
    showNotification('Message sent successfully! We\'ll get back to you soon. 📧');

    // Reset form
    form.reset();
}

// ===== NOTIFICATIONS =====
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ===== PRODUCTS =====
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    let filteredProducts = filterProducts();
    filteredProducts = sortProducts(filteredProducts);

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                ${product.icon}
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Re-observe new elements
    setupScrollEffects();
}

function filterProducts() {
    if (currentFilter === 'all') {
        return products;
    }
    return products.filter(p => p.category === currentFilter);
}

function sortProducts(productList) {
    const sorted = [...productList];

    switch (currentSort) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
}

function handleFilterClick(e) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');

    currentFilter = e.target.dataset.filter;
    renderProducts();
}

function handleCategoryClick(e) {
    const category = e.currentTarget.dataset.category;
    currentFilter = category;

    // Update filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });

    // Scroll to products
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });

    // Render filtered products
    renderProducts();
}

function handleSortChange(e) {
    currentSort = e.target.value;
    renderProducts();
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const category = card.querySelector('.product-category').textContent.toLowerCase();

        if (title.includes(query) || category.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== CART MANAGEMENT =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartBadge();
    saveCartToStorage();
    showNotification('Added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartBadge();
    saveCartToStorage();
    renderCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartBadge();
            saveCartToStorage();
            renderCart();
        }
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function saveCartToStorage() {
    // Save to database
    Database.saveCart(cart).catch(() => {
        console.log('Cart saved to memory only');
    });
}

// Load cart from database
async function loadCartFromDatabase() {
    try {
        const dbCart = await Database.loadCart();
        if (dbCart && dbCart.length > 0) {
            cart = dbCart.map(item => ({
                id: item.id,
                name: item.name,
                category: item.category,
                price: item.price,
                rating: item.rating,
                reviews: item.reviews,
                icon: item.icon,
                badge: item.badge,
                quantity: item.quantity
            }));
            console.log('Cart loaded from database');
        }
    } catch (error) {
        console.error('Error loading cart from database:', error);
    }
}


// ===== CART MODAL =====
function openCartModal() {
    document.getElementById('cartModal').classList.add('active');
    renderCart();
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('active');
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = calculateTotal();
    cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
}

// ===== CHECKOUT MODAL =====
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    closeCartModal();
    document.getElementById('checkoutModal').classList.add('active');

    const subtotal = calculateTotal();
    const shipping = 99;
    const total = subtotal + shipping;

    document.getElementById('checkoutSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('checkoutTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

async function handleCheckout(e) {
    e.preventDefault();

    // Get customer info from form
    const form = e.target;
    const customerInfo = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
        city: form.city.value,
        zipCode: form.zipCode.value
    };

    const subtotal = calculateTotal();
    const shipping = 99;
    const total = subtotal + shipping;

    try {
        // Save order to database
        const orderId = await Database.saveOrder({
            customer: customerInfo,
            items: cart,
            subtotal,
            shipping,
            total
        });

        console.log('✅ Order saved! ID:', orderId);

        // Clear cart
        cart = [];
        updateCartBadge();
        saveCartToStorage();

        // Show success
        closeCheckoutModal();
        setTimeout(() => openSuccessModal(), 500);

    } catch (error) {
        console.log('⚠️ Order saved to memory only');
        // Still show success even if database fails
        cart = [];
        updateCartBadge();
        closeCheckoutModal();
        setTimeout(() => openSuccessModal(), 500);
    }
}



// ===== SUCCESS MODAL =====
function openSuccessModal() {
    document.getElementById('successModal').classList.add('active');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
}

// ===== NEWSLETTER =====
function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    showNotification('Thank you for subscribing!');
    e.target.reset();
}

// ===== NOTIFICATIONS =====
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
