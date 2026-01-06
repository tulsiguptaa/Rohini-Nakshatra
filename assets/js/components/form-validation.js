// Form Validation Component
class FormValidator {
    constructor(formId, options = {}) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.options = {
            showErrors: true,
            highlightFields: true,
            ...options
        };
        
        this.fields = {};
        this.init();
    }
    
    init() {
        // Find all validatable fields
        this.findFields();
        
        // Setup form submission
        this.setupFormSubmission();
        
        // Setup real-time validation
        this.setupRealTimeValidation();
    }
    
    findFields() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            const name = input.name;
            if (name) {
                this.fields[name] = {
                    element: input,
                    rules: this.extractRules(input),
                    isValid: true,
                    errors: []
                };
            }
        });
    }
    
    extractRules(input) {
        const rules = [];
        const type = input.type;
        const required = input.required;
        const pattern = input.pattern;
        const minLength = input.minLength;
        const maxLength = input.maxLength;
        const min = input.min;
        const max = input.max;
        
        if (required) {
            rules.push({
                type: 'required',
                message: 'This field is required'
            });
        }
        
        if (pattern) {
            rules.push({
                type: 'pattern',
                pattern: new RegExp(pattern),
                message: 'Invalid format'
            });
        }
        
        if (minLength) {
            rules.push({
                type: 'minLength',
                value: parseInt(minLength),
                message: `Minimum ${minLength} characters required`
            });
        }
        
        if (maxLength) {
            rules.push({
                type: 'maxLength',
                value: parseInt(maxLength),
                message: `Maximum ${maxLength} characters allowed`
            });
        }
        
        if (type === 'email') {
            rules.push({
                type: 'email',
                message: 'Please enter a valid email address'
            });
        }
        
        if (type === 'number' || type === 'range') {
            if (min) {
                rules.push({
                    type: 'min',
                    value: parseFloat(min),
                    message: `Minimum value is ${min}`
                });
            }
            if (max) {
                rules.push({
                    type: 'max',
                    value: parseFloat(max),
                    message: `Maximum value is ${max}`
                });
            }
        }
        
        return rules;
    }
    
    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validateAll()) {
                e.preventDefault();
                this.displayErrors();
                return false;
            }
        });
    }
    
    setupRealTimeValidation() {
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            const input = field.element;
            
            // Validate on blur
            input.addEventListener('blur', () => {
                this.validateField(fieldName);
                this.updateFieldStatus(fieldName);
            });
            
            // Clear errors on focus
            input.addEventListener('focus', () => {
                this.clearFieldError(fieldName);
            });
            
            // Real-time validation for some fields
            if (input.type === 'email' || input.type === 'text') {
                input.addEventListener('input', () => {
                    this.validateField(fieldName);
                    this.updateFieldStatus(fieldName);
                });
            }
        });
    }
    
    validateAll() {
        let isValid = true;
        
        Object.keys(this.fields).forEach(fieldName => {
            const fieldValid = this.validateField(fieldName);
            if (!fieldValid) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return true;
        
        const input = field.element;
        const value = input.value.trim();
        const rules = field.rules;
        
        field.errors = [];
        field.isValid = true;
        
        rules.forEach(rule => {
            let ruleValid = true;
            
            switch (rule.type) {
                case 'required':
                    ruleValid = value !== '';
                    break;
                    
                case 'pattern':
                    ruleValid = rule.pattern.test(value);
                    break;
                    
                case 'minLength':
                    ruleValid = value.length >= rule.value;
                    break;
                    
                case 'maxLength':
                    ruleValid = value.length <= rule.value;
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    ruleValid = emailRegex.test(value);
                    break;
                    
                case 'min':
                    ruleValid = parseFloat(value) >= rule.value;
                    break;
                    
                case 'max':
                    ruleValid = parseFloat(value) <= rule.value;
                    break;
            }
            
            if (!ruleValid) {
                field.isValid = false;
                field.errors.push(rule.message);
            }
        });
        
        return field.isValid;
    }
    
    updateFieldStatus(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return;
        
        const input = field.element;
        const errorContainer = this.getErrorContainer(input);
        
        if (field.isValid) {
            input.classList.remove('error');
            input.classList.add('success');
            if (errorContainer) {
                errorContainer.style.display = 'none';
            }
        } else {
            input.classList.remove('success');
            input.classList.add('error');
            if (errorContainer) {
                errorContainer.textContent = field.errors[0];
                errorContainer.style.display = 'block';
            }
        }
    }
    
    displayErrors() {
        Object.keys(this.fields).forEach(fieldName => {
            this.updateFieldStatus(fieldName);
        });
        
        // Focus on first invalid field
        const firstInvalid = Object.values(this.fields).find(field => !field.isValid);
        if (firstInvalid) {
            firstInvalid.element.focus();
        }
    }
    
    clearFieldError(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return;
        
        const input = field.element;
        const errorContainer = this.getErrorContainer(input);
        
        if (errorContainer) {
            errorContainer.style.display = 'none';
        }
    }
    
    getErrorContainer(input) {
        let container = input.nextElementSibling;
        
        if (!container || !container.classList.contains('error-message')) {
            container = document.createElement('div');
            container.className = 'error-message';
            input.parentNode.insertBefore(container, input.nextSibling);
        }
        
        return container;
    }
    
    // Static method for quick validation
    static validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    static validatePhone(phone) {
        const regex = /^[\+]?[1-9][\d]{0,15}$/;
        return regex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    static validateURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new FormValidator('contactForm', {
            showErrors: true,
            highlightFields: true
        });
    }
});