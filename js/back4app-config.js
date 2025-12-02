// Back4App Configuration
const BACK4APP_CONFIG = {
    applicationId: 'VS3BrK9IQAQLTaqNH6H0p9LpK5ogQvzT7vEjjXgT',
    javascriptKey: 'C7caAKKWrPiTWs6on5KHoFbDT9wk1u8NnKaSLMKZ',
    serverURL: 'https://parseapi.back4app.com'
};

// Initialize Parse
Parse.initialize(BACK4APP_CONFIG.applicationId, BACK4APP_CONFIG.javascriptKey);
Parse.serverURL = BACK4APP_CONFIG.serverURL;

// Product Class Helper
class ProductService {
    // Save a product (create or update)
    static async saveProduct(productData) {
        const Product = Parse.Object.extend('Product');
        let product;

        if (productData.id) {
            // Update existing product
            const query = new Parse.Query(Product);
            product = await query.get(productData.id);
        } else {
            // Create new product
            product = new Product();
        }

        // Set product fields
        product.set('title', productData.title);
        product.set('price', productData.price);
        product.set('description', productData.description);
        product.set('category', productData.category);
        product.set('quantity', productData.quantity);
        product.set('status', productData.status);
        product.set('isNew', productData.isNew);

        // Handle image - store as URL string (temporary workaround for file upload restrictions)
        if (productData.image) {
            product.set('imageUrl', productData.image);
        }

        await product.save();
        return product;
    }

    // Get all products
    static async getAllProducts() {
        const Product = Parse.Object.extend('Product');
        const query = new Parse.Query(Product);
        query.descending('createdAt');
        query.limit(1000);

        const results = await query.find();
        return results.map(product => ({
            id: product.id,
            title: product.get('title'),
            price: product.get('price'),
            description: product.get('description'),
            category: product.get('category'),
            quantity: product.get('quantity'),
            status: product.get('status'),
            isNew: product.get('isNew'),
            image: product.get('imageUrl') || product.get('image')?.url() || '',
            createdAt: product.createdAt.toISOString()
        }));
    }

    // Get available products (for customers)
    static async getAvailableProducts() {
        const Product = Parse.Object.extend('Product');
        const query = new Parse.Query(Product);
        query.equalTo('status', 'available');
        query.greaterThan('quantity', 0);
        query.descending('createdAt');

        const results = await query.find();
        return results.map(product => ({
            id: product.id,
            title: product.get('title'),
            price: product.get('price'),
            description: product.get('description'),
            category: product.get('category'),
            quantity: product.get('quantity'),
            status: product.get('status'),
            isNew: product.get('isNew'),
            image: product.get('imageUrl') || product.get('image')?.url() || '',
            createdAt: product.createdAt.toISOString()
        }));
    }

    // Delete a product
    static async deleteProduct(productId) {
        const Product = Parse.Object.extend('Product');
        const query = new Parse.Query(Product);
        const product = await query.get(productId);
        await product.destroy();
    }

    // Update product status
    static async updateProductStatus(productId, status) {
        const Product = Parse.Object.extend('Product');
        const query = new Parse.Query(Product);
        const product = await query.get(productId);
        product.set('status', status);
        await product.save();
    }

    // Toggle new stock
    static async toggleNewStock(productId) {
        const Product = Parse.Object.extend('Product');
        const query = new Parse.Query(Product);
        const product = await query.get(productId);
        product.set('isNew', !product.get('isNew'));
        await product.save();
        return product.get('isNew');
    }
}

// Make it globally available
window.ProductService = ProductService;
