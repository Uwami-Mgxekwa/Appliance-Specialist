const products = [
    {
        id: 1,
        category: 'phones',
        title: 'iPhone 13 Pro',
        description: 'Excellent condition, 256GB, unlocked',
        price: 'R12,999',
        image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        category: 'laptops',
        title: 'MacBook Air M2',
        description: 'Like new, 16GB RAM, 512GB SSD',
        price: 'R19,999',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        category: 'appliances',
        title: 'Samsung Refrigerator',
        description: 'French door, stainless steel, energy efficient',
        price: 'R16,499',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        category: 'tvs',
        title: 'LG 55" OLED TV',
        description: '4K, HDR, smart TV features',
        price: 'R23,999',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        category: 'phones',
        title: 'Samsung Galaxy S23',
        description: '128GB, excellent camera, fast charging',
        price: 'R10,999',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        category: 'laptops',
        title: 'Dell XPS 15',
        description: 'High performance, 32GB RAM, 1TB SSD',
        price: 'R27,499',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        category: 'appliances',
        title: 'Dyson Vacuum V15',
        description: 'Cordless, powerful suction, laser detection',
        price: 'R9,999',
        image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        category: 'appliances',
        title: 'KitchenAid Mixer',
        description: 'Professional grade, multiple attachments',
        price: 'R6,499',
        image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=400&h=300&fit=crop'
    },
    {
        id: 9,
        category: 'tvs',
        title: 'Sony 65" LED TV',
        description: '4K UHD, smart features, gaming mode',
        price: 'R14,799',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop'
    }
];

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
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price}</div>
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
    const whatsappNumber = '+27785002274'; // Replace with actual WhatsApp number
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

// Initial render of products
renderProducts();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
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
document.addEventListener('DOMContentLoaded', () => {
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
const copyrightText = document.querySelector('.footer-bottom p');
if (copyrightText) {
    copyrightText.textContent = `© ${currentYear} Appliance Specialist. All rights reserved.`;
}

// Performance: Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}