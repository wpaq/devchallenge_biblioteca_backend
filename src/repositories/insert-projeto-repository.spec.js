const MongoHelper = require('../utils/helpers/mongo-helper')
const InsertProjetoRepository = require('../repositories/insert-projeto-repository')
const MissingParamError = require('../utils/errors/missing-param-error')
let db

const makeSut = () => {
  const projetoModel = db.collection('projetos')
  const sut = new InsertProjetoRepository(projetoModel)
  return {
    projetoModel,
    sut
  }
}

describe('InsertProjeto Repository', () => {
  const fakeProjeto = {
    _id: 'any_id',
    titulo: 'any_titulo',
    editora: 'any_editora'
  }

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

  test('Should insert a projeto in collection', async () => {
    const { sut, projetoModel } = makeSut()
    await sut.create(fakeProjeto)
    const insertedProjeto = await projetoModel.findOne({ _id: 'any_id' })
    expect(insertedProjeto).toEqual(fakeProjeto)
  })

  test('Should throw if no projetoModel is provided', async () => {
    const sut = new InsertProjetoRepository()
    const promise = sut.create(fakeProjeto)
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no params are provided', async () => {
    const { sut } = makeSut()
    expect(sut.create({ editora: 'any_editora' })).rejects.toThrow(new MissingParamError('titulo'))
    expect(sut.create({ titulo: 'any_titulo' })).rejects.toThrow(new MissingParamError('editora'))
  })
})
