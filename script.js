const menuItems = document.querySelectorAll('#menu li');

menuItems.forEach((item, index) => {
    item.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            if (index < menuItems.length - 1) {
                menuItems[index + 1].focus();
            } else {
                menuItems[0].focus();
            }
        }
        else if (event.key === 'ArrowUp') {
            if (index > 0) {
                menuItems[index - 1].focus();
            } else {
                menuItems[menuItems.length - 1].focus();
            }
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contactForm');
    const errorMessages = document.getElementById('contactErrorMessages');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let valid = true;

        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        errorMessages.innerHTML = '';

        if (!email.value || !validateEmail(email.value)) {
            valid = false;
            errorMessages.innerHTML += '<p>Please enter a valid email.</p>';
        }

        if (password.value.length < 6) {
            valid = false;
            errorMessages.innerHTML += '<p>Password must be at least 6 characters.</p>';
        }

        if (password.value !== confirmPassword.value) {
            valid = false;
            errorMessages.innerHTML += '<p>Passwords don’t match.</p>';
        }

        if (valid) {
            const successMessage = document.createElement('p');
            successMessage.textContent = "Thank you for contacting us! We will get back to you soon.";
            successMessage.style.color = "green";
            document.getElementById('contact-section').appendChild(successMessage);
            form.reset();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }


    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        item.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    const dateTimeDisplay = document.getElementById('dateTimeDisplay');

    function updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };

        const formattedDate = now.toLocaleDateString('en-US', options);
        dateTimeDisplay.textContent = formattedDate;
    };

    updateDateTime();
    setInterval(updateDateTime, 1000);

    document.querySelectorAll('.rating').forEach(rating => {
        const stars = rating.querySelectorAll('.star');
        const selectedRating = rating.nextElementSibling.querySelector('span');

        stars.forEach(star => {
            star.addEventListener('click', () => {
                stars.forEach(star => star.classList.remove('selected'));

                star.classList.add('selected');
                let value = star.getAttribute('data-value');
                for (let i = value; i > 0; i--) {
                    rating.querySelector(`.star[data-value="${i}"]`).classList.add('selected');
                }
                selectedRating.textContent = value;
            });
        });
    });
});

let darkMode = localStorage.getItem('darkMode'); 
const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', null);
}
 
if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode'); 
  
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {  
    disableDarkMode(); 
  }
});


document.getElementById('greeting-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name-input').value;
    const greetingElement = document.getElementById('greeting');

    if (name) {
        greetingElement.textContent = `Hello, ${name}!`;
    } else {
        greetingElement.textContent = 'Hello, Guest!';
    }
});

window.onload = function () {
    const savedUser = localStorage.getItem('name');
    
    if (savedUser) {
        showWelcome(savedUser);
    } else {
        showLoginForm();
    }
}
function login() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('user', username);
        showWelcome(username);
    }
}

function logout() {
    localStorage.removeItem('user');
    showLoginForm();
}
function showWelcome(username) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('welcomeMessage').style.display = 'block';
    document.getElementById('user-name').innerText = username;
}

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('welcomeMessage').style.display = 'none';
}

const notificationSound = document.getElementById('notificationSound');
function autoPlaySound() {
    notificationSound.play()
        .then(() => {
            console.log("Звук воспроизведён автоматически.");
        })
        .catch(error => {
            console.log("Автоматическое воспроизведение блокировано: ", error);
        });
}

document.addEventListener('DOMContentLoaded', autoPlaySound);
