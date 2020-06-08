import { Period } from "../model/period.enum";
import { GoalItem } from "../model/goal-item.model";
import { GoalItemGenerateService } from "./goal-item.generate.service";

export class GoalItemCurrentGenerateService implements GoalItemGenerateService {

    generate(period: Period,
             activityType: string,
             currentGoal: any): GoalItem {
        return new GoalItem(null, null, null);
    }
}
