export const useAccessCodeStore = defineStore('access_codes', () => {
    const access_codes = reactive({
        data: null
    });

    const fetchAccessCodes = async () => {
        const { data: codes, error } = await useFetch('/api/access/list', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if(error.value) {
            const { statusCode, statusMessage } = error?.value;

            console.groupCollapsed('API Errors')
            console.error(statusCode+': '+statusMessage);
            console.groupEnd();

            return;
        }

        access_codes.data = codes.value;
    };

    return {
        access_codes,
        fetchAccessCodes
    }
});