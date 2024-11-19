function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPassword(password) {
    return password.length >= 6;
}

function isValidPhone(phone) {
    const phonePattern = /^\+?[1-9]\d{1,14}$|^\(\d{3}\) \d{3}-\d{4}$/;
    return phonePattern.test(phone);
}


function registerUser() {
    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const phone = document.getElementById("reg-phone").value.trim();

    if (!username || !email || !password || !phone) {
        alert("All fields are required.");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!isValidPassword(password)) {
        alert("Password must be at least 8 characters long and include a number, a special character, and a mix of uppercase and lowercase letters.");
        return;
    }

    if (!isValidPhone(phone)) {
        alert("Please enter a valid phone number format.");
        return;
    }

    localStorage.setItem("user", JSON.stringify({ username, email, password, phone }));
    alert("Registration successful!");
    document.getElementById("register-section").style.display = "block";
}

function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.username === username && savedUser.password === password) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
        window.location.href = "profile.html";
    } else {
        alert("Invalid username or password.");
    }
}


function displayUserGreeting(username) {
    const greetingElement = document.getElementById("user-greeting");
    greetingElement.textContent = `Welcome, ${username}!`;
    greetingElement.style.display = "inline-block";
    document.getElementById("logout-btn").style.display = "inline-block";
}

function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    document.getElementById("user-greeting").style.display = "none";
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("register-section").style.display = "block";
    document.getElementById("login-section").style.display = "block";
    document.getElementById("login-section").style.display = "block";
    document.getElementById("register-section").style.display = "none";
}

function displayUserGreeting(username) {
    const greetingElement = document.getElementById("user-greeting");
    greetingElement.textContent = `Welcome, ${username}!`;
    greetingElement.style.display = "inline-block";
    document.getElementById("logout-btn").style.display = "inline-block";


    document.getElementById("login-section").style.display = "none";
    document.getElementById("register-section").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (savedUser && isLoggedIn) {
        displayUserGreeting(savedUser.username);
        document.getElementById("register-section").style.display = "none";
        document.getElementById("login-section").style.display = "none";
    }
});

function toggleRegister() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("register-section").style.display = "block";
}

function toggleLogin() {
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}

function displayGreeting() {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
        greeting = 'Good Morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Good afternoon!';
    } else if (currentHour >= 18 && currentHour < 22) {
        greeting = 'Good evening!';
    } else {
        greeting = 'Good night!'; s
    }

    document.getElementById('greeting').textContent = greeting;
}


