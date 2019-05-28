const mix = require('laravel-mix');
const path = require('path');

var assetPath = './public/themes/Admin/assets/';

mix.webpackConfig({
  resolve: {
    alias: {
      'jquery-ui/sortable': 'jquery-ui/ui/widgets/sortable',
    }
  }
});

//Javascript
mix.js(assetPath + 'js/app.js', assetPath + 'Admin.js').sourceMaps();

//Css
mix.sass(assetPath + 'css/master.scss', assetPath + 'Admin.css');