module.exports = app => {
    const enseignants = require("../controllers/enseignant.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Enseignant
    router.post("/", enseignants.create);

    
    // Retrieve all enseignants
    router.get("/", enseignants.findAll);
    
       
    //afficher prestation Totale, max et mini
    router.get("/prestation", enseignants.findPrestation)
  
    // Retrieve a single Enseignant with matricule
    router.get("/:matricule", enseignants.findOne);
  
    // Update a Enseignant with matricule
    router.put("/:matricule", enseignants.update);
  
    // Delete a Enseignant with matricule
    router.delete("/:matricule", enseignants.delete);
  
    // Delete all enseignants
    router.delete("/", enseignants.deleteAll);
  
    app.use('/api/enseignants', router);
  };
  