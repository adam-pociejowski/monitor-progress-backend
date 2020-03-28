import { Request, Response } from "express";
import { Activity } from '../model/activity.model';
import { ActivityService } from '../service/activity.service';
import { DocumentType } from "../../couchdb/model/document.type.enum";
import { CouchDbDocumentModel } from "../../couchdb/model/couchdb.document.model";

const express = require('express');
const router = express.Router();
const activityService = new ActivityService();

router.get('/older/:limit/:previous', function (req: Request, res: Response) {
    activityService
        .findOlderDocuments(req.params.previous, req.params.limit)
        .then((activities: CouchDbDocumentModel<Activity>[]) => {
            res.send(activities);
        })
        .catch((error: any) => {
            res.status(500);
            res.send(error);
        });
});

router.get('/newer/:limit/:previous', function (req: Request, res: Response) {
    activityService
        .findNewerDocuments(req.params.previous, req.params.limit)
        .then((activities: CouchDbDocumentModel<Activity>[]) => {
            res.send(activities);
        })
        .catch((error: any) => {
            res.status(500);
            res.send(error);
        });
});

router.post('/', function (req: Request, res: Response) {
    activityService
        .insert(new Activity(req.body), DocumentType.ACTIVITY)
        .then((inserted: CouchDbDocumentModel<Activity>) => {
            res.send(inserted);
        })
        .catch((error: any) => {
            res.status(500);
            res.send(error);
        });
});

router.put('/', function (req: Request, res: Response) {
    activityService
        .update(new CouchDbDocumentModel<Activity>(req.body.id, req.body.rev, req.body.value))
        .then((updated: CouchDbDocumentModel<Activity>) => {
            res.send(updated);
        })
        .catch((error: any) => {
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
            res.status(500);
            res.send(error);
        });
});

module.exports = router;
