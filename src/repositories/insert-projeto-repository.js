// const MissingParamError = require('../utils/errors/missing-param-error')

module.exports = class InsertProjetoRepository {
  constructor (projetoModel) {
    this.projetoModel = projetoModel
  }

  async create (projeto) {
    await this.projetoModel.insertOne(projeto)
  }
}
