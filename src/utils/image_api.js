const got = require('got');

const apiKey = 'acc_06b41596f77fb1f';
const apiSecret = '22fcd44d38e31e4ba371c81b5073b02f';

const imageUrl =
  'https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg';
const url =
  'https://api.imagga.com/v2/colors?image_url=' + encodeURIComponent(imageUrl);

(async () => {
  try {
    const response = await got(url, { username: apiKey, password: apiSecret });
    console.log(response.body);
  } catch (error) {
    console.log(error.response.body);
  }
})();
