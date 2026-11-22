<div align="center">

# Портфолио

**Одностраничный сайт-портфолио в тёмно-синей палитре.  
Без сборки, фреймворков и CDN — только HTML, CSS, JavaScript и Bootstrap.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![No build step](https://img.shields.io/badge/build-not_required-2F7CFF?style=flat-square)

**Демо:** `https://lecarstvo-wd.github.io/Portfolio_sample/`  


</div>

---

## О проекте

Готовый шаблон персонального портфолио для дизайнера, разработчика или другого специалиста. Все ключевые данные вынесены в разметку в виде понятных заглушек — замените их своим контентом.

Сайт полностью статический: открывается на GitHub Pages, Netlify, Vercel или любом обычном хостинге. Bootstrap, шрифты и иконка хранятся локально, поэтому проект работает без подключения к интернету.

## Возможности

- Адаптивная вёрстка от 320 px до широких экранов.
- Тёмная тема в оттенках синего и чёрного.
- Секции: главная, проекты, обо мне, подход, контакты.
- Фильтрация проектов по категориям.
- Подсветка активного пункта меню при прокрутке.
- Плавное появление блоков через `IntersectionObserver`.
- 3D-наклон hero-карточки и свечение за курсором.
- Валидация формы и уведомления Bootstrap Toast.
- Поддержка `prefers-reduced-motion`.
- Семантическая разметка, skip-link и видимые состояния фокуса.
- Ноль внешних запросов после загрузки страницы.

## Стек

| Технология | Использование |
| --- | --- |
| HTML5 | Семантическая разметка, SEO-метаданные |
| CSS3 | Дизайн-система, адаптивность, анимации |
| JavaScript (ES6+) | Интерактивность без сторонних библиотек |
| Bootstrap 5.3.7 | Сетка, навбар, формы, тосты |
| Manrope + Unbounded | Локальные шрифты из Google Fonts |

## Быстрый старт

Склонируйте репозиторий и запустите локальный сервер:

```bash
git clone https://github.com/<username>/<repository>.git
cd <repository>
python3 -m http.server 8000
```

Откройте [http://localhost:8000](http://localhost:8000).

На Windows вместо `python3` можно использовать:

```bash
python -m http.server 8000
```

> Открывать `index.html` напрямую тоже можно, но локальный сервер корректнее работает со шрифтами и относительными путями.

## Персонализация

### Основные места

| Что изменить | Где искать |
| --- | --- |
| Имя, статус, описание, статистика | секция `#home` в `index.html` |
| Название вкладки и SEO-описание | `<title>` и `<meta name="description">` |
| Проекты и их категории | карточки внутри `#projectGrid` |
| Текст «Обо мне» и факты | секция `#about` |
| Услуги и подход | секция `#services` |
| Email и соцсети | секция `#contact` |
| Форма обратной связи | `<form id="contactForm">` |
| Имя в шапке и подвале | `[ИМЯ]` |
| Фото | блок `.portrait-placeholder` |

### Проекты

В шаблоне шесть карточек. У каждой есть атрибут категории:

```html
<div class="project-item" data-category="web">
```

Доступные значения:

- `web` — сайты;
- `app` — приложения;
- `design` — дизайн.

Категория должна совпадать с `data-filter` у кнопки фильтра. Чтобы добавить новую категорию, добавьте кнопку в `.filter-group` и карточки с соответствующим `data-category`.

Название, описание, год и теги меняются внутри `.project-body`. Ссылка на кейс находится в заголовке проекта:

```html
<a href="https://example.com/case" data-placeholder-link data-toast="...">
```

После замены `href` удалите `data-placeholder-link` и `data-toast`, иначе переход будет блокироваться уведомлением.

### Фото

Замените содержимое `.portrait-placeholder` на изображение:

```html
<img class="portrait-photo" src="assets/img/photo.jpg" alt="Ваше имя">
```

Добавьте стили в `assets/css/style.css`:

```css
.portrait-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
}
```

Превью проектов сейчас нарисованы на CSS. При желании замените содержимое `.project-visual` на `<img>` с `object-fit: cover`.

### Соцсети и резюме

Ссылки в шапке, hero, контактах и подвале сейчас ведут на `#` и показывают пояснительное уведомление. Замените `href` и удалите служебные атрибуты `data-placeholder-link` и `data-toast`.

### Форма

Форма выполняет только клиентскую проверку полей и показывает тост. Данные никуда не отправляются.

Для реальной отправки:

1. Укажите `action` и `method="post"` у формы.
2. Подключите backend, Formspree, Getform или аналогичный сервис.
3. Удалите демонстрационный обработчик `submit` из `assets/js/main.js`.

## Структура проекта

```text
.
├── index.html                  # разметка страницы
├── README.md
└── assets
    ├── css
    │   └── style.css           # оформление, адаптивность, анимации
    ├── js
    │   └── main.js             # меню, фильтры, форма, анимации
    ├── img
    │   └── favicon.svg
    └── vendor                  # Bootstrap и локальные шрифты
        ├── bootstrap.min.css
        ├── bootstrap.bundle.min.js
        ├── manrope-cyrillic.woff2
        ├── manrope-latin.woff2
        ├── unbounded-cyrillic.woff2
        └── unbounded-latin.woff2
```

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub и отправьте туда проект:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<username>/<repository>.git
   git push -u origin main
   ```

2. Откройте **Settings → Pages**.
3. В блоке **Build and deployment** выберите:
   - Source: **Deploy from a branch**;
   - Branch: **main**;
   - Folder: **/ (root)**.
4. Нажмите **Save** и подождите 1–2 минуты.

Сайт будет доступен по адресу:

```text
https://<username>.github.io/<repository>/
```

Сборка не требуется: GitHub Pages отдаёт статические файлы из корня репозитория. После изменений достаточно сделать `git push` в ветку `main`.

## Доступность

- Есть ссылка для перехода к основному содержимому.
- Интерактивные элементы имеют состояния `:focus-visible`.
- Для декоративных элементов используются `aria-hidden` и пустые `alt`.
- Анимации отключаются при `prefers-reduced-motion: reduce`.
- Цветовые акценты не являются единственным способом передачи информации.

## Браузеры

Проект рассчитан на актуальные версии Chrome, Edge, Firefox и Safari. Используются современные CSS-свойства (`clamp()`, `aspect-ratio`, `backdrop-filter`) и JavaScript API (`IntersectionObserver`, Web Animations API).

## Благодарности

- [Bootstrap](https://getbootstrap.com/) — MIT License.
- [Manrope](https://fonts.google.com/specimen/Manrope) — SIL Open Font License.
- [Unbounded](https://fonts.google.com/specimen/Unbounded) — SIL Open Font License.

---

<div align="center">

Сделано для портфолио, которое хочется показать.

Если шаблон оказался полезен — поставьте ⭐ репозиторию.

</div>
