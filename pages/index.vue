<script setup>
    import moment from 'moment';

    const runtimeConfig = useRuntimeConfig();

    const { $realtimeClient, $broadcastChannel } = useNuxtApp();
    const { getUserDetails } = useTimeLogStore();

    const no_picture_employee_gcgmmc = runtimeConfig.public.AVATAR_NO_PICTURE_URL+'/employee/gcgmmc.jpg';
    const no_picture_trainee_blank = runtimeConfig.public.AVATAR_NO_PICTURE_URL+'/trainee/blank.jpg';
    const no_picture_remote_worker_blank = runtimeConfig.public.AVATAR_NO_PICTURE_URL+'/remote_worker/blank.jpg';

    // ! ---------------------------------------------------------------------------------------------------

    const { data: all_time_logs, refresh: refreshTimelogs } = await useAsyncData('timelogs', async () =>
        $fetch('/api/web/timelogs/all_location', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
    );

    // ! ---------------------------------------------------------------------------------------------------

    onMounted(async () => {
        setInterval(() => {
            refreshTimelogs();
        }, (1000 * 60) * 5);

        // ! ---------------------------------------------------------------------------------------------------

        let realtimeChannel = $realtimeClient.channel('db-changes');

        realtimeChannel.on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'time_logs'
        }, (payload) => {
            console.groupCollapsed('[Realtime: Index] TimeLogs - Insert');
            console.log(payload);
            console.groupEnd();

            refreshTimelogs();
        });

        realtimeChannel.subscribe((status) => {
            // if(status === 'SUBSCRIBED') {
            //     console.log('Ready to receive database changes.');
            // }
            if(status !== 'SUBSCRIBED') { return; }
        });

        // ! ---------------------------------------------------------------------------------------------------

        // $broadcastChannel.on('broadcast', {
        //     event: 'broadcast-index'
        // }, ({ payload }) => {
        //     console.groupCollapsed('[Broadcast - Index] TimeLog - Insert');
        //     console.log(payload);
        //     console.groupEnd();

        //     console.log(payload.data.location);

        //     console.groupCollapsed('[Broadcast - Index] all_time_logs');
        //     console.log(all_time_logs.value);
        //     console.groupEnd();

        //     if(payload.status == 'inserted') {
        //         refreshTimelogs();
        //         if(payload.data.location == 'main_gate') {
        //             all_time_logs.value.main_gate.unshift(payload.data);
        //             all_time_logs.value.main_gate.splice(5);
        //         }
        //         if(payload.data.location == 'opd_gate') {
        //             all_time_logs.value.opd_gate.unshift(payload.data);
        //             all_time_logs.value.opd_gate.splice(5);
        //         }
        //         if(payload.data.location == 'back_gate') {
        //             all_time_logs.value.back_gate.unshift(payload.data);
        //             all_time_logs.value.back_gate.splice(5);
        //         }
        //     }
        // });

        // ! ---------------------------------------------------------------------------------------------------

        console.groupCollapsed('[onMounted - Index] all_time_logs');
        console.log(all_time_logs.value);
        console.groupEnd();
    });

    onUnmounted(() => {
    });
</script>
<template>
    <div class="grid grid-rows-3 grid-flow-col gap-2
        pt-2
        2xl:pb-40 xl:pb-40 lg:pb-48 md:pb-40 sm:pb-64 pb-64 px-2">

        <div class="grid grid-cols-8 gap-2">
            <div v-for="time_log in all_time_logs.main_gate" :key="time_log.id"
                class="2xl:col-span-1 xl:col-span-1 lg:col-span-2 md:col-span-2 sm:col-span-4 col-span-4">
                <div class="card card-compact w-full h-full glass shadow-lg">
                    <figure>
                        <img :src="getUserDetails(time_log, 'avatar_url')"
                            @error="$event.target.src = time_log.userType == 'employee'
                                ? no_picture_employee_gcgmmc
                                : (time_log.userType == 'trainee'
                                    ? no_picture_trainee_blank
                                    : no_picture_remote_worker_blank)" />
                    </figure>
                    <div class="card-body grid content-center justify-items-center">
                        <div class="w-full text-center">
                            <p class="font-mono text-xs">{{ getUserDetails(time_log, 'full_name') }}</p>
                        </div>
                        <div class="w-full flex justify-between">
                            <div class="flex justify-evenly">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                &nbsp;
                                <span class="text-xs font-mono">{{ time_log.location == 'main_gate' ? 'Main Gate' : (time_log.location == 'opd_gate' ? 'OPD Gate' : 'Back Gate') }}</span>
                            </div>
                            <div class="flex justify-evenly">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                &nbsp;
                                <span class="text-xs font-mono">{{ moment(time_log.timeLog).format("LT") }}</span> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-8 gap-2">
            <div v-for="time_log in all_time_logs.opd_gate" :key="time_log.id"
                class="2xl:col-span-1 xl:col-span-1 lg:col-span-2 md:col-span-2 sm:col-span-4 col-span-4" >
                <div class="card card-compact w-full h-full glass shadow-lg">
                    <figure>
                        <img :src="getUserDetails(time_log, 'avatar_url')"
                        @error="$event.target.src = time_log.userType == 'employee' ? no_picture_employee_gcgmmc : no_picture_trainee_blank" />
                    </figure>
                    <div class="card-body grid content-center justify-items-center">
                        <div class="w-full text-center">
                            <p class="font-mono text-xs">{{ getUserDetails(time_log, 'full_name') }}</p>
                        </div>
                        <div class="w-full flex justify-between">
                            <div class="flex justify-evenly">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                &nbsp;
                                <span class="text-xs font-mono">{{ time_log.location == 'main_gate' ? 'Main Gate' : (time_log.location == 'opd_gate' ? 'OPD Gate' : 'Back Gate') }}</span>
                            </div>
                            <div class="flex justify-evenly">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                &nbsp;
                                <span class="text-xs font-mono">{{ moment(time_log.timeLog).format("LT") }}</span> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-8 gap-2">
            <div v-for="time_log in all_time_logs.back_gate" :key="time_log.id"
                class="2xl:col-span-1 xl:col-span-1 lg:col-span-2 md:col-span-2 sm:col-span-4 col-span-4" >
                <div class="card card-compact w-full h-full glass shadow-lg">
                    <figure>
                        <img :src="getUserDetails(time_log, 'avatar_url')"
                        @error="$event.target.src = time_log.userType == 'employee' ? no_picture_employee_gcgmmc : no_picture_trainee_blank" />
                    </figure>
                    <div class="card-body grid content-center justify-items-center">
                        <div class="w-full text-center">
                            <p class="font-mono text-xs">{{ getUserDetails(time_log, 'full_name') }}</p>
                        </div>
                        <div class="w-full flex justify-between">
                            <div class="flex justify-evenly">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                &nbsp;
                                <span class="text-xs font-mono">{{ time_log.location == 'main_gate' ? 'Main Gate' : (time_log.location == 'opd_gate' ? 'OPD Gate' : 'Back Gate') }}</span>
                            </div>
                            <div class="flex justify-evenly">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                &nbsp;
                                <span class="text-xs font-mono">{{ moment(time_log.timeLog).format("LT") }}</span> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>