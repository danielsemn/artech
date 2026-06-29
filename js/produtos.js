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
const projectModal = document.getElementById('projectModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const projectForm = document.getElementById('projectForm');
const projectFormMessage = document.getElementById('projectFormMessage');
const customProjectBtn = document.querySelector('.custom-project-btn');

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

function openProjectModal() {
  projectFormMessage.textContent = '';
  projectForm.reset();
  projectModal.hidden = false;
  document.body.classList.add('modal-open');
}

function closeProjectModalWindow() {
  projectModal.hidden = true;
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

// Eventos dos botões de detalhes
document.querySelectorAll('.details-btn').forEach((button) => {
  button.addEventListener('click', () => openModal(button));
});

// Fechamento de Modais
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
closeProjectModal.addEventListener('click', closeProjectModalWindow);
projectModal.addEventListener('click', (event) => {
  if (event.target === projectModal) closeProjectModalWindow();
});

customProjectBtn.addEventListener('click', openProjectModal);

// ENVIO DO FORMULÁRIO DE PROPOSTAS (UNIFICADO COM BACK-END)
projectForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('projectName').value.trim();
  const email = document.getElementById('projectEmail').value.trim();
  const title = document.getElementById('projectTitle').value.trim();
  const description = document.getElementById('projectDescription').value.trim();

  if (!name || !email || !title || !description) {
    projectFormMessage.style.color = 'red';
    projectFormMessage.textContent = 'Preencha os campos obrigatórios para enviar sua proposta.';
    return;
  }

  const formData = new FormData(projectForm);

  projectFormMessage.style.color = '#333';
  projectFormMessage.textContent = 'Enviando sua proposta...';

  try {
    const response = await fetch('salvar_projeto.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erro na resposta do servidor.');
    }

    const result = await response.json();

    if (result.status === 'success') {
      showToast('Proposta enviada com sucesso!');
      projectForm.reset();
      closeProjectModalWindow();
    } else {
      projectFormMessage.style.color = 'red';
      projectFormMessage.textContent = result.message;
    }

  } catch (error) {
    projectFormMessage.style.color = 'red';
    projectFormMessage.textContent = 'Houve um erro ao enviar. Por favor, tente novamente.';
    console.error('Erro:', error);
  }
});

// Tecla ESC para fechar modais
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (!modal.hidden) closeModalWindow();
    if (!loginModal.hidden) closeLoginModalWindow();
    if (!cartModal.hidden) closeCartModalWindow();
    if (!projectModal.hidden) closeProjectModalWindow();
  }
});

// Adicionar ao carrinho (Ignora o botão do modal de projetos se você removeu a classe 'cart-btn' dele no HTML)
document.querySelectorAll('.cart-btn').forEach((button) => {
  button.addEventListener('click', () => {
    if (!button.dataset.price) return; // Evita erros caso clique em botões sem preço
    
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

// Autenticação (Login fictício)
function renderAuth() {
  const user = localStorage.getItem('artechUser');
  if (user) {
    userGreeting.hidden = false;
    userGreeting.textContent = `Olá, ${user}`;
    logoutBtn.hidden = false;
    loginBtn.hidden = true;
  } else {
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