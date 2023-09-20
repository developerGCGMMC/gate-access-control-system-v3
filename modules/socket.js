import { Server } from 'socket.io';

export default (_, nuxt) => {
    nuxt.hook('listen', server => {
        const io = new Server(server);

        nuxt.hook('close', () => io.close());

        io.on('connection', (socket) => {
            console.log('Connection', socket.id);

            socket.on('emitTimeLogs', (data) => {
                io.emit('broadcastTimeLogs', data);
            });

            socket.on('broadcastTest', (data) => {
                console.log('Receiving data: \"'+data+'\" & broadcasting to clients.');
                io.emit('broadcastingTest', data);
            });
        });
    })
}