const { base } = require('config')

module.exports = hashtag => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${hashtag}</title>
  <link rel="stylesheet" href="${base}public/style.css">
  <link rel="shortcut icon" href="${base}favicon.ico" type="image/x-icon"/>
</head>
<body>
  <h1>#${hashtag}</h1>
  <ul>${getLinksList(platforms, hashtag)}</ul>
  <h2>Back to Wikimedia sites</h2>
  <ul>${getLinksList(wikimediaSites, hashtag)}</ul>
</body>
</html>`

const getLinksList = (list, hashtag) => {
  return list
  .map(getlink(hashtag))
  .join('\n')
}

const getlink = hashtag => platform => {
  const url = platform.formatter.replace('$1', hashtag)
  return `<li>
    ${getIcon(platform)}
    <a href="${url}" title="#${hashtag} on ${platform.name}" rel="noopener">
      <span class="code">#${hashtag}</span> on <strong>${platform.name}</strong>
    </a>
  </li>`
}

const getIcon = ({ name }) => `<img src="${base}public/${name.toLowerCase()}_icon.png" alt="${name} icon"/>`

const platforms = [
  { name: 'Deviantart', formatter: 'https://www.deviantart.com/search?q=$1' },
  { name: 'Facebook', formatter: 'https://facebook.com/hashtag/$1' },
  { name: 'Flickr', formatter: 'https://www.flickr.com/photos/tags/$1' },
  { name: 'Gfycat', formatter: 'https://gfycat.com/fr/gifs/tag/$1' },
  { name: 'Instagram', formatter: 'https://www.instagram.com/explore/tags/$1' },
  { name: 'Mastodon', formatter: 'https://mastodon.social/tags/$1' },
  { name: 'Tumblr', formatter: 'https://www.tumblr.com/tagged/$1' },
  { name: 'Twitter', formatter: 'https://twitter.com/hashtag/$1' },
]

const wikimediaSites = [
  { name: 'Wikidata', formatter: 'https://tools.wmflabs.org/hub/P2572:$1?site=wikidata' },
  { name: 'Wikipedia', formatter: 'https://tools.wmflabs.org/hub/P2572:$1?site=wikipedia' }
]
