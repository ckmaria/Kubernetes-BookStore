et pour 
const books = [
  {
    title: "L'Étranger",
    author: "Albert Camus",
    category: "Roman",
    price: "59 MAD",
    oldPrice: "79 MAD",
    rating: 4.8,
    reviews: 320,
    cover: "cover-1",
    icon: "fa-book"
  },
  {
    title: "Une Brève Histoire du Temps",
    author: "Stephen Hawking",
    category: "Sciences",
    price: "89 MAD",
    oldPrice: null,
    rating: 4.7,
    reviews: 210,
    cover: "cover-2",
    icon: "fa-meteor"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Histoire",
    price: "99 MAD",
    oldPrice: "129 MAD",
    rating: 4.9,
    reviews: 540,
    cover: "cover-3",
    icon: "fa-landmark"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Informatique",
    price: "149 MAD",
    oldPrice: null,
    rating: 4.6,
    reviews: 180,
    cover: "cover-4",
    icon: "fa-laptop-code"
  },
  {
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    category: "Jeunesse",
    price: "45 MAD",
    oldPrice: "60 MAD",
    rating: 5.0,
    reviews: 980,
    cover: "cover-5",
    icon: "fa-children"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Développement personnel",
    price: "79 MAD",
    oldPrice: null,
    rating: 4.8,
    reviews: 410,
    cover: "cover-6",
    icon: "fa-feather"
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Roman",
    price: "55 MAD",
    oldPrice: "70 MAD",
    rating: 4.9,
    reviews: 670,
    cover: "cover-7",
    icon: "fa-book-open"
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    category: "Informatique",
    price: "159 MAD",
    oldPrice: null,
    rating: 4.5,
    reviews: 130,
    cover: "cover-8",
    icon: "fa-code"
  }
];


function renderBooks() {
  const grid = document.getElementById('books-grid');
  if (!grid) return;

  grid.innerHTML = books.map(book => `
    <article class="book-card">
      <div class="book-cover ${book.cover}">
        <i class="fa-solid ${book.icon}"></i>
        ${book.oldPrice ? `<span class="discount">PROMO</span>` : ''}
        <div class="fav" title="Ajouter aux favoris">
          <i class="fa-regular fa-heart"></i>
        </div>
      </div>
      <div class="book-info">
        <span class="book-category">${book.category}</span>
        <h3 class="book-title">${book.title}</h3>
        <span class="book-author">${book.author}</span>
        <div class="book-rating">
          ${'<i class="fa-solid fa-star"></i>'.repeat(Math.round(book.rating))}
          ${'<i class="fa-regular fa-star"></i>'.repeat(5 - Math.round(book.rating))}
          <span>${book.rating} (${book.reviews})</span>
        </div>
        <div class="book-footer">
          <div class="book-price">
            ${book.oldPrice ? `<span class="old-price">${book.oldPrice}</span>` : ''}
            ${book.price}
          </div>
          <button class="add-to-cart" title="Ajouter au panier">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}


function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = hamburger.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });
}

function setupActiveNav() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
}

function showToast(message, icon = 'fa-circle-check') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

const cart = {}; // { bookTitle: quantity }

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;

  const total = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  badge.textContent = total;

  badge.classList.remove('bump');
  // force reflow to restart animation
  void badge.offsetWidth;
  badge.classList.add('bump');
}

function setupCart() {
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-to-cart');
    if (addBtn) {
      const card = addBtn.closest('.book-card');
      const title = card?.querySelector('.book-title')?.textContent.trim() || 'Livre';

      cart[title] = (cart[title] || 0) + 1;
      updateCartBadge();

      const qty = cart[title];
      const message = qty > 1
        ? `"${title}" ajouté au panier (x${qty})`
        : `"${title}" ajouté au panier avec succès`;

      showToast(message, 'fa-cart-shopping');

      addBtn.style.transform = 'scale(1.3)';
      setTimeout(() => (addBtn.style.transform = ''), 200);
    }

    const fav = e.target.closest('.fav');
    if (fav) {
      const heart = fav.querySelector('i');
      const isAdding = heart.classList.contains('fa-regular');
      heart.classList.toggle('fa-regular');
      heart.classList.toggle('fa-solid');

      const card = fav.closest('.book-card');
      const title = card?.querySelector('.book-title')?.textContent.trim() || 'Livre';
      showToast(
        isAdding ? `"${title}" ajouté aux favoris` : `"${title}" retiré des favoris`,
        'fa-heart'
      );
    }
  });
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  renderBooks();
  setupMobileMenu();
  setupActiveNav();
  setupCart();
});
