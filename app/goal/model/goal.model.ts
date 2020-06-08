import { GoalItem } from "./goal-item.model";
import { Period } from "./period.enum";
import { GoalMeasure } from "./goal.measure.enum";

export class Goal {

    constructor(public activityType: string,
                public period: Period,
                public goalMeasure: GoalMeasure,
                public goalAmount: number,
                public creationDate: Date,
                public archived: boolean = false,
                public elapsedGoals: GoalItem[] = [],
                public currentGoal: GoalItem) {}
}
