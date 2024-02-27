import moment from "moment";

class FormatDateServices {

    
    formatMoment(date: Date | string) {
        if (typeof date === 'string') {
            return moment(new Date(date));
        }
        
        return moment(date);
    }

    formatDateTime(date: Date | string) {
        if (!date) {
            return ""
        }

        let dateTimeFormat = new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

        return dateTimeFormat.format(new Date(date));
    }


    formatDate(date: Date) {
        if (!date) {
            return ""
        }
        let dateTimeFormat = new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        return dateTimeFormat.format(new Date(date));
    }


    formatTime(date: Date) {
        if (!date) {
            return ""
        }
        let dateTimeFormat = new Intl.DateTimeFormat(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        });

        return dateTimeFormat.format(new Date(date));
    }
}

export default new FormatDateServices();