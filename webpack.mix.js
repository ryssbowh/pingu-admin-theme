const mix = require('laravel-mix');
const path = require('path');

var assetPath = './Themes/Admin/assets/';
var publicPath = 'theme-assets/';

mix.webpackConfig({
	resolve:{
		alias:{
			'jquery-ui/sortable': 'jquery-ui/ui/widgets/sortable',
            'ObjectMapping': path.resolve(assetPath + '/js/components', './ObjectMapping'),
            'Admin': path.resolve(assetPath + '/js/components', './Admin'),
            'Modal': path.resolve(assetPath + '/js/components', './AdminModal')
		}
	}
});

mix.autoload({
    'jquery': ['$', 'jQuery'],
    'moment' : ['moment']
});

//Javascript
mix.js(assetPath + 'js/app.js', publicPath + 'Admin.js').sourceMaps();

//Css
mix.sass(assetPath + 'css/master.scss', publicPath + 'Admin.css');