const BibliotecaRouter = require('./biblioteca-router')
const { MissingParamError, ServerError } = require('../../utils/errors')

const makeSut = () => {
  const sut = new BibliotecaRouter()
  return {
    sut
  }
}

describe('Biblioteca Router', () => {
  test('Should return 200 when credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        titulo: 'any_titulo',
        editora: 'any_editora'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Should return 400 if no titulo is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        editora: 'any_editora'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(new MissingParamError('titulo').message)
  })

  test('Should return 400 if no editora is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        titulo: 'any_titulo'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(new MissingParamError('editora').message)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError().message)
  })

  test('Should return 500 if no httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError().message)
  })
})
