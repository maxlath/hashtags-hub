const template = require('../templates/hashtag')

module.exports = (req, res) => {
  // Will be reached when the '#' was url-encoded
  if (req.params.hashtag[0] === '#') {
    res.redirect(`/${req.params.hashtag.substring(1)}`)
  } else {
    res.send(template(req.params.hashtag))
  }
}
