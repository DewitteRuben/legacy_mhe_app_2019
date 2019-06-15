const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentalHealthDatabase = require("../../util/databaseGetter")
  .mentalHealthDatabase;

const WeightSchema = new Schema({
  entryId: String,
  userId: String,
  date: {type: Date, default: new Date()},
  unit: String,
  amount: Number,
});

const WeightModel = mentalHealthDatabase.model("Weight", WeightSchema);

module.exports = {
  model: WeightModel,
  schema: WeightSchema
};
