let defaultModels = require('../models/defaultModels');
const DiMS48ControllerUtils = require('../util/controller/DiMS48ControllerUtils');
const models = require("../models/defaultModels");

const getMoodEntries = () => {
  return makeGetter(defaultModels.MoodEntry, null, true);
};

const getMoodEntriesByUserId = (userId) => {
  return makeGetter(defaultModels.MoodEntry, { userId }, true);
}

const getLatestMoodEntryByUserId = (userId) => {
  return getOldestEntry(defaultModels.MoodEntry, { userId }, true);
}

const addMoodEntry = (entryId, userId, mood, date, note) => {
  return new Promise((resolve, reject) => {
    const moodEntry = {
      userId,
      mood,
      date,
      note,
      entryId,
    }
    const newMoodEntry = new models.MoodEntry(moodEntry);
    newMoodEntry.save((err, data) => {
      if (err) { reject(err); }
      resolve(data);
    });
  })
};

//TODO abstract to seperate file
//Util Functions
const makeGetter = DiMS48ControllerUtils.makeGetter;
const getOldestEntry = DiMS48ControllerUtils.getOldestEntry;

module.exports = {
  getMoodEntries,
  getMoodEntriesByUserId,
  getLatestMoodEntryByUserId,
  addMoodEntry
};
