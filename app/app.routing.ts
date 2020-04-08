const activityRouter = require('./activity/controller/activities.controller');
const activityStatisticsRouter = require('./activity/controller/activity-statistics.controller');

module.exports = function(app: any) {
  app.use('/activity', activityRouter);
  app.use('/activity-statistics', activityStatisticsRouter);
};
