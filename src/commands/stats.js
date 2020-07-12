const axios = require('axios');

function stats(ctx) {
  const q = ctx.message.text.replace('/stats', '').trim();

  axios
    .get(`https://covid-api.com/api/reports?q=${q}`)
    .then(({ data }) => {
      if (!data.data.length) {
        ctx.reply('Check country name');
        return;
      }

      const parsed = data.data.map((infoChunk) => {
        const province = infoChunk.region.province || infoChunk.region.name;
        const {
          date,
          confirmed,
          recovered,
          deaths,
          active,
          last_update,
          recovered_diff,
          active_diff,
          deaths_diff,
        } = infoChunk;
        return `Region or Province: ${province}\n`+
        `Stats for ${date}\n`+
        `Last update: ${last_update}\n\n`+
        `Confirmed: ${confirmed}\n`+
        `Recovered: ${recovered} (+${recovered_diff})\n`+
        `Active: ${active} (+${active_diff})\n`+
        `Deaths: ${deaths} (+${deaths_diff})\n`;
      });
      const provinces = data.data.map(
        (infoChunk) => infoChunk.region.province || infoChunk.region.name
      );

      ctx
        .reply(parsed.join('\n'))
        .catch((err) => ctx.reply(provinces.join('\n')));
    })
    .catch((err) => {
      ctx.reply(err);
    });
}

module.exports = stats;
