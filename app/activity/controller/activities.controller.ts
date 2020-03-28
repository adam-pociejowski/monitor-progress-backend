import {Request, Response} from "express";
import { Activity } from '../model/activity.model';
import { ActivityService } from '../service/activity.service';
import {CouchDbDocumentModel} from "../../couchdb/model/couchdb.document.model";

const express = require('express');
const router = express.Router();
const activityService = new ActivityService();

router.get('/', function (req : Request, res : Response) {
    console.log(req.query, req.query.page);
    res.send('OK');
});

router.post('/', function (req : Request, res : Response) {
    const activity = new Activity(req.body);
    activityService
        .insert(activity)
        .then((inserted: CouchDbDocumentModel<Activity>) => {
            inserted.object = activity;
            res.send({
                data: inserted.data,
                activity: inserted.object
            });
        }, (err: any) => res.send(err));
});

module.exports = router;
