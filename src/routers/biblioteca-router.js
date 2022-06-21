const HttpResponse = require('../utils/helpers/http-reponse')

module.exports = class BibliotecaRouter {
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
