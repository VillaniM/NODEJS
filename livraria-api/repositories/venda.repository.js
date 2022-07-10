import Venda from "../models/venda.model.js";
import Livro from "../models/livro.model.js";
import Cliente from "../models/cliente.model.js";

async function insertVenda(venda){
    try{
        return await Venda.create(venda);
    }catch(err){
        throw err;
    }
}

async function getVendas(){
    try{
        return await Venda.findAll({
            include: [
                {
                    model: Livro
                },
                {
                    model: Cliente
                }
            ] 
        });
    }catch(err){
        throw err;
    }
}

async function getVendasByLivroId(livroId){
    try{
        return await Venda.findAll(
            {
                where: {
                    //quando as duas variáveis de comparação tem o mesmo nome
                    // ex: livroId(coluna da tabela): livroId(parâmetro)
                    // pode informar o valor uma vez só, igual a linha de baixo
                    livroId
                },
                include: [
                    {
                        model: Cliente
                    }
                ] 
            }
        );
    }catch(err){
        throw err;
    }
}

async function getVendasByAutorId(autorId){
    try{
        return await Venda.findAll(
            {
                include: [
                    {
                        model: Livro,
                        where: {
                            autorId
                        }
                    }
                ]
            }
        );
    }catch(err){
        throw err;
    }
}

async function getVendasByClienteId(clienteId){
    try{
        return await Venda.findAll(
            {
                include: [
                    {
                        model: Cliente,
                        where: {
                            clienteId
                        }
                    }
                ]
            }
        );
    }catch(err){
        throw err;
    }
}

async function getVenda(id){
    try{
        return await Venda.findByPk(id);
    }catch(err){
        throw err;
    }
}

async function updateVenda(venda){
    try{
        await Venda.update(
            {
                valor: venda.valor,
                data: venda.data,
                clienteId: venda.clienteId
            },
            {
                where: {
                    vendaId: venda.vendaId
                }
            }
        );
        return await getVenda(venda.vendaId);     
    }catch(err){
        throw err;
    }
}

async function deleteVenda(id){
    try{
        await Venda.destroy({
            where:{
                vendaId: id
            }
        })
    }catch(err){
        throw err;
    }
}

export default{
    insertVenda,
    getVendas,
    getVendasByLivroId,
    getVendasByAutorId,
    getVendasByClienteId,
    getVenda,
    updateVenda,
    deleteVenda
}