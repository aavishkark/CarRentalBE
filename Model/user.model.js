const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email: String,
    password: String,
    username: String,
    pastRides: Array,
    city: String,
    activeRides: Array,
    favourite: Array
},{
    versionKey:null
})
const UserModel=mongoose.model('rent_a_ride_user',userSchema)
module.exports={
 UserModel
}