/**
 * Login Page JavaScript
 * Handles authentication, biometric login, and session management
 */

// Configuration
const CONFIG = {
    // Default credentials (in production, use secure backend authentication)
    defaultUsername: 'prince',
    defaultPassword: 'admin123',
    sessionDuration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    adminPageUrl: 'admin.html'
};

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');
const togglePasswordBtn = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLogin();
    lucide.createIcons();
});

/**
 * Initialize login page
 * Check for existing session and biometric support
 */
function initializeLogin() {
    // Check if user has an active session
    checkExistingSession();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load saved username if remember me was checked
    loadSavedCredentials();
}

/**
 * Check if user has an active session and auto-login
 */
function checkExistingSession() {
    const session = getSession();
    
    if (session && session.isValid) {
        // Auto-login: redirect to admin page
        console.log('Active session found. Redirecting to admin page...');
        redirectToAdmin();
    }
}

/**
 * Get current session from storage
 * @returns {Object|null} Session object or null
 */
function getSession() {
    try {
        const sessionData = localStorage.getItem('adminSession');
        
        if (!sessionData) return null;
        
        const session = JSON.parse(sessionData);
        const now = Date.now();
        
        // Check if session is still valid
        if (session.expiresAt && session.expiresAt > now) {
            return {
                ...session,
                isValid: true
            };
        }
        
        // Session expired, clear it
        clearSession();
        return null;
    } catch (error) {
        console.error('Error reading session:', error);
        return null;
    }
}

/**
 * Create and save a new session
 * @param {string} username - Username
 * @param {boolean} rememberMe - Whether to remember the session
 */
function createSession(username, rememberMe) {
    const now = Date.now();
    const session = {
        username: username,
        loginTime: now,
        expiresAt: now + CONFIG.sessionDuration,
        rememberMe: rememberMe
    };
    
    try {
        localStorage.setItem('adminSession', JSON.stringify(session));
        
        // Also save to sessionStorage for tab-specific session
        sessionStorage.setItem('adminLoggedIn', 'true');
    } catch (error) {
        console.error('Error saving session:', error);
    }
}

/**
 * Clear session data
 */
function clearSession() {
    localStorage.removeItem('adminSession');
    sessionStorage.removeItem('adminLoggedIn');
}



/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Login form submission
    loginForm.addEventListener('submit', handleLogin);
    
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    
    // Clear error on input
    usernameInput.addEventListener('input', clearError);
    passwordInput.addEventListener('input', clearError);
}

/**
 * Handle login form submission
 * @param {Event} e - Form submit event
 */
async function handleLogin(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    
    // Validate inputs
    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    // Simulate authentication delay (in production, this would be an API call)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Authenticate user
    if (authenticateUser(username, password)) {
        // Success: create session
        createSession(username, rememberMe);
        
        // Save credentials if remember me is checked
        if (rememberMe) {
            saveCredentials(username);
        } else {
            clearSavedCredentials();
        }
        
        // Redirect to admin page
        redirectToAdmin();
    } else {
        // Failed authentication
        setLoadingState(false);
        showError('Invalid username or password');
        
        // Clear password field
        passwordInput.value = '';
        passwordInput.focus();
    }
}

/**
 * Authenticate user credentials
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {boolean} Authentication result
 */
function authenticateUser(username, password) {
    // In production, this should be a secure API call to your backend
    // For demo purposes, using simple comparison
    return username === CONFIG.defaultUsername && password === CONFIG.defaultPassword;
}



/**
 * Toggle password visibility
 */
function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    // Update icon
    const icon = togglePasswordBtn.querySelector('i');
    icon.setAttribute('data-lucide', type === 'password' ? 'eye' : 'eye-off');
    lucide.createIcons();
}

/**
 * Save credentials to localStorage
 * @param {string} username - Username to save
 */
function saveCredentials(username) {
    try {
        localStorage.setItem('savedUsername', username);
    } catch (error) {
        console.error('Error saving credentials:', error);
    }
}

function loadSavedCredentials() {
    try {
        const savedUsername = localStorage.getItem('savedUsername');
        
        if (savedUsername) {
            usernameInput.value = savedUsername;
            rememberMeCheckbox.checked = true;
            passwordInput.focus();
        }
    } catch (error) {
        console.error('Error loading credentials:', error);
    }
}

/**
 * Clear saved credentials
 */
function clearSavedCredentials() {
    localStorage.removeItem('savedUsername');
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    
    // Re-initialize icons
    lucide.createIcons();
}

/**
 * Clear error message
 */
function clearError() {
    errorMessage.classList.add('hidden');
}

/**
 * Set loading state for button
 * @param {boolean} loading - Loading state
 * @param {HTMLElement} button - Button element (default: loginBtn)
 */
function setLoadingState(loading, button = loginBtn) {
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

/**
 * Redirect to admin page
 */
function redirectToAdmin() {
    window.location.href = CONFIG.adminPageUrl;
}

/**
 * Logout function (can be called from admin page)
 */
function logout() {
    clearSession();
    window.location.href = 'login.html';
}

// Export logout function for use in other pages
window.adminLogout = logout;

// Check session validity on visibility change
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        const session = getSession();
        if (!session || !session.isValid) {
            // Session expired, redirect to login
            if (window.location.pathname.includes('admin.html')) {
                logout();
            }
        }
    }
});
