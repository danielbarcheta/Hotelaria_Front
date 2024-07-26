import axios from "axios"

export const api = axios.create({
        baseURL: "http://localhost:8081"
})

export async function addQuarto(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("foto", photo)
    formData.append("tipoQuarto", roomType)
    formData.append("precoQuarto", roomPrice)

    const response = await api.post("/quartos/add/quarto-novo", formData);
    if(response.status === 201) {
        return true;
    }else{
        return false;
    }
}

export async function getTiposQuarto() {
    try{
        const response = await api.get("/quartos/tipos-quarto");
        return response.data;
    } catch(erro) {
        throw new Error("Erro no fetch da API tipos de quartos");
    }
}

export async function getAllQuartos(){
    try{
        const result = await api.get("/quartos/todos-quartos");
        return result.data;
    } catch(erro) {
        throw new Error("Erro no fetch de Quartos")
    }
}

export async function deleteQuarto(quartoId) {
    try{
        const result = await api.delete(`/quartos/deletar/quarto/${quartoId}`);
        return result.data
    }catch(erro){
        throw new Error("Erro ao deletar Quarto")
    }
}

export async function atualizaQuarto(quartoId, dadosQuarto) {
    const formData = new FormData()
    formData.append("tipoQuarto", dadosQuarto.tipoQuarto)
    formData.append("precoQuarto", dadosQuarto.precoQuarto)
    formData.append("foto", dadosQuarto.foto)
    const response = await api.put(`/quartos/atualizar/${quartoId}`, formData)
    return response
}

export async function getQuartoById(quartoId) {
    try{
        const result = await api.get(`/quartos/quarto/${quartoId}`)
        return result.data
    } catch(erro) {
        throw new Error(`Erro no fetch do quarto ${quartoId}. ${erro}`)
    }

}