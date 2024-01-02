const mongoose=require("mongoose")
const carSchema=mongoose.Schema({
    name: String,
    photos: String,
    type1: String,
    fuel: String,
    seats: String,
    rating: String,
    trips: String,
    pricePerDay: String,
    fastag: Boolean,
    type2: String,
    city: String,
    dates:Array
},{
    versionKey:null
})
const carModel=mongoose.model('cars_rent_a_ride',carSchema)
module.exports={
 carModel
}