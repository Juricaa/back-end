const User = require("../models/user.model.js");

// Create and Save a new Utilisateur
exports.addUser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an Utilisateur
  const user = new User({
    nom: req.body.name,
    prenom: req.body.username,
    email: req.body.email,
    motDePasse: req.body.password,
    role: "utilisateur",
    statut: 0,
  });

  // Save Utilisateur in the database
  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Utilisateur."
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all Utilisateurs from the database (with condition).
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des utilisateurs."
      });
    } else {
      res.send(data);
    }
  });
};


// Retrieve all Utilisateurs from the database (with condition).
exports.findAllWithStatutZero = (req, res) => {
  
  User.getUsersWithStatutZero((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des utilisateurs."
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single Utilisateur by Id
exports.findOne = (req, res) => {
  const utilisateurId = req.params.utilisateurId;

  User.findById(utilisateurId, (err, data) => {
    if (err) {
      if (err.kind === "non trouvé") {
        res.status(404).send({
          message: `Not found utilisateur with id ${utilisateurId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving utilisateur with id " + utilisateurId
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Update an Utilisateur identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(
    req.params.utilisateurId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "pas trouvé") {
          res.status(404).send({
            message: `Not found Utilisateur with id ${req.params.utilisateurId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Utilisateur with id " + req.params.utilisateurId
          });
        }
      } else {
        res.send(data);
      }
    }
  );
};

// Delete an Utilisateur with the specified id in the request
exports.delete = (req, res) => {
  const utilisateurId = req.params.utilisateurId;

  User.remove(utilisateurId, (err, data) => {
    if (err) {
      if (err.kind === "pas trouvé") {
        res.status(404).send({
          message: `Not found Utilisateur with id ${utilisateurId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Utilisateur with id " + utilisateurId
        });
      }
    } else {
      res.send({ message: `Utilisateur was deleted successfully!` });
    }
  });
};

exports.login = (req, res) => {

    const { username, password } = req.body;
    
    
    
    User.findByUsernameAndPwd(username, password, (err, data) => {
        if (err) {
            if (err.kind === "non trouvé") {
                res.status(404).send({
                  message: `pas trouver dans base  ${username}.`
                });
              } else {
                res.status(500).send({
                  message: "Error retrieving utilisateur with id " + username
                });
              }
            } else {
              res.send(data);
            }
    });
};


exports.updateStatut = (req, res) => {
  const utilisateurId = req.params.utilisateurId;
  const newStatut = req.body.statut;

  User.updateStatutById(utilisateurId, newStatut, (err, data) => {
    if (err) {
      if (err.kind === "statut invalide") {
        res.status(400).send({
          message: "Statut invalide. Le statut doit être soit 0, soit 1."
        });
      } else if (err.kind === "pas trouvé") {
        res.status(404).send({
          message: `Utilisateur non trouvé avec l'ID ${utilisateurId}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la mise à jour du statut de l'utilisateur."
        });
      }
    } else {
      res.send(data);
    }
  });
};