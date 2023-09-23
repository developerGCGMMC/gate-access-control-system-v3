import io from 'socket.io-client';

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig();

    const socket = io(runtimeConfig.public.SOCKET_ADDRESS);

    return {
        provide: {
            socket: socket
        }
    }
});