var Rebase = require('re-base');

var GlobalConstants = require('constants/global.jsx');

var SiteStatusBase = Rebase.createClass({
    apiKey: GlobalConstants.FIREBASE_API_KEY,
    authDomain: GlobalConstants.FIREBASE_AUTH_DOMAIN,
    databaseURL: GlobalConstants.FIREBASE_DATABASE_URL,
    storageBucket: GlobalConstants.FIREBASE_STORAGE_BUCKET
});

module.exports = SiteStatusBase;