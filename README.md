# [hashtags-hub](https://hashtags-hub.toolforge.org)

A web service to get links to hashtag pages on different web platforms. The main purpose of this tool is to be used on Wikidata as the ['formatter URL' (P1630)](https://www.wikidata.org/wiki/Property:P1630) value of ['hashtag' (P2572)](https://www.wikidata.org/wiki/Property:P2572), without having to systematically link to a unique centralized platform, hashtags being, most of the time, not bound to a single platform.

## Install

### Development
```sh
git clone https://github.com/maxlath/hashtags-hub
cd hashtags-hub
npm install
npm run watch
```

### Deploy on Toolforge

```sh
mkdir -p ~/www
cd ~/www
git clone https://github.com/maxlath/hashtags-hub js
cd js

# See https://wikitech.wikimedia.org/wiki/Help:Toolforge/Web#node.js_web_services
webservice --backend=kubernetes node10 shell
cd ~/www/js
npm install --production
# exit node10 shell
exit

webservice --backend=kubernetes node10 start

# get the logs
kubectl logs -f $(kubectl get pods | grep hashtags-hub | grep Running | awk '{print $1}')
```

*see also [`Hub` setup instructions](https://github.com/maxlath/hub/blob/master/docs/deploy.md)*

## Development

### Add a plaform
To add a new platform, 2 things are required:

* [add an icon](#add-an-icon)
* [add a URL formatter](#add-a-url-formatter)

You should then ready to commit those changes, asset files included, push your commit to your fork and start a Pull Request.

### Add an icon

1. Add a square icon to the `assets` directory:
    * resolution must be `>= 32x32` (ideally `>= 64x64` so that we have the possibility to change the icon resolution in the future)
    * the icon filename must be on the pattern `{platform name}_icon.png`, all lowercased
2. Run the script `npm run update-icons` to generate the `32x32` version in the `public` folder

### Add a URL formatter

1. Add a `{ name, formatter }` object to one of the lists in `./server/templates/hashtag.js`
    * The `name` should match the platform name used for the icon, given that the icon url is generated from `name` lowercased and with spaces replaced by `_`
2. Check that it works as expected:
    1. Start the server: `npm run start`
    2. Open the page in your browser, by default http://localhost:4274
