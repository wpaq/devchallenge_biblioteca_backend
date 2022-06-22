const MongoHelper = require('../utils/helpers/mongo-helper')
const InsertUserRepository = require('../repositories/insert-projeto-repository')
let db

const makeSut = () => {
  const projetoModel = db.collection('projetos')
  const sut = new InsertUserRepository(projetoModel)
  return {
    projetoModel,
    sut
  }
}

describe('InsertProjeto Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.db
  })

  beforeEach(async () => {
    const projetoModel = db.collection('projetos')
    await projetoModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should insert a projeto in collection', async () => {
    const { sut, projetoModel } = makeSut()
    const fakeProjeto = { _id: 'any_id', titulo: 'any_titulo', editora: 'any_editora' }
    await sut.create(fakeProjeto)
    const insertedProjeto = await projetoModel.findOne({ _id: 'any_id' })
    expect(insertedProjeto).toEqual(fakeProjeto)
  })
})
