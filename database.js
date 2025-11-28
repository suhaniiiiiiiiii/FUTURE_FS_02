// ===== SIMPLE DATABASE FOR SHOP MART =====

const DB_NAME = 'ShopMartDB';
const DB_VERSION = 1;
let db = null;

// Initialize Database
function initDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            console.log('✅ Database ready');
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            db = event.target.result;

            // Products table
            if (!db.objectStoreNames.contains('products')) {
                db.createObjectStore('products', { keyPath: 'id' });
            }

            // Orders table
            if (!db.objectStoreNames.contains('orders')) {
                db.createObjectStore('orders', { keyPath: 'orderId', autoIncrement: true });
            }

            // Cart table
            if (!db.objectStoreNames.contains('cart')) {
                db.createObjectStore('cart', { keyPath: 'id' });
            }
        };
    });
}

// Save products to database
async function saveProducts(products) {
    const tx = db.transaction('products', 'readwrite');
    const store = tx.objectStore('products');

    for (const product of products) {
        await store.put(product);
    }

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// Get all products
async function getProducts() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('products', 'readonly');
        const store = tx.objectStore('products');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Save cart
async function saveCart(cartItems) {
    const tx = db.transaction('cart', 'readwrite');
    const store = tx.objectStore('cart');

    // Clear existing cart
    await store.clear();

    // Add new items
    for (const item of cartItems) {
        await store.put(item);
    }

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// Get cart
async function getCart() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('cart', 'readonly');
        const store = tx.objectStore('cart');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Save order
async function saveOrder(orderData) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('orders', 'readwrite');
        const store = tx.objectStore('orders');
        const request = store.add({
            ...orderData,
            date: new Date().toISOString()
        });

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Get all orders
async function getOrders() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('orders', 'readonly');
        const store = tx.objectStore('orders');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Export simple API
window.Database = {
    init: initDatabase,
    saveProducts,
    getProducts,
    saveCart,
    getCart,
    saveOrder,
    getOrders
};
