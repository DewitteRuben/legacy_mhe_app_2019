const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentalHealthDatabase = require("../../util/databaseGetter")
  .mentalHealthDatabase;

const MoodEntrySchema = new Schema({
  entryId: String,
  userId: String,
  date: Date,
  mood: String,
  emotions: Array,
  thoughts: String,
  experiences: Array,
  sleep: Number
});

MoodEntrySchema.statics.removeByUserId = userId => {
  return MoodEntryModel.remove({ userId });
};

const MoodEntryModel = mentalHealthDatabase.model("MoodEntry", MoodEntrySchema);

module.exports = {
  model: MoodEntryModel,
  schema: MoodEntrySchema
};
