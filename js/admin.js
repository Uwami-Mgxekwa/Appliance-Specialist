// Admin Dashboard JavaScript - Save as js/admin.js

let products = [];
let editingProductId = null;

// DOM Elements
const addProductBtn = document.getElementById('addProductBtn');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const productForm = document.getElementById('productForm');
const productsGrid = document.getElementById('productsGrid');
const emptyState = document.getElementById('emptyState');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const categoryFilter = document.getElementById('categoryFilter');
const modalTitle = document.getElementById('modalTitle');
const productImage = document.getElementById('productImage');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeImage = document.getElementById('removeImage');

// Stats elements
const totalProductsEl = document.getElementById('totalProducts');
const availableProductsEl = document.getElementById('availableProducts');
const newProductsEl = document.getElementById('newProducts');
const soldProductsEl = document.getElementById('soldProducts');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    setupLogout();
});

// Setup Logout Functionality
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                // Clear session
                localStorage.removeItem('adminSession');
                sessionStorage.removeItem('adminLoggedIn');
                
                // Redirect to login page
                window.location.href = 'login.html';
            }
        });
    }
}

// Setup Event Listeners
function setupEventListeners() {
    addProductBtn.addEventListener('click', openAddModal);
    closeModal.addEventListener('click', closeProductModal);
    cancelBtn.addEventListener('click', closeProductModal);
    productForm.addEventListener('submit', handleFormSubmit);
    productImage.addEventListener('change', handleImageUpload);
    removeImage.addEventListener('click', clearImagePreview);
    searchInput.addEventListener('input', filterProducts);
    statusFilter.addEventListener('change', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);

    // Close modal on outside click
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
}

// Load Products from Back4App
async function loadProducts() {
    try {
        showNotification('Loading products...', 'info');
        products = await ProductService.getAllProducts();
        updateStats();
        renderProducts();
        showNotification('Products loaded successfully!', 'success');
    } catch (error) {
        console.error('Error loading products:', error);
        showNotification('Error loading products. Please try again.', 'error');
        products = [];
        updateStats();
        renderProducts();
    }
}

// Open Add Product Modal
function openAddModal() {
    editingProductId = null;
    modalTitle.textContent = 'Add New Product';
    productForm.reset();
    clearImagePreview();
    productModal.classList.remove('hidden');
}

// Open Edit Product Modal
function openEditModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    editingProductId = productId;
    modalTitle.textContent = 'Edit Product';

    // Fill form with product data
    document.getElementById('productTitle').value = product.title;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productQuantity').value = product.quantity;
    document.getElementById('productStatus').value = product.status;
    document.getElementById('productIsNew').checked = product.isNew;

    // Show image preview
    if (product.image) {
        previewImg.src = product.image;
        imagePreview.classList.remove('hidden');
    }

    productModal.classList.remove('hidden');
}

// Close Product Modal
function closeProductModal() {
    productModal.classList.add('hidden');
    productForm.reset();
    clearImagePreview();
    editingProductId = null;
}

// Handle Image Upload
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('Image too large. Please use an image under 5MB.', 'error');
        e.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        // Compress and resize image
        compressImage(event.target.result, (compressedImage) => {
            previewImg.src = compressedImage;
            imagePreview.classList.remove('hidden');
        });
    };
    reader.readAsDataURL(file);
}

// Compress Image
function compressImage(base64, callback) {
    const img = new Image();
    img.src = base64;
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate new dimensions (max 800px width/height)
        let width = img.width;
        let height = img.height;
        const maxSize = 800;

        if (width > height && width > maxSize) {
            height = (height / width) * maxSize;
            width = maxSize;
        } else if (height > maxSize) {
            width = (width / height) * maxSize;
            height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG with 0.8 quality
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
        callback(compressedBase64);
    };
}

// Clear Image Preview
function clearImagePreview() {
    previewImg.src = '';
    imagePreview.classList.add('hidden');
    productImage.value = '';
}

// Handle Form Submit
async function handleFormSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('productTitle').value.trim();
    const price = document.getElementById('productPrice').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const category = document.getElementById('productCategory').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const status = document.getElementById('productStatus').value;
    const isNew = document.getElementById('productIsNew').checked;
    const image = previewImg.src;

    // Validate image
    if (!image && !editingProductId) {
        showNotification('Please upload a product image.', 'error');
        return;
    }

    const productData = {
        id: editingProductId || null,
        title,
        price,
        description,
        category,
        quantity,
        status,
        isNew,
        image: image || ''
    };

    try {
        showNotification('Saving product...', 'info');
        await ProductService.saveProduct(productData);
        
        if (editingProductId) {
            showNotification('Product updated successfully!', 'success');
        } else {
            showNotification('Product added successfully!', 'success');
        }

        closeProductModal();
        await loadProducts();
    } catch (error) {
        console.error('Error saving product:', error);
        showNotification('Error saving product. Please try again.', 'error');
    }
}

// Delete Product
async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
        return;
    }

    try {
        showNotification('Deleting product...', 'info');
        await ProductService.deleteProduct(productId);
        showNotification('Product deleted successfully!', 'success');
        await loadProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        showNotification('Error deleting product. Please try again.', 'error');
    }
}

// Toggle Product Status
async function toggleStatus(productId, newStatus) {
    try {
        showNotification('Updating status...', 'info');
        await ProductService.updateProductStatus(productId, newStatus);
        showNotification(`Product marked as ${newStatus}!`, 'success');
        await loadProducts();
    } catch (error) {
        console.error('Error updating status:', error);
        showNotification('Error updating status. Please try again.', 'error');
    }
}

// Toggle New Stock
async function toggleNewStock(productId) {
    try {
        showNotification('Updating product...', 'info');
        const isNew = await ProductService.toggleNewStock(productId);
        showNotification(`Product ${isNew ? 'marked' : 'unmarked'} as new stock!`, 'success');
        await loadProducts();
    } catch (error) {
        console.error('Error toggling new stock:', error);
        showNotification('Error updating product. Please try again.', 'error');
    }
}

// Update Statistics
function updateStats() {
    totalProductsEl.textContent = products.length;
    availableProductsEl.textContent = products.filter(p => p.status === 'available').length;
    newProductsEl.textContent = products.filter(p => p.isNew).length;
    soldProductsEl.textContent = products.filter(p => p.status === 'sold').length;
}

// Filter Products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    const categoryValue = categoryFilter.value;

    const filtered = products.filter(product => {
        const matchesSearch = 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);

        const matchesStatus = 
            statusValue === 'all' || 
            (statusValue === 'new' && product.isNew) ||
            (statusValue !== 'new' && product.status === statusValue);

        const matchesCategory = 
            categoryValue === 'all' || 
            product.category === categoryValue;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    renderProducts(filtered);
}

// Render Products
function renderProducts(productsToRender = products) {
    productsGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-badges">
                    ${product.isNew ? '<span class="badge badge-new"><i data-lucide="sparkles"></i> NEW</span>' : ''}
                    <span class="badge badge-${product.status}">
                        <i data-lucide="${product.status === 'sold' ? 'dollar-sign' : 'check-circle'}"></i>
                        ${product.status === 'sold' ? 'SOLD' : 'AVAILABLE'}
                    </span>
                </div>
            </div>
            <div class="product-info">
                <div class="product-header">
                    <div>
                        <h3 class="product-title">${product.title}</h3>
                        <span class="product-category">${product.category}</span>
                    </div>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <div class="product-price">R${product.price}</div>
                    <div class="product-quantity">Qty: ${product.quantity}</div>
                </div>
                <div class="product-actions">
                    <button class="action-btn edit-btn" onclick="openEditModal('${product.id}')">
                        <i data-lucide="edit-2"></i>
                        Edit
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteProduct('${product.id}')">
                        <i data-lucide="trash-2"></i>
                        Delete
                    </button>
                </div>
                <div class="product-actions" style="margin-top: 0.5rem;">
                    <button class="action-btn ${product.status === 'sold' ? 'btn-success' : 'btn-danger'}" 
                            onclick="toggleStatus('${product.id}', '${product.status === 'sold' ? 'available' : 'sold'}')">
                        <i data-lucide="${product.status === 'sold' ? 'package' : 'dollar-sign'}"></i>
                        ${product.status === 'sold' ? 'Mark Available' : 'Mark Sold'}
                    </button>
                    <button class="action-btn ${product.isNew ? 'btn-success' : 'btn-secondary'}" 
                            onclick="toggleNewStock('${product.id}')">
                        <i data-lucide="sparkles"></i>
                        ${product.isNew ? 'Unmark New' : 'Mark New'}
                    </button>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });

    // Re-initialize Lucide icons after rendering
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Show Notification
function showNotification(message, type) {
    notificationMessage.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Make functions globally accessible
window.openEditModal = openEditModal;
window.deleteProduct = deleteProduct;
window.toggleStatus = toggleStatus;
window.toggleNewStock = toggleNewStock;