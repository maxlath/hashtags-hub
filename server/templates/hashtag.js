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
  <main>
    <section>
      <h2>Microblogging</h2>
      <ul>${getLinksList(microbloggingPlatforms, hashtag)}</ul>
    </section>
    <section>
      <h2>Image</h2>
      <ul>${getLinksList(imagePlatforms, hashtag)}</ul>
    </section>
    <section>
      <h2>Video</h2>
      <ul>${getLinksList(videoPlatforms, hashtag)}</ul>
    </section>
    <section>
      <h2>Audio</h2>
      <ul>${getLinksList(audioPlatforms, hashtag)}</ul>
    </section>
    <section>
      <h2>Code</h2>
      <ul>${getLinksList(codePlatforms, hashtag)}</ul>
    </section>
    <section>
      <h2>Wikimedia</h2>
      <ul>${getLinksList(wikimediaSites, hashtag)}</ul>
    </section>
  </main>
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
  return `<li class="platform">
    ${getIcon(platform)}
    <a href="${url}" title="#${hashtag} ${article} ${platform.name}" rel="noopener">
      <span class="code">#${hashtag}</span> ${article} <strong>${platform.name}</strong>
    </a>
    ${getTags(platform)}
  </li>`
}

const getIcon = ({ name, icon }) => {
  const formattedName = name.replace(/\s/g, '_').toLowerCase()
  const filename = icon || `${formattedName}_icon.png`
  return `<img src="${base}public/${filename}" alt="${name} icon"/>`
}

const getTags = ({ tags }) => {
  if (!tags) return ''

  const elements = tags
    .map(tag => `<li class="tag">${tag}</li>`)
    .join('')

  return `<ul class="tags">${elements}</ul>`
}

const microbloggingPlatforms = [
  { name: 'Diaspora', formatter: 'https://joindiaspora.com/tags/$1', tags: [ 'libre' ] },
  { name: 'Facebook', formatter: 'https://facebook.com/hashtag/$1' },
  { name: 'Mastodon', formatter: 'https://mastodon.social/tags/$1', tags: [ 'libre' ] },
  { name: 'Tumblr', formatter: 'https://www.tumblr.com/tagged/$1' },
  { name: 'Twitter', formatter: 'https://twitter.com/hashtag/$1' },
  { name: 'Weibo', formatter: 'https://s.weibo.com/weibo/%23$1%23' },
]

const imagePlatforms = [
  { name: 'DeviantArt', formatter: 'https://www.deviantart.com/tag/$1' },
  { name: 'Flickr', formatter: 'https://www.flickr.com/photos/tags/$1' },
  { name: 'Gfycat', formatter: 'https://gfycat.com/gifs/tag/$1' },
  { name: 'Instagram', formatter: 'https://www.instagram.com/explore/tags/$1' },
  { name: 'Nico Nico Seiga', formatter: 'https://seiga.nicovideo.jp/tag/$1' },
  { name: 'Pinterest', formatter: 'https://www.pinterest.com/search/pins/?q=%23$1' },
  { name: 'Pixiv', formatter: 'https://www.pixiv.net/tags/$1' },
  { name: 'Pixelfed', formatter: 'https://pixelfed.fr/discover/tags/$1', tags: [ 'libre' ] },
  { name: 'Unsplash', formatter: 'https://unsplash.com/s/photos/$1' },
]

const videoPlatforms = [
  { name: 'DTube', formatter: 'https://d.tube/#!/t/$1', tags: [ 'libre' ] },
  { name: 'PeerTube', formatter: 'https://peertube.social/search?tagsOneOf=$1', tags: [ 'libre' ] },
  { name: 'TikTok', formatter: 'https://www.tiktok.com/tag/$1' },
  { name: 'YouTube', formatter: 'https://www.youtube.com/results?search_query=%23$1' },
]

const audioPlatforms = [
  { name: 'SoundCloud', formatter: 'https://soundcloud.com/tags/$1' },
]

const codePlatforms = [
  { name: 'GitHub', formatter: 'https://github.com/topics/$1' },
]

const wikimediaSites = [
  { name: 'Wikidata', formatter: 'https://hub.toolforge.org/P2572:$1?site=wikidata' },
  { name: 'Wikipedia', formatter: 'https://hub.toolforge.org/P2572:$1?site=wikipedia' },
  { name: 'Wikimedia edit summaries', formatter: 'https://hashtags.wmflabs.org/?query=$1', article: 'in', icon: 'wm_summary_icon.png' },
]
