const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentalHealthDatabase = require("../../util/databaseGetter")
  .mentalHealthDatabase;

const ClientSchema = new Schema({
  userId: String,
  profId: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date
});

ClientSchema.statics.authenticate = function(userId) {
  return new Promise((s, f) => {
    Client.findOne({ userId }).exec(function(err, client) {
      if (err) {
        f(err);
      }
      if (client == null) {
        f("client not found");
      } else {
        s(userId);
      }
    });
  });
};

ClientSchema.statics.hasProf = function(userId, profId) {
  return new Promise((s, f) => {
    Client.findOne({ userId, profId }).exec(function(err, client) {
      if (err) {
        f(err);
      }
      if (client == null) {
        f("client not found");
      } else {
        s(userId);
      }
    });
  });
};

ClientSchema.statics.removeByUserId = userId => {
  return Client.remove({ userId });
};

const Client = mentalHealthDatabase.model("Client", ClientSchema);

module.exports = {
  model: Client,
  schema: ClientSchema
};
