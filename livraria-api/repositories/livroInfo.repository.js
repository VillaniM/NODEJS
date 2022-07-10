import { connect } from "./mongo.db.js";
import LivroInfoSchema from "../schemas/livroInfo.schema.js";

async function createLivroInfo(livroInfo){
    try{
        const mongoose = await connect();
        const LivroInfo = mongoose.model("livroInfo", LivroInfoSchema);
        livroInfo = new LivroInfo(livroInfo);
        console.log(livroInfo);
        await livroInfo.save();
    }catch(err){
        throw err;
    }

}

async function updateLivroInfo(livroInfo){
    try{
        const mongoose = await connect();
        const LivroInfo = mongoose.model("livroInfo", LivroInfoSchema);
        await LivroInfo.findOneAndUpdate({livroId: livroInfo.livroId}, livroInfo);
    }catch(err){
        throw err;
    }

}

async function getLivroInfo(livroId){
    try{
        const mongoose = await connect();
        const LivroInfo = mongoose.model("livroInfo", LivroInfoSchema);
        const query = LivroInfo.findOne({livroId});
        return await query.exec();
    }catch(err){
        throw err;
    }
}

async function createAvaliacao(avaliacao, livroId){
    try{
        const livroInfo = await getLivroInfo(livroId);
        livroInfo.avaliacoes.push(avaliacao);
        await updateLivroInfo(livroInfo);
    }catch(err){
        throw err;
    }
}

async function deleteAvaliacao(livroId, index){
    try{
        const livroInfo = await getLivroInfo(livroId);
        livroInfo.avaliacoes.splice(index, 1)
        await updateLivroInfo(livroInfo);
    }catch(err){
        throw err;
    }
}

async function findAllLivroInfo(){
    try{
        const mongoose = await connect();
        const LivroInfo = mongoose.model("livroInfo", LivroInfoSchema);
        const query = LivroInfo.find({});
        return await query.exec();
    }catch(err){
        throw err;
    }
}

async function deleteLivroInfo(livroId){
    try{
        const mongoose = await connect();
        const LivroInfo = mongoose.model("livroInfo", LivroInfoSchema);
        await LivroInfo.deleteOne({livroId});
    }catch(err){
        throw err;
    }
}

export default {createLivroInfo, 
    updateLivroInfo, 
    getLivroInfo, 
    createAvaliacao, 
    deleteAvaliacao,
    findAllLivroInfo, 
    deleteLivroInfo}