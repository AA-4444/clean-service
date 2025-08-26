// Global variables
let currentSlide = 0;
const totalSlides = 13;
let currentLanguage = 'ru';

// Translations object
const translations = {
    ru: {
        'brand': 'City Wall Clean',
        'nav.services': 'Услуги',
        'nav.equipment': 'Оборудование', 
        'nav.gallery': 'Галерея',
        'nav.contact': 'Контакты',
        'order.cleaning': 'Заказать очистку',
        'hero.title': 'Профессиональное удаление граффити и очистка фасадов',
        'hero.subtitle': 'Используем экологически безопасные технологии и современное оборудование для качественной очистки любых поверхностей',
        'hero.cta': 'Заказать очистку',
        'services.title': 'Наши услуги',
        'services.subtitle': 'Профессиональные услуги по очистке любых поверхностей с использованием современного оборудования',
        'services.facade.title': 'Мойка фасадов',
        'services.facade.price': 'от 3 €/м²',
        'services.facade.description': 'Профессиональная мойка фасадов зданий от различных загрязнений',
        'services.facade.feature1': 'Безопасные химикаты',
        'services.facade.feature2': 'Высокое давление',
        'services.facade.feature3': 'Любая высота',
        'services.graffiti.title': 'Удаление граффити',
        'services.graffiti.price': 'от 30 €/м²',
        'services.graffiti.description': 'Удаление граффити с фасадов зданий - основное направление нашей компании',
        'services.graffiti.feature1': 'Любые поверхности',
        'services.graffiti.feature2': 'Без повреждений',
        'services.graffiti.feature3': 'Быстро и качественно',
        'services.pavement.title': 'Очистка брусчатки',
        'services.pavement.price': 'от 2,80 €/м²',
        'services.pavement.description': 'Очистка брусчатки с технологией DANSAND',
        'services.pavement.feature1': 'Технология DANSAND',
        'services.pavement.feature2': 'Защита от сорняков',
        'services.pavement.feature3': 'Долговременный эффект',
        'services.ticks.title': 'Обработка от клещей',
        'services.ticks.price': '0,3 €/м²',
        'services.ticks.description': 'Профессиональная обработка территорий от клещей',
        'services.train.title': 'Очистка подвижного состава',
        'services.train.price': 'от 720 €/шт',
        'services.train.description': 'Удаление граффити с железнодорожных вагонов',
        'services.marking.title': 'Удаление разметки',
        'services.marking.price': '65 €/час',
        'services.marking.description': 'Удаление напольной разметки в складах и стоянках',
        'services.floors.title': 'Очистка полов',
        'services.floors.price': 'от 25 €/м²',
        'services.floors.description': 'Очистка плиточных швов с помощью Tornado ACS',
        'services.allergy.title': 'Антиаллергенная уборка',
        'services.allergy.price': 'от 350 €',
        'services.allergy.description': 'Комплексная защита от пыли, клещей, плесени',
        'services.fire.title': 'Очистка после пожара',
        'services.fire.price': 'от 50 €/м²',
        'services.fire.description': 'Полная очистка помещений после пожара',
        'services.roof.title': 'Очистка крыш',
        'services.roof.price': 'от 3,5 €/м²',
        'services.roof.description': 'Профессиональная очистка кровли',
        'services.terrace.title': 'Гидроизоляция террас',
        'services.terrace.price': 'от 30 €/м²',
        'services.terrace.description': 'Гидроизоляция и декорирование террас и балконов',
        'services.sandblast.title': 'Водно-пескоструйная очистка',
        'services.sandblast.price': 'от 250 €/м²',
        'services.sandblast.description': 'Очистка металлических конструкций от краски и ржавчины',
        'services.protection.title': 'Защита фасадов',
        'services.protection.price': 'от 15 €/м²',
        'services.protection.description': 'Нанесение защитных покрытий на фасады зданий',
        'services.industrial.title': 'Промышленная очистка',
        'services.industrial.price': 'по запросу',
        'services.industrial.description': 'Очистка промышленного оборудования и территорий',
        'services.emergency.title': 'Экстренная очистка',
        'services.emergency.price': 'круглосуточно',
        'services.emergency.description': 'Срочное удаление загрязнений 24/7',
        'equipment.title': 'Наше оборудование',
        'equipment.subtitle': 'Используем современное профессиональное оборудование для достижения лучших результатов',
        'equipment.tornado.title': 'Tornado ACS',
        'equipment.tornado.description': 'Мощная система очистки высоким давлением для удаления самых сложных загрязнений',
        'equipment.tornado.feature1': 'Давление до 200 бар',
        'equipment.tornado.feature2': 'Нагрев воды до 150°C',
        'equipment.tornado.feature3': 'Экологически безопасно',
        'equipment.dansand.title': 'Технология DANSAND',
        'equipment.dansand.description': 'Уникальная датская технология для очистки и защиты брусчатки',
        'equipment.dansand.feature1': 'Официальный представитель в Балтии',
        'equipment.dansand.feature2': 'Долговременная защита',
        'equipment.dansand.feature3': 'Экологически чистые материалы',
        'stats.projects': 'объектов',
        'stats.experience': 'лет опыта',
        'stats.warranty': 'год гарантии',
        'stats.support': 'поддержка',
        'gallery.title': 'Наши работы',
        'gallery.subtitle': 'Примеры выполненных работ - до и после очистки',
        'gallery.before': 'ДО',
        'gallery.after': 'ПОСЛЕ',
        'contact.title': 'Свяжитесь с нами',
        'contact.subtitle': 'Получите бесплатную консультацию и расчет стоимости работ',
        'contact.phone': 'Телефон',
        'contact.email': 'Email',
        'contact.address': 'Адрес',
        'contact.address.value': 'Рига, Латвия',
        'contact.hours': 'Время работы',
        'contact.hours.value': 'Пн-Пт: 8:00-18:00<br>Сб-Вс: по договоренности',
        'form.name': 'Ваше имя',
        'form.phone': 'Телефон',
        'form.email': 'Email',
        'form.message': 'Описание работ',
        'form.submit': 'Отправить заявку',
        'footer.copyright': '© 2024 City Wall Clean. Все права защищены. Профессиональная очистка в Латвии.'
    },
    lv: {
        'brand': 'City Wall Clean',
        'nav.services': 'Pakalpojumi',
        'nav.equipment': 'Aprīkojums',
        'nav.gallery': 'Galerija',
        'nav.contact': 'Kontakti',
        'order.cleaning': 'Pasūtīt tīrīšanu',
        'hero.title': 'Profesionāla grafiti noņemšana un fasāžu tīrīšana',
        'hero.subtitle': 'Izmantojam ekoloģiski drošas tehnoloģijas un modernu aprīkojumu kvalitatīvai jebkuru virsmu tīrīšanai',
        'hero.cta': 'Pasūtīt tīrīšanu',
        'services.title': 'Mūsu pakalpojumi',
        'services.subtitle': 'Profesionāli tīrīšanas pakalpojumi jebkurām virsmām, izmantojot modernu aprīkojumu',
        'services.facade.title': 'Fasāžu mazgāšana',
        'services.facade.price': 'no 3 €/m²',
        'services.facade.description': 'Profesionāla ēku fasāžu mazgāšana no dažādiem piesārņojumiem',
        'services.facade.feature1': 'Drošas ķimikālijas',
        'services.facade.feature2': 'Augsts spiediens',
        'services.facade.feature3': 'Jebkurš augstums',
        'services.graffiti.title': 'Grafiti noņemšana',
        'services.graffiti.price': 'no 30 €/m²',
        'services.graffiti.description': 'Grafiti noņemšana no ēku fasādēm - mūsu uzņēmuma galvenais virziens',
        'services.graffiti.feature1': 'Jebkuras virsmas',
        'services.graffiti.feature2': 'Bez bojājumiem',
        'services.graffiti.feature3': 'Ātri un kvalitatīvi',
        'services.pavement.title': 'Bruģakmens tīrīšana',
        'services.pavement.price': 'no 2,80 €/m²',
        'services.pavement.description': 'Bruģakmens tīrīšana ar DANSAND tehnoloģiju',
        'services.pavement.feature1': 'DANSAND tehnoloģija',
        'services.pavement.feature2': 'Aizsardzība pret nezālēm',
        'services.pavement.feature3': 'Ilgstošs efekts',
        'services.ticks.title': 'Apstrāde pret ērcēm',
        'services.ticks.price': '0,3 €/m²',
        'services.ticks.description': 'Profesionāla teritoriju apstrāde pret ērcēm',
        'services.train.title': 'Ritošā sastāva tīrīšana',
        'services.train.price': 'no 720 €/gab.',
        'services.train.description': 'Grafiti noņemšana no dzelzceļa vagoniem',
        'services.marking.title': 'Marķējuma noņemšana',
        'services.marking.price': '65 €/st.',
        'services.marking.description': 'Grīdas marķējuma noņemšana noliktavās un stāvvietās',
        'services.floors.title': 'Grīdu tīrīšana',
        'services.floors.price': 'no 25 €/m²',
        'services.floors.description': 'Flīžu šuvju tīrīšana ar Tornado ACS',
        'services.allergy.title': 'Antialerģiska uzkopšana',
        'services.allergy.price': 'no 350 €',
        'services.allergy.description': 'Kompleksa aizsardzība pret putekļiem, ērcēm, pelējumu',
        'services.fire.title': 'Tīrīšana pēc ugunsgrēka',
        'services.fire.price': 'no 50 €/m²',
        'services.fire.description': 'Pilnīga telpu tīrīšana pēc ugunsgrēka',
        'services.roof.title': 'Jumtu tīrīšana',
        'services.roof.price': 'no 3,5 €/m²',
        'services.roof.description': 'Profesionāla jumta seguma tīrīšana',
        'services.terrace.title': 'Terasu hidroizolācija',
        'services.terrace.price': 'no 30 €/m²',
        'services.terrace.description': 'Terasu un balkonu hidroizolācija un dekorēšana',
        'services.sandblast.title': 'Ūdens-smilšstrūklas tīrīšana',
        'services.sandblast.price': 'no 250 €/m²',
        'services.sandblast.description': 'Metāla konstrukciju tīrīšana no krāsas un rūsas',
        'services.protection.title': 'Fasāžu aizsardzība',
        'services.protection.price': 'no 15 €/m²',
        'services.protection.description': 'Aizsargājošo pārklājumu uzklāšana uz ēku fasādēm',
        'services.industrial.title': 'Rūpnieciska tīrīšana',
        'services.industrial.price': 'pēc pieprasījuma',
        'services.industrial.description': 'Rūpnieciskā aprīkojuma un teritoriju tīrīšana',
        'services.emergency.title': 'Ārkārtas tīrīšana',
        'services.emergency.price': 'diennakti',
        'services.emergency.description': 'Steidzama piesārņojuma noņemšana 24/7',
        'equipment.title': 'Mūsu aprīkojums',
        'equipment.subtitle': 'Izmantojam modernu profesionālu aprīkojumu labāko rezultātu sasniegšanai',
        'equipment.tornado.title': 'Tornado ACS',
        'equipment.tornado.description': 'Jaudīga augsta spiediena tīrīšanas sistēma sarežģītāko piesārņojumu noņemšanai',
        'equipment.tornado.feature1': 'Spiediens līdz 200 bar',
        'equipment.tornado.feature2': 'Ūdens sildīšana līdz 150°C',
        'equipment.tornado.feature3': 'Ekoloģiski drošs',
        'equipment.dansand.title': 'DANSAND tehnoloģija',
        'equipment.dansand.description': 'Unikāla dāņu tehnoloģija bruģakmens tīrīšanai un aizsardzībai',
        'equipment.dansand.feature1': 'Oficiālais pārstāvis Baltijā',
        'equipment.dansand.feature2': 'Ilgtermiņa aizsardzība',
        'equipment.dansand.feature3': 'Ekoloģiski tīri materiāli',
        'stats.projects': 'objekti',
        'stats.experience': 'gadu pieredze',
        'stats.warranty': 'gada garantija',
        'stats.support': 'atbalsts',
        'gallery.title': 'Mūsu darbi',
        'gallery.subtitle': 'Izpildīto darbu piemēri - pirms un pēc tīrīšanas',
        'gallery.before': 'PIRMS',
        'gallery.after': 'PĒC',
        'contact.title': 'Sazinieties ar mums',
        'contact.subtitle': 'Saņemiet bezmaksas konsultāciju un darbu izmaksu aprēķinu',
        'contact.phone': 'Tālrunis',
        'contact.email': 'E-pasts',
        'contact.address': 'Adrese',
        'contact.address.value': 'Rīga, Latvija',
        'contact.hours': 'Darba laiks',
        'contact.hours.value': 'P-Pt: 8:00-18:00<br>S-Sv: pēc vienošanās',
        'form.name': 'Jūsu vārds',
        'form.phone': 'Tālrunis',
        'form.email': 'E-pasts',
        'form.message': 'Darbu apraksts',
        'form.submit': 'Nosūtīt pieteikumu',
        'footer.copyright': '© 2024 City Wall Clean. Visas tiesības aizsargātas. Profesionāla tīrīšana Latvijā.'
    },
    en: {
        'brand': 'City Wall Clean',
        'nav.services': 'Services',
        'nav.equipment': 'Equipment',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Contact',
        'order.cleaning': 'Order Cleaning',
        'hero.title': 'Professional Graffiti Removal and Facade Cleaning',
        'hero.subtitle': 'We use environmentally safe technologies and modern equipment for quality cleaning of any surfaces',
        'hero.cta': 'Order Cleaning',
        'services.title': 'Our Services',
        'services.subtitle': 'Professional cleaning services for any surfaces using modern equipment',
        'services.facade.title': 'Facade Washing',
        'services.facade.price': 'from €3/m²',
        'services.facade.description': 'Professional building facade washing from various contaminants',
        'services.facade.feature1': 'Safe chemicals',
        'services.facade.feature2': 'High pressure',
        'services.facade.feature3': 'Any height',
        'services.graffiti.title': 'Graffiti Removal',
        'services.graffiti.price': 'from €30/m²',
        'services.graffiti.description': 'Graffiti removal from building facades - our company\'s main direction',
        'services.graffiti.feature1': 'Any surfaces',
        'services.graffiti.feature2': 'No damage',
        'services.graffiti.feature3': 'Fast and quality',
        'services.pavement.title': 'Paving Stone Cleaning',
        'services.pavement.price': 'from €2.80/m²',
        'services.pavement.description': 'Paving stone cleaning with DANSAND technology',
        'services.pavement.feature1': 'DANSAND technology',
        'services.pavement.feature2': 'Weed protection',
        'services.pavement.feature3': 'Long-lasting effect',
        'services.ticks.title': 'Tick Treatment',
        'services.ticks.price': '€0.3/m²',
        'services.ticks.description': 'Professional territory treatment against ticks',
        'services.train.title': 'Rolling Stock Cleaning',
        'services.train.price': 'from €720/pc',
        'services.train.description': 'Graffiti removal from railway cars',
        'services.marking.title': 'Marking Removal',
        'services.marking.price': '€65/hour',
        'services.marking.description': 'Floor marking removal in warehouses and parking lots',
        'services.floors.title': 'Floor Cleaning',
        'services.floors.price': 'from €25/m²',
        'services.floors.description': 'Tile joint cleaning with Tornado ACS',
        'services.allergy.title': 'Anti-allergenic Cleaning',
        'services.allergy.price': 'from €350',
        'services.allergy.description': 'Comprehensive protection against dust, ticks, mold',
        'services.fire.title': 'Fire Damage Cleaning',
        'services.fire.price': 'from €50/m²',
        'services.fire.description': 'Complete room cleaning after fire',
        'services.roof.title': 'Roof Cleaning',
        'services.roof.price': 'from €3.5/m²',
        'services.roof.description': 'Professional roof covering cleaning',
        'services.terrace.title': 'Terrace Waterproofing',
        'services.terrace.price': 'from €30/m²',
        'services.terrace.description': 'Waterproofing and decorating terraces and balconies',
        'services.sandblast.title': 'Water-sandblasting Cleaning',
        'services.sandblast.price': 'from €250/m²',
        'services.sandblast.description': 'Metal structure cleaning from paint and rust',
        'services.protection.title': 'Facade Protection',
        'services.protection.price': 'from €15/m²',
        'services.protection.description': 'Protective coating application on building facades',
        'services.industrial.title': 'Industrial Cleaning',
        'services.industrial.price': 'on request',
        'services.industrial.description': 'Industrial equipment and territory cleaning',
        'services.emergency.title': 'Emergency Cleaning',
        'services.emergency.price': '24/7',
        'services.emergency.description': 'Urgent contamination removal 24/7',
        'equipment.title': 'Our Equipment',
        'equipment.subtitle': 'We use modern professional equipment to achieve the best results',
        'equipment.tornado.title': 'Tornado ACS',
        'equipment.tornado.description': 'Powerful high-pressure cleaning system for removing the most complex contamination',
        'equipment.tornado.feature1': 'Pressure up to 200 bar',
        'equipment.tornado.feature2': 'Water heating up to 150°C',
        'equipment.tornado.feature3': 'Environmentally safe',
        'equipment.dansand.title': 'DANSAND Technology',
        'equipment.dansand.description': 'Unique Danish technology for paving stone cleaning and protection',
        'equipment.dansand.feature1': 'Official representative in the Baltics',
        'equipment.dansand.feature2': 'Long-term protection',
        'equipment.dansand.feature3': 'Environmentally clean materials',
        'stats.projects': 'projects',
        'stats.experience': 'years experience',
        'stats.warranty': 'year warranty',
        'stats.support': 'support',
        'gallery.title': 'Our Work',
        'gallery.subtitle': 'Examples of completed work - before and after cleaning',
        'gallery.before': 'BEFORE',
        'gallery.after': 'AFTER',
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Get free consultation and work cost calculation',
        'contact.phone': 'Phone',
        'contact.email': 'Email',
        'contact.address': 'Address',
        'contact.address.value': 'Riga, Latvia',
        'contact.hours': 'Working hours',
        'contact.hours.value': 'Mon-Fri: 8:00-18:00<br>Sat-Sun: by appointment',
        'form.name': 'Your name',
        'form.phone': 'Phone',
        'form.email': 'Email',
        'form.message': 'Work description',
        'form.submit': 'Send request',
        'footer.copyright': '© 2024 City Wall Clean. All rights reserved. Professional cleaning in Latvia.'
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeLanguage();
    initializeGallery();
});

// Carousel functionality
function initializeCarousel() {
    const carousel = document.getElementById('servicesCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    updateCarousel();
}

function moveCarousel(direction) {
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = totalSlides - 3; // Show last 3 slides
    } else if (currentSlide > totalSlides - 3) {
        currentSlide = 0; // Reset to beginning
    }
    
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    if (currentSlide > totalSlides - 3) {
        currentSlide = totalSlides - 3;
    }
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.getElementById('servicesCarousel');
    const translateX = -currentSlide * (350 + 20); // card width + gap
    carousel.style.transform = `translateX(${translateX}px)`;
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index >= currentSlide && index < currentSlide + 3);
    });
}

// Language functionality
function initializeLanguage() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
    switchLanguage(savedLang);
}

function switchLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('selectedLanguage', lang);

  // кнопки
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const btn = document.getElementById(`lang-${lang}`);
  if (btn) btn.classList.add('active');

  document.documentElement.lang = lang;

  // ОБЩИЕ переводы, КРОМЕ hero.title (его соберём ниже отдельно)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key === 'hero.title') return; // важно: пропускаем заголовок
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // плейсхолдеры
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // ТИТУЛ и мета
  const brand = translations[lang]['brand'] || 'City Wall Clean';
  const heroT = translations[lang]['hero.title'] || '';
  document.title = `${brand} - ${heroT}`;
  const metaDesc = document.querySelector('[data-i18n-description]');
  if (metaDesc && translations[lang]['hero.subtitle']) {
    metaDesc.setAttribute('content', translations[lang]['hero.subtitle']);
  }

  // СБОРКА заголовка: 1-е слово чёрное, остальное зелёное
  setHeroTitle(lang);
}

function setHeroTitle(lang){
  const el = document.querySelector('.hero-title[data-i18n="hero.title"]');
  if (!el) return;

  let raw = translations[lang]?.['hero.title'] || el.textContent.trim();


  if (raw.includes('<span')) {
    el.innerHTML = raw;
    return;
  }

  
  const parts = raw.split(/\s+/);
  const first = parts.shift() || '';
  const rest = parts.join(' ');

  el.innerHTML =
    `<span class="hero-black">${first}</span>${rest ? ' ' : ''}` +
    (rest ? `<span class="hero-green">${rest}</span>` : '');
}

// ===== Mobile language dropdown logic =====
function toggleLangMenu(btn){
  const menu = btn.nextElementSibling;         // .lang-menu
  const isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function selectLangFromMenu(code){
  switchLanguage(code);                        
  document.querySelectorAll('.lang-menu [data-lang]').forEach(el=>{
    el.classList.toggle('is-active', el.dataset.lang === code);
  });
  // close menu
  const menu = document.querySelector('.lang-mobile .lang-menu');
  const btn  = document.querySelector('.lang-mobile .lang-toggle');
  if(menu){ menu.classList.remove('open'); }
  if(btn){ btn.setAttribute('aria-expanded','false'); }
}


document.addEventListener('click', (e)=>{
  const toggle = e.target.closest('.lang-toggle');
  const menu   = e.target.closest('.lang-menu');
  if(!toggle && !menu){
    const m = document.querySelector('.lang-mobile .lang-menu');
    const b = document.querySelector('.lang-mobile .lang-toggle');
    if(m) m.classList.remove('open');
    if(b) b.setAttribute('aria-expanded','false');
  }
});

// close on esc
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    const m = document.querySelector('.lang-mobile .lang-menu');
    const b = document.querySelector('.lang-mobile .lang-toggle');
    if(m) m.classList.remove('open');
    if(b) b.setAttribute('aria-expanded','false');
  }
});

// sincron active while start
document.addEventListener('DOMContentLoaded', ()=>{
  const saved = localStorage.getItem('selectedLanguage') || 'ru';
  document.querySelectorAll('.lang-menu [data-lang]').forEach(el=>{
    el.classList.toggle('is-active', el.dataset.lang === saved);
  });
});

// Gallery functionality
function initializeGallery() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => openModal(img.src));
    });
}

function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Mobile menu functionality...
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Smooth scrolling ...
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Form submission
function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Create mailto link with form data
    const subject = encodeURIComponent('Заявка на очистку от ' + name);
    const body = encodeURIComponent(
        `Имя: ${name}\n` +
        `Телефон: ${phone}\n` +
        `Email: ${email}\n` +
        `Сообщение: ${message || 'Не указано'}`
    );
    
    window.location.href = `mailto:info@cleanlines.lv?subject=${subject}&body=${body}`;
    
    // Reset form
    event.target.reset();
    
    // Show success message
    alert(translations[currentLanguage]['form.success'] || 'Спасибо! Ваша заявка отправлена.');
}

// Auto-scroll carousel on mobile
let autoScrollTimer;
if (window.innerWidth <= 768) {
    autoScrollTimer = setInterval(() => {
        moveCarousel(1);
    }, 3000);
    
    
    document.getElementById('servicesCarousel').addEventListener('touchstart', () => {
        clearInterval(autoScrollTimer);
    });
}

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.remove('active');
    });
});

// Close modal when clicking outside
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// layy iamge load...
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}