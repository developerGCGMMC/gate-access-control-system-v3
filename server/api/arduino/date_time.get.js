import moment from 'moment';

export default defineEventHandler(async () => {
    return {
        data: {
            year: moment().format("YYYY"),
            month: moment().format("MM"),
            day: moment().format("DD"),
            hour: moment().format("HH"),
            minute: moment().format("mm"),
            second: moment().format("ss")
        }
    };
});