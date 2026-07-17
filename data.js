// Все категории с полным набором услуг и мастеров
const categories = {
  dentistry: {
    name: "Стоматология",
    emoji: "🦷",
    services: [
      { name: "Чистка зубов", masters: ["Д-р Иванова", "Д-р Петров"], slots: generateSlots() },
      { name: "Лечение кариеса", masters: ["Д-р Смирнов"], slots: generateSlots() },
      { name: "Отбеливание", masters: ["Д-р Козлова"], slots: generateSlots() },
      { name: "Имплантация", masters: ["Д-р Орлов"], slots: generateSlots() },
      { name: "Брекеты", masters: ["Д-р Васильева"], slots: generateSlots() }
    ]
  },
  beauty: {
    name: "Салон красоты",
    emoji: "💅",
    services: [
      { name: "Стрижка", masters: ["Анна", "Елена"], slots: generateSlots() },
      { name: "Маникюр", masters: ["Ольга"], slots: generateSlots() },
      { name: "Окрашивание", masters: ["Мария"], slots: generateSlots() },
      { name: "Педикюр", masters: ["Светлана"], slots: generateSlots() },
      { name: "Брови/ресницы", masters: ["Юлия"], slots: generateSlots() }
    ]
  },
  auto: {
    name: "Автосервис",
    emoji: "🔧",
    services: [
      { name: "Замена масла", masters: ["Механик №1", "Механик №2"], slots: generateSlots() },
      { name: "Диагностика", masters: ["Механик №3"], slots: generateSlots() },
      { name: "Шиномонтаж", masters: ["Механик №4"], slots: generateSlots() },
      { name: "Ремонт ходовой", masters: ["Механик №5"], slots: generateSlots() }
    ]
  },
  flowers: {
    name: "Цветочный магазин",
    emoji: "🌸",
    services: [
      { name: "Букет из роз", masters: ["Флорист Ольга"], slots: generateSlots() },
      { name: "Свадебный букет", masters: ["Флорист Анна"], slots: generateSlots() },
      { name: "Композиция в коробке", masters: ["Флорист Ирина"], slots: generateSlots() },
      { name: "Цветы на заказ", masters: ["Флорист Елена"], slots: generateSlots() }
    ]
  },
  legal: {
    name: "Юридические услуги",
    emoji: "⚖️",
    services: [
      { name: "Консультация", masters: ["Адвокат Павлов"], slots: generateSlots() },
      { name: "Составление договора", masters: ["Юрист Соколова"], slots: generateSlots() },
      { name: "Представительство в суде", masters: ["Адвокат Морозов"], slots: generateSlots() }
    ]
  },
  fitness: {
    name: "Фитнес-клуб",
    emoji: "🏋️",
    services: [
      { name: "Персональная тренировка", masters: ["Тренер Алексей", "Тренер Марина"], slots: generateSlots() },
      { name: "Групповое занятие", masters: ["Инструктор Олег"], slots: generateSlots() },
      { name: "Составление программы", masters: ["Тренер Екатерина"], slots: generateSlots() }
    ]
  }
};

// Генерация времени с 09:00 до 18:00 с шагом 30 минут
function generateSlots() {
  const slots = [];
  for (let h = 9; h <= 17; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = String(h).padStart(2, '0');
      const min = String(m).padStart(2, '0');
      slots.push(`${hour}:${min}`);
    }
  }
  return slots;
}

// Конфиг бота
const BOT_USERNAME = 'Test69_t1_bot';
const BOT_LINK = `https://t.me/${BOT_USERNAME}`;

// Данные для конструктора (цены и опции)
const constructorOptions = {
  type: ['Запись на услугу', 'Консультация', 'Продажа товара'],
  complexity: ['Простой', 'Средний', 'Сложный'],
  integration: ['Нет', 'CRM', 'Оплата', 'Уведомления']
};

const priceMatrix = {
  'Запись на услугу': { 'Простой': 10000, 'Средний': 20000, 'Сложный': 35000 },
  'Консультация': { 'Простой': 15000, 'Средний': 25000, 'Сложный': 40000 },
  'Продажа товара': { 'Простой': 20000, 'Средний': 30000, 'Сложный': 50000 }
};
