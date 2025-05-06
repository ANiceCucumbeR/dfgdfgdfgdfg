const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 10000 });

wss.on('connection', (ws) => {
    console.log('A new client connected!');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Рассылаем сообщение всем подключенным клиентам
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('A client disconnected.');
    });
});

console.log('WebSocket server is running on ws://localhost:3000');