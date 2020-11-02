const compact = array => array.filter(el => el);

export const constructSlackMessage = (destination, slug, prefix_text) => {
  const text_lines = [
    prefix_text,
    `\`/${slug}\``,
    'Now redirects to ' + destination,
    '*Test it*: https://galileo.lol/' + slug,
  ];

  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: compact(text_lines).join('\n'),
      },
    },
  ];
};
