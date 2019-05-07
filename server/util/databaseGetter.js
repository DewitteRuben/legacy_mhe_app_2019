const mongoose = require('mongoose');

const mentalHealthConnectionString = `mongodb+srv://rubendewitte:Huntergodz12@cluster0-doc9a.mongodb.net/test?retryWrites=true`;
const mentalHealthDatabase = mongoose.createConnection(mentalHealthConnectionString, {
    useNewUrlParser: true
});

module.exports = {
    mentalHealthDatabase,
};