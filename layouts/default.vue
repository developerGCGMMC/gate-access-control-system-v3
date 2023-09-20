<script setup>
    import { useFocus } from '@vueuse/core';
    import { storeToRefs } from 'pinia';
    import moment from 'moment';

    const runtimeConfig = useRuntimeConfig();
    const route = useRoute();

    const { access_codes } = storeToRefs(useAccessCodeStore());
    const { recordTimeLog } = useTimeLogStore();
    const access_code = reactive({
        employees: access_codes.value.data.employees
    });

    const image_banner = runtimeConfig.public.IMAGE_URL+"/banner.png";

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

    const { focused: focusScanCode } = useFocus(ref_scan_code, { initialValue: true });

    const route_name = route.params.location == 'main'
        ? 'Main Gate'
        : (route.params.location == 'opd'
            ? 'OPD Entrance / Exit'
            : 'Back Gate');

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

            let matched_employee_qr_code = access_code.employees.qr_codes.find((qr_code) => {
                return qr_code == code;
            }) ?? null;
            let matched_employee_bar_code = access_code.employees.bar_codes.find((bar_code) => {
                return bar_code == code;
            }) ?? null;
            let matched_employee_rfid_tag = access_code.employees.rfid_tags.find((rfid_tag) => {
                return rfid_tag == code;
            }) ?? null;

            console.groupCollapsed('Code Matches:');
            console.log('matched_employee_qr_code: '+matched_employee_qr_code);
            console.log('matched_employee_bar_code: '+matched_employee_bar_code);
            console.log('matched_employee_rfid_tag: '+matched_employee_rfid_tag);
            console.groupEnd();

            if(matched_employee_qr_code) {
                matched_code.user = 'employee';
                matched_code.access = 'qr_code';
                matched_code.code = matched_employee_qr_code;
            }
            if(matched_employee_bar_code) {
                matched_code.user = 'employee';
                matched_code.access = 'bar_code';
                matched_code.code = matched_employee_qr_code;
            }
            if(matched_employee_rfid_tag) {
                matched_code.user = 'employee';
                matched_code.access = 'rfid_tag';
                matched_code.code = matched_employee_rfid_tag;
            }

            if(matched_code.code) {
                console.log('Active User');
                console.log(matched_code);

                recordTimeLog(matched_code);

                setTimeout(() => {
                    scan_code.value = null;
                }, 100);
            } else {
                show_no_authorization_alert.value = true;

                console.groupCollapsed('[Error] Scan: No match');
                console.log(code);
                console.groupEnd();

                scan_code.value = null;
            }
        }, 200);
    };

    const clearMatchedCode = () => {
        matched_code.user = null;
        matched_code.access = null;
        matched_code.code = null;
        matched_code.location = null;
    }

    // ! ---------------------------------------------------------------------------------------------------

    onMounted(() => {
        setInterval(() => {
            focusScanCode.value = true;

            document.getElementById('clock_year').style.setProperty('--value', moment().format('YY'));
            document.getElementById('clock_month').style.setProperty('--value', moment().format('MM'));
            document.getElementById('clock_day').style.setProperty('--value', moment().format('DD'));
            document.getElementById('clock_hour').style.setProperty('--value', moment().format('hh'));
            document.getElementById('clock_minute').style.setProperty('--value', moment().format('mm'));
            document.getElementById('clock_seconds').style.setProperty('--value', moment().format('ss'));
        }, 1000);
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
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-12 sm:col-span-12 col-span-12
                w-full h-full items-center justify-items-start">
                <img :src="image_banner" />
                <span class="font-mono text-base">Gate Access Control System ver.3 (beta)</span>
            </div>

            <div class="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12
                w-full h-full items-center justify-items-center">
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
                <span class="text-xs font-mono">For correction and inquiries, call 247, IMISS - Software Development Team</span>
            </div>

            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-12 sm:col-span-12 col-span-12
                w-full h-full items-center justify-items-center">
                <div class="form-control w-full max-w-xs">
                    <input v-model="scan_code"
                        ref="ref_scan_code"
                        @update:model-value="processCode($event)"
                        type="text"
                        placeholder="QR Code / Barcode / RFID"
                        class="input input-bordered input-md w-full" />
                    <label class="label">
                        <span class="font-mono text-sm">Location: {{ route_name }}</span>
                    </label>
                </div>
            </div>
        </footer>
    </div>
</template>