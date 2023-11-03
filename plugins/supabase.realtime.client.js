import { RealtimeClient } from '@supabase/realtime-js';

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig();

    const realtimeClient = new RealtimeClient(runtimeConfig.public.REALTIME_URL, {
        params: {
            apikey: runtimeConfig.public.API_KEY,
            eventsPerSecond: 10
        }
    });

    // const realtimeChannel = realtimeClient.channel('db-changes');

    const broadcastChannel = realtimeClient.channel('broadcast-channel', {
        config: {
            broadcast: { self: true }
        }
    })
    .subscribe((status) => {
        // if(status === 'SUBSCRIBED') {
        //     console.log('Ready to transmit broadcast payloads.');
        // }
        if(status !== 'SUBSCRIBED') { return; }
    });

    return {
        provide: {
            realtimeClient: realtimeClient,
            // realtimeChannel: realtimeChannel,
            broadcastChannel: broadcastChannel
        }
    }
});