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



module.exports = {
    createHole,
};
