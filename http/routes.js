import UrlController from './controllers/UrlController'

module.exports = (router) => {
  router.post('/url', UrlController.create)
  router.get('/:path', UrlController.goTo)

}
