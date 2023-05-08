const mongoose = require("mongoose");
const Branch = require("../models/branch");

// Add new Branch

const addUBranch = (req, res) => {
  let branch = new Branch({
    name: req.body.name,
    manager_name: req.body.manager_name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  branch.save().then(
    (brc) => {
      res.status(200).json(brc);
    },
    (err) => {
      err && res.status(500).send(err.message);
    }
  );
};
// All Branches
const findAllGeoBranches = (req, res) => {
  Branch.find().then(
    (branches) => {
      var geoBranches = { type: "FeatureCollection", features: [] };
      branches.map((item) => {
        geoBranches.features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.latitude, item.longitude],
          },
          properties: {
            name: item.name,
            manager_name: item.manager_name,
          },
          id: item._id,
        });
      });
      res.status(200).json(geoBranches);
    },
    (err) => {
      err && res.status(500).send(err.message);
    }
  );
};

//Delete Branch

const removeById = (req, res) => {
  console.log(req.params);
  Branch.findByIdAndDelete(req.params.id).then(
    (user) => {
      res.status(200).json(user);
    },
    (err) => {
      err && res.status(500).send(err.message);
    }
  );
};

module.exports = {
  addUBranch,
  removeById,
  findAllGeoBranches,
};
