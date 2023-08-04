const mix = require('laravel-mix');

mix.setPublicPath('./webroot')
    .js('resources/js/app.js', 'webroot/js').vue({ version: 2})


    mix
    .sass('resources/sass/app.scss', 'webroot/css')
    .version();
