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
      return HttpResponse.badRequest()
    }
    if (!editora) {
      return HttpResponse.badRequest()
    }
  }
}

class HttpResponse {
  static badRequest () {
    return {
      statusCode: 400
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
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
  })

  test('Should return 400 if no editora is provided', async () => {
    const sut = new BibliotecaRouter()
    const httpRequest = {
      body: {
        title: 'any_title'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const sut = new BibliotecaRouter()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httpRequest has no body', async () => {
    const sut = new BibliotecaRouter()
    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
