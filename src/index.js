// Importando as Bibliotecas

const express = require('express'); // Responsável pela criação dos servidores webs

const axios = require('axios'); // Responsável por trazer o pacote das requisições HTTP



const app = express();

const PORT = 3000;



// Endpoint para buscar o endereço pelo CEP

app.get('/cep/:cep', async (req, res) => { // /cep é o serviço, e o :cep é o dinâmico

    const { cep } = req.params;

    try {

        // Fazendo requisição para a API ViaCEP

        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        const endereco = response.data;



        // Se o CEP não for encontrado

        if (endereco.erro) {

            return res.status(404).json({ mensagem: 'CEP não encontrado' });
        }



        // Retorna o endereço formatado

        res.json({
            cep: endereco.cep,

            logradouro: endereco.logradouro,

            bairro: endereco.bairro,

            cidade: endereco.localidade,

            estado: endereco.uf
        });
    } catch (error) {

        res.status(500).json({ mensagem: 'Erro ao consultar CEP' })
    }
});

// Iniciando o servidor

app.listen(PORT, () => {

    console.log(`Servidor rodando em http://localhost:${PORT}`);

});