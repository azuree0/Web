document.getElementById('info-btn').addEventListener('click', () => {
    alert('Learn more about our customizable engineering solutions!');
});

document.getElementById('subscribe-btn').addEventListener('click', () => {
    document.getElementById('subscribe-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('subscribe-modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('subscribe-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.getElementById('subscribe-form').addEventListener('submit', (event) => {
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
    document.getElementById('subscribe-modal').style.display = 'none'; 
});

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.includes('#')) {
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = targetId; 
        }
    });
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});