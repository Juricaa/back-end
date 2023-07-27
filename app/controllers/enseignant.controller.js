const Enseignant = require("../models/enseignant.model.js");

// Create and Save a new Enseignant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Enseignant
  const enseignant = new Enseignant({
    matricule: req.body.matricule,
    nom: req.body.nom,
    tauxHoraire: req.body.tauxHoraire,
    nbHeure: req.body.nbHeure,
  });

  // Save Enseignant in the database
  Enseignant.create(enseignant, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Enseignant."
      });
    else res.send(data);
  });
};


// Retrieve all Enseignants from the database (with condition).
exports.findAll = (req, res) => {
  const matricule = req.query.matricule;

 Enseignant.getAll(matricule, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving enseignant."
      });
    }else{ 
      res.send(data);
    //res.send(data2)
      //res.send(pres)
    }
  });
};

// Find a single Enseignant by Id
exports.findOne = (req, res) => {
    const matricule = req.params.matricule;

 Enseignant.findById(matricule, (err, data) => {
    if (err) {
      if (err.kind === "Pas_trouver") {
        res.status(404).send({
          message: `Not found enseignant with matricule ${matricule}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving enseignant with matricule " + matricule
        });
      }
    } else res.send(data);
  });
};


// Update a Enseignant identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

 
 Enseignant.updateById(
    req.params.matricule,
    new Enseignant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "pas_trouver") {
          res.status(404).send({
            message: `Not found Enseignant with matricule ${matricule}.`
          });
        } else {
            res.status(500).send({
            message: "Error updating Enseignant with matricule " + matricule
          });
        }
    } else res.send(data);
    }
    );
};

// Delete a Enseignant with the specified id in the request
exports.delete = (req, res) => {
  const matricule = req.params.matricule;
 Enseignant.remove(matricule, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Enseignant with id ${matricule}.`
        });
    } else {
        res.status(500).send({
            message: "Could not delete Enseignant with matricule " + matricule
        });
      }
    } else res.send({ message: `Enseignant was deleted successfully!` });
});
};


