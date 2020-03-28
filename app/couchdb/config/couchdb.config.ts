const NodeCouchDb = require('node-couchdb');

module.exports = {
    connection: new NodeCouchDb({
        host: 'plwrlxt-ecsdkr-3.kruk-inkaso.com.pl',
        protocol: 'http',
        port: 30367,
        auth: {
            user: "user",
            password: "password"
        }
    }),
    dbname: "monitoring-progress-db",
    activities_view: "_design/all_tests/_view/all"
};
