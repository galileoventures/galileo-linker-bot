# Galileo link shortener bot

A Slackbot that lets you shorten links with the [Galileo link shortener](https://github.com/galileoventures/galileo-linker).

The Slackbot takes a command like

`/shorten https://yahoo.com /lol`

And saves the key-value pair into Cloudflare KV storage so that the short link https://galileo.lol/lol will then redirect to https://yahoo.com.

Used and built by the team behind venture capital firm [Galileo Ventures](https://galileo.ventures).

TODO more docs!
