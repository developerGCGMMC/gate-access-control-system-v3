<script setup>

    import moment from 'moment';

    const runtimeConfig = useRuntimeConfig();
    const { $socket } = useNuxtApp();
    const route = useRoute();

    const { getUserDetails } = useTimeLogStore();

    const no_picture_employee_gcgmmc = runtimeConfig.public.AVATAR_NO_PICTURE_URL+'/employee/gcgmmc.jpg';
    const no_picture_employee_blank = runtimeConfig.public.AVATAR_NO_PICTURE_URL+'/employee/blank.jpg';
    const no_picture_trainee_blank = runtimeConfig.public.AVATAR_NO_PICTURE_URL+'/trainee/blank.jpg';

    // ! ---------------------------------------------------------------------------------------------------

    const { data: time_logs, refresh: refreshTimelogs } = await useAsyncData('timelogs', async () =>
        $fetch('/api/timelogs/location', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        })
    );

    // ! ---------------------------------------------------------------------------------------------------

    onMounted(() => {
        $socket.on('broadcastTimeLogs', (data) => {
            refreshTimelogs();

            console.groupCollapsed('broadcastTimeLogs');
            console.log(data);
            console.groupEnd();
        });
    });
</script>
<template>
    <!-- <NuxtLink to="/access/main">
    </NuxtLink> -->
    <div class="grid grid-rows-3 grid-flow-col gap-2
        pt-2
        2xl:pb-40 xl:pb-40 lg:pb-48 md:pb-40 sm:pb-64 pb-64 px-2">

        <div class="grid grid-cols-8 gap-2">
            <div v-for="time_log in time_logs.main_gate" :key="time_log.id"
                class="2xl:col-span-1 xl:col-span-1 lg:col-span-2 md:col-span-2 sm:col-span-4 col-span-4" >
                <div class="card card-compact w-full h-full glass shadow-lg">
                    <figure>
                        <img :src="getUserDetails(time_log, 'avatar_url')"
                        @error="$event.target.src = time_log.userType == 'employee' ? no_picture_employee_gcgmmc : no_picture_trainee_blank" />
                    </figure>
                    <div class="card-body text-center">
                        <span class="font-mono text-xs">{{ getUserDetails(time_log, 'full_name') }}</span>
                        <div class="flex justify-between">
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
            <div v-for="time_log in time_logs.opd_gate" :key="time_log.id"
                class="2xl:col-span-1 xl:col-span-1 lg:col-span-2 md:col-span-2 sm:col-span-4 col-span-4" >
                <div class="card card-compact w-full h-full glass shadow-lg">
                    <figure>
                        <img :src="getUserDetails(time_log, 'avatar_url')"
                        @error="$event.target.src = time_log.userType == 'employee' ? no_picture_employee_gcgmmc : no_picture_trainee_blank" />
                    </figure>
                    <div class="card-body text-center">
                        <span class="font-mono text-xs">{{ getUserDetails(time_log, 'full_name') }}</span>
                        <div class="flex justify-between">
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
            <div v-for="time_log in time_logs.back_gate" :key="time_log.id"
                class="2xl:col-span-1 xl:col-span-1 lg:col-span-2 md:col-span-2 sm:col-span-4 col-span-4" >
                <div class="card card-compact w-full h-full glass shadow-lg">
                    <figure>
                        <img :src="getUserDetails(time_log, 'avatar_url')"
                        @error="$event.target.src = time_log.userType == 'employee' ? no_picture_employee_gcgmmc : no_picture_trainee_blank" />
                    </figure>
                    <div class="card-body text-center">
                        <span class="font-mono text-xs">{{ getUserDetails(time_log, 'full_name') }}</span>
                        <div class="flex justify-between">
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