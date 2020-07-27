'use strict'

const { default: Axios } = require("axios")
const axiosRateLimit = require("axios-rate-limit")
const Cep = use('App/Models/Cep')
const Database = use('Database')

class CepController {

  async index({ request, params, response }) {

    const data = await Cep.all()

    return data

  }

  async atualizaCEP({ request, response, params }) {
    const http = axiosRateLimit(Axios.create(), { maxRequests: 1, perMilliseconds: 5000 })

    let data = await Database.select('*').from('ceps')

    async function atualizaTabela(cep, longitude, latitude) {
      await Database
        .table('ceps')
        .where('CEP', cep)
        .update({
          LONGITUDE: longitude,
          LATITUDE: latitude
        })
    }

    try {
      data.map(async item =>
        item.LATITUDE == null || item.LONGITUDE == null || item.LATITUDE == '' || item.LONGITUDE == '' ?
          await http.get(`https://www.cepaberto.com/api/v3/cep?cep=${item.CEP}`, {
            headers: {
              'Authorization': 'Token token=677ae19e734a21bfbffec9bc0ea849a9'
            }
          })
            .then(function (response) {

              console.log(item.CEP, response.data.longitude, response.data.latitude)
              if (response.data.cep) {
                atualizaTabela(item.CEP, response.data.longitude, response.data.latitude)
              }

            })
            .catch(function (err) {
              console.log(err)
            })
          : false
      )

      return response.status(200).send({ mensagem: 'Tabela Atualizada ! ' })

    } catch (err) {
      return response.status(500).send({ Erro: 'Ocorreu um erro para atualizar a tabela ! ' }, err)
    }

  }

}

module.exports = CepController
