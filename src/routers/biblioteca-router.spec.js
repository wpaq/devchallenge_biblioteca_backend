class BibliotecaRouter {
  route (httpRequest) {
    if (!httpRequest.body.title) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Biblioteca Router', () => {
  test('Should return 400 if no title is provided', async () => {
    const sut = new BibliotecaRouter()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
