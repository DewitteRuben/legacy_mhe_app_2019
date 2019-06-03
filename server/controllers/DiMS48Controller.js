let defaultModels = require("../models/defaultModels");
const DiMS48ControllerUtils = require("../util/controller/DiMS48ControllerUtils");
const models = require("../models/defaultModels");
const uuidv4 = require("uuid/v4");

const getMoodEntries = () => {
  return makeGetter(defaultModels.MoodEntry, null, true);
};

const getMoodEntriesByUserId = userId => {
  return makeGetter(defaultModels.MoodEntry, { userId }, true);
};

const getLatestMoodEntryByUserId = userId => {
  return getOldestEntry(defaultModels.MoodEntry, { userId }, true);
};

const addMoodEntry = moodEntry => {
  return new Promise((resolve, reject) => {
    const newMoodEntry = new models.MoodEntry(moodEntry);
    newMoodEntry.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const regsterNewProfessional = (
  username,
  email,
  password,
  firstName,
  lastName
) => {
  return new Promise((resolve, reject) => {
    if (username && email && password && firstName && lastName) {
      const profId = uuidv4();
      const professional = {
        profId,
        username,
        email,
        password,
        firstName,
        lastName
      };
      const newProfessional = new models.Professional(professional);
      newProfessional.save((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    }
  });
};

const authProfessional = (email, password) => {
  return models.Professional.authenticate(email, password);
};

const hasProfessional = (userId, profId) => {
  return models.Client.hasProf(userId, profId);
};

const authClient = userId => {
  return models.Client.authenticate(userId);
};

const registerNewClient = (profId, firstName, lastName, dateOfBirth) => {
  return new Promise((resolve, reject) => {
    const userId = uuidv4();

    const newClient = new models.Client({
      profId,
      userId,
      firstName,
      lastName,
      dateOfBirth
    });
    newClient.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const getClientsByProf = profId => {
  return makeGetter(defaultModels.Client, { profId }, true);
};

const getClientsByUserId = (profId, userId) => {
  return makeGetter(defaultModels.Client, { userId, profId }, true);
};

//TODO abstract to seperate file
//Util Functions
const makeGetter = DiMS48ControllerUtils.makeGetter;
const getOldestEntry = DiMS48ControllerUtils.getOldestEntry;

module.exports = {
  getMoodEntries,
  getMoodEntriesByUserId,
  getLatestMoodEntryByUserId,
  addMoodEntry,
  registerNewClient,
  authProfessional,
  regsterNewProfessional,
  authClient,
  getClientsByProf,
  getClientsByUserId,
  hasProfessional
};
