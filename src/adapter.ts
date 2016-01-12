

(function(karma, steal,System) {
    if (!steal) {
        throw new Error("steal not found");
    }

    System.main = 'package.json!npm';

    // Prevent immediately starting tests.
    karma.loaded = function() {

        steal.done().then(()=>{


            // Load everything specified in stealjs files
            var promiseChain:Promise<any> = Promise.resolve();
            for (var i = 0; i < karma.config.steal.testFiles.length; i++) {

                promiseChain = promiseChain.then(()=>{
                    return System['import'](karma.config.steal.testFiles[i]);
                });
            }

            promiseChain.then(function () {
                karma.start();
            }, function (e) {
                throw e;
            });

        });

    };

})(window["__karma__"],window['steal'],window["System"]);



