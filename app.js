// ---------- КОНСТРУКТОР ----------
function initConstructor() {
  const typeSelect = document.getElementById('constrType');
  const complexitySelect = document.getElementById('constrComplexity');
  const integrationSelect = document.getElementById('constrIntegration');
  const priceSpan = document.getElementById('constrPrice');

  // Заполняем выпадающие списки
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
    // Надбавка за интеграции
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

// Вызываем при загрузке страницы, если страница конструктора активна
document.addEventListener('DOMContentLoaded', () => {
  initConstructor();
  // ... остальной код
});
