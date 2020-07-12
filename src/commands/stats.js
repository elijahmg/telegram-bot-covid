const axios = require('axios');

function stats(ctx) {
  const q = ctx.message.text.replace('/stats', '').trim();

  axios
    .get(`https://covid-api.com/api/reports?q=${q}&province=""`)
    .then(({ data }) => {
        if (!data.data.length) {
            ctx.reply('Check country name');
            return;
        }
        
        const parsed = data.data.map((infoChunk) => {
            const province = infoChunk.region.province || infoChunk.region.name;
            const { date, confirmed, recovered, deaths, active, last_update } = infoChunk;
            return `Region or Province: ${province}\t\t Date: ${date}\t
             Confirmed: ${confirmed}\t
             Recovered: ${recovered}\t
             Deaths: ${deaths}\t
             Active: ${active}\n
             Last update: ${last_update}\n
             `
        });
        const provinces = data.data.map((infoChunk) => infoChunk.region.province || infoChunk.region.name);

        ctx.reply(parsed.join('\n')).catch((err) => ctx.reply(provinces.join('\n')));
            
    })
    .catch((err) => {
      ctx.reply(err);
    });
}

module.exports = stats;
