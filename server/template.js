module.exports = (hashtag, base) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${hashtag}</title>
  <link rel="stylesheet" href="${base}public/style.css">
</head>
<body>
  <h1>#${hashtag}</h1>
  <h2>Social Media</h2>
  <ul>${getLinksList(socialMedia, hashtag)}</ul>
  <h2>Images</h2>
  <ul>${getLinksList(imagePlatforms, hashtag)}</ul>
  <h2>Back to Wikimedia sites</h2>
  <ul>${getLinksList(wikimediaSites, hashtag)}</ul>
</body>
</html>
`

const getLinksList = (list, hashtag) => {
  return list
  .map(getlink(hashtag))
  .join('\n')
}

const getlink = hashtag => platform => {
  const url = platform.formatter.replace('$1', hashtag)
  return `<li>
    <a href="${url}" rel="noopener">
      <span class="code">#${hashtag}</span> on <strong>${platform.name}</strong>
    </a>
  </li>`
}

const socialMedia = [
  { name: 'Mastodon', formatter: 'https://mastodon.social/tags/$1' },
  { name: 'Twitter', formatter: 'https://twitter.com/hashtag/$1' },
  { name: 'Facebook', formatter: 'https://facebook.com/hashtag/$1' },
]

const imagePlatforms = [
  { name: 'Flickr', formatter: 'https://www.flickr.com/photos/tags/$1' },
  { name: 'Gfycat', formatter: 'https://gfycat.com/fr/gifs/tag/$1' }
]

const wikimediaSites = [
  { name: 'Wikidata', formatter: 'https://tools.wmflabs.org/hub/P2572:$1?site=wikidata' },
  { name: 'Wikipedia', formatter: 'https://tools.wmflabs.org/hub/P2572:$1?site=wikipedia' }
]
