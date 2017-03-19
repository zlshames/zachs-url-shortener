// Import utilities
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'
import SendError from '../util/SendError'

// Import node modules
import randomstring from 'randomstring'

// Import database
import db from '../config/Knex'

export default class UrlController {
  /**
   * Method for creating a new url
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async create(ctx, next) {
    const urlInfo = ctx.request.body

    if (!urlInfo.url) {
      return SendError(ctx, 400, 'Please provide a URL!')
    }

    // Get rid of the http:// for storage purposes
    if (urlInfo.url.indexOf('http://') > -1) {
      urlInfo.url = urlInfo.url.replace('http://', '')
    }

    // Generate random string if no path provided
    if (!urlInfo.path) {
      urlInfo.path = randomstring.generate(10)
    }

    // Check if URL has already been shortened
    const urlExists = await db('urls').where('url', urlInfo.url).first()
    if (urlExists) {
      ctx.body = JRes.success('This URL has already been shorteded!', {
        url: 'http://' + ctx.host + '/' + urlExists.path
      })

      return
    }

    // Check if path exists already
    const pathExists = await db('urls').where('path', urlInfo.path).first()
    if (pathExists) {
      return SendError(ctx, 400, 'Custom path already taken!')
    }

    // Insert URL
    const url = await db('urls').insert(urlInfo)
    if (!url) {
      return SendError(ctx, 400, 'Failed to shorten URL!', url)
    }

    // Send response
    ctx.body = JRes.success('Successfully shortened URL!', {
      url: 'http://' + ctx.host + '/' + urlInfo.path
    })
  }

  /**
   * Method for redirecting to url
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async goTo(ctx, next) {
    const path = ctx.params.path
    let url = null

    try {
      url = await db('urls').where('path', path).first()
    } catch (err) {
      return SendError(ctx, 400, 'This shortened URL does not exist!')
    }

    ctx.redirect(`http://${ url.url }`)
  }
}
