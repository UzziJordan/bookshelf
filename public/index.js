async function fetchBooks() {
    try {
        const response = await fetch('/books');
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        document.getElementById('book-list').innerHTML = '<p>Error loading books.</p>';
    }
}

function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    if (books.length === 0) {
        bookList.innerHTML = '<p>No books found. Add one!</p>';
        return;
    }

    bookList.innerHTML = books.map(book => `
        <div class="book-card">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Status:</strong> ${book.isRead ? 'Read' : 'Unread'}</p>
            <button class="btn delete" data-id="${book.id}" data-title="${book.title}">Delete</button>
        </div>
    `).join('');

    // Attach event listeners to all delete buttons
    document.querySelectorAll('.btn.delete').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const title = e.target.getAttribute('data-title');
            deleteBook(id, title);
        });
    });
}

async function deleteBook(id, title) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
        const response = await fetch(`/books/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchBooks(); // Refresh list
        } else {
            const error = await response.json();
            alert('Error deleting book: ' + error.error);
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book.');
    }
}

window.onload = fetchBooks;
