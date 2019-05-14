const mix = require("laravel-mix");
const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [new Dotenv()]
};
mix
  .js("resources/js/app.js", "public/js")
  .sass("resources/sass/app.scss", "public/css");

mix.browserSync({
  proxy: "localhost:8080/vanila-spa/public"
});
