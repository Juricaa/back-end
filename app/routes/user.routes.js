module.exports = (app) => {
    const utilisateurs = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Créer un nouvel utilisateur
    router.post("/", utilisateurs.addUser);

    //retrouver information admin
    router.post("/login", utilisateurs.login);
  
    // Récupérer tous les utilisateurs
    router.get("/", utilisateurs.findAll);

     // Récupérer tous les utilisateurs en attente
    router.get("/statut", utilisateurs.findAllWithStatutZero);

    
    // Mettre à jour le statut d'un utilisateur par son ID
    router.put("/:utilisateurId/statut", utilisateurs.updateStatut);

   
    // Récupérer un utilisateur avec son id
    router.get("/:utilisateurId", utilisateurs.findOne);
  
    // Mettre à jour un utilisateur avec son id
    router.put("/:utilisateurId", utilisateurs.update);
  
    // Supprimer un utilisateur avec son id
    router.delete("/:utilisateurId", utilisateurs.delete);
  
    app.use("/api/utilisateurs", router);
  };
  