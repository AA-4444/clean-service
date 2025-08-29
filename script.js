
// =============== Ваш предыдущий код галереи (оставлен без урезаний) ===============
(function(){
  const wrap  = document.querySelector('.gallery-carousel');
  const viewport = wrap?.querySelector('.gallery-viewport');
  const track = document.getElementById('gcarTrack');
  if(!wrap || !viewport || !track) return;

  const prev = wrap.querySelector('.gcar-btn--prev');
  const next = wrap.querySelector('.gcar-btn--next');
  const dotsWrap = document.getElementById('gcarDots');

  // === helpers
  const gap = ()=> parseFloat(getComputedStyle(track).gap) || 0;
  function slideWidth(){
    const cs = getComputedStyle(viewport);
    const pl = parseFloat(cs.paddingLeft) || 0;
    const pr = parseFloat(cs.paddingRight) || 0;
    return viewport.clientWidth - pl - pr;
  }

  
  const originals = Array.from(track.children);
  const firstClone = originals[0].cloneNode(true);
  const lastClone  = originals[originals.length-1].cloneNode(true);
  firstClone.classList.add('is-clone');
  lastClone.classList.add('is-clone');

  
  track.prepend(lastClone);
  track.append(firstClone);

  let slides = Array.from(track.children);
  const REAL_COUNT = originals.length;

  
  let index = 1;

  // dots only for real slides
  dotsWrap.innerHTML = '';
  for(let i=0;i<REAL_COUNT;i++){
    const b = document.createElement('button');
    b.addEventListener('click', ()=>{ index = i+1; goTo(index, true); restartAutoplay(); });
    dotsWrap.appendChild(b);
  }

  function setActiveDot(){
    const realIdx = (index-1 + REAL_COUNT) % REAL_COUNT; // 0..REAL_COUNT-1
    dotsWrap.querySelectorAll('button').forEach((d,i)=> d.classList.toggle('is-active', i===realIdx));
  }

  function setCenterClass(){
    slides.forEach((el,i)=> el.classList.toggle('is-center', i===index));
  }

  function translateByIndex(animate=true){
    const w = slideWidth();
    const tx = -(index * (w + gap()));
    if(!animate){
      const old = getComputedStyle(track).transition;
      track.style.transition = 'none';
      track.style.transform  = `translateX(${tx}px)`;
      
      track.offsetHeight;
      track.style.transition = old;
    }else{
      track.style.transform  = `translateX(${tx}px)`;
    }
    setCenterClass(); setActiveDot();
  }

  function goTo(i, animate=true){
    index = i;
    translateByIndex(animate);
  }

  // snap back seamlessly when we hit clones
  track.addEventListener('transitionend', ()=>{
    if(slides[index].classList.contains('is-clone')){
      if(index === 0){               
        index = REAL_COUNT;        
      }else if(index === slides.length-1){ 
        index = 1;
      }
      translateByIndex(false);       
    }
  });

  // controls
  prev.addEventListener('click', ()=>{ index--; goTo(index, true); restartAutoplay(); });
  next.addEventListener('click', ()=>{ index++; goTo(index, true); restartAutoplay(); });

  // autoplay
  let autoplayTimer = null;
  function startAutoplay(){
    stopAutoplay();
    autoplayTimer = setInterval(()=>{ index++; goTo(index, true); }, 3200);
  }
  function stopAutoplay(){ if(autoplayTimer){ clearInterval(autoplayTimer); autoplayTimer=null; } }
  function restartAutoplay(){ stopAutoplay(); startAutoplay(); }
  wrap.addEventListener('mouseenter', stopAutoplay);
  wrap.addEventListener('mouseleave', startAutoplay);
  wrap.addEventListener('focusin', stopAutoplay);
  wrap.addEventListener('focusout', startAutoplay);

  // swipe
  let startX=null, startTx=0;
  track.addEventListener('pointerdown', (e)=>{
    if(e.pointerType==='mouse') return;
    startX = e.clientX; startTx = currentTx();
    track.style.transition = 'none';
    track.setPointerCapture(e.pointerId);
    stopAutoplay();
  });
  track.addEventListener('pointermove', (e)=>{
    if(startX===null) return;
    const dx = e.clientX - startX;
    track.style.transform = `translateX(${startTx + dx}px)`;
  });
  ['pointerup','pointercancel','pointerleave'].forEach(ev=>{
    track.addEventListener(ev, (e)=>{
      if(startX===null) return;
      const dx = e.clientX - startX;
      const thr = 50;
      track.style.transition = ''; // restore
      if(Math.abs(dx) > thr){
        if(dx < 0) index++; else index--;
        goTo(index, true);
      }else{
        goTo(index, true);
      }
      startX=null;
      startAutoplay();
    });
  });

  function currentTx(){
    const m = new DOMMatrixReadOnly(getComputedStyle(track).transform);
    return m.m41;
  }

  // keep layout stable
  window.addEventListener('resize', ()=> translateByIndex(false));

  // init
  translateByIndex(false);
  startAutoplay();
})();


// ==================== Ваш функционал слайдера услуг (с безопасными проверками) ====================
let currentSlide = 0;
const totalSlides = 13;
let currentLanguage = 'ru';

document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeLanguage();
    initializeGallery();
});

function initializeCarousel() {
    const carousel = document.getElementById('servicesCarousel');
    const dotsContainer = document.getElementById('carouselDots');

    if(!carousel || !dotsContainer){ return; } // защищаемся, если этого блока нет на странице
    
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
    const carousel = document.getElementById('servicesCarousel');
    if(!carousel) return;

    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = totalSlides - 3;
    } else if (currentSlide > totalSlides - 3) {
        currentSlide = 0;
    }
    updateCarousel();
}

function goToSlide(slideIndex) {
    const carousel = document.getElementById('servicesCarousel');
    if(!carousel) return;

    currentSlide = slideIndex;
    if (currentSlide > totalSlides - 3) {
        currentSlide = totalSlides - 3;
    }
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.getElementById('servicesCarousel');
    if(!carousel) return;

    const translateX = -currentSlide * (350 + 20);
    carousel.style.transform = `translateX(${translateX}px)`;
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index >= currentSlide && index < currentSlide + 3);
    });
}

// ========================== Переводы (RU, KA, EN) ==========================
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
    'services.subtitle': 'Профессиональная очистка поверхностей без воды, без химии, без высокого давления',
    'services.facade.title': 'Очистка фасадов',
    'services.facade.price': 'от 80-150₾/м²',
    'services.facade.description': 'Комплексная мойка и восстановление фасадов: удаляем грязь, налёт и следы времени. Подходит для кирпича, камня, плитки, бетона.',
    'services.facade.feature1': 'Деликатно к материалу',
    'services.facade.feature2': 'Продлевает срок службы',
    'services.facade.feature3': 'Чисто без отходов',
    'services.graffiti.title': 'Очистка граффити',
    'services.graffiti.price': 'от 80-150₾/м²',
    'services.graffiti.description': 'Устранение граффити со стен дома быстро и бережно. Запатентованная система Tornado ACS удаляет стойкие загрязнения без повреждения основы.',
    'services.graffiti.feature1': 'Без воды и химии',
    'services.graffiti.feature2': 'Без высокого давления',
    'services.graffiti.feature3': 'Работа круглый год',

    'equipment.title': 'Оборудование Tornado ACS',
    'equipment.subtitle': 'Вакуумная абразивная очистка: без воды, без химии, без высокого давления',
    'equipment.card.title': 'Удаление граффити и восстановление поверхностей',
    'equipment.card.text': 'С помощью очистительной техники Tornado ACS граффити удаляются со стен дома быстро и легко. Запатентованная система systeco работает в режиме замкнутого цикла — отходы не попадают наружу.',
    'equipment.feature1': 'Без высокого давления, без воды и без химических веществ',
    'equipment.feature2': 'Бережно к поверхности и экологично',
    'equipment.feature3': 'Компактно, требуется только питание 220В',
    'equipment.feature4': 'Эффективно даже в холодное время года',
    'equipment.feature5': 'Подходит для плитки, полов, реставрации памятников, удаления сажи после пожаров',

    'gallery.title': 'Наши работы',
    'gallery.subtitle': 'Примеры выполненных работ',
    'gallery.before': 'ДО',
    'gallery.after': 'ПОСЛЕ',
    'gallery.carousel.aria': 'Как мы работаем',

    'contact.title': 'Свяжитесь с нами',
    'contact.subtitle': 'Получите бесплатную консультацию и расчет стоимости работ',
    'contact.form.title': 'Оставить заявку',
    'contact.form.subtitle': 'Заполните форму, и мы свяжемся с вами в течение 2х рабочих дней',
    'form.name': 'Ваше имя',
    'form.phone': 'Телефон',
    'form.email': 'Email',
    'form.message': 'Опишите задачу...',
    'form.submit': 'Отправить заявку',
    'form.hint': 'Нажимая на кнопку, вы даёте согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности',
    'form.success': 'Спасибо! Ваша заявка отправлена.',

    'contact.card.contact.title': 'Связаться с нами',
    'contact.card.phone.note': 'Основной номер',
    'contact.card.email.note': 'Email для заявок',
    'contact.card.address.street': 'Цесвайнес 15A-211',
    'contact.card.address.city': 'Рига, LV-1073, Латвия',

    'contact.hours.title': 'Рабочие часы',
    'contact.hours.weekdays.label': 'Понедельник – Пятница:',
    'contact.hours.weekdays.value': '8:00 – 18:00',
    'contact.hours.saturday.label': 'Суббота:',
    'contact.hours.saturday.value': '9:00 – 16:00',
    'contact.hours.sunday.label': 'Воскресенье:',
    'contact.hours.sunday.value': 'Выходной',
    'contact.hours.badge.title': 'Экстренные вызовы 24/7',
    'contact.hours.badge.note': 'Для срочных случаев доступны круглосуточно',

    'contact.socials.title': 'Социальные сети',
    'contact.socials.subtitle': 'Следите за нашими работами и получайте советы по уходу',
    'social.facebook': 'Facebook',
    'social.instagram': 'Instagram',
    'social.whatsapp': 'WhatsApp',

    'ui.prev': '‹',
    'ui.next': '›',
    'ui.call': 'Позвонить',
    'ui.lang': 'Сменить язык',

    'footer.copyright': '© 2024 City Wall Clean. Все права защищены.',
    'video.title': 'Видео',
'video.subtitle': 'Посмотрите, как мы работаем и как работает оборудование',
'video.category.work': 'Наши работы',
'video.category.equipment': 'Оборудование',
'video.watch': 'Смотреть',
'video.card.work1': 'Удаление граффити с кирпичного фасада за 3 минуты',
'video.card.work2': 'Деликатная очистка природного камня без воды и химии',
'video.card.equip1': 'Как работает вакуумная абразивная система',
'video.card.equip2': 'Замкнутый цикл: пыль и отходы не попадают наружу',
  },

  ka: {
    'brand': 'City Wall Clean',
    'nav.services': 'სერვისები',
    'nav.equipment': 'აღჭურვილობა',
    'nav.gallery': 'გალერეა',
    'nav.contact': 'კონტაქტი',
    'order.cleaning': 'გასუფთავების შეკვეთა',
    'hero.title': 'პროფესიონალური გრაფიტის მოცილება და ფასადის გაწმენდა',
    'hero.subtitle': 'ჩვენ ვიყენებთ ეკოლოგიურად უსაფრთხო ტექნოლოგიებს და თანამედროვე აღჭურვილობას ნებისმიერი ზედაპირის ხარისხიანი გაწმენდისთვის',
    'hero.cta': 'გასუფთავების შეკვეთა',
    'services.title': 'ჩვენი სერვისები',
    'services.subtitle': 'პროფესიონალური გაწმენდა წყლისა და ქიმიის გარეშე, დაბალი ზეწოლით',
    'services.facade.title': 'ფასადების გაწმენდა',
    'services.facade.price': '80-150₾/მ²',
    'services.facade.description': 'ფასადების კომპლექსური რეცხვა და აღდგენა: ვაშორებთ ჭუჭყს, ნადებს და დროის კვალს. ვარგისია აგურისთვის, ქვისთვის, კაფელისთვის, ბეტონისთვის.',
    'services.facade.feature1': 'დელიკატური მიმართვა მასალასთან',
    'services.facade.feature2': 'служების ხანგრძლივობის ზრდა',
    'services.facade.feature3': 'სისუფთავე ნარჩენების გარეშე',
    'services.graffiti.title': 'გრაფიტის მოცილება',
    'services.graffiti.price': '80-150₾/მ²',
    'services.graffiti.description': 'გრაფიტის სწრაფი და ფრთხილი მოცილება. Tornado ACS სისტემა აშორებს მყარ დაბინძურებებს ზედაპირის დაზიანების გარეშე.',
    'services.graffiti.feature1': 'გარეშე წყლისა და ქიმიის',
    'services.graffiti.feature2': 'გარეშე მაღალი წნევის',
    'services.graffiti.feature3': 'მუშაობა მთელი წლის განმავლობაში',

    'equipment.title': 'Tornado ACS აღჭურვილობა',
    'equipment.subtitle': 'ვაკუუმური აბრაზიული წმენდა: წყლის, ქიმიის და მაღალი წნევის გარეშე',
    'equipment.card.title': 'გრაფიტის მოცილება და ზედაპირების აღდგენა',
    'equipment.card.text': 'Tornado ACS-ის დახმარებით გრაფიტი კედლიდან სწრაფად და მარტივად იშორება. systeco-ს დაპატენტებული სისტემა მუშაობს დახურულ ციკლში — ნარჩენები გარეთ არ გადის.',
    'equipment.feature1': 'უმაღლესი წნევის გარეშე, წყლისა და ქიმიის გარეშე',
    'equipment.feature2': 'ზედაპირზე ფრთხილი და ეკოლოგიური',
    'equipment.feature3': 'კომპაქტური, საჭიროა მხოლოდ 220V კვება',
    'equipment.feature4': 'ეფექტური ცივ ამინდშიც',
    'equipment.feature5': 'შესაფერისია კაფელისთვის, იატაკებისთვის, ძეგლების რესტავრაციისთვის, ხანძრის შემდეგ ჭვარტლის მოსაშორებლად',

    'gallery.title': 'ჩვენი ნამუშევრები',
    'gallery.subtitle': 'შესრულებული სამუშაოების მაგალითები',
    'gallery.before': 'მდე',
    'gallery.after': 'შემდეგ',
    'gallery.carousel.aria': 'როგორ ვმუშაობთ',

    'contact.title': 'დაგვიკავშირდით',
    'contact.subtitle': 'მიიღეთ უფასო კონსულტაცია და ღირებულების დათვლა',
    'contact.form.title': 'განაცხადის დატოვება',
    'contact.form.subtitle': 'შეავსეთ ფორმა და 2 სამუშაო დღეში დაგიკავშირდებით',
    'form.name': 'თქვენი სახელი',
    'form.phone': 'ტელეფონი',
    'form.email': 'ელ.ფოსტა',
    'form.message': 'აღწერეთ zaა...',
    'form.submit': 'გაგზავნა',
    'form.hint': 'ღილაკზე დაჭერით თანხმდებით პერსონალური მონაცემების დამუშავებასა და კონფიდენციალურობის პოლიტიკას',
    'form.success': 'გმადლობთ! თქვენი განაცხადი გაიგზავნა.',

    'contact.card.contact.title': 'დაგვიკავშირდით',
    'contact.card.phone.note': 'ძირითადი ნომერი',
    'contact.card.email.note': 'ზარებისთვის ელ.ფოსტა',
    'contact.card.address.street': 'ცესვაინეს 15A-211',
    'contact.card.address.city': 'რიგა, LV-1073, ლატვია',

    'contact.hours.title': 'სამუშაო საათები',
    'contact.hours.weekdays.label': 'ორშაბათი – პარასკევი:',
    'contact.hours.weekdays.value': '8:00 – 18:00',
    'contact.hours.saturday.label': 'შაბათი:',
    'contact.hours.saturday.value': '9:00 – 16:00',
    'contact.hours.sunday.label': 'კვირა:',
    'contact.hours.sunday.value': 'დასვენების დღე',
    'contact.hours.badge.title': 'სასწრაფო გამოძახებები 24/7',
    'contact.hours.badge.note': 'საგანგებო შემთხვევებისთვის — ნებისმიერი დრო',

    'contact.socials.title': 'სოციალური ქსელები',
    'contact.socials.subtitle': 'მიგვყევით და მიიღეთ მოვლის რჩევები',
    'social.facebook': 'Facebook',
    'social.instagram': 'Instagram',
    'social.whatsapp': 'WhatsApp',

    'ui.prev': '‹',
    'ui.next': '›',
    'ui.call': 'დარეკვა',
    'ui.lang': 'ენის შეცვლა',

    'footer.copyright': '© 2024 City Wall Clean. ყველა უფლება დაცულია.',
   
'video.title': 'ვიდეო',
'video.subtitle': 'ნახეთ როგორ ვმუშაობთ და როგორ მუშაობს აღჭურვილობა',
'video.category.work': 'ჩვენი სამუშაოები',
'video.category.equipment': 'აღჭურვილობა',
'video.watch': 'ნახვა',
'video.card.work1': 'გრაფიტის მოცილება აგურის ფასადიდან 3 წუთში',
'video.card.work2': 'ბუნებრივი ქვის ფრთხილი გაწმენდა წყლისა და ქიმიის გარეშე',
'video.card.equip1': 'როგორ მუშაობს ვაკუუმური აბრაზიული სისტემა',
'video.card.equip2': 'დახურული ციკლი: მტვერი და ნარჩენები გარეთ არ გადის',
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
    'services.subtitle': 'Professional surface cleaning without water, chemicals, or high pressure',
    'services.facade.title': 'Facade Cleaning',
    'services.facade.price': 'from 80-150₾/m²',
    'services.facade.description': 'Full facade washing and restoration: we remove dirt, deposits and signs of time. Suitable for brick, stone, tile, concrete.',
    'services.facade.feature1': 'Gentle to material',
    'services.facade.feature2': 'Extends lifespan',
    'services.facade.feature3': 'Clean with no waste',
    'services.graffiti.title': 'Graffiti Removal',
    'services.graffiti.price': 'from 80-150₾/m²',
    'services.graffiti.description': 'Fast and careful removal of graffiti. The patented Tornado ACS system removes stubborn dirt without damaging the base.',
    'services.graffiti.feature1': 'No water or chemicals',
    'services.graffiti.feature2': 'No high pressure',
    'services.graffiti.feature3': 'Year-round work',

    'equipment.title': 'Tornado ACS Equipment',
    'equipment.subtitle': 'Vacuum abrasive cleaning: no water, no chemicals, no high pressure',
    'equipment.card.title': 'Graffiti removal and surface restoration',
    'equipment.card.text': 'With Tornado ACS, graffiti is removed from walls quickly and easily. The patented systeco system works in a closed cycle—waste does not go outside.',
    'equipment.feature1': 'No high pressure, water or chemicals',
    'equipment.feature2': 'Gentle to surface and eco-friendly',
    'equipment.feature3': 'Compact, only 220V required',
    'equipment.feature4': 'Effective even in cold weather',
    'equipment.feature5': 'Suitable for tiles, floors, monument restoration, soot removal after fires',

    'gallery.title': 'Our Work',
    'gallery.subtitle': 'Examples of completed projects',
    'gallery.before': 'BEFORE',
    'gallery.after': 'AFTER',
    'gallery.carousel.aria': 'How we work',

    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get a free consultation and cost estimate',
    'contact.form.title': 'Send a Request',
    'contact.form.subtitle': 'Fill out the form and we will contact you within 2 business days',
    'form.name': 'Your name',
    'form.phone': 'Phone',
    'form.email': 'Email',
    'form.message': 'Describe the task...',
    'form.submit': 'Send request',
    'form.hint': 'By clicking the button, you consent to the processing of personal data and agree to the privacy policy',
    'form.success': 'Thanks! Your request has been sent.',

    'contact.card.contact.title': 'Get in touch',
    'contact.card.phone.note': 'Primary number',
    'contact.card.email.note': 'Requests email',
    'contact.card.address.street': 'Cesvaines 15A-211',
    'contact.card.address.city': 'Riga, LV-1073, Latvia',

    'contact.hours.title': 'Working hours',
    'contact.hours.weekdays.label': 'Monday – Friday:',
    'contact.hours.weekdays.value': '8:00 – 18:00',
    'contact.hours.saturday.label': 'Saturday:',
    'contact.hours.saturday.value': '9:00 – 16:00',
    'contact.hours.sunday.label': 'Sunday:',
    'contact.hours.sunday.value': 'Closed',
    'contact.hours.badge.title': 'Emergency calls 24/7',
    'contact.hours.badge.note': 'Available round-the-clock for urgent cases',

    'contact.socials.title': 'Social media',
    'contact.socials.subtitle': 'Follow our work and get care tips',
    'social.facebook': 'Facebook',
    'social.instagram': 'Instagram',
    'social.whatsapp': 'WhatsApp',

    'ui.prev': '‹',
    'ui.next': '›',
    'ui.call': 'Call',
    'ui.lang': 'Change language',

    'footer.copyright': '© 2024 City Wall Clean. All rights reserved.',
    // EN
'video.title': 'Videos',
'video.subtitle': 'See how we work and how the equipment performs',
'video.category.work': 'Our Work',
'video.category.equipment': 'Equipment',
'video.watch': 'Watch',
'video.card.work1': 'Graffiti removal from a brick facade in 3 minutes',
'video.card.work2': 'Gentle cleaning of natural stone without water or chemicals',
'video.card.equip1': 'How the vacuum abrasive system works',
'video.card.equip2': 'Closed-loop: dust and waste do not escape',
  }
};


// ========================== Ядро переключателя языка ==========================
function initializeLanguage() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
    switchLanguage(savedLang);
}

function switchLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('selectedLanguage', lang);

  // переключаем активное состояние на кнопках
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const btn = document.getElementById(`lang-${lang}`);
  if (btn) btn.classList.add('active');

  document.documentElement.lang = lang;

  // Текстовые узлы (innerHTML)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = translations[lang] && translations[lang][key];
    if (value) el.innerHTML = value;
  });

  // Плейсхолдеры
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = translations[lang] && translations[lang][key];
    if (value) el.placeholder = value;
  });

  // ARIA
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const value = translations[lang] && translations[lang][key];
    if (value) el.setAttribute('aria-label', value);
  });

  // ТИТУЛ и мета
  const brand = translations[lang]['brand'] || 'City Wall Clean';
  const heroT = translations[lang]['hero.title'] || '';
  document.title = `${brand} - ${heroT}`;
  const metaDesc = document.querySelector('[data-i18n-description]');
  if (metaDesc && translations[lang]['hero.subtitle']) {
    metaDesc.setAttribute('content', translations[lang]['hero.subtitle']);
  }

  // Сборка hero-title с чёрным 1-м словом и зелёным остальным
  setHeroTitle(lang);

  // синхронизация активного языка в выпадающем меню
  document.querySelectorAll('.lang-menu [data-lang]').forEach(el=>{
    el.classList.toggle('is-active', el.dataset.lang === lang);
  });
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

// стартовая синхронизация
document.addEventListener('DOMContentLoaded', ()=>{
  const saved = localStorage.getItem('selectedLanguage') || 'ru';
  document.querySelectorAll('.lang-menu [data-lang]').forEach(el=>{
    el.classList.toggle('is-active', el.dataset.lang === saved);
  });
});

// ========================== Галерея (модалка) ==========================
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

// ========================== Mobile menu ==========================
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// ========================== Smooth scroll ==========================
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// ========================== Form submission ==========================
function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const subject = encodeURIComponent('Заявка на очистку от ' + name);
    const body = encodeURIComponent(
        `Имя: ${name}\n` +
        `Телефон: ${phone}\n` +
        `Email: ${email}\n` +
        `Сообщение: ${message || 'Не указано'}`
    );
    
    window.location.href = `mailto:info@cleanlines.lv?subject=${subject}&body=${body}`;
    event.target.reset();
    alert(translations[currentLanguage]['form.success'] || 'Спасибо! Ваша заявка отправлена.');
}

// ========================== Auto-scroll carousel on mobile (с проверкой) ==========================
let autoScrollTimer;
if (window.innerWidth <= 768) {
    autoScrollTimer = setInterval(() => {
        moveCarousel(1);
    }, 3000);
    const servCar = document.getElementById('servicesCarousel');
    if(servCar){
      servCar.addEventListener('touchstart', () => {
          clearInterval(autoScrollTimer);
      });
    }
}

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.remove('active');
    });
});

// Close modal when clicking outside
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

// lazy image load...
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
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
 // ===== Videos: фильтр категорий =====
(function(){
  const grid = document.getElementById('videosGrid');
  const cats = document.querySelectorAll('.video-cat');
  if(!grid || !cats.length) return;

  cats.forEach(cat=>{
    cat.addEventListener('click', ()=>{
      cats.forEach(c=> c.removeAttribute('aria-current'));
      cat.setAttribute('aria-current', 'true');
      const type = cat.getAttribute('data-filter');
      grid.querySelectorAll('.video-card').forEach(card=>{
        const show = (type === 'work' && card.dataset.type === 'work') ||
                     (type === 'equipment' && card.dataset.type === 'equipment');
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // активируем «work» по умолчанию
  const first = document.querySelector('.video-cat[data-filter="work"]');
  if(first){ first.click(); }
})();

// ===== Video modal (отдельно от image modal) =====
function openVideo(src){
  const modal = document.getElementById('videoModal');
  const player = document.getElementById('modalVideo');
  if(!modal || !player) return;

  // Если нужен YouTube — можно так:
  // modal.querySelector('.modal-video').innerHTML = '<button class="close" onclick="closeVideo()">&times;</button><div class="ratio"><iframe src="https://www.youtube.com/embed/ID?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>';

  player.src = src;
  player.currentTime = 0;
  player.play().catch(()=>{ /* без звука/автоплей блоки — норм */ });

  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');

  // Закрыть по клику вне
  modal.addEventListener('click', e=>{
    if(e.target === modal){ closeVideo(); }
  }, { once: true });

  // Закрыть по ESC
  document.addEventListener('keydown', onEscCloseVideo);
}

function onEscCloseVideo(e){
  if(e.key === 'Escape'){ closeVideo(); }
}

function closeVideo(){
  const modal = document.getElementById('videoModal');
  const player = document.getElementById('modalVideo');
  if(player){
    try { player.pause(); } catch(_){}
    player.removeAttribute('src'); // сброс, чтобы не продолжал играть
    player.load();
  }
  if(modal){
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
  document.removeEventListener('keydown', onEscCloseVideo);
}