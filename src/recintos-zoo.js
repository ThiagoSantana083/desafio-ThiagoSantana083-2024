class RecintosZoo {

    constructor() {
        this.recintos = [
            {nome: "Recinto 1", bioma: "savana", totalEspaco: 10, espacoLivre: 7, animaisPresentes: ["MACACO"]},
            {nome: "Recinto 2", bioma: "floresta", totalEspaco: 5, espacoLivre: 5, animaisPresentes: []},
            {nome: "Recinto 3", bioma: "savana e rio", totalEspaco: 7, espacoLivre: 5, animaisPresentes:["GAZELA"]},
            {nome: "Recinto 4", bioma: "rio", totalEspaco: 8, espacoLivre: 8, animaisPresentes:[]},
            {nome: "Recinto 5", bioma: "savana", totalEspaco: 9, espacoLivre: 6, animaisPresentes:["LEAO"]},
        ];

        this.animais = [
            {especie: "LEAO", tamanho: 3, bioma: "savana", carnivoro: true},
            {especie: "LEOPARDO", tamanho: 2, bioma: "savana", carnivoro: true},
            {especie: "CROCODILO", tamanho: 3, bioma: "rio", carnivoro: true},
            {especie: "MACACO", tamanho: 1, bioma: "savana ou floresta", carnivoro: false},
            {especie: "GAZELA", tamanho: 2, bioma: "savana", carnivoro: false},
            {especie: "HIPOPOTAMO", tamanho: 4, bioma: "savana ou rio", carnivoro: false}
        ];
    }

    analisaRecintos(animal, quantidade) {
        //const animaisValidos = ["LEAO", "LEOPARDO", "CROCODILO", "MACACO", "GAZELA", "HIPOPOTAMO"];
        // Informação do animal
        const animalInfo = this.animais.find(a => a.especie === animal);
        // Verifica se o animal é válido ou não

        /*if (!animaisValidos.includes(animal)) {
            return {
                erro: "Animal inválido",
                recintosViaveis: null
            };
        }*/
        if (!animalInfo) {
            return {
                erro: "Animal inválido",
                recintosViaveis: null
            };
        }

        // Verifica se quantidade é inválida
        if (quantidade <= 0) {
            return {
                erro: "Quantidade inválida",
                recintosViaveis: null
            };
        }


        let recintosViaveis = [];

        // Itera sobre os recintos disponíveis
        for (const recinto of this.recintos) {

            let espacoNecessario = animalInfo.tamanho * quantidade;
            let espacoExtra = 0;


            // Verifica se já existe um animal da mesma espécie no recinto

            const mesmoAnimalNoRecinto = recinto.animaisPresentes.includes(animal);

            // Se não houver o mesmo animal e há outras espécies no recinto, considere o espaço extra
            if (!mesmoAnimalNoRecinto && recinto.animaisPresentes.length > 0) {
                espacoExtra = 1;
            }

            // Calculando o espaço total com o espaço extra
            espacoNecessario += espacoExtra;

            // Ver se o recinto tem espaço livre suficiente
            if (recinto.espacoLivre >= espacoNecessario) {
                // Adiciona recinto viável à lista sem formatação
                recintosViaveis.push({
                    nome: recinto.nome,
                    espacoLivre: recinto.espacoLivre - espacoNecessario - espacoExtra,
                    espacoTotal: recinto.totalEspaco
                });
            }
        }

        // Ver se algum recinto viável foi encontrado
        if (recintosViaveis.length === 0) {
            return {
                erro: "Não há recinto viável",
                recintosViaveis: null
            };
        } 
        
        // Retorna a lista de recintos viáveis formatada
        return {
            erro: null,
            recintosViaveis: this.formatarRecintosViaveis(recintosViaveis)
        };
    }

    // Método para formatar a lista de recintos viáveis
    formatarRecintosViaveis(recintos) {
        return recintos.map(recinto =>
            `${recinto.nome} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`
        );
    }

}

export { RecintosZoo as RecintosZoo };