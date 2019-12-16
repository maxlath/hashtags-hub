const homeHtmlPath = process.cwd() + '/server/templates/home.html'

module.exports = (req, res) => res.sendFile(homeHtmlPath)
