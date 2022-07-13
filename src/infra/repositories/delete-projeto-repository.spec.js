const MongoHelper = require('../helpers/mongo-helper')
const DeleteProjetoRepository = require('./delete-projeto-repository')
const MissingParamError = require('../../utils/errors/missing-param-error')
let db

const makeSut = () => {
  const projetoModel = db.collection('projetos')
  const sut = new DeleteProjetoRepository(projetoModel)
  return {
    sut,
    projetoModel
  }
}

describe('DeleteProjeto Repository', () => {
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

  test('Should throw is projetoModel is not provided', async () => {
    const sut = new DeleteProjetoRepository()
    const promise = sut.delete(fakeProjetoId)
    expect(promise).rejects.toThrow()
  })

  test('Should throw if projetoId is not provided', async () => {
    const { sut } = makeSut()
    expect(sut.delete()).rejects.toThrow(new MissingParamError('projetoId'))
  })
})
