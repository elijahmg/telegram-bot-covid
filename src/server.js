const axios = require('axios');
const { Telegraf } = require('telegraf');

const help = require('./commands/help');
const countries = require('./commands/countries');
const stats = require('./commands/stats');

const botName = '@CovidDataEliIFBot';
const token = '1136866136:AAFRWC3anTidMycAwolwX6K16nIcOX_DliA';
const bot = new Telegraf(token);

bot.help(help);
bot.command('countries', countries);
bot.command('stats', stats);

bot.launch();
