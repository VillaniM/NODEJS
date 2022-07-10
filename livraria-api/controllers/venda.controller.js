import clienteService from "../services/cliente.service.js";
import vendaService from "../services/venda.service.js";
import { getRole } from "./auth.controller.js";

async function createVenda(req, res, next){
    try{
        let venda = req.body;
        if(!venda.valor || !venda.data || !venda.clienteId || !venda.livroId){

            throw new Error("Valor, Data, Cliente_ID e Livro_ID são Obrigatórios");
        }
        
        res.send(await vendaService.createVenda(venda));
        logger.info(`POST / Venda - ${JSON.stringify(venda)}`);
    }catch(err){
        next(err);
    }
}

async function getVendas(req, res, next){
    try{
        if(req.query.clienteId && getRole(req.auth.user)==="cliente"){
            const cliente = await clienteService.getClienteByEmail(req.auth.user);
            if(parseInt(req.query.clienteId) !== cliente.clienteId){
                throw new Error("Cliente não pode ver vendas de outro cliente.");
            }
        }
        res.send(await vendaService.getVendas(req.query.livroId, req.query.autorId, req.query.clienteId));
        logger.info("GET /venda");
    }catch(err){
        next(err);
    }
}

async function getVenda(req, res, next){
    try{
        res.send(await vendaService.getVenda(req.params.id));
        logger.info("GET /venda/id");
    }catch(err){
        next(err);
    }
}

async function deleteVenda(req, res, next){
    try{
        await vendaService.deleteVenda(req.params.id)
        res.end();
        logger.info("DELETE /venda");
    }catch(err){
        next(err);
    }
}

async function updateVenda(req, res, next){
    try{
        let venda = req.body;
        if(!venda.vendaId || !venda.valor || !venda.data || !venda.clienteId || !venda.livroId){

            throw new Error("ID, Valor, Data, Cliente_ID e Livro_ID são Obrigatórios");
        }
        venda = await vendaService.updateVenda(venda);
        res.send(venda);
        logger.info(`PUT / Venda - ${JSON.stringify(venda)}`);
    }catch(err){
        next(err);
    }
}

export default{
    createVenda,
    getVendas,
    getVenda,
    deleteVenda,
    updateVenda
}