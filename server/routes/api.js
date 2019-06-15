var express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
var router = express.Router();
const path = require("path");

const controller = require("./../controllers/DiMS48Controller");
const log4js = require("log4js");
const errorLogger = log4js.getLogger("error");
const errorMessages = require("../locales/general/errorMessages/nl-BE.json");
const ErrorSender = require("../util/messageSenders/errorSender");
const errorSender = new ErrorSender(errorMessages);
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../keys/private.key"),
  "utf8"
);

const checkToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};

router.use(function(err, req, res, next) {
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

router.get("/mood/:userId", checkToken, async (req, res) => {
  const userId = req.params.userId;
  if (userId) {
    try {
      const decodedUserId = jwt.verify(req.token, privateKey);
      if (decodedUserId === userId) {
        const result = await controller.getMoodEntriesByUserId(userId);
        res.status(200).json(result);
      } else {
        res.status(500).json({
          code: 500,
          status: "error",
          msg: "Id does not match id in bearer"
        });
      }
    } catch (err) {
      errorLogger.error("mood endpoint with userId failed to get", err);
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json({ code: 403, status: "error", msg: "Missing paramaters" });
  }
});

router.post("/weight", checkToken, async (req, res) => {
  const { entryId, amount, unit } = req.body;
  if ((entryId, amount, unit)) {
    try {
      const userId = jwt.verify(req.token, privateKey);
      const weightEntry = {
        entryId,
        userId,
        amount,
        unit
      };
      const result = await controller.addWeightEntry(weightEntry);
      res.json(result);
    } catch (err) {
      errorLogger.error("weight endpoint failed to post new weightEntry", err);
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

router.get("/weight/:userId", checkToken, async (req, res) => {
  const userId = req.params.userId;
  if (userId) {
    try {
      const decodedUserId = jwt.verify(req.token, privateKey);
      if (decodedUserId === userId) {
        const result = await controller.getWeightEntriesByUserId(userId);
        res.status(200).json(result);
      } else {
        res.status(500).json({
          code: 500,
          status: "error",
          msg: "Id does not match id in bearer"
        });
      }
    } catch (err) {
      errorLogger.error("weight endpoint with userId failed to get", err);
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json({ code: 403, status: "error", msg: "Missing paramaters" });
  }
});

router.get("/task/:userId", checkToken, async (req, res) => {
  const userId = req.params.userId;
  if (userId) {
    try {
      const decodedUserId = jwt.verify(req.token, privateKey);
      if (decodedUserId === userId) {
        const result = await controller.getTaskEntriesByUserId(userId);
        res.status(200).json(result);
      } else {
        res.status(500).json({
          code: 500,
          status: "error",
          msg: "Id does not match id in bearer"
        });
      }
    } catch (err) {
      errorLogger.error("task endpoint with userId failed to get", err);
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json({ code: 403, status: "error", msg: "Missing paramaters" });
  }
});

router.get("/task/:userId/:profId", checkToken, async (req, res) => {
  const userId = req.params.userId;
  const profId = req.params.profId;

  if (userId && profId) {
    try {
      const payload = jwt.verify(req.token, privateKey);
      if (payload.profId === profId) {
        const client = await controller.hasProfessional(userId, profId);
        if (client) {
          const result = await controller.getTaskEntriesByUserId(userId);
          res.status(200).json(result);
        }
      } else {
        res.status(500).json({
          code: 500,
          status: "error",
          msg: "Id does not match id in bearer"
        });
      }
    } catch (err) {
      errorLogger.error("task endpoint with userId failed to get", err);
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json({ code: 403, status: "error", msg: "Missing paramaters" });
  }
});

router.post("/task/:userId", checkToken, async (req, res) => {
  const userId = req.params.userId;
  const { dateOfAssignement, title, description } = req.body;

  if (!userId) {
    res
      .status(403)
      .json({ code: 403, status: "error", msg: "Missing paramaters" });
  }

  if (!dateOfAssignement || !title || !description) {
    res.status(403).json({
      code: 403,
      status: "error",
      msg: "Missing paramaters",
      body: req.body
    });
  }

  try {
    const payload = jwt.verify(req.token, privateKey);
    const client = await controller.hasProfessional(userId, payload.profId);
    if (client) {
      const task = {
        userId,
        dateOfAssignement,
        title,
        description
      };
      const result = await controller.addTask(task);
      res.status(200).json({ result });
    } else {
      res.status(500).json({
        code: 500,
        status: "error",
        msg: "Id does not match id in bearer"
      });
    }
  } catch (err) {
    console.log(err);
    errorLogger.error("mood endpoint with userId failed to get", err);
    res.status(500).json(err);
  }
});

router.post("/task/:userId/toggle", checkToken, async (req, res) => {
  const userId = req.params.userId;
  const { taskId, value } = req.body;
  if (userId && taskId && value !== undefined) {
    try {
      const decodedUserId = jwt.verify(req.token, privateKey);
      if (decodedUserId === userId) {
        const result = await controller.setTask(userId, taskId, value);
        res.status(200).json(result);
      } else {
        res.status(500).json({
          code: 500,
          status: "error",
          msg: "Id does not match id in bearer"
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({
      code: 403,
      status: "error",
      msg: "Missing paramaters",
      body: req.body
    });
  }
});

router.delete("/task/:userId/:taskId/", checkToken, async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.params.userId;

  if (!taskId || !userId) {
    res
      .status(403)
      .json({ code: 403, status: "error", msg: "Missing paramaters" });
  }

  try {
    const payload = jwt.verify(req.token, privateKey);
    const client = await controller.hasProfessional(userId, payload.profId);
    if (client) {
      const result = await controller.removeTask(taskId);
      res.status(200).json({ result });
    } else {
      res.status(500).json({
        code: 500,
        status: "error",
        msg: "Id does not match id in bearer"
      });
    }
  } catch (err) {
    console.log(err);
    errorLogger.error("mood endpoint with userId failed to get", err);
    res.status(500).json(err);
  }
});

router.get("/mood/:userId/:profId", checkToken, async (req, res) => {
  const profId = req.params.profId;
  const userId = req.params.userId;
  if (userId && profId) {
    try {
      const payload = jwt.verify(req.token, privateKey);
      if (payload.profId === profId) {
        const client = await controller.hasProfessional(userId, profId);
        if (client) {
          const result = await controller.getMoodEntriesByUserId(userId);
          res.status(200).json(result);
        }
      } else {
        res.status(500).json({
          code: 500,
          status: "error",
          msg: "Id does not match id in bearer"
        });
      }
    } catch (err) {
      errorLogger.error("mood endpoint with userId failed to get", err);
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json({ code: 403, status: "error", msg: "Missing paramaters" });
  }
});

router.get("/weight/:userId/:profId", checkToken, async (req, res) => {
  const profId = req.params.profId;
  const userId = req.params.userId;
  if (userId && profId) {
    try {
      const payload = jwt.verify(req.token, privateKey);
      if (payload.profId === profId) {
        const client = await controller.hasProfessional(userId, profId);
        if (client) {
          const result = await controller.getWeightEntriesByUserId(userId);
          res.status(200).json(result);
        }
      } else {
        res.status(500).json({
          code: 500,
          status: "error",
          msg: "Id does not match id in bearer"
        });
      }
    } catch (err) {
      errorLogger.error("weight endpoint with userId failed to get", err);
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json({ code: 403, status: "error", msg: "Missing paramaters" });
  }
});

router.get("/moodentry/last/:userId", checkToken, async (req, res) => {
  const userId = req.params.userId;
  if (userId) {
    try {
      const decodedUserId = jwt.verify(req.token, privateKey);
      if (decodedUserId === userId) {
        const result = await controller.getLatestMoodEntryByUserId(userId);
        res.status(200).json(result);
      } else {
        res.status(500).json({
          code: 500,
          status: "error",
          msg: "Id does not match id in bearer"
        });
      }
    } catch (err) {
      errorLogger.error("mood endpoint with userId failed to get", err);
      res.status(500).json(err);
    }
  }
});

router.post("/mood", checkToken, async (req, res) => {
  const body = req.body;
  if (
    (body.mood,
    body.date,
    body.thoughts,
    body.entryId,
    body.emotions,
    body.experiences,
    body.sleep)
  ) {
    try {
      const userId = jwt.verify(req.token, privateKey);
      const moodEntry = {
        sleep: body.sleep,
        entryId: body.entryId,
        userId,
        mood: body.mood,
        date: body.date,
        thoughts: body.thoughts,
        emotions: body.emotions,
        experiences: body.experiences
      };
      const result = await controller.addMoodEntry(moodEntry);
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

router.post("/register/client", async (req, res) => {
  const body = req.body;
  // auth from website met jwt waarsch
  try {
    if ((body.profId, body.firstName && body.lastName && body.dateOfBirth)) {
      const data = await controller.registerNewClient(
        body.profId,
        body.firstName,
        body.lastName,
        body.dateOfBirth
      );
      res.json({
        userId: data.userId,
        status: "ok",
        code: 200,
        message: "Successfully registered a new client."
      });
    } else {
      res.json({
        status: "error",
        code: 500,
        message: "Missing parameters"
      });
    }
  } catch (err) {
    errorLogger.error("mood endpoint failed to post new moodentry", err);
    res.json({
      status: "error",
      code: 500,
      message: "Failed to register a new client."
    });
  }
});

router.get("/professional/clients/:profId", async (req, res) => {
  try {
    const profId = req.params.profId;
    const clients = await controller.getClientsByProf(profId);
    res.json({ status: "ok", code: 200, clients });
  } catch (err) {
    errorLogger.error("mood endpoint failed to post new moodentry", err);
    res.status(500).json({
      status: "error",
      code: 500,
      msg: "Invalid or duplicate credentials."
    });
  }
});

router.get("/professional/clients/:userId/:profId", async (req, res) => {
  const userId = req.params.userId;
  const profId = req.params.profId;
  try {
    const client = await controller.getClientsByUserId(profId, userId);
    res.json({ status: "ok", code: 200, client });
  } catch (err) {
    errorLogger.error("mood endpoint failed to post new moodentry", err);
    res.status(500).json({
      status: "error",
      code: 500,
      msg: "Invalid or duplicate credentials."
    });
  }
});

router.post("/register/professional", async (req, res) => {
  const body = req.body;
  try {
    if (
      (body.username && body.password,
      body.email && body.firstName,
      body.lastName)
    ) {
      const data = await controller.regsterNewProfessional(
        body.username,
        body.email,
        body.password,
        body.firstName,
        body.lastName
      );
      res.json({ status: "ok", code: 200, email: body.email });
    } else {
      res.status(500).json({ status: 500, msg: "Missing parameters", body });
    }
  } catch (err) {
    errorLogger.error("mood endpoint failed to post new moodentry", err);
    res.status(500).json({
      status: "error",
      code: 500,
      msg: "Invalid or duplicate credentials."
    });
  }
});

router.post("/auth/client", async (req, res) => {
  const body = req.body;

  if (body.userId) {
    try {
      const response = await controller.authClient(body.userId);
      if (response) {
        jwt.sign(body.userId, privateKey, {}, (err, token) => {
          if (err) {
            throw new Error(err);
          }
          res.json({ token, status: "ok", code: 200, userId: body.userId });
        });
      } else {
        res.status(403).json({
          status: "error",
          code: 403,
          msg: "The requested userid was not found!"
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(403)
        .json({ status: "error", code: 403, msg: "Invalid login credentials" });
    }
  } else {
    res
      .status(500)
      .json({ status: "error", code: 500, msg: "Missing parameters", body });
  }
});

router.post("/auth/professional", async (req, res) => {
  const body = req.body;

  if (body.email && body.password) {
    try {
      const response = await controller.authProfessional(
        body.email,
        body.password
      );
      const profId = response.profId;
      jwt.sign(
        { email: body.email, password: body.password, profId },
        privateKey,
        { expiresIn: "30d" },
        (err, token) => {
          if (err) {
            res.json(err);
          }
          res.json({ token, status: "ok", code: 200, profId });
        }
      );
    } catch (error) {
      res
        .status(403)
        .json({ status: "error", code: 403, msg: "Invalid login credentials" });
    }
  }
});

router.delete("/client/:userId/:profId", checkToken, async (req, res) => {
  const userId = req.params.userId;
  const profId = req.params.profId;

  if (userId && profId) {
    try {
      const payload = jwt.verify(req.token, privateKey);
      if (payload.profId === profId) {
        const client = await controller.hasProfessional(userId, profId);
        if (client) {
          const result = await controller.removeAllByUserId(userId);
          res.status(200).json(result);
        }
      } else {
        res.status(500).json({
          code: 500,
          status: "error",
          msg: "Id does not match id in bearer"
        });
      }
    } catch (err) {
      errorLogger.error("task endpoint with userId failed to get", err);
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json({ code: 403, status: "error", msg: "Missing paramaters" });
  }
}),
  (module.exports = router);
