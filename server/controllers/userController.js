const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/libs/errors");
const jwt = require("jswonwebtoke");

router.post("/register", async (req, rest) => {
      let { email, password } = req.body.user;
    try{
      const User = await UserModel.create({
        email, 
        password,
    });

     let token = jwt.sign({id: User.id}), "i_am_secret", {expiresIn: 60 *60 *24}); 
        
     res.status (201).json ({
        message: "User successfully registered",
        user: User,
        sessionToken: token
    });
   } catch (err) {
    if (err instanceof UniqueConstraintError) {
        res.status(409).json({
        message: "Email already in use",
        });
    } else {
    res.status(500).json({
        message: "Failed to register user",
    });
}
}
});

router.post("/login", async (req, res) => {
let { email, password } = req.body.user;


try {
    let loginUser = await UserModel.findOne({
    where: {
        email: email,
    },
});
if (loginUser) {
res.status(200).json({
    user: loginUser,
    message: "User successfully logged in!"
});
} else {
    res.status(401).json({
        message: 'Login failed'
    });
}
} catch (error) {
    res.status(500).json({
        message: "Failed to log user in"
    })
}
});

module.exports = router;