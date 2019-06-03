const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const mentalHealthDatabase = require("../../util/databaseGetter")
  .mentalHealthDatabase;

const ProfessionalSchema = new Schema({
  profId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

ProfessionalSchema.pre("save", function(next) {
  let professional = this;
  bcrypt.hash(professional.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    professional.password = hash;
    next();
  });
});

ProfessionalSchema.statics.authenticate = function(email, password) {
  return new Promise((s, f) => {
    Professional.findOne({ email }).exec(function(err, professional) {
      if (err) {
        f(err);
      }
      if (professional == null) {
        f("professional not found");
      } else {
        bcrypt.compare(password, professional.password, function(err, success) {
          if (success) {
            s(professional);
          }
          f("Email or password incorrect");
        });
      }
    });
  });
};

const Professional = mentalHealthDatabase.model(
  "Professional",
  ProfessionalSchema
);

module.exports = {
  model: Professional,
  schema: ProfessionalSchema
};
