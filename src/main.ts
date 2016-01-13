

import {initializePlugin} from "./plugin-manager"

var initStealjs:any = initializePlugin;

initStealjs.$inject = ['config.files', 'config.basePath', 'config.steal', 'config.client'];

module.exports = {
    'framework:steal-npm': ['factory', initStealjs]
};



