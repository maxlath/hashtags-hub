const template = require('./template')

module.exports = (req, res) => {
  res.send(template(req.params.hashtag))
}
