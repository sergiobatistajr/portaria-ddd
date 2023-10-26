export default class Email {
    constructor(readonly value:string){
        if(!value){
            throw new Error("Email é obrigatório")
        }
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if(!regex.test(value)){
            throw new Error("Email inválido")
        }
    }
}