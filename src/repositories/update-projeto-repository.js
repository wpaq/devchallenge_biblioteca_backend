const MissingParamError = require('../utils/errors/missing-param-error')

module.exports = class UpdateProjetoRepository {
  constructor (projetoModel) {
    this.projetoModel = projetoModel
  }

  async update (projetoId, data) {
    if (!projetoId) {
      throw new MissingParamError('projetoId')
    }
    if (!data) {
      throw new MissingParamError('data')
    }
    await this.projetoModel.updateOne({
      _id: projetoId
    }, {
      $set: {
        data
      }
    })
  }
}
