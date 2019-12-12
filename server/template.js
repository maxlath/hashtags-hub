module.exports = hashtag => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>#${hashtag}</title>
  <style type="text/css">
    body{
      font-family: sans-serif;
    }
    .code{
      font-family: monospace;
      font-size: 1.2em;
    }
    a{
      color: #222;
      font-size: 1.5em;
    }
    li{
      margin: 1em;
    }
  </style>
</head>
<body>
  <h1>#${hashtag}</h1>
  <ul>${getLinksList(hashtag)}</ul>
</body>
</html>
`

const getLinksList = hashtag => {
  return platforms
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

const platforms = [
  { name: 'Mastodon', formatter: 'https://mastodon.social/tags/$1' },
  { name: 'Twitter', formatter: 'https://twitter.com/hashtag/$1' },
  { name: 'Facebook', formatter: 'https://facebook.com/hashtag/$1' },
  { name: 'Flickr', formatter: 'https://www.flickr.com/photos/tags/$1' }
]
