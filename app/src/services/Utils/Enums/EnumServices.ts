class EnumServices {
    // converte de string para enum
    convertStringFromEnum(type: any, prop: any) { // passa o tipo do enum, ou sejá a tipagem do enum. Mais o valor em string vinda do banco
        // converte o nosso tipo em json e converte de de json para objeto novamente, pegando o valor da propriedade com o prop
        // o retorno será um valor númerico correspondente a propriedade e o enum
        return JSON.parse(JSON.stringify(type))[prop];
    }
}

export default new EnumServices();