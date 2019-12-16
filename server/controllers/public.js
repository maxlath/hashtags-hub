const { publicFileRoot } = require('config')
const express = require('express')
const maxAgeOneDay = `max-age=${24*60*60}`

const setHeaders = (res, path, stat) => {
  const extension = path.split('.').slice(-1)[0]
  if (extension === 'css') res.header('Cache-Control', maxAgeOneDay)
  else if (extension === 'png') res.header('Cache-Control', 'immutable')
}

module.exports = express.static(publicFileRoot, { setHeaders })
