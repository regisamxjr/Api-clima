function obterDatas() {
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const hoje = new Date();
    
    const dataHoje = {
        diaSemana: dias[hoje.getDay()],
        data: hoje.getDate()
    };
    
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    const dataAmanha = {
        diaSemana: dias[amanha.getDay()],
        data: amanha.getDate()
    };
    
    const depoisDeAmanha = new Date(hoje);
    depoisDeAmanha.setDate(hoje.getDate() + 2);
    const dataDepoisDeAmanha = {
        diaSemana: dias[depoisDeAmanha.getDay()],
        data: depoisDeAmanha.getDate()
    };
    
    return { dataHoje, dataAmanha, dataDepoisDeAmanha };
}
