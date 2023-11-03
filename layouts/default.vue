<script setup>
    import { useFocus } from '@vueuse/core';
    import { storeToRefs } from 'pinia';
    import moment from 'moment';

    const runtimeConfig = useRuntimeConfig();
    const route = useRoute();

    const { access_codes } = storeToRefs(useAccessCodeStore());

    const access_code = reactive({
        employees: access_codes.value.data.employees,
        trainees: access_codes.value.data.trainees,
        remote_workers: access_codes.value.data.remote_workers
    });

    const image_banner = runtimeConfig.public.IMAGE_URL+"/banner/banner_shadow.png";

    var timer = 0;
    const scan_code = ref(null);
    const ref_scan_code = ref();

    const matched_code = reactive({
        user: null,
        access: null,
        code: null,
        location: null
    });

    const show_no_authorization_alert = ref(false);

    const { focused: focus_scan_code } = useFocus(ref_scan_code, { initialValue: true });

    // ! ---------------------------------------------------------------------------------------------------

    const processCode = async (code) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            clearMatchedCode();
            show_no_authorization_alert.value = false;

            matched_code.location = route.params.location == 'main'
                ? 'main_gate'
                : (route.params.location == 'opd'
                    ? 'opd_gate'
                    : 'back_gate');

            // ! ---------------------------------------------------------------------------------------------------

            let matched_employee_qr_code = access_code.employees.qr_codes.find((qr_code) => {
                return qr_code == code;
            }) ?? null;
            let matched_employee_bar_code = access_code.employees.bar_codes.find((bar_code) => {
                return bar_code == code;
            }) ?? null;
            let matched_employee_rfid_hf_tag = access_code.employees.rfid_hf_tags.find((rfid_hf_tag) => {
                return rfid_hf_tag == code;
            }) ?? null;

            let matched_trainee_qr_code = access_code.trainees.qr_codes.find((qr_code) => {
                return qr_code == code;
            }) ?? null;
            let matched_trainee_bar_code = access_code.trainees.bar_codes.find((bar_code) => {
                return bar_code == code;
            }) ?? null;
            let matched_trainee_rfid_hf_tag = access_code.trainees.rfid_hf_tags.find((rfid_hf_tag) => {
                return rfid_hf_tag == code;
            }) ?? null;

            let matched_remote_worker_qr_code = access_code.remote_workers.qr_codes.find((qr_code) => {
                return qr_code == code;
            }) ?? null;
            let matched_remote_worker_bar_code = access_code.remote_workers.bar_codes.find((bar_code) => {
                return bar_code == code;
            }) ?? null;
            let matched_remote_worker_rfid_hf_tag = access_code.remote_workers.rfid_hf_tags.find((rfid_hf_tag) => {
                return rfid_hf_tag == code;
            }) ?? null;

            // console.groupCollapsed('Code Matches:');
            // console.log('matched_employee_qr_code: '+matched_employee_qr_code);
            // console.log('matched_employee_bar_code: '+matched_employee_bar_code);
            // console.log('matched_employee_rfid_hf_tag: '+matched_employee_rfid_hf_tag);
            // console.log('---------- ---------- ---------- ---------- ---------- ----------');
            // console.log('matched_trainee_qr_code: '+matched_trainee_qr_code);
            // console.log('matched_trainee_bar_code: '+matched_trainee_bar_code);
            // console.log('matched_trainee_rfid_hf_tag: '+matched_trainee_rfid_hf_tag);
            // console.log('---------- ---------- ---------- ---------- ---------- ----------');
            // console.log('matched_remote_worker_qr_code: '+matched_remote_worker_qr_code);
            // console.log('matched_remote_worker_bar_code: '+matched_remote_worker_bar_code);
            // console.log('matched_remote_worker_rfid_hf_tag: '+matched_remote_worker_rfid_hf_tag);
            // console.groupEnd();

            // ! ---------------------------------------------------------------------------------------------------

            if(matched_employee_qr_code) {
                matched_code.user = 'employee';
                matched_code.access = 'qr_code';
                matched_code.code = matched_employee_qr_code;
            }
            if(matched_employee_bar_code) {
                matched_code.user = 'employee';
                matched_code.access = 'bar_code';
                matched_code.code = matched_employee_bar_code;
            }
            if(matched_employee_rfid_hf_tag) {
                matched_code.user = 'employee';
                matched_code.access = 'rfid_hf_tag';
                matched_code.code = matched_employee_rfid_hf_tag;
            }

            if(matched_trainee_qr_code) {
                matched_code.user = 'trainee';
                matched_code.access = 'qr_code';
                matched_code.code = matched_trainee_qr_code;
            }
            if(matched_trainee_bar_code) {
                matched_code.user = 'trainee';
                matched_code.access = 'bar_code';
                matched_code.code = matched_trainee_bar_code;
            }
            if(matched_trainee_rfid_hf_tag) {
                matched_code.user = 'trainee';
                matched_code.access = 'rfid_hf_tag';
                matched_code.code = matched_trainee_rfid_hf_tag;
            }

            if(matched_remote_worker_qr_code) {
                matched_code.user = 'remote_worker';
                matched_code.access = 'qr_code';
                matched_code.code = matched_remote_worker_qr_code;
            }
            if(matched_remote_worker_bar_code) {
                matched_code.user = 'remote_worker';
                matched_code.access = 'bar_code';
                matched_code.code = matched_remote_worker_bar_code;
            }
            if(matched_remote_worker_rfid_hf_tag) {
                matched_code.user = 'remote_worker';
                matched_code.access = 'rfid_hf_tag';
                matched_code.code = matched_remote_worker_rfid_hf_tag;
            }

            // ! ---------------------------------------------------------------------------------------------------

            if(matched_code.code) {
                // console.groupCollapsed('Matched Code');
                // console.log(matched_code);
                // console.groupEnd();

                recordTimeLog(matched_code);

                setTimeout(() => {
                    scan_code.value = null;
                }, 150);
            } else {
                show_no_authorization_alert.value = true;

                console.groupCollapsed('[Error] Scan: No match');
                console.log(code);
                console.groupEnd();

                scan_code.value = null;
            }
        }, 200);
    };

    const recordTimeLog = async (matched_code) => {
        const { data: time_log, error } = await useFetch('/api/web/timelogs/record', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                matched_code: matched_code
            })
        });

        if(error.value) {
            const { statusCode, statusMessage } = error?.value;

            console.error(statusCode+': '+statusMessage);

            return;
        }

        console.groupCollapsed('Response: recordTimeLog');
        console.log(time_log.value);
        console.groupEnd();

        // ! ---------------------------------------------------------------------------------------------------

        // $broadcastChannel.send({
        //     type: 'broadcast',
        //     event: 'broadcast-index',
        //     payload: time_log.value
        // });
        // $broadcastChannel.send({
        //     type: 'broadcast',
        //     event: 'broadcast-location',
        //     payload: time_log.value
        // });
    };

    const clearMatchedCode = () => {
        matched_code.user = null;
        matched_code.access = null;
        matched_code.code = null;
        matched_code.location = null;
    }

    // ! ---------------------------------------------------------------------------------------------------

    onMounted(async () => {
        setInterval(() => {
            focus_scan_code.value = true;

            document.getElementById('clock_year').style.setProperty('--value', moment().format('YY'));
            document.getElementById('clock_month').style.setProperty('--value', moment().format('MM'));
            document.getElementById('clock_day').style.setProperty('--value', moment().format('DD'));
            document.getElementById('clock_hour').style.setProperty('--value', moment().format('hh'));
            document.getElementById('clock_minute').style.setProperty('--value', moment().format('mm'));
            document.getElementById('clock_seconds').style.setProperty('--value', moment().format('ss'));
        }, 1000);

        // ! ---------------------------------------------------------------------------------------------------
    });
</script>
<template>
    <div>
        <div v-if="show_no_authorization_alert"
            class="alert alert-error
                mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span class="text-xl font-mono">Warning: No Authorization!</span>
        </div>
        <slot />

        <footer class="footer p-5 bg-base-200 text-base-content
            grid grid-cols-12 gap-1
            fixed bottom-0">
            <div class="2xl:col-span-3 xl:col-span-4 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12
                w-full h-full
                items-center justify-items-start">
                <NuxtLink to="/">
                    <img :src="image_banner" />
                </NuxtLink>
            </div>

            <div class="2xl:col-span-6 xl:col-span-4 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12
                w-full h-full
                items-center justify-items-center">
                <div class="grid grid-flow-col auto-cols-max
                    2xl:gap-5 xl:gap-5 lg:gap-5 md:gap-4 sm:gap-3 gap-2
                    text-center">
                    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content glass">
                        <span class="countdown font-mono
                            2xl:text-5xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl text-3xl">
                            <span id="clock_day" style="--value;"></span>
                        </span>
                        day
                    </div>
                    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content glass">
                        <span class="countdown font-mono
                            2xl:text-5xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl text-3xl">
                            <span id="clock_month" style="--value;"></span>
                        </span>
                        mon
                    </div> 
                    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content glass">
                        <span class="countdown font-mono
                            2xl:text-5xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl text-3xl">
                            <span id="clock_year" style="--value;"></span>
                        </span>
                        year
                    </div> 

                    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content glass">
                        <span class="countdown font-mono
                            2xl:text-5xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl text-3xl">
                            <span id="clock_hour" style="--value;"></span>
                        </span>
                        hour
                    </div> 
                    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content glass">
                        <span class="countdown font-mono
                            2xl:text-5xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl text-3xl">
                            <span id="clock_minute" style="--value;"></span>
                        </span>
                        min
                    </div> 
                    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content glass">
                        <span class="countdown font-mono
                            2xl:text-5xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl text-3xl">
                            <span id="clock_seconds" style="--value;"></span>
                        </span>
                        sec
                    </div>
                </div>
                <span class="2xl:text-sm xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs font-mono">For correction and inquiries, call 247 - IMISS Software Development Team</span>
            </div>

            <div class="2xl:col-span-3 xl:col-span-4 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12
                w-full h-full
                grid content-center justify-items-center">
                <div v-show="(route.fullPath == '/access/main' || route.fullPath == '/access/opd' || route.fullPath == '/access/back')"
                    class="w-full">
                    <div class="w-full flex justify-start items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        &nbsp;
                        <span class="font-mono tracking-widest">{{ route.params.location == 'main'
                                    ? 'Main Gate'
                                    : (route.params.location == 'opd'
                                        ? 'OPD Gate'
                                        : (route.params.location == 'back'
                                            ? 'Back Gate'
                                            : null)) }}
                        </span>
                    </div>
                    <div class="form-control w-full mt-1">
                        <input v-model="scan_code"
                            ref="ref_scan_code"
                            @update:model-value="processCode($event)"
                            type="text"
                            placeholder="QR Code / Barcode / RFID"
                            class="input input-bordered input-md w-full" />
                    </div>
                </div>

                <div v-show="route.fullPath == '/'"
                    class="join shadow-md">
                    <NuxtLink to="/access/main" class="btn btn-ghost btn-active join-item">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Main
                    </NuxtLink>
                    <NuxtLink to="/access/opd" class="btn btn-ghost btn-active join-item">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        OPD
                    </NuxtLink>
                    <NuxtLink to="/access/back" class="btn btn-ghost btn-active join-item">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Back
                    </NuxtLink>
                </div>

                <div class="w-full text-center">
                    <span class="font-mono font-semibold tracking-widest uppercase">Gate Access Control System 3.2 (beta)</span>
                </div>
            </div>
        </footer>
    </div>
</template>