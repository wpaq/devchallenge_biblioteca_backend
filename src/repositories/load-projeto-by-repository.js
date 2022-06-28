const MissingParamError = require('../utils/errors/missing-param-error')

module.exports = class LoadProjetoByRepository {
  constructor (projetoModel) {
    this.projetoModel = projetoModel
  }

  async load (_id) {
    if (!_id) {
      throw new MissingParamError('_id')
    }
    const projeto = await this.projetoModel.findOne({ _id })
    return projeto
  }

  async loadAll () {
    const projetos = await this.projetoModel.find()
    return projetos
  }
}
