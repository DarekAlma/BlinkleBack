const express=require ("express");

let users = require('../usersData');

const router =express.Router();

router.use(express.urlencoded({ extended: true })); // para acceder al body
router.use(express.json());

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
      res.status(200).json({ message: 'Inicio de sesión exitoso' });

      } catch (error) {
        console.error(error)
        res.status(500).send(error)
      }
    
  });


module.exports=router;