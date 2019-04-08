const mix = require('laravel-mix');
const path = require('path');

var assetPath = './public/themes/Admin/assets/';

//Javascript
mix.js(assetPath + 'js/app.js', assetPath + 'Admin.js').sourceMaps();

//Css
mix.sass(assetPath + 'css/master.scss', assetPath + 'Admin.css');