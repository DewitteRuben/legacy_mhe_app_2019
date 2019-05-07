const MoodEntry = require('./defaultModels/moodentry.server.model');

module.exports = {
    MoodEntry: MoodEntry.model,
    MoodEntrySchema: MoodEntry.schema,
};
