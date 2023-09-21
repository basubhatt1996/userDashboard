const users = require("../models/userSchema");
const BASE_URL = process.env.BASE_URL

// register user
exports.userpost = async (req, res) => {

    const { fname, lname, email, mobile, address1,address2,country,state,zipCode} = req.body;

    if (!fname || !lname || !email || !mobile ||  !address1||!country||!state||!zipCode) {
        res.status(401).json("All Inputs are required")
    }
    try {
            const userData = new users({
                fname, lname, email, mobile,  address1,address2,country,state,zipCode
            });
            await userData.save();
            res.status(200).json(userData);
        
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block error")
    }
};
//get all users
exports.userget=async(req,res)=>{
    try {
        const count = await users.countDocuments();

        const usersdata = await users.find()

        const pageCount = Math.ceil(count/5);  

        res.status(200).json({
            Pagination:{
                count,pageCount
            },
            usersdata
        })
    } catch (error) {
        res.status(401).json(error)
    }
}

// single user get
exports.singleuserget = async (req, res) => {

    const { id } = req.params;

    try {
        const userdata = await users.findOne({ _id: id });
        res.status(200).json(userdata)
    } catch (error) {
        res.status(401).json(error)
    }
}

// user edit
exports.useredit = async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, mobile, address1,address2,country,state,zipCode } = req.body;
  
    try {
        const updateuser = await users.findByIdAndUpdate({ _id: id }, {
            fname, lname, email, mobile, address1,address2,country,state,zipCode
        }, {
            new: true
        });

        await updateuser.save();
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete user
exports.userdelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletuser = await users.findByIdAndDelete({ _id: id });
        res.status(200).json(deletuser);
    } catch (error) {
        res.status(401).json(error)
    }
}



