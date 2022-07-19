const { MissingParamError } = require('../../utils/errors')
const HttpResponse = require('../../utils/helpers/http-reponse')

module.exports = class BibliotecaRouter {
  async route (httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.serverError()
      }
      if (!httpRequest.body) {
        return HttpResponse.serverError()
      }

      const { titulo, editora } = httpRequest.body
      if (!titulo) {
        return HttpResponse.badRequest(new MissingParamError('titulo'))
      }

      if (!editora) {
        return HttpResponse.badRequest(new MissingParamError('editora'))
      }

      return HttpResponse.ok()
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
