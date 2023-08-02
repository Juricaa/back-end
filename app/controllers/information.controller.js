const Information = require("../models/information.model.js");

// Create and Save a new Information
exports.addInfo = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide!"
      
    });
  }

  // Create an Information
  const information = new Information({
    titre: req.body.titre,
    contenu: req.body.contenu,
    utilisateurId : req.body.utilisateurId, 
  });

  // Save Information in the database
  Information.create(information, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création de l'information."
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all Informations from the database
exports.findAll = (req, res) => {
  Information.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des informations."
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single Information by Id
exports.findOne = (req, res) => {
  const informationId = req.params.informationId;

  Information.findById(informationId, (err, data) => {
    if (err) {
      if (err.kind === "non trouvé") {
        res.status(404).send({
          message: `Information non trouvée avec l'ID ${informationId}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la récupération de l'information avec l'ID " + informationId
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Update an Information identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide!"
    });
  }
  const informationId = req.params.informationId;

  // Create an Information
  const information = new Information({
    titre: req.body.titre,
    contenu: req.body.contenu,
  });

  Information.updateById(informationId, information, (err, data) => {
    if (err) {
      if (err.kind === "pas trouvé") {
        res.status(404).send({
          message: `Information non trouvée avec l'ID ${informationId}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la mise à jour de l'information avec l'ID " + informationId
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete an Information with the specified id in the request
exports.delete = (req, res) => {
  const informationId = req.params.informationId;

  Information.remove(informationId, (err, data) => {
    if (err) {
      if (err.kind === "pas trouvé") {
        res.status(404).send({
          message: `Information non trouvée avec l'ID ${informationId}.`
        });
      } else {
        res.status(500).send({
          message: "Impossible de supprimer l'information avec l'ID " + informationId
        });
      }
    } else {
      res.send({ message: `Information supprimée avec succès!` });
    }
  });
};
