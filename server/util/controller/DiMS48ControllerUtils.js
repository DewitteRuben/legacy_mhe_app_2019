const makeGetter = function makeGetter(databaseModel, whereClause, isIdNeeded, fieldsToGet) {
    return new Promise(function (resolve, reject) {
      let fields = isIdNeeded ? {
        __v: 0
      } : {
        __v: 0,
        _id: 0
      };
  
      if (fieldsToGet) {
        Object.keys(fieldsToGet).forEach(key => {
          fields[key] = fieldsToGet[key];
        });
      }
  
      let query = databaseModel.find(whereClause, fields).lean();
  
      query.exec(function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

const getOldestEntry = (databaseModel, whereClause, isIdNeeded) => {
  return new Promise((resolve, reject )=> {

  let fields = isIdNeeded ? {
    __v: 0
  } : {
    __v: 0,
    _id: 0
  };

    const query = databaseModel.find(whereClause, fields).limit(1).sort({$natural:-1});
    query.exec(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}

module.exports = {
    getOldestEntry,
    makeGetter
};