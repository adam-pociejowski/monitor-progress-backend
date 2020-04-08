import { Request, Response } from "express";
import { ActivityStatisticsService } from "../service/activity-statistics.service";

const express = require('express');
const router = express.Router();
const activityStatisticsService = new ActivityStatisticsService();

router.get('/stats-per-day', function (req: Request, res: Response) {
    activityStatisticsService
        .getFitnessPointsPerDate()
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