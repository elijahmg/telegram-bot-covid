function help(ctx) {
  ctx.reply(
    'Available commands\n' +
      '/countries - Get country codes\n' +
      '/stats + contry - Get latest statistics for country'
  );
}


module.exports = help;