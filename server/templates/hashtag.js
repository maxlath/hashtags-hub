module.exports = hashtag => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${hashtag} - hashtag hub</title>
  <link rel="stylesheet" href="/public/style.css">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
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

const getIcon = ({ name, icon, hasIcon = true }) => {
  if (hasIcon) {
    const formattedName = name.replace(/\s/g, '_').toLowerCase()
    const filename = icon || `${formattedName}_icon.png`
    return `<img src="/public/${filename}" alt="${name} icon"/>`
  } else {
    return '<div class="no-icon"></div>'
  }
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
  { name: 'Fediverse', formatter: 'https://fediverse.info/explore/topics/$1', tags: [ 'libre' ], hasIcon: false },
  { name: 'Gettr', formatter: 'https://gettr.com/hashtag/%23$1' },
  { name: 'LinkedIn', formatter: 'https://www.linkedin.com/feed/hashtag/?keywords=$1' },
  { name: 'LiveJournal', formatter: 'https://www.livejournal.com/rsearch?tags=$1&searchArea=post' },
  { name: 'Mastodon', formatter: 'https://wikis.world/tags/$1', tags: [ 'libre' ] },
  { name: 'Medium', formatter: 'https://medium.com/tag/$1' },
  { name: 'Reddit', formatter: 'https://www.reddit.com/t/$1/' },
  { name: 'Tumblr', formatter: 'https://www.tumblr.com/tagged/$1' },
  { name: 'Twitter', formatter: 'https://twitter.com/hashtag/$1' },
  { name: 'Weibo', formatter: 'https://s.weibo.com/weibo/%23$1%23' },
]

const imagePlatforms = [
  { name: 'DeviantArt', formatter: 'https://www.deviantart.com/tag/$1' },
  { name: 'Flickr', formatter: 'https://www.flickr.com/photos/tags/$1' },
  { name: 'Gfycat', formatter: 'https://gfycat.com/gifs/tag/$1' },
  { name: 'Instagram', formatter: 'https://www.instagram.com/explore/tags/$1' },
  { name: 'Imgur', formatter: 'https://imgur.com/t/$1' },
  { name: 'Nico Nico Seiga', formatter: 'https://seiga.nicovideo.jp/tag/$1' },
  { name: 'Pinterest', formatter: 'https://www.pinterest.com/search/pins/?q=%23$1' },
  { name: 'Pixiv', formatter: 'https://www.pixiv.net/tags/$1' },
  { name: 'Pixelfed', formatter: 'https://pixelfed.fr/discover/tags/$1', tags: [ 'libre' ] },
  { name: 'Unsplash', formatter: 'https://unsplash.com/s/photos/$1' },
]

const videoPlatforms = [
  { name: 'DTube', formatter: 'https://d.tube/#!/t/$1', tags: [ 'libre' ] },
  { name: 'PeerTube', formatter: 'https://sepiasearch.org/search?tagsOneOf=$1', tags: [ 'libre' ] },
  { name: 'TikTok', formatter: 'https://www.tiktok.com/tag/$1' },
  { name: 'Twitch', formatter: 'https://www.twitch.tv/directory/all/tags/$1' },
  { name: 'YouTube', formatter: 'https://www.youtube.com/hashtag/$1' },
]

const audioPlatforms = [
  { name: 'SoundCloud', formatter: 'https://soundcloud.com/tags/$1' },
]

const codePlatforms = [
  { name: 'GitHub', formatter: 'https://github.com/topics/$1' },
  { name: 'GitLab', formatter: 'https://gitlab.com/explore/projects/topics/$1', tags: [ 'libre' ] },
]

const wikimediaSites = [
  { name: 'Wikidata', formatter: 'https://hub.toolforge.org/P2572:$1?site=wikidata' },
  { name: 'Wikipedia', formatter: 'https://hub.toolforge.org/P2572:$1?site=wikipedia' },
  { name: 'Wikimedia edit summaries', formatter: 'https://hashtags.wmflabs.org/?query=$1', article: 'in', icon: 'wm_summary_icon.png' },
]
