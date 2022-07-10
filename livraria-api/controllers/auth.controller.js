import basicAuth from "express-basic-auth";
import clienteService from "../services/cliente.service.js";

//recupera o perfil do usuário
function getRole(username) {
    if (username === 'admin') {
        return 'admin'
    }
    return 'cliente';
}

//verifica qual o perfil do usuário e qual rota ele pode acessar
function authorize(...allowed) {

    const isAllowed = perfil => allowed.indexOf(perfil) > -1;

    return (req, res, next) => {
        if (req.auth.user) {
            const perfil = getRole(req.auth.user);

            if (isAllowed(perfil)) {
                next()
            } else {
                res.status(403).send('Usuário sem permissão.');
            }
        } else {
            res.status(401).send('Usuário não econtrado.');
        }
    }
}

//cb é o parâmetro para receber a call back que será retornada
function authorizer(username, password, cb){
    if (basicAuth.safeCompare(username, 'admin') 
        && basicAuth.safeCompare(password, 'desafio-igti-nodejs')){
        return cb(null, true);
    }
    clienteService.verificaLogin(username, password).then(value =>{
        return cb(null, value);
    }).catch(() =>{
        return cb(null, false);
    });
}

export{
    getRole,
    authorizer,
    authorize
}
