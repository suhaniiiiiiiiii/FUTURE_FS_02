# Shop Mart Database

## Simple Database System

Your e-commerce site now has a **database** that saves everything automatically!

### What Gets Saved?

✅ **Products** - All your products  
✅ **Cart** - Shopping cart (even after closing browser)  
✅ **Orders** - All customer orders  

### How It Works

The database uses **IndexedDB** (built into your browser). Everything is saved automatically:

1. **First time you open the site** → Products are saved to database
2. **Add items to cart** → Cart is saved automatically
3. **Complete checkout** → Order is saved to database
4. **Close and reopen browser** → Everything is still there!

### Files

- `database.js` - Simple database with 6 functions
- `admin.html` - View all orders and products

### Database Functions

```javascript
// Initialize (happens automatically)
await Database.init();

// Save products
await Database.saveProducts(products);

// Get products
const products = await Database.getProducts();

// Save cart
await Database.saveCart(cartItems);

// Get cart
const cart = await Database.getCart();

// Save order
const orderId = await Database.saveOrder(orderData);

// Get orders
const orders = await Database.getOrders();
```

### View Your Data

Open `admin.html` to see:
- Total products, orders, and cart items
- List of all orders with customer info
- List of all products
- Export data as JSON

### That's It!

Everything works automatically. Just use your site normally and all data is saved! 🎉

### Browser Support

Works in all modern browsers:
- Chrome ✅
- Firefox ✅  
- Safari ✅
- Edge ✅
