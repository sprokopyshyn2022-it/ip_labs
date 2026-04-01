import http from 'http';
import { todos } from './data.js'; // Імпортуємо наші дані

// На хостингу порт видається автоматично через process.env.PORT
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // 1. Налаштування CORS (щоб Angular міг звертатися до сервера)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Обробка попереднього (preflight) запиту від браузера
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 2. Маршрутизація (Routing)
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Мій перший сервер на Node.js працює!</h1>');
    } 
    else if (req.url === '/api/v1/todoItem' && req.method === 'GET') {
        // Віддаємо масив завдань у форматі JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ message: 'Маршрут не знайдено' }));
    }
});

server.listen(PORT, () => {
    console.log(`Сервер успішно запущено за адресою: http://localhost:${PORT}`);
});