const express=require ("express");

let users = require('../usersData');

const router =express.Router();

router.use(express.urlencoded({ extended: true })); // para acceder al body
router.use(express.json());

router.get("/", (req, res) => {
    res.send(users);
});

// Ruta para obtener un usuario específico
router.get("/:username", (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
});

module.exports = router;
