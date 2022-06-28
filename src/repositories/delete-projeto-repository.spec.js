const MongoHelper = require('../utils/helpers/mongo-helper')
// const MissingParamError = require('../utils/errors/missing-param-error')
let db

class DeleteProjetoRepository {
  constructor (projetoModel) {
    this.projetoModel = projetoModel
  }

  async delete (projetoId) {
    await this.projetoModel.deleteOne({ _id: projetoId })
  }
}

const makeSut = () => {
  const projetoModel = db.collection('projetos')
  const sut = new DeleteProjetoRepository(projetoModel)

  return {
    sut,
    projetoModel
  }
}

describe('UpdateProjeto Repository', () => {
  let fakeProjetoId
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.db
  })

  beforeEach(async () => {
    const projetoModel = db.collection('projetos')
    await db.collection('projetos').deleteMany()
    const fakeProjeto = await projetoModel.insertOne({
      _id: 'valid_id',
      titulo: 'any_titulo',
      editora: 'any_editora'
    })
    fakeProjetoId = fakeProjeto.insertedId
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should delete the projeto', async () => {
    const { sut, projetoModel } = makeSut()
    await sut.delete(fakeProjetoId)
    const deletedProjeto = await projetoModel.findOne({ _id: fakeProjetoId })
    expect(deletedProjeto).toBeNull()
  })
})
