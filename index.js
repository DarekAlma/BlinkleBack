const express = require('express');

const app= express();
const PORT=3000;

app.get("/", (req, res) => {
  res.send("Darek Aljuri Funcionando :)");
});

const signInRouter=require("./routes/signin");

const logInRouter=require("./routes/login");

const usersRouter=require("./routes/users");

app.use("/sign",signInRouter);

app.use("/log",logInRouter);

app.use("/users",usersRouter);

app.listen(PORT, () => {
    console.log(`Servidor esta vivito y corriendo en ${PORT}`);
  });

