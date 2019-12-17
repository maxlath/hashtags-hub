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
  const article = platform.article || 'on'
  return `<li>
    ${getIcon(platform)}
    <a href="${url}" title="#${hashtag} ${article} ${platform.name}" rel="noopener">
      <span class="code">#${hashtag}</span> ${article} <strong>${platform.name}</strong>
    </a>
  </li>`
}

const getIcon = ({ name, icon }) => {
  const filename = icon || `${name.toLowerCase()}_icon.png`
  return `<img src="${base}public/${filename}" alt="${name} icon"/>`
}

const platforms = [
  { name: 'Deviantart', formatter: 'https://www.deviantart.com/search?q=$1' },
  { name: 'Diaspora', formatter: 'https://joindiaspora.com/tags/$1' },
  { name: 'Facebook', formatter: 'https://facebook.com/hashtag/$1' },
  { name: 'Flickr', formatter: 'https://www.flickr.com/photos/tags/$1' },
  { name: 'Gfycat', formatter: 'https://gfycat.com/fr/gifs/tag/$1' },
  { name: 'Github', formatter: 'https://github.com/topics/$1' },
  { name: 'Instagram', formatter: 'https://www.instagram.com/explore/tags/$1' },
  { name: 'Mastodon', formatter: 'https://mastodon.social/tags/$1' },
  { name: 'PeerTube', formatter: 'https://peertube.social/search?tagsOneOf=$1' },
  { name: 'Pixelfed', formatter: 'https://pixelfed.fr/discover/tags/$1' },
  { name: 'Tumblr', formatter: 'https://www.tumblr.com/tagged/$1' },
  { name: 'Twitter', formatter: 'https://twitter.com/hashtag/$1' },
  { name: 'Unsplash', formatter: 'https://unsplash.com/s/photos/$1' },
  { name: 'Youtube', formatter: 'https://www.youtube.com/results?search_query=%23$1' },
]

const wikimediaSites = [
  { name: 'Wikidata', formatter: 'https://tools.wmflabs.org/hub/P2572:$1?site=wikidata' },
  { name: 'Wikipedia', formatter: 'https://tools.wmflabs.org/hub/P2572:$1?site=wikipedia' },
  { name: 'Wikimedia edit summaries', formatter: 'https://hashtags.wmflabs.org/?query=$1', article: 'in', icon: 'wm_summary_icon.png' },
]
