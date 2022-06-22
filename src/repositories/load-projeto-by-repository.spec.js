const MongoHelper = require('../utils/helpers/mongo-helper')
let db

class LoadProjetoByRepository {
  async load () {
    return null
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
    const projetoModel = db.collection('projetos')
    const sut = new LoadProjetoByRepository(projetoModel)
    const projeto = await sut.load('invalid_id')
    expect(projeto).toBeNull()
  })
})
