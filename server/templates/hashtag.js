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
      <h2>Miscellaneous</h2>
      <ul>${getLinksList(miscellaneous, hashtag)}</ul>
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
  let urlHashtag = hashtag
  if (platform.separator) {
    urlHashtag = urlHashtag.replace(/[\s-]/g, platform.separator)
  }
  if (platform.formatters) {
    for (const formatterName of platform.formatters) {
      const formatterFn = formatters[formatterName]
      urlHashtag = formatterFn(urlHashtag)
    }
  }
  const url = platform.pattern.replace('$1', urlHashtag)
  const article = platform.article || 'on'
  return `<li class="platform">
    ${getIcon(platform)}
    <a href="${url}" title="#${hashtag} ${article} ${platform.name}" rel="noopener">
      <span class="code">#${hashtag}</span> ${article} <strong>${platform.name}</strong>
    </a>
    ${getTags(platform)}
  </li>`
}

const formatters = {
  lowercase: str => str.toLowerCase()
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
  { name: 'Diaspora', pattern: 'https://joindiaspora.com/tags/$1', tags: [ 'libre' ] },
  { name: 'Facebook', pattern: 'https://facebook.com/hashtag/$1' },
  { name: 'Fediverse', pattern: 'https://fediverse.info/explore/topics/$1', tags: [ 'libre' ], hasIcon: false },
  { name: 'LinkedIn', pattern: 'https://www.linkedin.com/feed/hashtag/?keywords=$1' },
  { name: 'LiveJournal', pattern: 'https://www.livejournal.com/rsearch?tags=$1&searchArea=post' },
  { name: 'Mastodon', pattern: 'https://wikis.world/tags/$1', tags: [ 'libre' ] },
  { name: 'Medium', pattern: 'https://medium.com/tag/$1' },
  { name: 'Reddit', pattern: 'https://www.reddit.com/t/$1/' },
  { name: 'Tumblr', pattern: 'https://www.tumblr.com/tagged/$1' },
  { name: 'Twitter', pattern: 'https://twitter.com/hashtag/$1' },
  { name: 'Weibo', pattern: 'https://s.weibo.com/weibo/%23$1%23' },
]

const imagePlatforms = [
  { name: 'DeviantArt', pattern: 'https://www.deviantart.com/tag/$1' },
  { name: 'Flickr', pattern: 'https://www.flickr.com/photos/tags/$1' },
  { name: 'Gfycat', pattern: 'https://gfycat.com/gifs/tag/$1' },
  { name: 'Instagram', pattern: 'https://www.instagram.com/explore/tags/$1', formatters: [ 'lowercase' ] },
  { name: 'Imgur', pattern: 'https://imgur.com/t/$1' },
  { name: 'Nico Nico Seiga', pattern: 'https://seiga.nicovideo.jp/tag/$1' },
  { name: 'Pinterest', pattern: 'https://www.pinterest.com/search/pins/?q=%23$1' },
  { name: 'Pixiv', pattern: 'https://www.pixiv.net/tags/$1' },
  { name: 'Pixelfed', pattern: 'https://pixelfed.fr/discover/tags/$1', tags: [ 'libre' ] },
  { name: 'Unsplash', pattern: 'https://unsplash.com/s/photos/$1' },
]

const videoPlatforms = [
  { name: 'DTube', pattern: 'https://d.tube/#!/t/$1', tags: [ 'libre' ] },
  { name: 'Internet Archive', pattern: 'https://archive.org/search.php?query=subject%3A%22$1%22' },
  { name: 'Newgrounds', pattern: 'https://www.newgrounds.com/search/summary?match=tags&tags=$1' },
  { name: 'PeerTube', pattern: 'https://sepiasearch.org/search?tagsOneOf=$1', tags: [ 'libre' ] },
  { name: 'TikTok', pattern: 'https://www.tiktok.com/tag/$1' },
  { name: 'Twitch', pattern: 'https://www.twitch.tv/directory/all/tags/$1' },
  { name: 'YouTube', pattern: 'https://www.youtube.com/hashtag/$1' },
]

const audioPlatforms = [
  { name: 'Bandcamp', pattern: 'https://bandcamp.com/tag/$1' },
  { name: 'Mixcloud', pattern: 'https://www.mixcloud.com/discover/$1/' },
  { name: 'SoundCloud', pattern: 'https://soundcloud.com/tags/$1' },
]

const codePlatforms = [
  { name: 'GitHub', pattern: 'https://github.com/topics/$1' },
  { name: 'GitLab', pattern: 'https://gitlab.com/explore/projects/topics/$1', tags: [ 'libre' ] },
  { name: 'StackOverflow', pattern: 'https://stackoverflow.com/questions/tagged/$1' },
]

const wikimediaSites = [
  { name: 'Wikidata', pattern: 'https://hub.toolforge.org/P2572:$1?site=wikidata', tags: ['libre' ] },
  { name: 'Wikipedia', pattern: 'https://hub.toolforge.org/P2572:$1?site=wikipedia', tags: ['libre' ] },
  { name: 'Wikimedia edit summaries', pattern: 'https://hashtags.wmflabs.org/?query=$1', article: 'in', icon: 'wm_summary_icon.png', tags: ['libre' ] },
]

const miscellaneous = [
  { name: 'Know Your Meme', pattern: 'https://knowyourmeme.com/search?q=tags%3A%28%22$1%22%29', separator: '+' },
]
