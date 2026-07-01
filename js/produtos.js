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
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove('show'), 2000);
}

function openModal(button) {
  if (!modal || !modalTitle || !modalPrice || !modalDescription || !modalDetails) return;
  modalTitle.textContent = button.dataset.title;
  modalPrice.textContent = button.dataset.price;
  modalDescription.textContent = button.dataset.description;
  const items = button.dataset.details.split('•').filter(Boolean);
  modalDetails.innerHTML = items.map((item) => `<li>${item.trim()}</li>`).join('');
  modal.hidden = false;
  document.body.classList.add('modal-open');
}

function closeModalWindow() {
  if (modal) {
    modal.hidden = true;
  }
  document.body.classList.remove('modal-open');
}

function setLoginMessage(message, type = 'error') {
  if (!loginError) return;
  loginError.textContent = message || '';
  loginError.classList.remove('login-success');
  if (type === 'success') {
    loginError.classList.add('login-success');
  }
  loginError.hidden = !message;
}

function getLoginEndpoint() {
  return window.location.pathname.includes('/html/') ? 'login.php' : 'html/login.php';
}

function openLoginModal() {
  if (!loginModal || !loginForm || !loginError) return;
  setLoginMessage('', 'error');
  loginForm.reset();
  loginModal.hidden = false;
  document.body.classList.add('modal-open');
  document.getElementById('loginEmail').focus();
}

function closeLoginModalWindow() {
  if (loginModal) {
    loginModal.hidden = true;
  }
  document.body.classList.remove('modal-open');
}

function openCartModal() {
  if (!cartModal) return;
  renderCart();
  cartModal.hidden = false;
  document.body.classList.add('modal-open');
}

function closeCartModalWindow() {
  if (cartModal) {
    cartModal.hidden = true;
  }
  document.body.classList.remove('modal-open');
}

function openProjectModal() {
  if (!projectModal || !projectForm || !projectFormMessage) return;
  projectFormMessage.textContent = '';
  projectForm.reset();
  projectModal.hidden = false;
  document.body.classList.add('modal-open');
}

function closeProjectModalWindow() {
  if (projectModal) {
    projectModal.hidden = true;
  }
  document.body.classList.remove('modal-open');
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calculateTotal() {
  return cartItems.reduce((sum, item) => sum + item.price, 0);
}

function renderCart() {
  if (!cartItemsList || !cartEmpty || !cartTotal || !checkoutBtn) return;
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
  const countEl = document.getElementById('cartCount');
  if (countEl) {
    countEl.textContent = cartItems.length;
  }
}

// Eventos dos botões de detalhes
document.querySelectorAll('.details-btn').forEach((button) => {
  button.addEventListener('click', () => openModal(button));
});

// Fechamento de Modais
if (closeModal && modal) {
  closeModal.addEventListener('click', closeModalWindow);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModalWindow();
  });
}
if (closeLoginModal && loginModal) {
  closeLoginModal.addEventListener('click', closeLoginModalWindow);
  loginModal.addEventListener('click', (event) => {
    if (event.target === loginModal) closeLoginModalWindow();
  });
}
if (closeCartModal && cartModal) {
  closeCartModal.addEventListener('click', closeCartModalWindow);
  cartModal.addEventListener('click', (event) => {
    if (event.target === cartModal) closeCartModalWindow();
  });
}
if (closeProjectModal && projectModal) {
  closeProjectModal.addEventListener('click', closeProjectModalWindow);
  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) closeProjectModalWindow();
  });
}
if (customProjectBtn) {
  customProjectBtn.addEventListener('click', openProjectModal);
}

// ENVIO DO FORMULÁRIO DE PROPOSTAS (UNIFICADO COM BACK-END)
if (projectForm && projectFormMessage) {
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
    const response = await fetch('salvar-projeto.php', {
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
}

// Tecla ESC para fechar modais
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (modal && !modal.hidden) closeModalWindow();
    if (loginModal && !loginModal.hidden) closeLoginModalWindow();
    if (cartModal && !cartModal.hidden) closeCartModalWindow();
    if (projectModal && !projectModal.hidden) closeProjectModalWindow();
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

if (cartButton) {
  cartButton.addEventListener('click', () => {
    openCartModal();
  });
}

if (cartItemsList) {
  cartItemsList.addEventListener('click', (event) => {
    if (!event.target.matches('.cart-item-remove')) return;
    const index = Number(event.target.dataset.index);
    cartItems.splice(index, 1);
    updateCartCount();
    renderCart();
    showToast('Item removido do carrinho.');
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) return;
    cartItems = [];
    updateCartCount();
    renderCart();
    showToast('Compra finalizada com sucesso!');
  });
}

// Autenticação (Login fictício)
function getDisplayName() {
  const storedName = localStorage.getItem('artechUserName');
  if (storedName) return storedName;

  const storedEmail = localStorage.getItem('artechUser');
  if (storedEmail) return storedEmail.split('@')[0];

  return 'usuário';
}

function renderAuth() {
  const user = localStorage.getItem('artechUser');
  const isLogged = Boolean(user);

  if (userGreeting) {
    userGreeting.textContent = isLogged ? `Olá, ${getDisplayName()}` : '';
    userGreeting.hidden = !isLogged;
    userGreeting.style.display = isLogged ? 'inline-flex' : 'none';
  }
  if (logoutBtn) {
    logoutBtn.hidden = !isLogged;
    logoutBtn.style.display = isLogged ? 'inline-flex' : 'none';
  }
  if (loginBtn) {
    loginBtn.hidden = isLogged;
    loginBtn.style.display = isLogged ? 'none' : 'inline-flex';
  }
}

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    openLoginModal();
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('artechUser');
    localStorage.removeItem('artechUserName');
    renderAuth();
    showToast('Logout realizado com sucesso.');
  });
}

if (loginForm && loginError) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
      setLoginMessage('Preencha e-mail e senha para entrar.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('senha', password);

    try {
      const response = await fetch(getLoginEndpoint(), {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (result.status === 'success') {
        const displayName = result.nome || email.split('@')[0];
        localStorage.setItem('artechUser', email);
        localStorage.setItem('artechUserName', displayName);
        renderAuth();
        setLoginMessage(result.message || 'Login realizado com sucesso.', 'success');
        closeLoginModalWindow();
        showToast(`Bem-vindo(a), ${displayName}!`);
      } else {
        setLoginMessage(result.message || 'E-mail ou senha inválidos.', 'error');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setLoginMessage('Erro ao conectar com o servidor.', 'error');
    }
  });
}

renderAuth();