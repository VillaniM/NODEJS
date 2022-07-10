import clienteService from "../services/cliente.service.js";
import { getRole } from "./auth.controller.js";

async function createCliente(req, res, next){
    try{
        let cliente = req.body;
        if(!cliente.nome || !cliente.telefone || !cliente.email || !cliente.endereco){

            throw new Error("Nome, Telefone, Email e Endereco são Obrigatórios");
        }
        
        res.send(await clienteService.createCliente(cliente));
        logger.info(`POST / Cliente - ${JSON.stringify(cliente)}`);
    }catch(err){
        next(err);
    }
}

async function getClientes(req, res, next){
    try{
        res.send(await clienteService.getClientes());
        logger.info("GET /cliente");
    }catch(err){
        next(err);
    }
}

async function getCliente(req, res, next){
    try{
        res.send(await clienteService.getCliente(req.params.id));
        logger.info("GET /cliente/id");
    }catch(err){
        next(err);
    }
}

async function deleteCliente(req, res, next){
    try{
        await clienteService.deleteCliente(req.params.id)
        res.end();
        logger.info("DELETE /cliente");
    }catch(err){
        next(err);
    }
}

async function updateCliente(req, res, next){
    try{
        let cliente = req.body;
        if(!cliente.clienteId || !cliente.nome || !cliente.telefone || !cliente.email || !cliente.endereco){

            throw new Error("ID, Nome, Telefone, Email e Endereco são Obrigatórios");
        }
        if(getRole(req.auth.user) === 'client'){
            const cli = await clienteService.getClienteByEmail(req.auth.user);
            if(parseInt(cli.clienteId)!== cliente.clienteId){
                throw new Error('Cliente não pode atualizar dados de outro cliente.');
            }
        }
        cliente = await clienteService.updateCliente(cliente);
        res.send(cliente);
        logger.info(`PUT / Cliente - ${JSON.stringify(cliente)}`);
    }catch(err){
        next(err);
    }
}

export default{
    createCliente,
    getClientes,
    getCliente,
    deleteCliente,
    updateCliente
}