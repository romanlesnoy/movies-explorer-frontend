# movies-explorer-frontend

Ссылка на сайт: https://movies-explorer.nomoredomains.icu

[Ссылка на поддомен с api](https://api.movies-explorer.nomoredomains.icu)

Проект предтавляет собой сайт с поиском документальных фильмов показаных в рамках проекта Beat Film Festival.
Сайт адаптивен, и поддерживается большинством устройств.
Функционал:
 - регистрация и авторизация пользователей
 - редактирование информации профиля(имя и почта пользователя)
 - добавление фильмов в избраное
 - сортировка фильмов по длительности

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

[Ссылка на github бэкенда проекта](https://github.com/romanlesnoy/movies-explorer-api).