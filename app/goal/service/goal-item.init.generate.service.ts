import { Period } from "../model/period.enum";
import { GoalItem } from "../model/goal-item.model";
import { DateService } from "./date.service";
import { GoalItemGenerateService } from "./goal-item.generate.service";

export class GoalItemInitGenerateService implements GoalItemGenerateService {

    generate(period: Period): GoalItem {
        let now = new Date();
        switch (period) {
            case Period.NONE:
                return this.generateCurrentGoalItemForNonePeriod();
            case Period.DAILY:
                return this.generateCurrentGoalItemForDailyPeriod(now);
            case Period.WEEKLY:
                return this.generateCurrentGoalItemForWeeklyPeriod(now);
            case Period.MONTHLY:
                return this.generateCurrentGoalItemForMonthlyPeriod(now);
            case Period.YEARLY:
                return this.generateCurrentGoalItemForYearlyPeriod(now);
            default:
                throw new Error(`No goal item generation strategy found for period ${period}`);
        }
    }

    private generateCurrentGoalItemForNonePeriod = () =>
        new GoalItem(null, null, null)

    private generateCurrentGoalItemForDailyPeriod = (date: Date) =>
        new GoalItem(
            null,
            DateService.getBeginOfDay(new Date(date.getTime())),
            DateService.getEndOfDay(new Date(date.getTime())));

    private generateCurrentGoalItemForWeeklyPeriod = (date: Date) =>
        new GoalItem(
            null,
            DateService.getBeginOfWeek(new Date(date.getTime())),
            DateService.getEndOfWeek(new Date(date.getTime())))

    private generateCurrentGoalItemForMonthlyPeriod = (date: Date) =>
        new GoalItem(
            null,
            DateService.getBeginOfMonth(new Date(date.getTime())),
            DateService.getEndOfMonth(new Date(date.getTime())))

    private generateCurrentGoalItemForYearlyPeriod = (date: Date) =>
        new GoalItem(
            null,
            DateService.getBeginOfYear(new Date(date.getTime())),
            DateService.getEndOfYear(new Date(date.getTime())))
}