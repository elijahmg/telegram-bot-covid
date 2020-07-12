

const startBot = () => {
    console.log('bot is started');
    
  const bot = new Telegraf(token);
  bot.command('hello', (ctx) => {
    ctx.reply('Hello');
  });

  bot.launch();
};

module.exports.startBot = startBot; 
