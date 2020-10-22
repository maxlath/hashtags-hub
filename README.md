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
