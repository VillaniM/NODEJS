import livroService from "../services/livro.service.js";

async function createLivro(req, res, next){
    try{
        console.log('e ai?');
        let livro = req.body;
        if(!livro.nome || !livro.valor || !livro.autorId){

            throw new Error("Nome, Valor, Estoque e Autor_id são Obrigatórios");
        }
        
        res.send(await livroService.createLivro(livro));
        logger.info(`POST / Livro - ${JSON.stringify(livro)}`);
    }catch(err){
        next(err);
    }
}

async function getLivros(req, res, next){
    try{
        res.send(await livroService.getLivros(req.query.autorId));
        logger.info("GET /livro");
    }catch(err){
        next(err);
    }
}

async function getLivro(req, res, next){
    try{
        res.send(await livroService.getLivro(req.params.id));
        logger.info("GET /livro/id");
    }catch(err){
        next(err);
    }
}

async function deleteLivro(req, res, next){
    try{
        await livroService.deleteLivro(req.params.id)
        res.end();
        logger.info("DELETE /livro");
    }catch(err){
        next(err);
    }
}

async function updateLivro(req, res, next){
    try{
        let livro = req.body;
        if(!livro.livroId || !livro.nome || !livro.valor || !livro.estoque || !livro.autorId){

            throw new Error("Nome, Valor, Estoque e Autor_id são Obrigatórios");
        }
        livro = await livroService.updateLivro(livro);
        res.send(livro);
        logger.info(`PUT / Livro - ${JSON.stringify(livro)}`);
    }catch(err){
        next(err);
    }
}

async function createLivroInfo(req, res, next){
    try{
        let livroInfo = req.body;
        if(!livroInfo.livroId) {
            throw new Error ("Livro ID é obrigatório!");
        }
        livroInfo = await livroService.saveLivroInfo(livroInfo);
        res.end();
        logger.info(`POST /livro/info - ${JSON.stringify(livroInfo)}`);
    }catch(err){
        next(err);
    }
}

async function updateLivroInfo(req, res, next){
    try{
        let livroInfo = req.body;
        if(!livroInfo.livroId) {
            throw new Error ("Livro ID é obrigatório!");
        }
        livroInfo = await livroService.updateLivroInfo(livroInfo);
        res.end();
        logger.info(`PUT /livro/info - ${JSON.stringify(livroInfo)}`);
    }catch(err){
        next(err);
    }
}

async function createAvaliacao(req, res, next){
    try{
        let params = req.body;
        if(!params.livroId || !params.avaliacao){
            throw new Error("Livro ID e Avaliacao são obrigatórios");
        }
        await livroService.createAvaliacao(params.avaliacao, params.livroId);
        logger.info(`POST /livro/avaliacao/${req.params.index}`);
        res.end();
    }catch(err){
        next(err);
    }
}

async function deleteAvaliacao(req, res, next){
    try{
        await livroService.deleteAvaliacao(req.params.id, req.params.index);
        logger.info(`DELETE /livro/info ${req.params.id}/avaliacao/${req.params.index}`);
        res.end();
    }catch(err){
        next(err);
    }
}

async function findAllLivroInfo(req, res, next){
    try{
        res.send(await livroService.findAllLivroInfo());
        logger.info("GET /livro/info");
    }catch(err){
        next(err);
    }
}

async function deleteLivroInfo(req, res, next){
    try{
        await livroService.deleteLivroInfo(parseInt(req.params.id));
        logger.info("DELETE /livro/info");
        res.end();
    }catch(err){
        next(err);
    }
}

export default{
    createLivro,
    createLivroInfo,
    getLivros,
    getLivro,
    findAllLivroInfo,
    deleteLivro,
    deleteAvaliacao,
    deleteLivroInfo,
    updateLivro,
    updateLivroInfo,
    createAvaliacao
}