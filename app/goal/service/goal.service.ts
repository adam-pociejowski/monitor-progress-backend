import { CouchDbService } from "../../couchdb/service/couchdb.service";
import { Goal } from "../model/goal.model";
import { GoalItem } from "../model/goal-item.model";
import { SocialUser } from "../../user/model/social.user.model";
import { CouchDbDocumentModel } from "../../couchdb/model/couchdb.document.model";
import { GoalItemGenerateService } from "./goal-item.generate.service";
import { GoalItemInitGenerateService } from "./goal-item.init.generate.service";
import { GoalItemCurrentGenerateService } from "./goal-item.current.generate.service";

const db = require('../../couchdb/config/couchdb.config');

export class GoalService extends CouchDbService<Goal> {
    private goalItemInitGenerateService: GoalItemGenerateService = new GoalItemInitGenerateService();
    private goalItemCurrentGenerateService: GoalItemGenerateService = new GoalItemCurrentGenerateService();

    constructor() {
        super(db.goalsDbName);
    }

    public mapToObject = (obj: any,
                   insert: boolean = false) =>
        new Goal(
            obj.activityType,
            obj.period,
            obj.goalMeasure,
            obj.goalAmount,
            obj.creationDate,
            obj.archived,
            obj.elapsedGoals
                .map((item: any) => GoalItem.prepareGoalItem(item)),
            insert ?
                this.goalItemInitGenerateService.generate(obj.period) :
                this.goalItemCurrentGenerateService.generate(obj.period, obj.activityType, obj.currentGoal)
        )

    findCurrentGoals = (socialUser: SocialUser) =>
        this.findAll(socialUser)
            .then((docs: CouchDbDocumentModel<Goal>[]) => {
                return docs
                    .map((doc: CouchDbDocumentModel<Goal>) => {
                        doc.value.currentGoal.amount = 50;
                        return doc;
                    });
            })
}
