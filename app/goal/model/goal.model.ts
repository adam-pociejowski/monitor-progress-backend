import { GoalItem } from "./goal-item.model";
import { Period } from "./period.enum";
import { GoalMeasure } from "./goal.measure.enum";
import { GoalService } from "../service/goal.service";

export class Goal {
    activityType: string;
    period: Period;
    goalMeasure: GoalMeasure;
    goalAmount: number;
    creationDate: Date;
    archived: boolean = false;
    elapsedGoals: GoalItem[] = [];
    currentGoal: GoalItem;

    constructor(json: any) {
        this.activityType = json.activityType;
        this.period = json.period;
        this.goalMeasure = json.goalMeasure;
        this.goalAmount = json.goalAmount;
        this.creationDate = json.creationDate;
        this.currentGoal = GoalService.generateCurrentGoalItem(this);
    }
}
