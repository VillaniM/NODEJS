import mongoose from "mongoose";
import AvaliacoesSchema from "./avaliacao.schema.js";

const LivroInfoSchema = new mongoose.Schema(
    {
        livroId: Number,
        descricao: String,
        paginas: Number,
        editora: String, 
        avaliacoes: [AvaliacoesSchema]
    },
    {collection: "livroInfo"}
);

export default LivroInfoSchema;