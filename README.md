как запустить
в первом терминале **docker-compose up**
во втором терминале **npm run dev**
в .env файле прописать
    DB_CONNECTION=mysql
    DB_HOST=mysql
    DB_PORT=3306
    DB_DATABASE=laravel-vite
    DB_USERNAME=root
    DB_PASSWORD=root
настроить соединение с базой в менеджере баз данных
    Сервер **Localhost**
    Порт **33063**
    Пользователь **root**
    Пароль **root**
в третьем терминале выполнить 
    1. **Docker-compose exec fpm bash**
    2. cd ../laravel-docker
    3. php artisan migrate

в браузере открыть http://localhost:8099/
