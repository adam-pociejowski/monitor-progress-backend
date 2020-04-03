const NodeCouchDb = require('node-couchdb');

module.exports = {
    connection: new NodeCouchDb({
        host: 'couchdb.valverde.duckdns.org',
        protocol: 'https',
        port: 443,
        auth: {
            user: "user",
            password: "password"
        }
    }),
    activityDbName: "activities"
};
