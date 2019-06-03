const MoodEntry = require('./defaultModels/moodentry.server.model');
const ClientModel = require("./defaultModels/client.server.model");
const ProfessionalModel = require("./defaultModels/professional.server.model");

module.exports = {
    MoodEntry: MoodEntry.model,
    MoodEntrySchema: MoodEntry.schema,
    Client: ClientModel.model,
    ClientSchema: ClientModel.schema,
    Professional: ProfessionalModel.model,
    ProfessionalSchema: ProfessionalModel.schema
};
