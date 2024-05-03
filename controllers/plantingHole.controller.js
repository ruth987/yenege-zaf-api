const PlantingHole = require("./plantingHole.model");

//Create a Hole
const createHole = async (req, res) => {
  const plantingHole = new PlantingHole(req.body);
  try {
    await plantingHole.save();
    res.status(201).send(plantingHole);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Find All holes
const getAllHoles = async (req, res) => {
  try {
    const plantingHoles = await PlantingHole.find({});
    res.send(plantingHoles);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Find a hole by ID
const getHole = async (req, res) => {
  const _id = req.params.id;
  try {
    const plantingHole = await PlantingHole.findById(_id);
    if (!plantingHole) {
      return res.status(404).send();
    }
    res.send(plantingHole);
  } catch (err) {
    res.status(500).send(err);
  }
};


};

module.exports = {
    createHole,
    getAllHoles,
    getHole,
};
