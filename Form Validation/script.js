const nameError = document.getElementById('name-error');
const phoneError = document.getElementById('phone-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const messageError = document.getElementById('message-error');
const submitError = document.getElementById('submit-error');
const submitSuccess = document.getElementById('submit-success');
const charCount = document.getElementById('char-count');
const form = document.getElementById('contact-form');

function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('contactForm')) || {};
    document.getElementById('contact-name').value = savedData.name || '';
    document.getElementById('contact-phone').value = savedData.phone || '';
    document.getElementById('contact-email').value = savedData.email || '';
    document.getElementById('contact-password').value = savedData.password || '';
    document.getElementById('contact-message').value = savedData.message || '';
    updateCharCount();
}

function saveFormData() {
    const formData = {
        name: document.getElementById('contact-name').value,
        phone: document.getElementById('contact-phone').value,
        email: document.getElementById('contact-email').value,
        password: document.getElementById('contact-password').value,
        message: document.getElementById('contact-message').value
    };
    localStorage.setItem('contactForm', JSON.stringify(formData));
}

function updateCharCount() {
    const message = document.getElementById('contact-message').value;
    const required = 30;
    charCount.innerHTML = `${message.length}/${required} characters`;
}

function validateName() {
    const name = document.getElementById('contact-name').value;
    
    if (name.length === 0) {
        nameError.innerHTML = 'Name is required';
        return false;
    }
    if (!name.match(/^[A-Za-z]+ [A-Za-z]+$/)) {
        nameError.innerHTML = 'Write full name (e.g., First Last)';
        return false;
    }
    nameError.innerHTML = '<i class="fas fa-check-circle"></i>';
    saveFormData();
    return true;
}

function validatePhone() {
    const phone = document.getElementById('contact-phone').value;

    if (phone.length === 0) {
        phoneError.innerHTML = 'Phone number is required';
        return false;
    }
    if (phone.length !== 10) {
        phoneError.innerHTML = 'Phone number should be 10 digits';
        return false;
    }
    if (!phone.match(/^[0-9]{10}$/)) {
        phoneError.innerHTML = 'Only digits please';
        return false;
    }
    phoneError.innerHTML = '<i class="fas fa-check-circle"></i>';
    saveFormData();
    return true;
}

function validateEmail() {
    const email = document.getElementById('contact-email').value;

    if (email.length === 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        emailError.innerHTML = 'Email Invalid';
        return false;
    }
    emailError.innerHTML = '<i class="real-time fa-check-circle"></i>';
    saveFormData();
    return true;
}

function validatePassword() {
    const password = document.getElementById('contact-password').value;

    if (password.length === 0) {
        passwordError.innerHTML = 'Password is required';
        return false;
    }
    if (password.length < 8) {
        passwordError.innerHTML = 'Password must be at least 8 characters';
        return false;
    }
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        passwordError.innerHTML = 'Password must include uppercase, lowercase, number, and special character';
        return false;
    }
    passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
    saveFormData();
    return true;
}

function validateMessage() {
    const message = document.getElementById('contact-message').value;
    const required = 30;
    const left = required - message.length;

    updateCharCount();
    if (left > 0) {
        messageError.innerHTML = `${left} more characters required`;
        return false;
    }
    messageError.innerHTML = '<i class="fas fa-check-circle"></i>';
    saveFormData();
    return true;
}

function clearForm() {
    form.reset();
    localStorage.removeItem('contactForm');
    nameError.innerHTML = '';
    phoneError.innerHTML = '';
    emailError.innerHTML = '';
    passwordError.innerHTML = '';
    messageError.innerHTML = '';
    submitError.style.display = 'none';
    submitSuccess.style.display = 'none';
    updateCharCount();
    document.getElementById('contact-name').focus();
}

function validateForm() {
    if (!validateName() || !validatePhone() || !validateEmail() || !validatePassword() || !validateMessage()) {
        submitError.style.display = 'block';
        submitError.innerHTML = 'Please fix errors to submit';
        setTimeout(() => { submitError.style.display = 'none'; }, 3000);
        return false;
    }

    const formData = {
        name: document.getElementById('contact-name').value,
        phone: document.getElementById('contact-phone').value,
        email: document.getElementById('contact-email').value,
        password: document.getElementById('contact-password').value,
        message: document.getElementById('contact-message').value
    };
    console.log('Form Submitted:', formData); 
    submitSuccess.style.display = 'block';
    submitSuccess.innerHTML = 'Form submitted successfully!';
    setTimeout(() => { submitSuccess.style.display = 'none'; }, 3000);
    clearForm(); 
    return false; 
}

document.addEventListener('DOMContentLoaded', () => {
    loadFormData();
    updateCharCount();
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        validateForm();
    });
});
