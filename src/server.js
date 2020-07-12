const axios = require('axios');
const { Telegraf } = require('telegraf');

const help = require('./commands/help');
const countries = require('./commands/countries');
const stats = require('./commands/stats');
const dotenv = require('dotenv');

dotenv.config();

const token = process.env.TOKEN;

const bot = new Telegraf(token);

bot.help(help);
bot.command('countries', countries);
bot.command('stats', stats);

bot.launch();
