document.getElementById('create-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const bookData = {
        title: formData.get('title'),
        author: formData.get('author'),
        year: parseInt(formData.get('year')),
        isRead: formData.get('isRead') === 'on'
    };

    try {
        const response = await fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        if (response.ok) {
            alert('Book created successfully!');
            window.location.href = 'index.html';
        } else {
            const error = await response.json();
            alert('Error creating book: ' + (error.errors ? error.errors.map(err => err.msg).join(', ') : error.error));
        }
    } catch (error) {
        console.error('Error creating book:', error);
        alert('Failed to create book.');
    }
});
