let defaultModels = require('../models/defaultModels');
const TestControllerUtils = require('../util/controller/TestControllerUtils');
let Test = defaultModels.Test;

const makeGetter = TestControllerUtils.makeGetter;

const getTestCategories = function getTestCategories() {
  return makeGetter({}, {
    title: 1
  });
};

const getTestConfig = function getTestConfig(testTitle) {
  return makeGetter({
    title: testTitle
  }, {
    config: 1,
    _id: 0
  });
};

const getDetails = function getDetails(testTitle) {
  return new Promise((resolve, reject) => {
    makeGetter({
        title: {
          $regex: new RegExp(testTitle, "ig")
        }
      }, {
        __v: 0,
        config: 0,
        _id: 0
      })
      .then((results) => {
        if (results.length <= 0) {
          reject({
            name: 'notFound'
          });
        } else {
          resolve(results);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateConfig = function updateConfig(testTitle, newConfig) {
  return new Promise((s, f) => {
    let newConfigArr = [];
    Object.keys(newConfig).forEach(key => {
      newConfigArr.push({
        name: key,
        value: newConfig[key]
      });
    });
    Test.updateOne({
      title: testTitle
    }, {
      config: newConfigArr
    }, function (err, numberAffected, rawResponse) {
      if (err) f(err);
      s({
        msg: `${numberAffected.n} rows affacted`
      });
    });
  });
};

module.exports = {
  getTestCategories,
  getTestConfig,
  getDetails,
  updateConfig
};