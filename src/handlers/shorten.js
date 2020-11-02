import qs from 'qs';
import { constructSlackMessage } from '../utils/slack';

async function generate_rand(i) {
  // recursively fetch randon values incase there is a collision

  if (typeof i === 'undefined') {
    i = 0;
  }

  if (i >= 5) {
    throw new Error('Limiting random key checks to 5');
  }

  try {
    var rand_response = await fetch(
      new Request('https://csprng.xyz/v1/api?length=6'),
    );
    var rand = await rand_response.json();
    var random_data = rand.Data;
    var exists = await WORKERS_KV_LINKS.get(random_data);
    if (exists) {
      throw new Error('Collision!');
    } else {
      return random_data;
    }
  } catch (e) {
    i++;
    return await generate_rand(i);
  }
}

export default async request => {
  try {
    const body = await request.text();
    const params = qs.parse(body);
    const text = params.text;
    let [destination, slug] = text.split(' ');
    if (!destination) {
      throw new Error(
        `You must include a destination URL. You provided \`${text}\`.`,
      );
    }
    if (!slug) {
      slug = await generate_rand();
    } else {
      // remove the slash or any other non-alphanumeric chars if it has any
      slug = slug.replace(/\W/g, '');
    }

    const blocks = constructSlackMessage(destination, slug, 'Great!');

    // Check if this slug already exists - if so throw an error
    var url = await WORKERS_KV_LINKS.get(slug);
    if (url) {
      throw new Error(
        `The slug \`/${slug}\` already exists and redirects to ${url}. Please try again.`,
      );
    }

    // Save the slug and destination in KV storage
    var y = await WORKERS_KV_LINKS.put(slug, destination.toString());

    return new Response(
      JSON.stringify({
        blocks,
        response_type: 'in_channel',
      }),
      { headers: { 'Content-type': 'application/json' } },
    );
  } catch (err) {
    const errorText = "Uh-oh! I couldn't shorten that link. " + err;
    return new Response(errorText);
  }
};
