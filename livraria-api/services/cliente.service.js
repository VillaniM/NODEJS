import clienteRepository from "../repositories/cliente.repository.js";
import basicAuth from "express-basic-auth";
import vendaRepository from "../repositories/venda.repository.js";

async function createCliente(cliente){
    return await clienteRepository.insertCliente(cliente);
}

async function getClientes(){
    return await clienteRepository.getClientes();
}

async function getCliente(id){
    return await clienteRepository.getCliente(id);
}

async function getClienteByEmail(email){
    return await clienteRepository.getClienteByEmail(email);
}

async function updateCliente(cliente){
    return await clienteRepository.updateCliente(cliente);
}

async function deleteCliente(id){
    const vendas = await vendaRepository.getVendasByClienteId(id);
    if(vendas.length > 0){
        throw new Error("Não é possível excluir, está vinculado a vendas!");
    }
    await clienteRepository.deleteCliente(id);
}

async function verificaLogin(email,senha){
    const cliente = await clienteRepository.getClienteByEmail(email);
    if(!cliente){
        return false;
    }
    return basicAuth.safeCompare(cliente.senha,senha);
}

export default{
    createCliente,
    getClientes,
    getCliente,
    getClienteByEmail,
    updateCliente,
    deleteCliente,
    verificaLogin
}