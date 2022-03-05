const Router = require("express")
const User = require("../models/User")
const {check, validationResult} = require("express-validator")
const router = new Router()

router.post('/registration',
    [
        check('email', "Incorrect email").isEmail(),
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({message: "Incorrect request", errors})
        }

        const {telegram, email, skills} = req.body
        const candidate = await User.findOne({email})

        if (candidate){
            return res.status(400).json({message: `User with email ${email} already exist`})
        }

        const user = new User({telegram, email, skills})
        await user.save()
        res.json({message: "User was created"})

    } catch (e) {
        console.log(e)
        res.send({message: "Server Error"})
    }
})

module.exports = router