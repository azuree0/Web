* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    display: flex;
    flex-direction: column; 
    min-height: 100vh; 
}

nav {
    position: fixed;
    background: #312000;
    width: 100%;
    z-index: 12;
    transition: background 0.3s ease; 
}

nav.scrolled {
    background: rgba(49, 32, 0, 0.9); 
}

nav .menu {
    max-width: 3000px;
    margin: auto;
    display: flex;
    align-items: center;
    padding: 0 20px;
}

.menu .logo {
    margin-right: auto; 
}

.menu .logo a {
    text-decoration: none;
    color: #ffffeb;
    font-size: 35px;
    font-weight: 600;
}

.menu ul.nav-links {
    display: flex;
}

.menu ul li {
    list-style: none; 
}

.menu ul li a {
    text-decoration: none;
    color: #fffce1;
    font-size: 18px;
    font-weight: 500;
    padding: 8px 15px;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.img {
    background: url(arch.jpeg) no-repeat;
    height: 100vh;
    width: 100%;
    background-size: cover;
    background-position: center; 
    position: relative;
}

.img::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 16, 27, 0.4);
}

.menu .logo a {
    font-size: 28px;
}

.menu ul li a {
    font-size: 16px; 
}

.center {
    position: absolute;
    top: 52%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    padding: 0 20px;
    text-align: center;
}

.center .title {
    color: #fdfbf2;
    font-size: 55px;
    font-weight: 600;
}

.center .sub_title {
    color: #ededd9;
    font-size: 52px;
    font-weight: 600;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline;
    margin-right: 20px;
}

a {
    text-decoration: none;
    color: #fff1e3;
    padding: 10px 15px;
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
    border-radius: 5px;
}

a:hover {
    background-color: #c0b097; 
    color: #723d00; 
    box-shadow: 0 0 10px rgba(55, 29, 0, 0.5); 
}

.social-icons {
    display: flex; 
    align-items: center; 
    margin-left: 10px; 
}

.social-icons img {
    width: 23px; 
    height: auto; 
    transition: transform 0.3s ease; 
}

.social-icons img:hover {
    transform: scale(1.2); 

.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.hamburger span {
    background: #fffce1;
    height: 3px;
    width: 25px;
    margin: 4px 0;
    transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
}

@media (max-width: 768px) {
    .hamburger {
        display: flex;
    }

    .menu ul.nav-links {
        display: none;
        flex-direction: column;
        width: 100%;
        position: absolute;
        top: 60px;
        left: 0;
        background: #312000;
        padding: 20px;
    }

    .menu ul.nav-links.active {
        display: flex;
    }

    .menu ul li {
        margin: 10px 0;
    }

    .social-icons {
        margin: 10px 0;
    }
}

h1 {
    margin-top: 50px; 
}

p {
    margin-top: 20px; 
}

.container {
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-between; 
}

.i {
    width: 400px; 
    height: 400px; 
    margin: 10px; 
    margin-top: 10px;
}

.ii1 { 
    font-size: 30px;
    margin-left: 10px;
}

.i2 {
    width: 1750px; 
    height: 900px;
    margin-left: 530px;
    margin-top: 20px;
}    

.ii2 { 
    font-size: 30px;
    margin-left: 540px;
}

.i3 {
    width: 900px; 
    height: 1100px; 
    margin-left: 1350px;
    margin-top: 20px;
}    

.ii3 { 
    font-size: 30px;
    margin-left: 1370px;
}