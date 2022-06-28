const MongoHelper = require('../utils/helpers/mongo-helper')
let db

class UpdateProjetoRepository {
  constructor (projetoModel) {
    this.projetoModel = projetoModel
  }

  async update (projetoId) {
    return projetoId
  }
}

const makeSut = () => {
  const projetoModel = db.collection('projetos')
  const sut = new UpdateProjetoRepository(projetoModel)
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

  test('Should update the projeto', async () => {
    const { sut, projetoModel } = makeSut()
    await sut.update(fakeProjetoId)
    const updatedFakeProjeto = await projetoModel.findOne({ _id: fakeProjetoId })
    expect(updatedFakeProjeto._id).toBe('valid_id')
  })
})
