export const useTimeLogStore = defineStore('time_log', () => {
    const { $socket } = useNuxtApp();

    const recordTimeLog = async (matched_code) => {
        const { data: time_log, error } = await useFetch('/api/timelogs/record', {
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

        $socket.emit('emitTimeLogs', JSON.stringify(toRaw(time_log.value)));
    };

    return {
        recordTimeLog
    }
})