# Admin Login System Documentation

## Overview
This document provides comprehensive information about the admin login system implemented for King David & Sons Appliances website.

## Features Implemented

### 1. **Login Page (login.html)**
A secure gateway to access the admin dashboard with the following features:

#### Authentication Methods:
- **Username & Password Login**: Traditional form-based authentication
- **Biometric Login**: Fingerprint/Face recognition (when supported by browser/device)
- **Remember Me**: Auto-login functionality for returning users

#### Security Features:
- Session management with configurable expiration (24 hours default)
- Automatic session validation
- Password visibility toggle
- Secure credential storage
- Session expiration handling

### 2. **Session Management**

#### Auto-Login Functionality:
- When "Remember Me" is checked, user credentials are saved
- On subsequent visits, users are automatically redirected to admin page if session is valid
- Session expires after 24 hours (configurable)
- Session is validated on page visibility change

#### Session Storage:
- Uses `localStorage` for persistent sessions
- Uses `sessionStorage` for tab-specific tracking
- Automatic cleanup of expired sessions

### 3. **Biometric Authentication**

#### How It Works:
- Checks browser support for Web Authentication API
- Registers biometric credentials after first successful login
- Allows quick login using fingerprint/face recognition
- Fallback to password login if biometric fails

#### Browser Support:
- Chrome/Edge: Full support
- Safari: Full support (iOS 14+)
- Firefox: Partial support
- Requires HTTPS in production

### 4. **Professional Icons**

#### Customer Website (index.html):
All emoji icons have been replaced with professional Lucide icons:
- **Services Section**: Wrench, Shopping Bag, Dollar Sign icons
- **Contact Section**: Message Circle, Mail, Phone icons
- Consistent styling with gradient backgrounds
- Responsive and accessible

#### Admin Dashboard:
Already uses Lucide icons throughout for consistency

## File Structure

```
project/
├── login.html              # Login page
├── admin.html              # Admin dashboard (protected)
├── index.html              # Customer-facing website
├── css/
│   ├── login.css          # Login page styles
│   ├── admin.css          # Admin dashboard styles
│   └── index.css          # Customer website styles
├── js/
│   ├── login.js           # Login authentication logic
│   ├── admin.js           # Admin dashboard logic
│   └── index.js           # Customer website logic
└── assets/
    └── icon-logo.jpg      # Company logo
```

## Default Credentials

**⚠️ IMPORTANT: Change these in production!**

```
Username: admin
Password: admin123
```

## Configuration

### Session Duration
Edit `js/login.js` to change session duration:

```javascript
const CONFIG = {
    sessionDuration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    // Change to desired duration
};
```

### Authentication Credentials
For production, replace the simple authentication in `js/login.js` with a secure backend API:

```javascript
function authenticateUser(username, password) {
    // Replace with API call to your backend
    return fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
}
```

## Usage Guide

### For Administrators:

1. **First Time Login**:
   - Navigate to `login.html`
   - Enter username and password
   - Check "Remember Me" for auto-login
   - Click "Sign In"
   - Biometric registration happens automatically (if supported)

2. **Subsequent Logins**:
   - If "Remember Me" was checked, you'll be auto-redirected to admin page
   - Otherwise, enter credentials again
   - Use biometric login for quick access

3. **Logout**:
   - Click the "Logout" button in the admin header
   - Confirms before logging out
   - Clears all session data

### For Developers:

#### Adding New Protected Pages:
Add this script to any page that requires authentication:

```html
<script>
    (function() {
        const sessionData = localStorage.getItem('adminSession');
        if (!sessionData) {
            window.location.href = 'login.html';
            return;
        }
        
        const session = JSON.parse(sessionData);
        if (!session.expiresAt || session.expiresAt <= Date.now()) {
            localStorage.removeItem('adminSession');
            window.location.href = 'login.html';
        }
    })();
</script>
```

#### Checking Authentication Status:
```javascript
function isAuthenticated() {
    try {
        const sessionData = localStorage.getItem('adminSession');
        if (!sessionData) return false;
        
        const session = JSON.parse(sessionData);
        return session.expiresAt && session.expiresAt > Date.now();
    } catch {
        return false;
    }
}
```

## Security Best Practices

### Current Implementation:
✅ Session expiration
✅ Secure password input
✅ Session validation
✅ Auto-logout on session expiry
✅ HTTPS required for biometrics

### Recommended for Production:
1. **Backend Authentication**: Replace client-side auth with secure backend API
2. **HTTPS**: Always use HTTPS in production
3. **Password Hashing**: Hash passwords on backend (bcrypt, argon2)
4. **CSRF Protection**: Implement CSRF tokens
5. **Rate Limiting**: Prevent brute force attacks
6. **2FA**: Add two-factor authentication
7. **Audit Logging**: Log all authentication attempts
8. **Secure Cookies**: Use httpOnly, secure cookies for sessions

## Browser Compatibility

### Login System:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Biometric Authentication:
- ✅ Chrome/Edge 90+ (Windows Hello, Touch ID)
- ✅ Safari 14+ (Touch ID, Face ID)
- ⚠️ Firefox (Limited support)
- ✅ Mobile (iOS 14+, Android 9+)

## Troubleshooting

### Issue: Auto-login not working
**Solution**: Check if "Remember Me" was checked during login. Clear browser cache and try again.

### Issue: Biometric option not showing
**Solution**: 
- Ensure browser supports Web Authentication API
- Check if device has biometric hardware
- Verify HTTPS is being used (required for biometrics)

### Issue: Session expires too quickly
**Solution**: Increase `sessionDuration` in `js/login.js` CONFIG object.

### Issue: Can't access admin page
**Solution**: 
- Clear localStorage: `localStorage.clear()`
- Login again with correct credentials
- Check browser console for errors

## API Reference

### Login Functions

#### `authenticateUser(username, password)`
Validates user credentials.
- **Parameters**: username (string), password (string)
- **Returns**: boolean
- **Usage**: Called during form submission

#### `createSession(username, rememberMe)`
Creates a new user session.
- **Parameters**: username (string), rememberMe (boolean)
- **Returns**: void
- **Usage**: Called after successful authentication

#### `getSession()`
Retrieves current session data.
- **Returns**: Object with session data or null
- **Usage**: Check authentication status

#### `clearSession()`
Clears all session data.
- **Returns**: void
- **Usage**: Called during logout

#### `logout()`
Logs out user and redirects to login page.
- **Returns**: void
- **Usage**: Called from logout button

## Testing Checklist

- [ ] Login with correct credentials
- [ ] Login with incorrect credentials (should show error)
- [ ] "Remember Me" functionality
- [ ] Auto-login on return visit
- [ ] Session expiration after 24 hours
- [ ] Logout functionality
- [ ] Biometric registration (if supported)
- [ ] Biometric login (if supported)
- [ ] Password visibility toggle
- [ ] Protected page access without login (should redirect)
- [ ] Mobile responsiveness
- [ ] Keyboard navigation
- [ ] Screen reader compatibility

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all files are in correct locations
3. Ensure JavaScript is enabled
4. Clear browser cache and cookies
5. Test in different browser

## Future Enhancements

Potential improvements for future versions:
- [ ] Backend API integration
- [ ] Database for user management
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] OAuth integration (Google, Microsoft)
- [ ] Activity logging
- [ ] Multiple user roles
- [ ] Password strength requirements
- [ ] Account lockout after failed attempts

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Developer**: Uwami Mgxekwa
