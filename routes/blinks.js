const express=require ("express");

let users = require('../usersData');
const { v4: uuidv4 } = require('uuid');

const router =express.Router();

router.use(express.urlencoded({ extended: true })); // para acceder al body
router.use(express.json());

//Ruta para Conseguir todos los blinks de todos los usuarios

router.get("/", (req, res) => {
    try {
        let allBlinks = [];

        // Iterar sobre todos los usuarios
        users.forEach(user => {
            // Obtener los tweets del usuario actual y agregarlos a la lista de tweets
            allBlinks = allBlinks.concat(user.blinks);
        });

        // Devolver todos los tweets como respuesta
        res.json(allBlinks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

});

//Ruta para Postear un blink

router.post("/", (req,res) =>{
    try{
      const username=req.body.username;
      const message=req.body.message;

    // Validar que se proporcionen los parámetros obligatorios
      if (!username || !message) {
        return res.status(400).json({ error: "Faltan parámetros obligatorios: username,  message" });
      }
      
      const user = users.find(user => user.username === username);
      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const blinkId = uuidv4();

      const newBlink = {
        id: blinkId,
        username: user.username,
        message
      };

      user.blinks.push(newBlink)
    
      // Retornar el objeto JSON con la información del usuario creado
      res.status(201).json(newBlink);

      } catch (error) {
        console.error(error)
        res.status(500).send(error)
      }
    
  });

  //Ruta para Blinks de un usuario en especifico

  router.get("/:username", (req, res) => {
    try {
        const username= req.params.username;

        const user = users.find(user => user.username === username);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user.blinks);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

});

//Ruta para Editar un blink
  router.post("/:blinkId", (req,res) =>{
    try{
      const username=req.body.username;
      const message=req.body.message;
      const blinkId =req.params.blinkId

    // Validar que se proporcionen los parámetros obligatorios
      if ( !username || !message) {
        return res.status(400).json({ error: "Faltan parámetros obligatorios: username, message" });
      }

      const user = users.find(user => user.username === username);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const blink = user.blinks.find(blink => blink.id === blinkId);
      if (!blink) {
          return res.status(404).json({ message: 'Blink no encontrado' });
      }
      
      // Actualizar el mensaje del tweet
      blink.message = message;
      res.status(200).json({ message: 'Blink editado exitosamente' });

      } catch (error) {
        console.error(error)
        res.status(500).send(error)
      }
    
  });



module.exports = router;