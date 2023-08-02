const sql = require("./db.js");


  const Information = function (information) {
    this.titre = information.titre;
    this.contenu = information.contenu;
    this.datePublication = new Date(); // Date actuelle, automatiquement enregistrée lors de la création d'une nouvelle information
    this.utilisateurId= information.utilisateurId;
   
  }

  Information.create = (newInfo, result) => {
    sql.query("INSERT INTO information SET ?", newInfo, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Information créée: ", { newInfo });
      result(null, { newInfo });
    });
  };

  Information.getAll =(result) =>{
    let query = "SELECT *  FROM information, utilisateur WHERE (utilisateur.utilisateurId = information.utilisateurId)";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      const informations = res;
      console.log("Informations: ", res);

      result(null, informations);
    });
  };

  Information.findById=(infoId, result) => {
    sql.query(
      "SELECT * FROM information WHERE informationId = ?",
      infoId,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("Information trouvée: ", res[0]);
          const information = res[0];
          result(null, information);
          return;
        }

        // not found information with the id
        result({ kind: "non trouvée" }, null);
      }
    );
  };

  Information.updateById=(infoId, info, result) => {
    sql.query(
      "UPDATE information SET titre = ?, contenu = ? WHERE informationId = ?",
      [info.titre, info.contenu, infoId],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found information with the id
          result({ kind: "pas trouvée" }, null);
          return;
        }

        console.log("Information mise à jour: ", { info });
        result(null, { info });
      }
    );
  };

  Information.remove=(infoId, result)=> {
    sql.query(
      "DELETE FROM information WHERE informationId = ?",
      infoId,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found information with the id
          result({ kind: "pas trouvée" }, null);
          return;
        }

        console.log("Information supprimée, informationId: ", infoId);
        result(null, res);
      }
    );
  };


module.exports = Information;
