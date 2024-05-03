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



module.exports = {
    createHole,
    getAllHoles,
};
