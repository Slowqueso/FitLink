import mongoose  from "mongoose";

const navData = mongoose.Schema({
    logo: {
        url: String
    },
    item1: String,
    item2: String,
    item3: String,
    item4: String
})

export default mongoose.model('navbar', navData)