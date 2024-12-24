document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const categories = document.querySelectorAll('.category');

    // set active nav link
    const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
    const activeLink = document.querySelector(`nav a[href$="${currentPage}.html"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();

        categories.forEach(category => {
            const title = category.querySelector('h2').textContent.toLowerCase();
            const items = category.querySelectorAll('li');
            let categoryVisible = false;

            if (fuzzySearch(title, searchTerm)) {
                categoryVisible = true;
                items.forEach(item => item.style.display = 'list-item');
            } else {
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (fuzzySearch(text, searchTerm)) {
                        item.style.display = 'list-item';
                        categoryVisible = true;
                    } else {
                        item.style.display = 'none';
                    }
                });
            }

            category.style.display = categoryVisible ? 'block' : 'none';
        });
    });

    function fuzzySearch(text, search) {
        search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(search.split('').join('.*'), 'i');
        return regex.test(text);
    }

    function highlightNewItems() {
        const newItems = document.querySelectorAll('.latest-additions li');
        newItems.forEach(item => {
            item.classList.add('new-item');
        });
    }

    function updateLatestAdditions() {
        const latestAdditionsList = document.getElementById('latest-additions-list');
        const allItems = Array.from(document.querySelectorAll('.category ul li'));
        
        const recentItems = allItems.slice(-3);

        latestAdditionsList.innerHTML = '';
        recentItems.forEach(item => {
            const newItem = item.cloneNode(true);
            latestAdditionsList.appendChild(newItem);
        });
    }

    highlightNewItems();
    updateLatestAdditions();
});
