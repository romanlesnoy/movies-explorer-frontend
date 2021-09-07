# Movies Explorer

[Ссылка на сайт](https://movies-explorer.nomoredomains.icu)

[Ссылка на поддомен с api](https://api.movies-explorer.nomoredomains.icu)

![Project Movies Explorer](https://user-images.githubusercontent.com/69040854/119688955-1fcba400-be51-11eb-92c2-89f5ed7b99f4.png)

Проект предтавляет собой сайт с поиском документальных фильмов показаных в рамках проекта Beat Film Festival.
Сайт адаптивен, и поддерживается большинством устройств.
Функционал:
 - регистрация и авторизация пользователей
 - редактирование информации профиля(имя и почта пользователя)
 - добавление фильмов в избраное
 - поиск фильмов(поиск происходит по названию фильма и его описанию)
 - сортировка найденных или сохранённых фильмов по длительности(короткометражные фильмы длительностью менее 40 минут)

### Стек

- приложение написано на функциональном React
- для адаптивность используется flex-box, grid, media запросы
- в API использовант node.js(express.js, mongoose)
- информация храниться в mongoDB

### Запуск приложения

- Клонировать репозиторий
    ```bash
    $ git clone https://github.com/romanlesnoy/movies-explorer-frontend.git
    ```
- Перейти в директорию проекта и установить зависимости
    ```bash
    $ cd movies-explorer-frontend && npm install
    ```
- Запустить приложение
    ```bash
    npm start
    ```

### Работа с API

Функционал работатет c API расположенном на поддомене. Для работы локально необходимо указать порт на котором будет запущен API.
[Ссылка на github бэкенда проекта](https://github.com/romanlesnoy/movies-explorer-api).
