module.exports = (app) => {
    const informations = require("../controllers/information.controller.js");
  
    var router = require("express").Router();
  
    // Créer une nouvelle information
    router.post("/", informations.addInfo);
  
    // Récupérer toutes les informations
    router.get("/", informations.findAll);
  
    // Récupérer une information par son ID
    router.get("/:informationId", informations.findOne);
  
    // Mettre à jour une information par son ID
    router.put("/:informationId", informations.update);
  
    // Supprimer une information par son ID
    router.delete("/:informationId", informations.delete);
  
    app.use("/api/informations", router);
  };
  