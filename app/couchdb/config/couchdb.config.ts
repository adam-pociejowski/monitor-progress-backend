const NodeCouchDb = require('node-couchdb');

module.exports = {
    connection: new NodeCouchDb({
        host: process.env.COUCHDB_HOST,
        protocol: process.env.COUCHDB_HOST_PROTOCOL,
        port: process.env.COUCHDB_HOST_PORT,
        auth: {
            user: process.env.COUCHDB_USERNAME,
            password: process.env.COUCHDB_PASSWORD
        }
    }),
    activityDbName: "activities",
    goalsDbName: "goals"
};
