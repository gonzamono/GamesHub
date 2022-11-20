const fs = require("fs");
const path = require("path");
const bcrypt= require("bcryptjs")
const User = require("../models/Users")

// const usersFilePath = path.join(__dirname, "../database/users.json");
 let users = User.findAll();

const controller = {
    login: (req, res) => {
      res.render("login/login.ejs",{tittle:'Login'});
    },
    loginProcess: (req,res) => {
      let userLoged = {...req.body}
      console.log(userLoged)
      // let encryptPass=bcrypt.hashSync(`${userLoged.password}`,10)
      // console.log(encryptPass)
      
      users.forEach((user) => {
        if(user.email == userLoged.email && bcrypt.compareSync(userLoged.password,user.password)){
          console.log('usuario encontrado y validado el password..excelente')
          res.redirect('/')
        } else {
          res.render("login/login.ejs",{tittle:'Login'});
        }
      })
    }
   };
  
  module.exports = controller;
  