const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentalHealthDatabase = require("../../util/databaseGetter")
  .mentalHealthDatabase;

const TaskSchema = new Schema({
  userId: { type: String, required: true },
  dateOfAssignement: { type: Date, default: new Date() },
  isDone: { type: Boolean, default: false },
  title: String,
  description: String,
  completionDate: Date
});

TaskSchema.statics.removeTask = taskId => {
  return Task.remove({ _id: taskId });
};

TaskSchema.statics.removeByUserId = userId => {
  return Task.remove({ userId });
};

TaskSchema.statics.setTask = (userId, taskId, value) => {
  return new Promise((s, f) => {
    Task.findOneAndUpdate(
      { userId, _id: taskId },
      { $set: { isDone: value, completionDate: value ? new Date() : "" } }
    ).exec(function(err, task) {
      if (err) {
        f(err);
      }
      if (task == null) {
        f("task not found");
      } else {
        task.isDone = value;
        s(task);
      }
    });
  });
};

const Task = mentalHealthDatabase.model("Task", TaskSchema);
module.exports = {
  model: Task,
  schema: TaskSchema
};
