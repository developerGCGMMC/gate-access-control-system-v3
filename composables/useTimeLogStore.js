export const useTimeLogStore = defineStore('time_log', () => {
    const runtimeConfig = useRuntimeConfig();
    const { $socket } = useNuxtApp();

    const avatar_no_picture_url = runtimeConfig.public.AVATAR_NO_PICTURE_URL;

    const recordTimeLog = async (matched_code) => {
        const { data: data, error } = await useFetch('/api/timelogs/record', {
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

        // console.groupCollapsed('Response: recordTimeLog');
        // console.log(time_log.value);
        // console.groupEnd();

        // ! ---------------------------------------------------------------------------------------------------

        $socket.emit('emitTimeLogs', JSON.stringify(toRaw(data.value)));
    };

    const getUserDetails = (time_log, detail) => {
        if(time_log.userType == 'employee' && detail == 'full_name') {
            return (time_log.employee.middleName && time_log.employee.middleName != 'null')
                ? (time_log.employee.firstName+" "+time_log.employee.middleName.charAt(0)+". "+time_log.employee.lastName)
                : (time_log.employee.firstName+" "+time_log.employee.lastName)
        }
        if(time_log.userType == 'employee' && detail == 'avatar_url') {
            const biometrics_no = time_log.employee.biometricsNo;
            const avatar_url = runtimeConfig.public.AVATAR_EMPLOYEES_URL;

            if(biometrics_no >= 1 && biometrics_no <= 100) {
                return avatar_url+'/1-100/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 101 && biometrics_no <= 200) {
                return avatar_url+'/101-200/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 201 && biometrics_no <= 300) {
                return avatar_url+'/201-300/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 301 && biometrics_no <= 400) {
                return avatar_url+'/301-400/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 401 && biometrics_no <= 500) {
                return avatar_url+'/401-500/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 501 && biometrics_no <= 600) {
                return avatar_url+'/501-600/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 601 && biometrics_no <= 700) {
                return avatar_url+'/601-700/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 701 && biometrics_no <= 800) {
                return avatar_url+'/701-800/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 801 && biometrics_no <= 900) {
                return avatar_url+'/801-900/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 901 && biometrics_no <= 1000) {
                return avatar_url+'/901-1000/'+biometrics_no+'.jpg';
            }

            if(biometrics_no >= 1001 && biometrics_no <= 1100) {
                return avatar_url+'/1001-1100/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 1101 && biometrics_no <= 1200) {
                return avatar_url+'/1101-1200/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 1201 && biometrics_no <= 1300) {
                return avatar_url+'/1201-1300/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 1301 && biometrics_no <= 1400) {
                return avatar_url+'/1301-1400/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 1401 && biometrics_no <= 1500) {
                return avatar_url+'/1401-1500/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 1501 && biometrics_no <= 1600) {
                return avatar_url+'/1501-1600/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 1601 && biometrics_no <= 1700) {
                return avatar_url+'/1601-1700/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 1701 && biometrics_no <= 1800) {
                return avatar_url+'/1701-1800/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 1801 && biometrics_no <= 1900) {
                return avatar_url+'/1801-1900/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 1901 && biometrics_no <= 2000) {
                return avatar_url+'/1901-2000/'+biometrics_no+'.jpg';
            }

            if(biometrics_no >= 2001 && biometrics_no <= 2100) {
                return avatar_url+'/2001-2100/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 2101 && biometrics_no <= 2200) {
                return avatar_url+'/2101-2200/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 2201 && biometrics_no <= 2300) {
                return avatar_url+'/2201-2300/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 2301 && biometrics_no <= 2400) {
                return avatar_url+'/2301-2400/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 2401 && biometrics_no <= 2500) {
                return avatar_url+'/2401-2500/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 2501 && biometrics_no <= 2600) {
                return avatar_url+'/2501-2600/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 2601 && biometrics_no <= 2700) {
                return avatar_url+'/2601-2700/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 2701 && biometrics_no <= 2800) {
                return avatar_url+'/2701-2800/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 2801 && biometrics_no <= 2900) {
                return avatar_url+'/2801-2900/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 2901 && biometrics_no <= 3000) {
                return avatar_url+'/2901-3000/'+biometrics_no+'.jpg';
            }

            if(biometrics_no >= 3001 && biometrics_no <= 3100) {
                return avatar_url+'/3001-3100/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 3101 && biometrics_no <= 3200) {
                return avatar_url+'/3101-3200/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 3201 && biometrics_no <= 3300) {
                return avatar_url+'/3201-3300/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 3301 && biometrics_no <= 3400) {
                return avatar_url+'/3301-3400/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 3401 && biometrics_no <= 3500) {
                return avatar_url+'/3401-3500/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 3501 && biometrics_no <= 3600) {
                return avatar_url+'/3501-3600/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 3601 && biometrics_no <= 3700) {
                return avatar_url+'/3601-3700/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 3701 && biometrics_no <= 3800) {
                return avatar_url+'/3701-3800/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 3801 && biometrics_no <= 3900) {
                return avatar_url+'/3801-3900/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 3901 && biometrics_no <= 4000) {
                return avatar_url+'/3901-4000/'+biometrics_no+'.jpg';
            }

            if(biometrics_no >= 4001 && biometrics_no <= 4100) {
                return avatar_url+'/4001-4100/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 4101 && biometrics_no <= 4200) {
                return avatar_url+'/4101-4200/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 4201 && biometrics_no <= 4300) {
                return avatar_url+'/4201-4300/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 4301 && biometrics_no <= 4400) {
                return avatar_url+'/4301-4400/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 4401 && biometrics_no <= 4500) {
                return avatar_url+'/4401-4500/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 4501 && biometrics_no <= 4600) {
                return avatar_url+'/4501-4600/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 4601 && biometrics_no <= 4700) {
                return avatar_url+'/4601-4700/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 4701 && biometrics_no <= 4800) {
                return avatar_url+'/4701-4800/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 4801 && biometrics_no <= 4900) {
                return avatar_url+'/4801-4900/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 4901 && biometrics_no <= 5000) {
                return avatar_url+'/4901-5000/'+biometrics_no+'.jpg';
            }

            if(biometrics_no >= 5001 && biometrics_no <= 5100) {
                return avatar_url+'/5001-5100/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 5101 && biometrics_no <= 5200) {
                return avatar_url+'/5101-5200/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 5201 && biometrics_no <= 5300) {
                return avatar_url+'/5201-5300/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 5301 && biometrics_no <= 5400) {
                return avatar_url+'/5301-5400/'+biometrics_no+'.jpg';
            }
            if(biometrics_no >= 5401 && biometrics_no <= 5500) {
                return avatar_url+'/5401-5500/'+biometrics_no+'.jpg';
            }
            
            return avatar_no_picture_url+'/employee/blank.jpg';
        }

        // ! ---------------------------------------------------------------------------------------------------

        if(time_log.userType == 'trainee' && detail == 'avatar_url') {
            if(time_log.trainee.organization == null || time_log.trainee.organization == 'null') {
                return avatar_no_picture_url+'/trainee/blank.jpg';
            }
            if(time_log.trainee.organization == 'Holy Name University') {
                return avatar_no_picture_url+'/trainee/hnu.jpg';
            }
            if(time_log.trainee.organization == 'Silliman University') {
                return avatar_no_picture_url+'/trainee/su.jpg';
            }
            if(time_log.trainee.organization == 'South Western University') {
                return avatar_no_picture_url+'/trainee/swu.jpg';
            }
            if(time_log.trainee.organization == 'University of Bohol') {
                return avatar_no_picture_url+'/trainee/ub.jpg';
            }
            if(time_log.trainee.organization == 'University of Visayas') {
                return avatar_no_picture_url+'/trainee/uv.jpg';
            }

            return avatar_no_picture_url+'/trainee/blank.jpg';
        }
        if(time_log.userType == 'trainee' && detail == 'full_name') {
            return (time_log.trainee.middleName && time_log.trainee.middleName != 'null')
                ? (time_log.trainee.firstName+" "+time_log.trainee.middleName.charAt(0)+". "+time_log.trainee.lastName)
                : (time_log.trainee.firstName+" "+time_log.trainee.lastName)
        }

        // ! ---------------------------------------------------------------------------------------------------

        return null;
    };

    return {
        recordTimeLog,
        getUserDetails
    }
})