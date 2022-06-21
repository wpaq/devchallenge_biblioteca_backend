class BibliotecaRouter {
  route (httpRequest) {
    if (!httpRequest) {
      return {
        statusCode: 500
      }
    }

    if (!httpRequest.body) {
      return {
        statusCode: 500
      }
    }

    if (!httpRequest.body.titulo) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Biblioteca Router', () => {
  test('Should return 400 if no titulo is provided', async () => {
    const sut = new BibliotecaRouter()
    const httpRequest = {
      body: {}
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
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })
})
