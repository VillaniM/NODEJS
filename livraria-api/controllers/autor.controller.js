import autorService from "../services/autor.service.js";

async function createAutor(req, res, next){
    try{
        let autor = req.body;
        if(!autor.nome || !autor.telefone || !autor.email){

            throw new Error("Nome, Telefone, Email são Obrigatórios");
        }
        
        res.send(await autorService.createAutor(autor));
        logger.info(`POST / Autor - ${JSON.stringify(autor)}`);
    }catch(err){
        next(err);
    }
}

async function getAutores(req, res, next){
    try{
        res.send(await autorService.getAutores());
        logger.info("GET /autor");
    }catch(err){
        next(err);
    }
}

async function getAutor(req, res, next){
    try{
        res.send(await autorService.getAutor(req.params.id));
        logger.info("GET /autor/id");
    }catch(err){
        next(err);
    }
}

async function deleteAutor(req, res, next){
    try{
        await autorService.deleteAutor(req.params.id)
        res.end();
        logger.info("DELETE /autor");
    }catch(err){
        next(err);
    }
}

async function updateAutor(req, res, next){
    try{
        let autor = req.body;
        if(!autor.autorId || !autor.nome || !autor.telefone || !autor.email){

            throw new Error("ID, Nome, Telefone, Email são Obrigatórios");
        }
        autor = await autorService.updateAutor(autor);
        res.send(autor);
        logger.info(`PUT / Autor - ${JSON.stringify(autor)}`);
    }catch(err){
        next(err);
    }
}

export default{
    createAutor,
    getAutores,
    getAutor,
    deleteAutor,
    updateAutor
}