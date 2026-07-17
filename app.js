// ---------- TELEGRAM ----------
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// ---------- НАВИГАЦИЯ ----------
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });
  if (page === 'bots') {
    document.getElementById('botsList').classList.remove('hidden');
    document.getElementById('botDemo').classList.add('hidden');
    renderBotsList();
  }
  if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    navigateTo(item.dataset.page);
  });
});

// ---------- СПИСОК БОТОВ ----------
function renderBotsList() {
  const grid = document.getElementById('botsGrid');
  grid.innerHTML = '';
  for (const [key, cat] of Object.entries(categories)) {
    const card = document.createElement('div');
    card.className = 'bot-card';
    card.innerHTML = `<span class="emoji">${cat.emoji}</span><div class="name">${cat.name}</div>`;
    card.addEventListener('click', () => openBotDemo(key));
    grid.appendChild(card);
  }
}

// ---------- ДЕМО-ЧАТ ----------
let currentCategoryKey = null;
let currentService = null;
let selectedMaster = null;
let selectedTime = null;
let step = 'services';

function openBotDemo(categoryKey) {
  currentCategoryKey = categoryKey;
  currentService = null;
  selectedMaster = null;
  selectedTime = null;
  step = 'services';

  document.getElementById('botsList').classList.add('hidden');
  document.getElementById('botDemo').classList.remove('hidden');

  const cat = categories[categoryKey];
  document.getElementById('demoTitle').textContent = cat.emoji + ' ' + cat.name;

  const container = document.getElementById('demoChat');
  container.innerHTML = '';
  addBotMessage(`👋 Здравствуйте! Выберите услугу из списка ниже:`);
  showServicesButtons(cat.services);
}

function addBotMessage(text) {
  const container = document.getElementById('demoChat');
  const div = document.createElement('div');
  div.className = 'msg';
  div.innerHTML = text + `<span class="time">${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>`;
  container.appendChild(div);
  scrollChatToBottom();
}

function addUserMessage(text) {
  const container = document.getElementById('demoChat');
  const div = document.createElement('div');
  div.className = 'msg user';
  div.innerHTML = text + `<span class="time">${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>`;
  container.appendChild(div);
  scrollChatToBottom();
}

function addButtons(buttonsArray, callback) {
  const container = document.getElementById('demoChat');
  const oldGroup = container.querySelector('.btn-group');
  if (oldGroup) oldGroup.remove();

  const group = document.createElement('div');
  group.className = 'btn-group';
  buttonsArray.forEach(label => {
    const btn = document.createElement('div');
    btn.className = 'btn';
    btn.textContent = label;
    btn.addEventListener('click', () => {
      group.remove();
      callback(label);
    });
    group.appendChild(btn);
  });
  container.appendChild(group);
  scrollChatToBottom();
}

function scrollChatToBottom() {
  const container = document.getElementById('demoChat');
  container.scrollTop = container.scrollHeight;
}

function showServicesButtons(services) {
  const labels = services.map(s => s.name);
  addButtons(labels, (selectedLabel) => {
    addUserMessage(selectedLabel);
    const service = services.find(s => s.name === selectedLabel);
    currentService = service;
    if (service.masters && service.masters.length > 1) {
      step = 'masters';
      setTimeout(() => {
        addBotMessage(`Отлично! Выберите мастера для "${service.name}":`);
        showMastersButtons(service.masters);
      }, 400);
    } else {
      if (service.masters && service.masters.length === 1) {
        selectedMaster = service.masters[0];
      } else {
        selectedMaster = null;
      }
      step = 'time';
      setTimeout(() => {
        addBotMessage(`Выберите удобное время:`);
        showSlotsButtons(service.slots);
      }, 400);
    }
  });
}

function showMastersButtons(masters) {
  addButtons(masters, (selected) => {
    addUserMessage(selected);
    selectedMaster = selected;
    step = 'time';
    setTimeout(() => {
      addBotMessage(`Выбрали мастера ${selected}. Теперь выберите время:`);
      showSlotsButtons(currentService.slots);
    }, 400);
  });
}

function showSlotsButtons(slots) {
  addButtons(slots, (selected) => {
    addUserMessage(selected);
    selectedTime = selected;
    step = 'confirm';
    setTimeout(() => {
      addBotMessage(`Вы выбрали время ${selected}. Подтвердить запись?`);
      addButtons(['✅ Подтвердить запись'], () => {
        addUserMessage('✅ Подтвердить запись');
        setTimeout(() => {
          addBotMessage('⏳ Отправляем запрос администратору...');
          setTimeout(() => {
            addBotMessage('✅ Ваша запись подтверждена! Ожидайте уведомление в личных сообщениях.');
            addButtons(['🔄 Начать заново'], () => {
              resetDemo();
            });
          }, 1000);
        }, 500);
      });
    }, 400);
  });
}

function resetDemo() {
  const container = document.getElementById('demoChat');
  container.innerHTML = '';
  currentService = null;
  selectedMaster = null;
  selectedTime = null;
  step = 'services';
  const cat = categories[currentCategoryKey];
  addBotMessage(`👋 Здравствуйте! Выберите услугу из списка ниже:`);
  showServicesButtons(cat.services);
}

document.getElementById('backToBotsList').addEventListener('click', function() {
  document.getElementById('botsList').classList.remove('hidden');
  document.getElementById('botDemo').classList.add('hidden');
});

// ---------- КОНСТРУКТОР ----------
function initConstructor() {
  const typeSelect = document.getElementById('constrType');
  const complexitySelect = document.getElementById('constrComplexity');
  const integrationSelect = document.getElementById('constrIntegration');
  const priceSpan = document.getElementById('constrPrice');

  constructorOptions.type.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    typeSelect.appendChild(opt);
  });
  constructorOptions.complexity.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    complexitySelect.appendChild(opt);
  });
  constructorOptions.integration.forEach(i => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    integrationSelect.appendChild(opt);
  });

  function updatePrice() {
    const type = typeSelect.value;
    const complexity = complexitySelect.value;
    const integration = integrationSelect.value;
    let base = priceMatrix[type]?.[complexity] || 0;
    if (integration === 'CRM') base += 5000;
    else if (integration === 'Оплата') base += 10000;
    else if (integration === 'Уведомления') base += 3000;
    priceSpan.textContent = base + ' ₽';
  }

  typeSelect.addEventListener('change', updatePrice);
  complexitySelect.addEventListener('change', updatePrice);
  integrationSelect.addEventListener('change', updatePrice);
  updatePrice();
}

// ---------- КОНТАКТ ----------
function contactMe() {
  tg.openTelegramLink(BOT_LINK);
}

// ---------- СТАРТ ----------
document.addEventListener('DOMContentLoaded', () => {
  renderBotsList();
  navigateTo('home');
  initConstructor();
});
