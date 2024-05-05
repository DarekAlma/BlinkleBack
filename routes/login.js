const express=require ("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

let users = require('../usersData');

const router =express.Router();

router.use(express.urlencoded({ extended: true })); // para acceder al body
router.use(express.json());

// Generar una clave secreta única
const secretKey = crypto.randomBytes(32).toString('hex');

//Ruta para el Login de un usuario

router.post("/", (req,res) =>{
    try{
      const password=req.body.password;
      const email=req.body.email;

      if ( !password || !email) {
        return res.status(400).json({ error: "Faltan parámetros obligatorios: password, email" });
      }
      const user = users.find(user => user.email === email && user.password === password);
      if (!user){
        return res.status(401).json({message: 'Credenciales inválidas' });
      }
      // Generar un token JWT con el nombre de usuario
      const token = jwt.sign({ username: user.username }, secretKey);

      res.status(200).json({ message: 'Inicio de sesión exitoso', token });

      } catch (error) {
        console.error(error)
        res.status(500).send(error)
      }
    
  });


module.exports=router;