// Updated index.js - Replace your existing js/index.js with this

let products = [];

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Load Products from Admin Storage
async function loadProducts() {
    try {
        const result = await window.storage.get('admin-products', true);
        if (result && result.value) {
            products = JSON.parse(result.value);
            // Filter only available products for customers
            products = products.filter(p => p.status === 'available' && p.quantity > 0);
        } else {
            // Fallback to default products if no admin products exist
            products = getDefaultProducts();
        }
        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to default products
        products = getDefaultProducts();
        renderProducts();
    }
}

// Default Products (fallback)
function getDefaultProducts() {
    return [
        {
            id: 1,
            category: 'cooling',
            title: 'Samsung Refrigerator',
            description: 'French door, stainless steel, energy efficient',
            price: '16,499',
            image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop',
            isNew: false
        },
        {
            id: 2,
            category: 'cooling',
            title: 'LG Air Conditioner',
            description: '12000 BTU, inverter technology, energy saving',
            price: '8,999',
            image: 'https://images.unsplash.com/photo-1631545806609-c2b999c8f4c6?w=400&h=300&fit=crop',
            isNew: false
        },
        {
            id: 3,
            category: 'kitchen',
            title: 'Defy 4-Plate Stove',
            description: 'Electric hob, oven with grill, stainless steel',
            price: '4,999',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
            isNew: false
        },
        {
            id: 4,
            category: 'kitchen',
            title: 'Russell Hobbs Kettle',
            description: '1.7L capacity, rapid boil, auto shut-off',
            price: '599',
            image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
            isNew: false
        },
        {
            id: 5,
            category: 'kitchen',
            title: 'KitchenAid Mixer',
            description: 'Professional grade, multiple attachments',
            price: '6,499',
            image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=400&h=300&fit=crop',
            isNew: false
        },
        {
            id: 6,
            category: 'laundry',
            title: 'Samsung Washing Machine',
            description: '8kg front loader, eco bubble technology',
            price: '12,999',
            image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=300&fit=crop',
            isNew: false
        },
        {
            id: 7,
            category: 'cleaning',
            title: 'Dyson Vacuum V15',
            description: 'Cordless, powerful suction, laser detection',
            price: '9,999',
            image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=300&fit=crop',
            isNew: false
        },
        {
            id: 8,
            category: 'kitchen',
            title: 'Smeg Microwave',
            description: '25L capacity, convection, stainless steel',
            price: '3,499',
            image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=300&fit=crop',
            isNew: false
        },
        {
            id: 9,
            category: 'cooling',
            title: 'Chest Freezer',
            description: '200L capacity, energy efficient, lock included',
            price: '5,799',
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
            isNew: false
        },
        {
            id: 10,
            category: 'laundry',
            title: 'Tumble Dryer',
            description: '7kg capacity, sensor dry, multiple programs',
            price: '7,999',
            image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400&h=300&fit=crop',
            isNew: false
        }
    ];
}

// Product filtering and rendering
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Function to render products
function renderProducts(category = 'all') {
    productsGrid.innerHTML = '';

    const filteredProducts = category === 'all'
        ? products
        : products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--text-light);">No products found in this category.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('role', 'article');
        productCard.setAttribute('aria-label', product.title);

        // Show NEW badge if product is marked as new
        const newBadge = product.isNew ? '<span style="position: absolute; top: 10px; right: 10px; background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">🆕 NEW</span>' : '';

        productCard.innerHTML = `
            <div style="position: relative;">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
                ${newBadge}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">R${product.price}</div>
                <button class="product-btn" onclick="contactAboutProduct('${product.title}')" aria-label="Contact to purchase ${product.title}">
                    Contact to Purchase
                </button>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Function to handle product contact
function contactAboutProduct(productTitle) {
    const message = encodeURIComponent(`Hi! I'm interested in the ${productTitle}. Can you provide more details?`);
    const whatsappNumber = '+27657244664';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// Filter button functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get category and render products
        const category = button.getAttribute('data-category');
        renderProducts(category);
    });
});

// Initial load of products
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.service-card, .product-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Keyboard accessibility for mobile menu
mobileMenuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileMenuToggle.click();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.focus();
    }
});

// Update copyright year dynamically
const currentYear = new Date().getFullYear();
const copyrightElements = document.querySelectorAll('.footer-bottom p');
if (copyrightElements.length > 0) {
    copyrightElements[0].textContent = `© ${currentYear} King David & Sons Appliances. All rights reserved.`;
}

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWidget = document.getElementById('chatbotWidget');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotBody = document.getElementById('chatbotBody');
const chatbotOptions = document.querySelectorAll('.chatbot-option');

// Toggle chatbot
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWidget.classList.toggle('active');
        // Reinitialize icons when chatbot opens
        if (chatbotWidget.classList.contains('active')) {
            setTimeout(() => lucide.createIcons(), 100);
        }
    });
}

// Close chatbot
if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWidget.classList.remove('active');
    });
}

// Chatbot responses
const chatbotResponses = {
    repair: {
        message: "We offer professional repair services for all household appliances including fridges, stoves, kettles, air conditioners, and washing machines. Our certified technicians provide fast, affordable repairs with quality parts and warranties.",
        action: () => {
            document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => chatbotWidget.classList.remove('active'), 1000);
        }
    },
    products: {
        message: "Browse our selection of quality-tested household appliances. All products come with guarantees for your peace of mind. Check out our products section below!",
        action: () => {
            document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => chatbotWidget.classList.remove('active'), 1000);
        }
    },
    hours: {
        message: "📅 Business Hours:\n\nMonday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed\n\n🚨 24/7 Emergency service available for urgent repairs!",
        action: null
    },
    location: {
        message: "📍 Visit us at:\n\n79 Andrew Street\nRosettenville\nJohannesburg, South Africa\n\nWe're here to serve you!",
        action: () => {
            document.querySelector('#location').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => chatbotWidget.classList.remove('active'), 1000);
        }
    },
    contact: {
        message: "📞 Contact us:\n\nPhone: +27 65 724 4664\nWhatsApp: Click the green button\nEmail: info@appliancespecialist.com\n\nWe're here to help!",
        action: () => {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => chatbotWidget.classList.remove('active'), 1000);
        }
    }
};

// Handle chatbot option clicks
chatbotOptions.forEach(option => {
    option.addEventListener('click', () => {
        const response = option.getAttribute('data-response');
        const responseData = chatbotResponses[response];
        
        if (responseData) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'chatbot-message user-message';
            userMessage.innerHTML = `<p>${option.querySelector('span').textContent}</p>`;
            chatbotBody.appendChild(userMessage);
            
            // Add bot response
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'chatbot-message bot-message';
                botMessage.innerHTML = `<p>${responseData.message.replace(/\n/g, '<br>')}</p>`;
                chatbotBody.appendChild(botMessage);
                
                // Scroll to bottom
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
                
                // Execute action if available
                if (responseData.action) {
                    setTimeout(responseData.action, 1500);
                }
            }, 500);
        }
    });
});

// Performance: Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}