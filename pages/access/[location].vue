<script setup>
    definePageMeta({
        middleware: ['access']
    });

    import moment from 'moment';

    const runtimeConfig = useRuntimeConfig();
    const { $socket } = useNuxtApp();
    const route = useRoute();

    const { getUserDetails } = useTimeLogStore();

    const no_picture_employee_gcgmmc = runtimeConfig.public.AVATAR_NO_PICTURE_URL+'/employee/gcgmmc.jpg';
    const no_picture_trainee_blank = runtimeConfig.public.AVATAR_NO_PICTURE_URL+'/trainee/blank.jpg';

    // ! ---------------------------------------------------------------------------------------------------

    const { data: time_logs, refresh: refreshTimelogs } = await useAsyncData('timelogs', async () =>
        $fetch('/api/timelogs/list?location='+route.params.location, {
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
    <div class="grid grid-cols-12 gap-2
        pt-2
        2xl:pb-2 xl:pb-2 lg:pb-32 md:pb-36 sm:pb-80 pb-96 px-2">
        <div v-for="time_log in time_logs" :key="time_log.id"
            class="2xl:col-span-3 xl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
            <div class="card w-full h-full glass shadow-xl">
                <figure>
                    <img :src="getUserDetails(time_log, 'avatar_url')"
                        @error="$event.target.src = time_log.userType == 'employee' ? no_picture_employee_gcgmmc : no_picture_trainee_blank" />
                </figure>
                <div class="card-body px-5">
                    <h2 class="card-title">{{ getUserDetails(time_log, 'full_name') }}</h2>
                    <p v-if="time_log.userType == 'employee'" class="font-mono tracking-wide">{{ time_log.employee.serviceName }}</p>
                    <p v-if="time_log.userType == 'trainee'" class="font-mono tracking-wide">{{ time_log.trainee.designation }}</p>
                    <div class="divider my-3"></div>
                    <div class="card-actions justify-end items-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span class="font-mono tracking-wide">{{ moment(time_log.timeLog).format("LTS") }}</span> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>