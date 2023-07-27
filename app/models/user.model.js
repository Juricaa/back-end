const sql = require("./db.js");

// constructor
const User = function(user) {
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.email = user.email;
    this.motDePasse = user.motDePasse;
    this.role = user.role;
    this.statut= user.statut;
  };
  
  User.create = (newUser, result) => {
    sql.query("INSERT INTO utilisateur SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Utilisateur créé: ", { newUser });
      result(null, { newUser });
    });
  };
  
  User.getAll = (result) => {
    let query = "SELECT * FROM utilisateur where statut = 1";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      const utilisateurs = res;
      console.log("Utilisateurs: ", res);
  
      result(null, utilisateurs);
    });
  };

  User.getUsersWithStatutZero = (result) => {
    let query = "SELECT * FROM utilisateur where statut = 0";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      const utilisateurs = res;
      console.log("Utilisateurs avec statut = 0 : ", res);
  
      result(null, utilisateurs);
    });
  };
  
  
  User.findByUsernameAndPwd = (prenom, pwd, result) => {
    sql.query(
      "SELECT * FROM utilisateur WHERE prenom = ? and motDePasse=?",
      [prenom,pwd],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("Utilisateur trouvé: ", res[0]);
          const utilisateur = res[0];
          result(null, utilisateur);
          return;
        }
  
        // not found user with the id
        result({ kind: "non trouvé" }, null);
      }
    );
  };

  User.findById = (utilisateurId, result) => {
    sql.query(
      "SELECT * FROM utilisateur WHERE utilisateurId = ?",
      utilisateurId,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("Utilisateur trouvé: ", res[0]);
          const utilisateur = res[0];
          result(null, utilisateur);
          return;
        }
  
        // not found user with the id
        result({ kind: "non trouvé" }, null);
      }
    );
  };
  
  User.updateById = (utilisateurId, user, result) => {
    sql.query(
      "UPDATE Utilisateur SET nom = ?, prenom = ?, email = ?, role = ?,  WHERE utilisateurId = ?",
      [user.nom, user.prenom, user.email, user.motDePasse, user.role, utilisateurId],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found user with the id
          result({ kind: "pas trouvé" }, null);
          return;
        }
  
        console.log("Utilisateur mis à jour: ", { user });
        result(null, { user });
      }
    );
  };
  
  User.remove = (utilisateurId, result) => {
    sql.query(
      "DELETE FROM Utilisateur WHERE utilisateurId = ?",
      utilisateurId,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found user with the id
          result({ kind: "pas trouvé" }, null);
          return;
        }
  
        console.log("Utilisateur supprimé, utilisateurId: ", utilisateurId);
        result(null, res);
      }
    );
  };


  User.updateStatutById = (utilisateurId, newStatut, result) => {
    // Vérifier que le nouveau statut est valide (0 ou 1)
    if (newStatut !== 0 && newStatut !== 1) {
      result({ kind: "statut invalide" }, null);
      return;
    }
  
    sql.query(
      "UPDATE Utilisateur SET statut = ? WHERE utilisateurId = ?",
      [newStatut, utilisateurId],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found user with the id
          result({ kind: "pas trouvé" }, null);
          return;
        }
  
        console.log("Statut utilisateur mis à jour, utilisateurId: ", utilisateurId);
        result(null, { utilisateurId, statut: newStatut });
      }
    );
  };
  
  module.exports = User;
  