import vendaRepository from "../repositories/venda.repository.js";
import clienteRepository from "../repositories/cliente.repository.js";
import livroRepository from "../repositories/livro.repository.js";

async function createVenda(venda){
    if(!await clienteRepository.getCliente(venda.clienteId)){
        throw new Error("O cliente_id não existe!");
    }
    const livro = await livroRepository.getLivro(venda.livroId);
    if(!livro){
        throw new Error("O livro_id não existe!");
    }
    console.log(livro.estoque);
    if(livro.estoque > 0){
        venda = await vendaRepository.insertVenda(venda);
        livro.estoque --;
        console.log(livro.estoque);
        await livroRepository.updateLivro(livro);
        return venda;
    }else{
        throw new Error("O produto informado não possui estoque.");
    }
}

async function getVendas(livroId, autorId, clienteId){
    if(livroId){
        return await vendaRepository.getVendasByLivroId(livroId);
    }
    if(autorId){
        return await vendaRepository.getVendasByAutorId(autorId);
    }
    if(clienteId){
        return await vendaRepository.getVendasByClienteId(clienteId);
    }
    return await vendaRepository.getVendas();
}

async function getVenda(id){
    return await vendaRepository.getVenda(id);
}

async function updateVenda(venda){
    if(!await clienteRepository.getCliente(venda.clienteId)){
        throw new Error("O cliente_id não existe!");
    }
    const livro = await livroRepository.getLivro(venda.livroId);
    if(!livro){
        throw new Error("O livro_id não existe!");
    }
    return await vendaRepository.updateVenda(venda);
}

async function deleteVenda(id){
    const venda = await vendaRepository.getVenda(id);
    if(venda){
        const livro = await livroRepository.getLivro(venda.livroId);
        await vendaRepository.deleteVenda(id);
        livro.estoque++;
        await livroRepository.updateLivro(livro);
    }else{
        throw new Error("Venda inválida");
    }
    
}

export default{
    createVenda,
    getVendas,
    getVenda,
    updateVenda,
    deleteVenda
}