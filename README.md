# karma-steal-npm

Plugin for Karma runnner and stealjs to be used with npm


### Install

````
npm install --save-dev karma-steal-npm
````

### Usage in Karma.conf.js file

All files and test files must be configured in the 'steal' property as shown in the below sample


##### sample file

````
module.exports = function(config) {
    config.set({
        basePath: '',
        autoWatch: false,

        singleRun: false,
        frameworks: ['jasmine','steal-npm'],

        steal:{
          files:['src/**/*.js',"test/**/*.js.map","src/**/*.js.map"],
          testFiles:['test/**/*.js']
        },

        reporters: ['kjhtml','coverage'],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['coverage']
        },

        "browsers":['Chrome'],
        coverageReporter: {
            dir : 'coverage/',
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'lcovonly', subdir: 'lcov' },
                { type: 'cobertura', subdir: 'cobertura' }
            ]
        }
    });
};
''''
