const helmet = require('helmet')

module.exports = function (server) {
  server.use(helmet())
}
