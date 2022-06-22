module.exports = class LoadProjetoByRepository {
  constructor (projetoModel) {
    this.projetoModel = projetoModel
  }

  async load (_id) {
    const projeto = await this.projetoModel.findOne({ _id })
    return projeto
  }
}
