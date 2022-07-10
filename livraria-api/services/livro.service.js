import livroRepository from "../repositories/livro.repository.js";
import autorRepository from "../repositories/autor.repository.js";
import VendaRepository from "../repositories/venda.repository.js";
import LivroInfoRepository from "../repositories/livroInfo.repository.js";

async function createLivro(livro){
    if(await autorRepository.getAutor(livro.autorId)){
        return await livroRepository.insertLivro(livro);
    }
    throw new Error("O autorId não existe!");
}

async function getLivros(autorId){
    if(autorId){
        return await livroRepository.getLivroByAutorId(autorId);
    }
    return await livroRepository.getLivros();
}

async function getLivro(id){
    const livro = await livroRepository.getLivro(id);
    livro.info = await LivroInfoRepository.getLivroInfo(parseInt(id));
    return livro;
}

async function updateLivro(livro){
    if(await autorRepository.getAutor(livro.autorId)){
        return await livroRepository.updateLivro(livro);
    }
    throw new Error("O autorId não existe!");
}

async function deleteLivro(id){
    const vendas = await VendaRepository.getVendasByLivroId(id);
    if(vendas.length > 0){
        throw new Error("Não é possível excluir, está vinculado a vendas!");
    }
    await livroRepository.deleteLivro(id);
}

async function saveLivroInfo(livroInfo){
    await LivroInfoRepository.createLivroInfo(livroInfo);
}

async function updateLivroInfo(livroInfo){
    await LivroInfoRepository.updateLivroInfo(livroInfo);
}

async function createAvaliacao(avaliacao, livroId){
    await LivroInfoRepository.createAvaliacao(avaliacao, livroId);
}

async function deleteAvaliacao(livroId, index){
    await LivroInfoRepository.deleteAvaliacao(parseInt(livroId), index);
}

async function findAllLivroInfo(){
    return await LivroInfoRepository.findAllLivroInfo();
}

async function deleteLivroInfo(livroId){
    await LivroInfoRepository.deleteLivroInfo(livroId);
}

export default{
    createLivro,
    getLivros,
    getLivro,
    findAllLivroInfo,
    updateLivro,
    updateLivroInfo,
    deleteLivro,
    deleteLivroInfo,
    deleteAvaliacao,
    saveLivroInfo,
    createAvaliacao
}