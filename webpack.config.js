let Encore = require('@symfony/webpack-encore')

Encore
    .disableSingleRuntimeChunk()
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())
    .addEntry('js/inicio', './assets/js/inicio.jsx')
    .addEntry('js/app', './assets/js/app.jsx')
    .addEntry('js/bootstrap.min', './assets/js/bootstrap.min.jsx')
    // .addEntry('js/canvasjs.min', './assets/js/canvasjs.min.jsx')
    // .addEntry('js/canvasjs.react', './assets/js/canvasjs.react.jsx')
    .addStyleEntry('css/comun', './assets/css/comun.scss')
    .addStyleEntry('css/inicio', './assets/css/inicio.scss')
    .addStyleEntry('css/app', './assets/css/app.scss')
    .addStyleEntry('css/font-awesome', './assets/css/font-awesome/scss/font-awesome.scss')

    // uncomment if you use Sass/SCSS files
    .enableSassLoader(function (sassOptions) {}, {
        resolveUrlLoader: false
    })
    // React.js
    .enableReactPreset()
    // uncomment for legacy applications that require $/jQuery as a global variable
    .autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
