const maxAgeSixMonths = `max-age=${365*0.5*24*60*60}`
const { publicFileRoot } = require('config')

module.exports = (req, res) => {
  res.header('Cache-Control', maxAgeSixMonths)
  res.sendFile(`${publicFileRoot}favicon.ico`)
}
