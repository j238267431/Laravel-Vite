<h1>как запустить</h1>
<ul>
<li>в первом терминале **docker-compose up**</li>
<li>во втором терминале **npm run dev**</li>
<li>в .env файле прописать</li>
    <p>DB_CONNECTION=mysql</p>
    <p>DB_HOST=mysql</p>
    <p>DB_PORT=3306</p>
    <p>DB_DATABASE=laravel-vite</p>
    <p>DB_USERNAME=root</p>
    <p>DB_PASSWORD=root</p>
<li>настроить соединение с базой в менеджере баз данных</li>
    <p>Сервер **Localhost**</p>
    <p>Порт **33063**</p>
    <p>Пользователь **root**</p>
    <p>Пароль **root**</p>
<li>в третьем терминале выполнить </li>
    <p>1. **Docker-compose exec fpm bash**</p>
    <p>2. cd ../laravel-docker</p>
    <p>3. php artisan migrate</p>

<li>в браузере открыть http://localhost:8099/</li>
</ul>
