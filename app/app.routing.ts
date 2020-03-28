const activityRouter = require('./activity/controller/activities.controller');

module.exports = function(app: any) {
  app.use('/activity', activityRouter);
};
