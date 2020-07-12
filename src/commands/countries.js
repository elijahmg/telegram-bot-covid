const { default: Axios } = require('axios');

const axios = require('axios');

function countries(ctx) {
  axios
    .get('https://covid-api.com/api/regions')
    .then(({ data }) => {
      const parsedCountries = data.data
        .map((country) => `${country.name} ISO CODE: ${country.iso}`)
        .sort()
        .join('\n');
      ctx.reply(parsedCountries);
    })
    .catch((err) => {
      ctx.reply(err);
    });
}

module.exports = countries;
