import app from "../app.js";
import request from "supertest"
import autorRepository from "../repositories/autor.repository.js";
import clienteRepository from "../repositories/cliente.repository.js";
import livroRepository from "../repositories/livro.repository.js";
import vendaRepository from "../repositories/venda.repository.js";

jest.setTimeout(400000);

test("CENARIO 01", async () =>{
    const autor = {
        nome: "Autor de Teste",
        email: "autordeteste@gmail.com",
        telefone: "33214242"
    }

    const livro = {
        nome: "Livro de Teste",
        valor: 100,
        estoque: 5,
        autorId: null
    }

    const cliente = {
        nome: "Cliente de teste",
        email: "clientedeteste@gmail.com",
        senha: "123456",
        telefone: "33214241",
        endereco: "rua 10"
    }

    const venda = {
        valor: 100,
        data: "2000-01-01T00:00:00.000Z",
        clienteId: null,
        livroId: null
    }

    const admin = "admin";
    const passwordAdmin = "desafio-igti-nodejs";

    let emailCliente = cliente.email;
    let passworCliente = cliente.senha;
    
    let res = await request(app).post("/autor").send(autor).auth(admin, passwordAdmin);
    autor.autorId = res.body.autorId;
    expect(res.body).toMatchObject(autor);
    expect(res.status).toBe(200);

    res = await request(app).get(`/autor/${autor.autorId}`).auth(admin,passwordAdmin);
    expect(res.body).toMatchObject(autor);
    expect(res.status).toBe(200);
    ////
    livro.autorId = autor.autorId;
    res = await request(app).post("/livro").send(livro).auth(admin, passwordAdmin);
    livro.livroId = res.body.livroId;
    expect(res.body).toMatchObject(livro);
    expect(res.status).toBe(200);

    res = await request(app).get(`/livro/${livro.livroId}`).auth(admin,passwordAdmin);
    expect(res.body).toMatchObject(livro);
    expect(res.status).toBe(200);

    res = await request(app).post("/cliente").send(cliente).auth(admin, passwordAdmin);
    cliente.clienteId = res.body.clienteId;
    delete cliente.senha;
    expect(res.body).toMatchObject(cliente);
    expect(res.status).toBe(200);

    res = await request(app).get(`/cliente/${cliente.clienteId}`).auth(admin,passwordAdmin);
    expect(res.body).toMatchObject(cliente);
    expect(res.status).toBe(200);

    res = await request(app).get(`/livro/${livro.livroId}`).auth(emailCliente,passworCliente);
    expect(res.body).toMatchObject(livro);
    expect(res.status).toBe(200);
    
    venda.clienteId = cliente.clienteId;
    venda.livroId = livro.livroId;
    res = await request(app).post("/venda").send(venda).auth(emailCliente, passworCliente);
    venda.vendaId = res.body.vendaId;
    expect(res.body).toMatchObject(venda);
    expect(res.status).toBe(200);

    res = await request(app).get(`/venda/${venda.vendaId}`).auth(admin,passwordAdmin);
    expect(res.body).toMatchObject(venda);
    expect(res.status).toBe(200);

    await vendaRepository.deleteVenda(venda.vendaId);
    await livroRepository.deleteLivro(livro.livroId);
    await autorRepository.deleteAutor(autor.autorId);
    await clienteRepository.deleteCliente(cliente.clienteId);
}, 400000); 
