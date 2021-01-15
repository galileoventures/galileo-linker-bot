# Galileo link shortener bot

A Slackbot that lets you shorten links with the [Galileo link shortener](https://github.com/galileoventures/galileo-linker).

This Slackbot takes a command like

`/shorten https://yahoo.com /lol`

And saves the key-value pair into Cloudflare KV storage so that the short link [https://galileo.lol/lol](https://galileo.lol/lol) will then redirect to [https://yahoo.com](https://yahoo.com).

Used and built by the team behind venture capital firm [Galileo Ventures](https://galileo.ventures).

The code is based heavily off the [Cloudflare Worker doc for building a Slackbot](https://developers.cloudflare.com/workers/tutorials/build-a-slackbot) and the [resulting code](https://github.com/signalnerve/workers-slack-bot).

It probably could use a little more security applied (e.g. API tokens) in the future, but given it is create-only I wasn't TOO fussy about the risk that a user could create a shortlink.

## Contributing & License

No idea why you might like to, but you're welcome to PR. Feel free to do with it what you will, with caveat of no warranty ;) .