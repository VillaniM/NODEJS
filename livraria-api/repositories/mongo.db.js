import mongoose from "mongoose";


async function connect(){
    const uri = "https://account.mongodb.com/account/login";
    return mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
}

export {connect}