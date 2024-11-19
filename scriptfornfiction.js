const API_KEY = 'AIzaSyC7FzaCkwTtfqowkPDbAQUMXjHGnMbaDa8';
const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

const form = document.getElementById('book-search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results');
const loader = document.getElementById('loader');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();

    if (!query) {
        resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    loader.style.display = 'block';
    resultsContainer.innerHTML = '';

    try {
        const response = await fetch(`${API_URL}${query}&key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }

        const data = await response.json();
        displayResults(data.items || []);
    } catch (error) {
        console.error('Error fetching data:', error);
        resultsContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    } finally {
        loader.style.display = 'none';
    }
});

function displayResults(books) {
    resultsContainer.innerHTML = '';

    if (books.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    books.forEach((book) => {
        const { volumeInfo } = book;

        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML = `
            <h3>${volumeInfo.title || 'No title available'}</h3>
            <p><strong>Author:</strong> ${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}</p>
            <p><strong>Description:</strong> ${truncateText(volumeInfo.description, 150)}</p>
            <img src="${volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="${volumeInfo.title}">
        `;

        resultsContainer.appendChild(bookCard);
    });
}

function truncateText(text, maxLength) {
    if (!text) return 'No description available.';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
