var express = require("express");
var router = express.Router();

const controller = require("./../controllers/DiMS48Controller");
const log4js = require("log4js");
const errorLogger = log4js.getLogger("error");
const errorMessages = require("../locales/general/errorMessages/nl-BE.json");
const ErrorSender = require("../util/messageSenders/errorSender");
const errorSender = new ErrorSender(errorMessages);

router.use(function (err, req, res, next) {
  errorLogger.error("Main API router threw", err);
  next();
});

router.get("/mood", async (req, res) => {
  try {
    const result = await controller.getMoodEntries();
    res.json(result);
  } catch (err) {
    errorLogger.error("mood endpoint failed to get", err);
    res.status(500).json(err);
  }
});

router.get("/mood/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await controller.getMoodEntriesByUserId(userId);
    res.status(200).json(result);
  } catch (err) {
    errorLogger.error("mood endpoint with userId failed to get", err);
    res.status(500).json(err);
  }
});

router.get("/mood/last/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await controller.getLatestMoodEntryByUserId(userId);
    res.status(200).json(result);
  } catch (err) {
    errorLogger.error("mood endpoint with userId failed to get", err);
    res.status(500).json(err);
  }
});

router.post("/mood", async (req, res) => {
  const body = req.body;
  if (body.mood, body.date, body.note, body.userId, body.entryId) {
    try {
      const result = await controller.addMoodEntry(body.entryId, body.userId, body.mood, body.date, body.note);
      res.json(result);
    } catch (err) {
      errorLogger.error("mood endpoint failed to post new moodentry", err);
      res.status(500).json(err);
    }
  } else {
    res.status(422).json({
      status: "error",
      msg: "Invalid or missing paramater",
      code: 422
    });
  }
});

module.exports = router;