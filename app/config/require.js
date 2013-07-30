/*
 * app/config/require.js
 *
 * Defines require.js' configuration.
 * You can create aliases and use it in requires' calls.
 *
 * Created at: 07/27/2014
 * Updated at: 07/27/2014
 * 
 */
 App.require = {
    paths: {
        // Libraries
        'jquery':    App.path.lib + 'jquery-1.8.min',
        'jqueryui':  App.path.lib + 'jquery-ui-1.9.2.min',
        'bootstrap': App.path.lib + 'bootstrap.min',

        // Utilities
        'cssBuilder': App.path.util + 'cssBuilder',
        'htmlBuilder': App.path.util + 'htmlBuilder',
        'anima': App.path.util + 'anima',
        'audio': App.path.util + 'audio',
        
        // defining a alias:
        // 'alias' : 'path/to/file',
    },
    // dependences over packages which aren't using require structure.
    shim: {
        'bootstrap': ['jquery'],
    },
}
