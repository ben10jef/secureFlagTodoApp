module.exports = function(config){
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/app.js',
      'src/services/*.js',
      'src/controllers/*.js',
      'src/directives/*.js',
      'test/*.spec.js'
    ],
    reporters: ['progress'],
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
