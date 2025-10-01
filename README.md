# Appliance-Specialist

# Appliance Specialist Website

A modern, responsive, and accessible website for **Appliance Specialist** - a South African business specializing in repairing, selling, and buying appliances and electronic devices.

## 🌟 Features

### ✅ Fully Responsive
- Optimized for all devices (iOS, Android, desktop, tablets)
- Mobile-first design approach
- Smooth mobile menu navigation

### 🎨 Modern Design
- Clean and professional layout
- Gradient hero section
- Smooth animations and transitions
- Accessible color contrast
- Intuitive navigation

### 🛠️ Core Sections
- **Home/Hero Section**: Eye-catching introduction with call-to-action buttons
- **Services Section**: Showcases Repair, Sell, and Buy services
- **Products Section**: Dynamic product grid with category filtering
- **Contact Section**: WhatsApp integration and contact options
- **Footer**: Social media links and quick navigation

### ♿ Accessibility
- Keyboard navigable
- Screen reader friendly
- ARIA labels and semantic HTML
- High contrast text
- Focus-visible states

### ⚡ Performance
- Fast loading times
- Lazy loading images
- Optimized assets
- SEO-friendly structure

## 📁 File Structure

```
appliance-specialist/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── logo.png           # Company logo (you need to add this)
├── favicon.png        # Website favicon (you need to add this)
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- A web browser
- A text editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. **Download all files** to a folder on your computer:
   - `index.html`
   - `styles.css`
   - `script.js`

2. **Add your logo and favicon**:
   - Create or upload a `logo.png` file (recommended size: 200x200px)
   - Create or upload a `favicon.png` file (recommended size: 32x32px or 64x64px)
   - Place both files in the same folder as your HTML file

3. **Open the website**:
   - Double-click `index.html` to open it in your browser
   - Or use a local development server for testing

## ⚙️ Customization Guide

### 1. Update Contact Information

**In `index.html`**, find and replace:

```html
<!-- WhatsApp Number -->
<a href="https://wa.me/1234567890" target="_blank">

<!-- Email -->
<a href="mailto:info@appliancespecialist.com">

<!-- Phone -->
<a href="tel:+1234567890">
```

Replace with your actual South African contact details:
- WhatsApp: Use format `https://wa.me/27XXXXXXXXX` (27 is SA country code)
- Email: Your business email
- Phone: Your business phone number

**In `script.js`**, update line 110:

```javascript
const whatsappNumber = '1234567890'; // Replace with your number (e.g., '27821234567')
```

### 2. Update Products

**In `script.js`**, modify the `products` array (starting at line 1):

```javascript
const products = [
    {
        id: 1,
        category: 'phones', // phones, laptops, appliances, or tvs
        title: 'Product Name',
        description: 'Short description',
        price: 'R12,999', // Use South African Rands
        image: 'your-image-url.jpg'
    },
    // Add more products...
];
```

**Product Categories Available**:
- `phones` - Mobile phones and smartphones
- `laptops` - Laptops and notebooks
- `appliances` - Kitchen and home appliances
- `tvs` - Televisions and displays

### 3. Update Social Media Links

**In `index.html`** (footer section), update:

```html
<a href="https://facebook.com" target="_blank">     <!-- Your Facebook page -->
<a href="https://instagram.com" target="_blank">    <!-- Your Instagram profile -->
<a href="https://wa.me/1234567890" target="_blank"> <!-- Your WhatsApp -->
```

### 4. Customize Colors

**In `styles.css`**, modify the CSS variables at the top:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #1e40af;    /* Secondary brand color */
    --accent-color: #10b981;       /* Accent color (prices, highlights) */
    --text-dark: #1f2937;          /* Dark text color */
    --text-light: #6b7280;         /* Light text color */
    --bg-light: #f9fafb;           /* Light background */
    --white: #ffffff;              /* White */
}
```

### 5. Add Your Business Address

**In `index.html`**, add a new contact card in the contact section:

```html
<div class="contact-card">
    <div class="contact-icon">📍</div>
    <h3>Visit Us</h3>
    <p>Our location</p>
    <a href="https://maps.google.com/?q=YOUR_ADDRESS" class="contact-link">
        123 Main Street, Johannesburg, 2000
    </a>
</div>
```

## 🔧 Advanced Customization

### Adding New Product Categories

1. **Add filter button** in `index.html`:
```html
<button class="filter-btn" data-category="tablets">Tablets</button>
```

2. **Add products** with the new category in `script.js`:
```javascript
{
    category: 'tablets',
    title: 'iPad Pro',
    // ... other details
}
```

### Changing the Hero Image/Background

**In `styles.css`**, modify the `.hero` section:

```css
.hero {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    /* Or use an image: */
    /* background: url('hero-image.jpg') center/cover; */
}
```

## 📱 Testing

### Desktop Testing
- Open in Chrome, Firefox, Safari, and Edge
- Test all navigation links
- Verify product filtering works
- Test contact links (WhatsApp, email, phone)

### Mobile Testing
- Test on actual devices (Android and iOS)
- Check mobile menu functionality
- Verify touch interactions
- Test WhatsApp link opens correctly

### Accessibility Testing
- Use keyboard only (Tab, Enter, Escape keys)
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Verify sufficient color contrast

## 🌐 Deployment Options

### Option 1: Traditional Web Hosting
Upload all files to your web hosting via FTP:
- cPanel
- Plesk
- Any shared hosting provider

### Option 2: Free Hosting
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Free tier with automatic deployments
- **Vercel**: Free hosting with great performance
- **Cloudflare Pages**: Free hosting with CDN

### Option 3: South African Hosting Providers
- Afrihost
- Hetzner South Africa
- RSAWEB
- Xneelo

## 📊 SEO Tips

1. **Update meta tags** in `index.html`:
```html
<meta name="description" content="Your custom description">
<meta name="keywords" content="your, keywords, here">
```

2. **Add structured data** for better search results

3. **Submit to Google Search Console**

4. **Create a sitemap.xml** for better indexing

## 🛡️ Security Notes

- Always use HTTPS in production
- Keep contact information up to date
- Regularly update product information
- Monitor for spam through contact forms

## 📞 Support & Updates

### Need Help?
- Review this README thoroughly
- Check browser console for errors (F12)
- Ensure all files are in the same directory
- Verify file names match exactly (case-sensitive)

### Future Enhancements
Consider adding:
- Shopping cart functionality
- Payment gateway integration (PayFast, Yoco)
- Customer reviews/testimonials
- Live chat support
- Blog section
- Inventory management system

## 📝 License

This website template is provided as-is for Appliance Specialist business use.

## 🙏 Credits

- Icons: Emoji (native support)
- Images: Unsplash (placeholder images)
- Fonts: System fonts for optimal performance

---

**Version:** 1.0  
**Last Updated:** October 2025  
**Made for:** Appliance Specialist, South Africa 🇿🇦

For questions or support, contact your web developer or refer to this documentation.