<h1>как запустить</h1>
<ul>
<li>в первом терминале <b>docker-compose up</b></li>
<li>во втором терминале <b>npm run dev</b></li>
<li>в .env файле прописать</li>
    <p>DB_CONNECTION=mysql</p>
    <p>DB_HOST=mysql</p>
    <p>DB_PORT=3306</p>
    <p>DB_DATABASE=laravel-vite</p>
    <p>DB_USERNAME=root</p>
    <p>DB_PASSWORD=root</p>
<li>настроить соединение с базой в менеджере баз данных</li>
    <p>Сервер <b>Localhost</b></p>
    <p>Порт <b>33063</b></p>
    <p>Пользователь <b>root</b></p>
    <p>Пароль <b>root</b></p>
<li>в третьем терминале выполнить </li>
    <p>1. <b>Docker-compose exec fpm bash</b></p>
    <p>2. cd ../laravel-docker</p>
    <p>3. php artisan migrate</p>

<li>в браузере открыть http://localhost:8099/</li>
</ul>
