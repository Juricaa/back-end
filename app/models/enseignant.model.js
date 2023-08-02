const sql = require("./db.js");

// constructor
const Enseignant = function(enseignant) {
  this.matricule = enseignant.matricule;
  this.nom = enseignant.nom;
  this.tauxHoraire = enseignant.tauxHoraire;
  this.nbHeure = enseignant.nbHeure;
};

Enseignant.create = (newEnseignant, result) => {
  sql.query("INSERT INTO enseignant SET ?", newEnseignant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("enseignant crée: ", { newEnseignant });
    result(null, { newEnseignant });
  });
};

Enseignant.findById = (matricule, result) => {
  sql.query(`SELECT * FROM enseignant WHERE matricule = ${matricule}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("enseignant trouver: ", res[0]);
      const enseignants = res[0];
      result(null, enseignants);
      return;
    }

    // not found enseignant with the id
    result({ kind: "non trouver" }, null);
  });
};



Enseignant.getAll = (matricule, result) => {
  let query = "SELECT * , (nbHeure*tauxHoraire) AS prestation FROM enseignant";
  let query2 = "SELECT  SUM(nbHeure * tauxHoraire) AS prestation_T, MAX(nbHeure * tauxHoraire) AS prestation_Max, MIN(nbHeure * tauxHoraire) AS prestation_Min FROM enseignant";
  
  if (matricule) {
    query += ` WHERE nom LIKE '%${matricule}%' OR
    matricule LIKE '%${matricule}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    const enseignants = res;
    console.log("enseignant: ", res);

    sql.query(query2, (err, res2) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      
      const prestations = res2;
    //  console.log("prestation: ", res2);
      
      result(null,  enseignants);
      //result(null, {enseignants, prestations});
    });
  });
};




Enseignant.updateById = (matricule, enseignant, result) => {
  sql.query(
    "UPDATE enseignant SET  nom = ?, tauxHoraire = ?, nbHeure = ? WHERE matricule = ?",
    [enseignant.nom, enseignant.tauxHoraire, enseignant.nbHeure, matricule],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      
      if (res.affectedRows == 0) {
        // not found enseignant with the id
        result({ kind: "pas trouver" }, null);
        return;
      }

      console.log("updated enseignant: ", { enseignant });
      result(null, { enseignant });
    }
    );
  };

  Enseignant.remove = (matricule, result) => {
    sql.query("DELETE FROM enseignant WHERE matricule = ?", [matricule],  (err, res) => {
      if (err) {
          console.log("error: ", err);
      result(null, err);
      return;
    }
    
    if (res.affectedRows == 0) {
        // not found enseignant with the id
        result({ kind: "pas trouver" }, null);
        return;
      }
      
      console.log("supprimer enseignant : ", matricule);
      result(null, res);
    });
};

Enseignant.removeAll = result => {
  sql.query("DELETE FROM enseignant", (err, res) => {
    if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          
          console.log(`supprimer ${res.affectedRows} enseignant`);
          result(null, res);
        });
};

Enseignant.getPrestation = (result)=> {

  let query = "SELECT  SUM(nbHeure * tauxHoraire) AS prestation_T, MAX(nbHeure * tauxHoraire) AS prestation_Max, MIN(nbHeure * tauxHoraire) AS prestation_Min FROM enseignant";

  {/***requette prestation totale, maxy et mini */}

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

     console.log("prestaion: ", res);
    result(null, res);
  });
  
}
Enseignant.getAllPublished = result => {
  sql.query("SELECT * FROM enseignants WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("enseignants: ", res);
        result(null, res);
    });
};

module.exports = Enseignant;