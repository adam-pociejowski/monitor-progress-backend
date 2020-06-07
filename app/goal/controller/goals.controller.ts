import { Request, Response } from "express";
import { GoalService } from "../service/goal.service";
import { SocialUser } from "../../user/model/social.user.model";
import { SocialUserService } from "../../user/service/social.user.service";
import { DocumentType } from "../../couchdb/model/document.type.enum";
import { CouchDbDocumentModel } from "../../couchdb/model/couchdb.document.model";
import { Goal } from "../model/goal.model";

const express = require('express');
const router = express.Router();
const goalService = new GoalService();
const socialUserService = new SocialUserService();

router.post('/', function (req: Request, res: Response) {
    goalService
        .insert(new Goal(req.body), DocumentType.GOAL, getSocialUser(req))
        .then((inserted: CouchDbDocumentModel<Goal>) => {
            res.send(inserted);
        })
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

router.get('/', function (req: Request, res: Response) {
    goalService
        .findAll(getSocialUser(req))
        .then((docs: CouchDbDocumentModel<Goal>[]) => {
            res.send(docs);
        })
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

function getSocialUser(req: Request): SocialUser {
    if (req.headers.auth !== undefined) {
        return socialUserService.mapToSocialUser(JSON.parse(req.headers.auth.toString()));
    }
    throw new Error("Social user fot found");
}

module.exports = router;
