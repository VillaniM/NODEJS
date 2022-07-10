import Autor from "../models/autor.model.js";

async function insertAutor(autor){
    try{
        return await Autor.create(autor);
    }catch (err){
        throw err;
    }
}

async function getAutores(){
    try{
        return await Autor.findAll();
    }catch (err){
        throw err;
    }
}

async function getAutor(id){
    try{
        return await Autor.findByPk(id);
    }catch (err){
        throw err;
    }
}

async function updateAutor(autor){
    try{
        await Autor.update(autor, {
            where:{
                autorId: autor.autorId
            }
        });
        //o update do sequelize retorna a quantidade de registros atualizados, então para ver quais foram, coloca um return
        return await getAutor(autor.autorId);
    }catch (err){
        throw err;
    }
}

async function deleteAutor(id){
    try{
        await Autor.destroy({
            where:{
                autorId: id
            }
        });
    }catch (err){
        throw err;
    }
}

export default{
    insertAutor,
    getAutores,
    getAutor,
    updateAutor,
    deleteAutor
}