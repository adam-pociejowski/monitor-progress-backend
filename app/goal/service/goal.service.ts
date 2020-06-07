import { CouchDbService } from "../../couchdb/service/couchdb.service";
import { Goal } from "../model/goal.model";
import { GoalItem } from "../model/goal-item.model";
import { Period } from "../model/period.enum";
import {DateService} from "./date.service";
const db = require('../../couchdb/config/couchdb.config');

export class GoalService extends CouchDbService<Goal> {

    constructor() {
        super(db.goalsDbName);
    }

    public static generateCurrentGoalItem = (goal: Goal) => {
        let now = new Date();
        switch (goal.period) {
            case Period.NONE:
                return GoalService.generateCurrentGoalItemForNonePeriod();
            case Period.DAILY:
                return GoalService.generateCurrentGoalItemForDailyPeriod(now);
            case Period.WEEKLY:
                return GoalService.generateCurrentGoalItemForWeeklyPeriod(now);
            case Period.MONTHLY:
                return GoalService.generateCurrentGoalItemForMonthlyPeriod(now);
            case Period.YEARLY:
                return GoalService.generateCurrentGoalItemForYearlyPeriod(now);
            default:
                throw new Error(`No goal item generation strategy found for period ${goal.period}`);
            }
         }

    private static generateCurrentGoalItemForNonePeriod = () =>
        new GoalItem(null, null)

    private static generateCurrentGoalItemForDailyPeriod = (date: Date) =>
        new GoalItem(
            DateService.getBeginOfDay(date),
            DateService.getEndOfDay(date))

    private static generateCurrentGoalItemForWeeklyPeriod = (date: Date) =>
        new GoalItem(
            DateService.getBeginOfWeek(date),
            DateService.getEndOfWeek(date))

    private static generateCurrentGoalItemForMonthlyPeriod = (date: Date) =>
        new GoalItem(
            DateService.getBeginOfMonth(date),
            DateService.getEndOfMonth(date))

    private static generateCurrentGoalItemForYearlyPeriod = (date: Date) =>
        new GoalItem(
            DateService.getBeginOfYear(date),
            DateService.getEndOfYear(date))
}
