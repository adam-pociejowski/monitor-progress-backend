export class DateService {

    public static getBeginOfDay = (date: Date) => {
        date.setHours(0,0,0,0);
        return date;
    }

    public static getEndOfDay = (date: Date) => {
        date.setHours(23,59,59,999);
        return date;
    }

    public static getBeginOfWeek = (date: Date) => {
        date.setDate(date.getDate() - DateService.getCurrentDayOfWeek(date));
        return DateService.getBeginOfDay(date);
    }

    public static getEndOfWeek = (date: Date) => {
        date.setDate(date.getDate() + (6 - DateService.getCurrentDayOfWeek(date)));
        return DateService.getEndOfDay(date);
    }

    public static getBeginOfMonth = (date: Date) => {
        date.setDate(1);
        return DateService.getBeginOfDay(date);
    }

    public static getEndOfMonth = (date: Date) => {
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return DateService.getEndOfDay(date);
    }

    public static getBeginOfYear = (date: Date) => {
        date.setMonth(0);
        return DateService.getBeginOfMonth(date);
    }

    public static getEndOfYear = (date: Date) => {
        date.setMonth(11);
        return DateService.getEndOfMonth(date);
    }

    private static getCurrentDayOfWeek = (date: Date) => date.getDay() + 6;
}