import io from 'socket.io-client';

export default defineNuxtPlugin(() => {
    // const runtimeConfig = useRuntimeConfig();
    // const socket = runtimeConfig.NODE_ENV == 'development' ? io('http://localhost:3000') : io();

    // const socket = io();
    const socket = io('http://192.168.7.3:8080');

    return {
        provide: {
            socket: socket
        }
    }
});