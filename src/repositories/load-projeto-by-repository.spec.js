const MongoHelper = require('../utils/helpers/mongo-helper')
const LoadProjetoByRepository = require('./load-projeto-by-repository')
const MissingParamError = require('../utils/errors/missing-param-error')
let db

const makeSut = () => {
  const projetoModel = db.collection('projetos')
  const sut = new LoadProjetoByRepository(projetoModel)
  return {
    projetoModel,
    sut
  }
}

describe('LoadProjetoByRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('projetos').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no projeto is found', async () => {
    const { sut } = makeSut()
    const projeto = await sut.load('invalid_id')
    expect(projeto).toBeNull()
  })

  test('Should return an projeto if project is found', async () => {
    const { sut, projetoModel } = makeSut()
    const fakeProjeto = await projetoModel.insertOne({
      _id: 'valid_id',
      titulo: 'any_titulo',
      editora: 'any_editora'
    })
    const projeto = await sut.load('valid_id')
    expect(projeto._id).toEqual(fakeProjeto.insertedId)
  })

  test('Should return all projetos', async () => {
    const { sut, projetoModel } = makeSut()
    const fakeProjetos = await projetoModel.insertMany([
      {
        _id: 'any_id_01',
        titulo: 'any_titulo_01',
        editora: 'any_editora_01'
      },
      {
        _id: 'any_id_02',
        titulo: 'any_titulo_02',
        editora: 'any_editora_02'
      }
    ])
    const projetos = await sut.loadAll()
    expect(projetos._id).toEqual(fakeProjetos.insertedId)
  })

  test('Should throw if no projetoModel is provided', async () => {
    const sut = new LoadProjetoByRepository()
    const promise = sut.load('valid_id')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no _id is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('_id'))
  })
})
