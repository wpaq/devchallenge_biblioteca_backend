const MissingParamError = require('../utils/errors/missing-param-error')

module.exports = class DeleteProjetoRepository {
  constructor (projetoModel) {
    this.projetoModel = projetoModel
  }

  async delete (projetoId) {
    if (!projetoId) {
      throw new MissingParamError('projetoId')
    }
    await this.projetoModel.deleteOne({ _id: projetoId })
  }
}
