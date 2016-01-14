

(function(karma, steal,System) {
    if (!steal) {
        throw new Error("steal not found");
    }



    // Prevent immediately starting tests.
    karma.loaded = function() {

        steal.System.main = "@steal/@steal";
        steal.done().then(()=>{

            // Load everything specified in stealjs files

            var promises:Array<Promise<any>> = [];

            for (var i = 0; i < karma.config.steal.files.length; i++) {

                promises.push(System['import'](stripExtension(karma.config.steal.files[i])));
            }

            Promise.all(promises).then(()=>{
                karma.start();
            },(error)=>{
                throw error;
            });

            function stripExtension(fileName) {
                return fileName.replace(/\.js$/, "");
            }
        });

    };

})(window["__karma__"],window['steal'],window["System"]);



