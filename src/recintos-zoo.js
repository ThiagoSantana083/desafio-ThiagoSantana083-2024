class RecintosZoo {

    constructor() {
        this.recintos = [
            { nome: "Recinto 1", bioma: "savana", totalEspaco: 10, espacoLivre: 7, animaisPresentes: ["MACACO"] },
            { nome: "Recinto 2", bioma: "floresta", totalEspaco: 5, espacoLivre: 5, animaisPresentes: [] },
            { nome: "Recinto 3", bioma: "savana e rio", totalEspaco: 7, espacoLivre: 5, animaisPresentes: ["GAZELA"] },
            { nome: "Recinto 4", bioma: "rio", totalEspaco: 8, espacoLivre: 8, animaisPresentes: [] },
            { nome: "Recinto 5", bioma: "savana", totalEspaco: 9, espacoLivre: 6, animaisPresentes: ["LEAO"] },
        ];

        this.animais = [
            { especie: "LEAO", tamanho: 3, biomas: ["savana"], carnivoro: true },
            { especie: "LEOPARDO", tamanho: 2, biomas: ["savana"], carnivoro: true },
            { especie: "CROCODILO", tamanho: 3, biomas: ["rio"], carnivoro: true },
            { especie: "MACACO", tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            { especie: "GAZELA", tamanho: 2, biomas: ["savana"], carnivoro: false },
            { especie: "HIPOPOTAMO", tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        ];
    }

    // Método para validar a entrada de dados do método analisaRecintos
    validaEntradaDados(animal, quantidade) {
        const animalInfo = this.animais.find(a => a.especie === animal);

        if (!animalInfo) return { erro: "Animal inválido" };

        if (quantidade <= 0) return { erro: "Quantidade inválida" };

        return animalInfo;
    }
    // Método para verificar se tem um carnivoro presente no recinto
    temCarnivoroPresente(recinto) {
        return recinto.animaisPresentes.some(animalNoRecinto => {
            const dadosAnimal = this.animais.find(a => a.especie === animalNoRecinto);
            return dadosAnimal.carnivoro;
        });
    }

    // Método para verificar e iterar sobre os recintos disponíveis 
    getRecintosViaveis(animalInfo, animal, quantidade) {
        let recintosViaveis = [];
        let espacoNecessario = animalInfo.tamanho * quantidade;

        for (const recinto of this.recintos) {
            const mesmaEspecieNoRecinto = recinto.animaisPresentes.includes(animal);
            let espacoExtra = 0;

            const biomasDoRecinto = recinto.bioma.split(" e ");
            const biomaCompativel = animalInfo.biomas.some(bioma => biomasDoRecinto.includes(bioma));
            
            if (!biomaCompativel) continue;

            // Hipopótamos: toleram outras espécies em "savana e rio" apenas. De resto apenas em algum de seus biomas
            if (animal === "HIPOPOTAMO") {
                const possuiSavanaERio = biomasDoRecinto.includes("savana") && biomasDoRecinto.includes("rio");

                if (recinto.animaisPresentes.length > 0) {
                    const outrosAnimais = recinto.animaisPresentes.filter(a => a !== "HIPOPOTAMO");
                    if (outrosAnimais.length > 0 && !possuiSavanaERio) continue;
                }
            }
            
            const carnivoroPresenteNoRecinto = this.temCarnivoroPresente(recinto);

            // Verificar se o animal passado como parâmetro é um carnívoro ou não e se pode estar no recinto atual 
            if (animalInfo.carnivoro && (recinto.animaisPresentes.length > 0 && !mesmaEspecieNoRecinto)) {
                continue;
            }
            if (!animalInfo.carnivoro && carnivoroPresenteNoRecinto) {
                continue;
            }
            
            // Se o recinto contém outros animais e não possui um animal da mesma espécie igual o passado, adicione um espaço extra
            if (recinto.animaisPresentes.length > 0 && !mesmaEspecieNoRecinto) {
                espacoExtra = 1;
            }

            const espacoTotalNecessario = espacoNecessario + espacoExtra;

            // Regra para macacos: Macacos precisam estar com outro animal
            if (animal === "MACACO" && recinto.animaisPresentes.length === 0 && quantidade === 1) continue;

            // Ver se o recinto tem espaço livre suficiente
            if (recinto.espacoLivre >= espacoNecessario) {
                recintosViaveis.push({
                    nome: recinto.nome,
                    espacoLivre: recinto.espacoLivre - espacoTotalNecessario,
                    espacoTotal: recinto.totalEspaco
                });
            }
        }

        return recintosViaveis;
    }

    // Método para formatar a lista de recintos viáveis
    formatarRecintosViaveis(recintos) {
        return recintos.map(recinto =>
            `${recinto.nome} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`
        );
    }

    analisaRecintos(animal, quantidade) {
        const animalInfo = this.validaEntradaDados(animal, quantidade);

        if (animalInfo.erro) return animalInfo;

        const recintosViaveis = this.getRecintosViaveis(animalInfo, animal, quantidade);

        if (recintosViaveis.length === 0) return { erro: "Não há recinto viável" };

        // Retorna a lista de recintos viáveis formatada
        return {
            recintosViaveis: this.formatarRecintosViaveis(recintosViaveis)
        };
    }

}

export { RecintosZoo as RecintosZoo };
