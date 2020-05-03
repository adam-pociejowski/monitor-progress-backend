import { Request, Response } from "express";
import { Activity } from '../model/activity.model';
import { ActivityService } from '../service/activity.service';
import { DocumentType } from "../../couchdb/model/document.type.enum";
import { CouchDbDocumentModel } from "../../couchdb/model/couchdb.document.model";
import { SocialUserService } from "../../user/service/social.user.service";
import { SocialUser } from "../../user/model/social.user.model";
import { User } from "../../user/model/user.model";

const express = require('express');
const router = express.Router();
const activityService = new ActivityService();
const socialUserService = new SocialUserService();


router.get('/config', function (req: Request, res: Response) {
    res.send(activityService.getConfigList());
});

router.get('/older/:limit/:previous', function (req: Request, res: Response) {
    activityService
        .findOlderDocuments(req.params.previous, req.params.limit, getSocialUser(req))
        .then((activities: CouchDbDocumentModel<Activity>[]) => {
            res.send(activityService.calculateFitnessPoints(activities));
        })
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

router.get('/newer/:limit/:previous', function (req: Request, res: Response) {
    activityService
        .findNewerDocuments(req.params.previous, req.params.limit, getSocialUser(req))
        .then((activities: CouchDbDocumentModel<Activity>[]) => {
            res.send(activities);
        })
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

router.post('/', function (req: Request, res: Response) {
    activityService
        .insert(new Activity(req.body), DocumentType.ACTIVITY, getSocialUser(req))
        .then((inserted: CouchDbDocumentModel<Activity>) => {
            res.send(inserted);
        })
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

router.put('/', function (req: Request, res: Response) {
    let socialUser = getSocialUser(req);
    activityService
        .update(new CouchDbDocumentModel<Activity>(
            req.body.id,
            req.body.rev,
            req.body.value,
            new User(socialUser.email, socialUser.provider), req.body.type),
            socialUser)
        .then((updated: CouchDbDocumentModel<Activity>) => {
            res.send(updated);
        })
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

router.delete('/:id/:rev', function (req: Request, res: Response) {
    activityService
        .delete(req.params.id, req.params.rev)
        .then((deleted: any) => {
            res.send(deleted.data);
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
