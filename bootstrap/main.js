/**
 * main.js
 * 
 * main calling of require lib
 *
 * created at: 07/27/2014
 * updated at: 07/27/2014
 *
 */

// loads predefined configuration
require.config(App.require)

// requires main module
require(
    [
        App.path.controller + App.path.mainController,
        'eventHandler',
    ],

    function ( AppController, EventHandler ) {
        EventHandler.init()
        EventHandler.trigger('start')

        // removing 'display:none' from body
        document.getElementsByTagName('body')[0].style.display = 'block'

        // starting application
        AppController.init()

        EventHandler.trigger('shutdown')
    }
)
