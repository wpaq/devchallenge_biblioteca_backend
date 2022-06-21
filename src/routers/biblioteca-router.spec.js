class BibliotecaRouter {
  route (httpRequest) {
    if (!httpRequest) {
      return HttpResponse.serverError()
    }

    if (!httpRequest.body) {
      return HttpResponse.serverError()
    }

    const { titulo, editora } = httpRequest.body
    if (!titulo) {
      return HttpResponse.badRequest('titulo')
    }
    if (!editora) {
      return HttpResponse.badRequest('editora')
    }
  }
}

class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }
}

class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

class ServerError extends Error {
  constructor () {
    super('Internal error')
    this.name = 'ServerError'
  }
}

describe('Biblioteca Router', () => {
  test('Should return 400 if no titulo is provided', async () => {
    const sut = new BibliotecaRouter()
    const httpRequest = {
      body: {
        editora: 'any_editora'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('titulo'))
  })

  test('Should return 400 if no editora is provided', async () => {
    const sut = new BibliotecaRouter()
    const httpRequest = {
      body: {
        titulo: 'any_title'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('editora'))
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const sut = new BibliotecaRouter()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no httpRequest has no body', async () => {
    const sut = new BibliotecaRouter()
    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
