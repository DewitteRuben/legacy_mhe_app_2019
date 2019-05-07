const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mentalHealthDatabase = require("../../util/databaseGetter").mentalHealthDatabase;

const MoodEntrySchema = new Schema({
    userId: String,
    mood: Array,
    date: Date,
    note: String,
})

module.exports = {
    model: mentalHealthDatabase.model('MoodEntry', MoodEntrySchema),
    schema: MoodEntrySchema
};