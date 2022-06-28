const MongoHelper = require('../utils/helpers/mongo-helper')
const UpdateProjetoRepository = require('./update-projeto-repository')
const MissingParamError = require('../utils/errors/missing-param-error')
let db

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
    const fakeProjetoData = {
      titulo: 'any_titulo',
      editora: 'any_editora'
    }
    await sut.update(fakeProjetoId, fakeProjetoData)
    const updatedFakeProjeto = await projetoModel.findOne({ _id: fakeProjetoId })
    expect(updatedFakeProjeto._id).toBe('valid_id')
  })

  test('Should throw if no projetoModel is provided', async () => {
    const sut = new UpdateProjetoRepository()
    const promise = sut.update('valid_id')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no params is provided', async () => {
    const { sut } = makeSut()
    expect(sut.update()).rejects.toThrow(new MissingParamError('projetoId'))
    expect(sut.update('valid_id')).rejects.toThrow(new MissingParamError('data'))
  })
})
