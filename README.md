<h1>как запустить</h1>
<ul>
<li>в первом терминале **docker-compose up**</li>
<li>во втором терминале **npm run dev**</li>
<li>в .env файле прописать</li>
    DB_CONNECTION=mysql
    DB_HOST=mysql
    DB_PORT=3306
    DB_DATABASE=laravel-vite
    DB_USERNAME=root
    DB_PASSWORD=root
<li>настроить соединение с базой в менеджере баз данных</li>
    Сервер **Localhost**
    Порт **33063**
    Пользователь **root**
    Пароль **root**
<li>в третьем терминале выполнить </li>
    1. **Docker-compose exec fpm bash**
    2. cd ../laravel-docker
    3. php artisan migrate

<li>в браузере открыть http://localhost:8099/</li>
</ul>
