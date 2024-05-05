const express=require ("express");

let users = require('../usersData');

const router =express.Router();

router.use(express.urlencoded({ extended: true })); // para acceder al body
router.use(express.json());

router.post("/", (req,res) =>{
    try{
      const username=req.body.username;
      const password=req.body.password;
      const email=req.body.email;

      const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }
        
        // Verifica si hay un usuario con el mismo correo electrónico
        const existingEmail = users.find(user => user.email === email);
        if (existingEmail) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

    
      // Crear objeto de usuario con los datos proporcionados
      const usuarioNuevo = {
        username,
        email,
        password,
        blinks:[]
      };

      users.push(usuarioNuevo)
    
      // Retornar el objeto JSON con la información del usuario creado
      res.status(201).json(usuarioNuevo);

      } catch (error) {
        console.error(error)
        res.status(500).send(error)
      }
    
  });

    
  module.exports = router;
  
