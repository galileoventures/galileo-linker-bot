import Router from './router';
import shorten from './src/handlers/shorten';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const r = new Router();
  r.post('/shorten', shorten);

  let response = await r.route(request);

  if (!response) {
    response = new Response('Not found', { status: 404 });
  }

  return response;
}
