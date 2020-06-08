export class GoalItem {
    constructor(public amount: number | null,
                public startDate: Date | null,
                public endDate: Date | null) {}

    public static prepareGoalItem = (data: any) =>
        new GoalItem(
            data.amount,
            new Date(data.startDate),
            new Date(data.endDate)
        )
}
