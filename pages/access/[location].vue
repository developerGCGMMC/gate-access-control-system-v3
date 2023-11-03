<script setup>
    definePageMeta({
        middleware: ['access']
    });

    import moment from 'moment';

    const runtimeConfig = useRuntimeConfig();
    const route = useRoute();
    const { $realtimeClient, $broadcastChannel } = useNuxtApp();
    const { getUserDetails } = useTimeLogStore();

    // ! ---------------------------------------------------------------------------------------------------

    const no_picture_employee_gcgmmc = runtimeConfig.public.AVATAR_NO_PICTURE_URL+'/employee/gcgmmc.jpg';
    const no_picture_trainee_blank = runtimeConfig.public.AVATAR_NO_PICTURE_URL+'/trainee/blank.jpg';
    const no_picture_remote_worker_blank = runtimeConfig.public.AVATAR_NO_PICTURE_URL+'/remote_worker/blank.jpg';

    const location = route.params.location == 'main'
        ? 'main_gate'
        : (route.params.location == 'opd'
            ? 'opd_gate'
            : 'back_gate');

    // const duplicate_user_id = ref(null);

    // ! ---------------------------------------------------------------------------------------------------

    const { data: time_logs, refresh: refreshTimelogs } = await useAsyncData('timelogs', async () =>
        $fetch('/api/web/timelogs/list?location='+location, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
    );

    // ! ---------------------------------------------------------------------------------------------------

    onMounted(() => {
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
            console.groupCollapsed('[Realtime: Location] TimeLogs - Insert');
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
        // ! Web API Inserts

        // $broadcastChannel.on('broadcast', {
        //     event: 'broadcast-location'
        // }, ({ payload }) => {
        //     console.groupCollapsed('[Broadcast - [Location]] TimeLog - Insert');
        //     console.log(payload);
        //     console.groupEnd();

        //     if(payload.status == 'inserted') {
        //         if(time_logs.value.length >= 4) {
        //             time_logs.value.pop();
        //         }

        //         time_logs.value.unshift(payload.data);

        //         duplicate_user_id.value = null;
        //     } else {
        //         console.groupCollapsed('payload.data');
        //         console.log(payload.data);
        //         console.groupEnd();

        //         duplicate_user_id.value = payload.data.userType == 'employee'
        //             ? payload.data.employeesID
        //             : (payload.data.userType == 'trainee'
        //                 ? payload.data.traineesID
        //                 : (payload.data.userType == 'remote_worker'
        //                     ? payload.data.remoteWorkersID
        //                     : null));

        //         console.groupCollapsed('duplicate_user_id');
        //         console.log(duplicate_user_id.value);
        //         console.groupEnd();
        //     }

        //     console.groupCollapsed('[Broadcast - [Location]] time_logs');
        //     console.log(time_logs.value);
        //     console.groupEnd();
        // });

        // ! ---------------------------------------------------------------------------------------------------

        console.groupCollapsed('[onMounted - [Location]] time_logs');
        console.log(time_logs.value);
        console.groupEnd();
    });

    onUnmounted(() => {
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
                        @error="$event.target.src = time_log.userType == 'employee'
                            ? no_picture_employee_gcgmmc
                            : (time_log.userType == 'trainee'
                                ? no_picture_trainee_blank
                                : no_picture_remote_worker_blank)" />
                </figure>
                <div class="card-body px-5">
                    <!-- <h2 class="card-title"
                        :class="((time_log.userType == 'employee' && time_log.employee.id == duplicate_user_id)
                            || (time_log.userType == 'trainee' && time_log.trainee.id == duplicate_user_id)
                            || (time_log.userType == 'remote_worker' && time_log.remoteWorker.id == duplicate_user_id))
                            ? 'animate-bounce'
                            : ''">
                        {{ getUserDetails(time_log, 'full_name') }}
                    </h2> -->
                    <h2 class="card-title">{{ getUserDetails(time_log, 'full_name') }}</h2>

                    <p v-if="time_log.userType == 'employee'" class="font-mono tracking-wide">{{ time_log.employee.serviceName }}</p>
                    <p v-if="time_log.userType == 'trainee'" class="font-mono tracking-wide">{{ time_log.trainee.designation }}</p>
                    <p v-if="time_log.userType == 'remote_worker'" class="font-mono tracking-wide">{{ time_log.remoteWorker.organization }}</p>
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