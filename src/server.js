const axios = require('axios');
const { Telegraf } = require('telegraf');

const help = require('./commands/help');
const countries = require('./commands/countries');
const stats = require('./commands/stats');

const botName = '@CovidDataEliIFBot';
const token = '1136866136:AAFRWC3anTidMycAwolwX6K16nIcOX_DliA';
const bot = new Telegraf(token);

bot.command('hello', (ctx) => {
    console.log(ctx.message);
    
  axios
    .get(
      'https://api.covid19api.com/live/country/south-africa/status/confirmed'
    )
    .then(({ data }) => {
      const { Country, Confirmed, Recovered, Deaths } = data[data.length - 1];

      ctx.reply(`${Country}:\n \tConfirmed: <i>${Confirmed}</i>\n \tRecovered: ${Recovered}\n \tDeaths: ${Deaths}`, {
          parse_mode: 'HTML',
      });
    });
});

bot.help(help);
bot.command('countries', countries);
bot.command('stats', stats);
// bot.command('stats', (ctx) => {
//   console.log(ctx.message.text);
  
// });



bot.launch();
