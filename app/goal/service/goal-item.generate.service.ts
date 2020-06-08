import { Period } from "../model/period.enum";
import { GoalItem } from "../model/goal-item.model";

export interface GoalItemGenerateService {
    generate(period: Period,
             activityType?: string,
             currentGoal?: any): GoalItem;
}