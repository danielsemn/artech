const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');
const modal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const modalDetails = document.getElementById('modalDetails');
const toast = document.getElementById('toast');
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginForm = document.getElementById('loginForm');
const userGreeting = document.getElementById('userGreeting');
const logoutBtn = document.getElementById('logoutBtn');
const loginError = document.getElementById('loginError');
const cartModal = document.getElementById('cartModal');
const closeCartModal = document.getElementById('closeCartModal');
const cartItemsList = document.getElementById('cartItemsList');
const cartEmpty = document.getElementById('cartEmpty');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

let cartItems = [];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove('show'), 2000);
}

function openModal(button) {
  modalTitle.textContent = button.dataset.title;
  modalPrice.textContent = button.dataset.price;
  modalDescription.textContent = button.dataset.description;
  const items = button.dataset.details.split('•').filter(Boolean);
  modalDetails.innerHTML = items.map((item) => `<li>${item.trim()}</li>`).join('');
  modal.hidden = false;
  document.body.classList.add('modal-open');
}

function closeModalWindow() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

function openLoginModal() {
  loginError.textContent = '';
  loginForm.reset();
  loginModal.hidden = false;
  document.body.classList.add('modal-open');
  document.getElementById('loginName').focus();
}

function closeLoginModalWindow() {
  loginModal.hidden = true;
  document.body.classList.remove('modal-open');
}

function openCartModal() {
  renderCart();
  cartModal.hidden = false;
  document.body.classList.add('modal-open');
}

function closeCartModalWindow() {
  cartModal.hidden = true;
  document.body.classList.remove('modal-open');
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calculateTotal() {
  return cartItems.reduce((sum, item) => sum + item.price, 0);
}

function renderCart() {
  cartItemsList.innerHTML = '';
  if (cartItems.length === 0) {
    cartEmpty.hidden = false;
    cartTotal.textContent = 'R$ 0,00';
    checkoutBtn.disabled = true;
    return;
  }

  cartEmpty.hidden = true;
  checkoutBtn.disabled = false;

  cartItems.forEach((item, index) => {
    const itemElement = document.createElement('li');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>${formatCurrency(item.price)}</span>
      </div>
      <button class="cart-item-remove" data-index="${index}" type="button">Remover</button>
    `;
    cartItemsList.appendChild(itemElement);
  });

  cartTotal.textContent = formatCurrency(calculateTotal());
}

function updateCartCount() {
  document.getElementById('cartCount').textContent = cartItems.length;
}

document.querySelectorAll('.details-btn').forEach((button) => {
  button.addEventListener('click', () => openModal(button));
});

closeModal.addEventListener('click', closeModalWindow);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModalWindow();
});
closeLoginModal.addEventListener('click', closeLoginModalWindow);
loginModal.addEventListener('click', (event) => {
  if (event.target === loginModal) closeLoginModalWindow();
});
closeCartModal.addEventListener('click', closeCartModalWindow);
cartModal.addEventListener('click', (event) => {
  if (event.target === cartModal) closeCartModalWindow();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (!modal.hidden) closeModalWindow();
    if (!loginModal.hidden) closeLoginModalWindow();
    if (!cartModal.hidden) closeCartModalWindow();
  }
});

document.querySelectorAll('.cart-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const itemPrice = Number(button.dataset.price.replace(/[R$\.\s]/g, '').replace(',', '.'));
    cartItems.push({
      name: button.dataset.name,
      price: itemPrice,
    });
    updateCartCount();
    showToast(`${button.dataset.name} adicionado ao carrinho.`);
  });
});

cartButton.addEventListener('click', () => {
  openCartModal();
});

cartItemsList.addEventListener('click', (event) => {
  if (!event.target.matches('.cart-item-remove')) return;
  const index = Number(event.target.dataset.index);
  cartItems.splice(index, 1);
  updateCartCount();
  renderCart();
  showToast('Item removido do carrinho.');
});

checkoutBtn.addEventListener('click', () => {
  if (cartItems.length === 0) return;
  cartItems = [];
  updateCartCount();
  renderCart();
  showToast('Compra finalizada com sucesso!');
});

function renderAuth() {
  const user = localStorage.getItem('artechUser');
  if (user) {
    loginPanel.hidden = true;
    userGreeting.hidden = false;
    userGreeting.textContent = `Olá, ${user}`;
    logoutBtn.hidden = false;
    loginBtn.hidden = true;
  } else {
    loginPanel.hidden = true;
    userGreeting.hidden = true;
    logoutBtn.hidden = true;
    loginBtn.hidden = false;
  }
}

loginBtn.addEventListener('click', () => {
  openLoginModal();
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('artechUser');
  renderAuth();
  showToast('Logout realizado com sucesso.');
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('loginName').value.trim();
  const email = document.getElementById('loginEmail').value.trim();
  if (!name || !email) {
    loginError.textContent = 'Preencha nome e e-mail para entrar.';
    return;
  }

  localStorage.setItem('artechUser', name);
  renderAuth();
  closeLoginModalWindow();
  showToast(`Bem-vindo(a), ${name}!`);
});

renderAuth();
