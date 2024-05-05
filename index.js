const express = require('express');

const app= express();
const PORT=3000;

app.get("/", (req, res) => {
  res.send("Blinkle Funcionando :)");
});

const signInRouter=require("./routes/signin");

const logInRouter=require("./routes/login");

const usersRouter=require("./routes/users");

const blinksRouter=require("./routes/blinks");

app.use("/sign",signInRouter);

app.use("/log",logInRouter);

app.use("/users",usersRouter);

app.use("/blinks",blinksRouter);

app.listen(PORT, () => {
    console.log(`Servidor esta vivito y corriendo en ${PORT}`);
  });

