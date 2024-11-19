const changeMessageButton = document.getElementById("changeMessageButton");
const messageElement = document.getElementById("message");

changeMessageButton.addEventListener("click", () => {
    const messages = [
        "It's a great day to read!",
        "Remember, a book is a dream that you hold in your hand.",
        "Reading can take you anywhere!",
        "Don't judge a book by its movie!",
        "Books are a uniquely portable magic.",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = randomMessage;
});

function filterByPrice() {
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

    localStorage.setItem("minPrice", minPrice);
    localStorage.setItem("maxPrice", maxPrice);

    const books = document.querySelectorAll(".book-item");

    books.forEach(book => {
        const price = parseFloat(book.getAttribute("data-price"));
        if (price >= minPrice && price <= maxPrice) {
            book.style.display = "flex";
        } else {
            book.style.display = "none";
        }
    });
}

function loadFilterValues() {
    const minPrice = localStorage.getItem("minPrice");
    const maxPrice = localStorage.getItem("maxPrice");

    if (minPrice !== null) {
        document.getElementById("minPrice").value = minPrice;
    }
    if (maxPrice !== null) {
        document.getElementById("maxPrice").value = maxPrice;
    }

    filterByPrice();
}

window.addEventListener("DOMContentLoaded", loadFilterValues);

document.getElementById("applyFilterBtn").addEventListener("click", filterByPrice);
