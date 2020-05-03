import { Request, Response } from "express";
import { ActivityStatisticsService } from "../service/activity-statistics.service";
import { ReduceRequest } from "../../couchdb/model/reduce.request.model";

const express = require('express');
const router = express.Router();
const activityStatisticsService = new ActivityStatisticsService();

router.post('/fitness-points', function (req: Request, res: Response) {
    activityStatisticsService
        .getFitnessPointsMultiGroup(new ReduceRequest(req.body))
        .then((data: any) => res.send(data))
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

router.post('/stats', function (req: Request, res: Response) {
    activityStatisticsService
        .getStatsMultiGroup(new ReduceRequest(req.body))
        .then((data: any) => res.send(data))
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

router.get('/fitness-points-per-day/:startKey/:endKey', function (req: Request, res: Response) {
    activityStatisticsService
        .getFitnessPointsPerDate(req.params.startKey, req.params.endKey)
        .then((data: any) => res.send(data))
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

router.get('/stats-per-week', function (req: Request, res: Response) {
    activityStatisticsService
        .getStatsPerWeek()
        .then((data: any) => res.send(data))
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

router.get('/stats-per-date', function (req: Request, res: Response) {
    activityStatisticsService
        .getStatsPerDate()
        .then((data: any) => res.send(data))
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

router.get('/stats', function (req: Request, res: Response) {
    activityStatisticsService
        .getStats()
        .then((data: any) => res.send(data))
        .catch((error: any) => {
            console.error(error);
            res.status(500);
            res.send(error);
        });
});

module.exports = router;
