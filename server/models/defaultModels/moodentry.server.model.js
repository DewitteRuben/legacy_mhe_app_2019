const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mentalHealthDatabase = require("../../util/databaseGetter").mentalHealthDatabase;

const MoodEntrySchema = new Schema({
    entryId: String,
    userId: String,
    date: Date,
    mood: String,
    emotions: Array,
    thoughts: String,
    experiences: Array,
})

module.exports = {
    model: mentalHealthDatabase.model('MoodEntry', MoodEntrySchema),
    schema: MoodEntrySchema
};