module.exports = class InsertUserRepository {
  constructor (projetoModel) {
    this.projetoModel = projetoModel
  }

  async create (project) {
    await this.projetoModel.insertOne(project)
  }
}
