const MissingParamError = require('../utils/errors/missing-param-error')

module.exports = class InsertProjetoRepository {
  constructor (projetoModel) {
    this.projetoModel = projetoModel
  }

  async create (projeto) {
    if (!projeto) {
      throw new MissingParamError('projeto')
    }
    if (!projeto.titulo) {
      throw new MissingParamError('titulo')
    }
    if (!projeto.editora) {
      throw new MissingParamError('editora')
    }
    await this.projetoModel.insertOne(projeto)
  }
}
