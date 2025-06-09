function handleSubmit(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    alert(`Thank you for subscribing with ${email}!`);
    emailInput.value = ''; 
}

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.fade-in');
    images.forEach(image => {
        image.classList.add('visible');
    });
});

const heading = document.getElementById('main-heading');
const observerOptions = {
    threshold: 0.1 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

if (heading) {
    observer.observe(heading);
}

const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
}