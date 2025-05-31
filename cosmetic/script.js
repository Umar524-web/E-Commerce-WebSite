// Sample product data
const products = [
    {
      id: 1,
      name: "Radiance Foundation",
      price: 1200,
      image: "https://images.unsplash.com/photo-1599305090598-fe179d501226?q=80&w=1974&auto=format&fit=crop",
      description: "A lightweight, buildable foundation that blends seamlessly for a natural finish.",
      category: "Makeup"
    },
    {
      id: 2,
      name: "Hydra Boost Serum",
      price: 1500,
      image: "https://images.unsplash.com/photo-1607602132700-068258431c8c?q=80&w=1972&auto=format&fit=crop",
      description: "Intensely hydrating serum with hyaluronic acid for plump, dewy skin.",
      category: "Skincare"
    },
    {
      id: 3,
      name: "Velvet Matte Lipstick",
      price: 800,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=2030&auto=format&fit=crop",
      description: "Rich, velvety matte lipstick that stays comfortable all day.",
      category: "Makeup"
    },
    {
      id: 4,
      name: "Overnight Repair Cream",
      price: 1800,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop",
      description: "Intensive night treatment that repairs and rejuvenates skin while you sleep.",
      category: "Skincare"
    },
    {
      id: 5,
      name: "Blossom Eau de Parfum",
      price: 2500,
      image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1974&auto=format&fit=crop",
      description: "Floral fragrance with notes of jasmine, rose, and vanilla.",
      category: "Fragrance"
    },
    {
      id: 6,
      name: "Silk Smooth Shampoo",
      price: 950,
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=2070&auto=format&fit=crop",
      description: "Nourishing shampoo that smooths and softens hair.",
      category: "Haircare"
    },
    {
      id: 7,
      name: "Precision Eyeliner",
      price: 650,
      image: "https://images.unsplash.com/photo-1631730359585-38a544e91615?q=80&w=1974&auto=format&fit=crop",
      description: "Ultra-precise liquid eyeliner for sharp, defined lines.",
      category: "Makeup"
    },
    {
      id: 8,
      name: "Vitamin C Brightening Mask",
      price: 1100,
      image: "https://images.unsplash.com/photo-1600428877878-1a0ff561d8c5?q=80&w=1974&auto=format&fit=crop",
      description: "Revitalizing mask with vitamin C to brighten and even skin tone.",
      category: "Skincare"
    },
  ];
  
  // DOM elements
  const productContainer = document.getElementById('product-container');
  const cartItems = document.getElementById('cart-items');
  const cartSidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('overlay');
  const cartCount = document.getElementById('cart-count');
  const cartTotalAmount = document.getElementById('cart-total-amount');
  const emptyCart = document.getElementById('empty-cart');
  const cartFooter = document.getElementById('cart-footer');
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutItems = document.getElementById('checkout-items');
  const checkoutSubtotal = document.getElementById('checkout-subtotal');
  const checkoutTotal = document.getElementById('checkout-total');
  const orderHistoryModal = document.getElementById('order-history-modal');
  const orderList = document.getElementById('order-list');
  const emptyOrders = document.getElementById('empty-orders');
  const orderSuccessModal = document.getElementById('order-success-modal');
  const successOrderId = document.getElementById('success-order-id');
  const menuItems = document.getElementById('menuItems');
  
  // Cart and Orders state
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize the app
  function init() {
    // Display products
    displayProducts();
    
    // Update cart display
    updateCartDisplay();
    
    // Set up event listeners
    setupEventListeners();
  }
  
  // Display products
  function displayProducts() {
    productContainer.innerHTML = '';
    
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      
      productCard.innerHTML = `
        <div class="product-img">
          <img src="${product.image}" alt="${product.name}">
          <div class="wishlist-btn">
            <i class="far fa-heart"></i>
          </div>
        </div>
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-bottom">
            <div class="product-price">₹${product.price.toFixed(2)}</div>
            <button class="btn add-to-cart" data-id="${product.id}">
              <i class="fas fa-shopping-bag"></i> Add
            </button>
          </div>
        </div>
      `;
      
      productContainer.appendChild(productCard);
    });
  }
  
  // Event listeners
  function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
      if (e.target.closest('.add-to-cart')) {
        const productId = parseInt(e.target.closest('.add-to-cart').getAttribute('data-id'));
        addToCart(productId);
      }
    });
    
    // Open cart
    document.getElementById('cart-btn').addEventListener('click', function(e) {
      e.preventDefault();
      openCart();
    });
    
    // Close cart
    document.getElementById('close-cart').addEventListener('click', closeCart);
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', openCheckout);
    
    // Close checkout
    document.getElementById('close-checkout').addEventListener('click', closeCheckout);
    
    // Back to cart
    document.getElementById('back-to-cart').addEventListener('click', function() {
      closeCheckout();
      openCart();
    });
    
    // Place order
    document.getElementById('place-order-btn').addEventListener('click', placeOrder);
    
    // Continue shopping
    document.getElementById('continue-shopping').addEventListener('click', function() {
      closeSuccessModal();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // View orders
    document.getElementById('view-orders').addEventListener('click', function() {
      closeSuccessModal();
      openOrderHistory();
    });
    
    // Open order history
    document.getElementById('order-history-link').addEventListener('click', function(e) {
      e.preventDefault();
      openOrderHistory();
    });
    
    // Close order history
    document.getElementById('close-order-history').addEventListener('click', closeOrderHistory);
    
    // Overlay click
    overlay.addEventListener('click', function() {
      closeCart();
      closeCheckout();
      closeOrderHistory();
      closeSuccessModal();
    });
    
    // Payment method toggle
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
      method.addEventListener('change', function() {
        document.getElementById('upi-details').style.display = 'none';
        document.getElementById('card-details').style.display = 'none';
        
        if (this.value === 'upi') {
          document.getElementById('upi-details').style.display = 'block';
        } else if (this.value === 'card') {
          document.getElementById('card-details').style.display = 'block';
        }
      });
    });
    
    // Mobile menu toggle
    document.querySelector('.menu-icon').addEventListener('click', toggleMenu);
  }
  
  // Toggle mobile menu
  function toggleMenu() {
    menuItems.classList.toggle('active');
  }
  
  // Add to cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display
    updateCartDisplay();
    
    // Show cart
    openCart();
  }
  
  // Update cart display
  function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
      emptyCart.style.display = 'block';
      cartFooter.style.display = 'none';
    } else {
      emptyCart.style.display = 'none';
      cartFooter.style.display = 'block';
      
      // Clear current items
      cartItems.innerHTML = '';
      
      // Add cart items
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
          <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
            <div class="cart-item-actions">
              <div class="item-quantity">
                <div class="quantity-btn minus" data-id="${item.id}">-</div>
                <span>${item.quantity}</span>
                <div class="quantity-btn plus" data-id="${item.id}">+</div>
              </div>
              <div class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash-alt"></i>
              </div>
            </div>
          </div>
        `;
        
        cartItems.appendChild(cartItem);
      });
      
      // Add event listeners for quantity buttons
      const minusButtons = cartItems.querySelectorAll('.minus');
      const plusButtons = cartItems.querySelectorAll('.plus');
      const removeButtons = cartItems.querySelectorAll('.remove-item');
      
      minusButtons.forEach(button => {
        button.addEventListener('click', function() {
          const itemId = parseInt(this.getAttribute('data-id'));
          updateQuantity(itemId, -1);
        });
      });
      
      plusButtons.forEach(button => {
        button.addEventListener('click', function() {
          const itemId = parseInt(this.getAttribute('data-id'));
          updateQuantity(itemId, 1);
        });
      });
      
      removeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const itemId = parseInt(this.getAttribute('data-id'));
          removeFromCart(itemId);
        });
      });
      
      // Update total
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartTotalAmount.textContent = `₹${total.toFixed(2)}`;
    }
  }
  
  // Update quantity
  function updateQuantity(itemId, change) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    if (cart[itemIndex].quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
  }
  
  // Remove from cart
  function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
  }
  
  // Open cart
  function openCart() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Close cart
  function closeCart() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Open checkout
  function openCheckout() {
    if (cart.length === 0) return;
    
    closeCart();
    
    // Update checkout items
    checkoutItems.innerHTML = '';
    
    cart.forEach(item => {
      const checkoutItem = document.createElement('div');
      checkoutItem.classList.add('checkout-item');
      
      checkoutItem.innerHTML = `
        <div class="checkout-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="checkout-item-details">
          <div class="checkout-item-name">${item.name}</div>
          <div class="checkout-item-price">
            <span>${item.quantity} x ₹${item.price.toFixed(2)}</span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      `;
      
      checkoutItems.appendChild(checkoutItem);
    });
    
    // Update checkout totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 40;
    const total = subtotal + shipping;
    
    checkoutSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    checkoutTotal.textContent = `₹${total.toFixed(2)}`;
    
    // Show checkout modal
    checkoutModal.classList.add('active');
    overlay.classList.add('active');
  }
  
  // Close checkout
  function closeCheckout() {
    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Place order
  function placeOrder() {
    if (cart.length === 0) return;
    
    // Get form values
    const fullName = document.getElementById('full-name').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    const state = document.getElementById('state').value;
    
    // Validate form (simple validation)
    if (!fullName || !mobile || !address || !city || !pincode || !state) {
      alert('Please fill in all the required fields.');
      return;
    }
    
    // Create new order
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 40;
    const total = subtotal + shipping;
    
    const order = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      items: [...cart],
      status: 'pending',
      shippingAddress: {
        fullName,
        mobile,
        address,
        city,
        pincode,
        state
      },
      payment: {
        method: document.querySelector('input[name="payment-method"]:checked').value,
        total
      }
    };
    
    // Add to orders
    orders.push(order);
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    
    // Close checkout
    closeCheckout();
    
    // Show success message
    successOrderId.textContent = order.id;
    orderSuccessModal.classList.add('active');
    overlay.classList.add('active');
  }
  
  // Generate order ID
  function generateOrderId() {
    return 'LB' + Math.floor(100000 + Math.random() * 900000);
  }
  
  // Close success modal
  function closeSuccessModal() {
    orderSuccessModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Open order history
  function openOrderHistory() {
    // Update order list
    if (orders.length === 0) {
      emptyOrders.style.display = 'block';
    } else {
      emptyOrders.style.display = 'none';
      
      // Clear current items
      orderList.innerHTML = '';
      
      // Add order items (most recent first)
      [...orders].reverse().forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');
        
        const statusClass = `status-${order.status}`;
        const orderDate = new Date(order.date).toLocaleDateString();
        
        // Generate order items HTML
        let orderItemsHTML = '';
        order.items.forEach(item => {
          orderItemsHTML += `
            <div class="order-product">
              <div class="order-product-img">
                <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="order-product-details">
                <div class="order-product-name">${item.name}</div>
                <div class="order-product-price">
                  <span>${item.quantity} x ₹${item.price.toFixed(2)}</span>
                  <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          `;
        });
        
        orderCard.innerHTML = `
          <div class="order-header">
            <div>
              <div><strong>Order ID:</strong> ${order.id}</div>
              <div><small>Placed on ${orderDate}</small></div>
            </div>
            <div class="order-status ${statusClass}">${capitalizeFirstLetter(order.status)}</div>
          </div>
          <div class="order-details">
            <div class="order-products">
              ${orderItemsHTML}
            </div>
            <div class="order-summary">
              <div>Payment Method: ${capitalizeFirstLetter(order.payment.method)}</div>
              <div>Total: ₹${order.payment.total.toFixed(2)}</div>
            </div>
            <div class="order-address">
              <strong>Shipping Address:</strong> ${order.shippingAddress.fullName}, ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}
            </div>
          </div>
        `;
        
        orderList.appendChild(orderCard);
      });
    }
    
    // Show order history modal
    orderHistoryModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Close order history
  function closeOrderHistory() {
    orderHistoryModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Helper function to capitalize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // Initialize app when DOM is loaded
  document.addEventListener('DOMContentLoaded', init);