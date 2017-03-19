// Import utilities
import SendError from '../util/SendError'

module.exports = (app) => {
  /**
   * The default middleware. Handles all unhandled exceptions
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type')

    try {
      await next()
    } catch (err) {
      console.log(err)
      SendError(ctx, 400, 'There was an error with your request', err.message)
    }
  })
}
