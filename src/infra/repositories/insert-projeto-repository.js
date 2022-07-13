const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class InsertProjetoRepository {
  constructor (projetoModel) {
    this.projetoModel = projetoModel
  }

  async create (projeto) {
    const { titulo, editora } = projeto
    if (!titulo) {
      throw new MissingParamError('titulo')
    }
    if (!editora) {
      throw new MissingParamError('editora')
    }
    await this.projetoModel.insertOne(projeto)
  }
}
