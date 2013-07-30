/*
 * AppController
 *
 * Created at: 07/23/2014
 * Updated at: 07/29/2014
 * 
 */
define(
    [
        //bootstrap
        'eventHandler',

        // libs
        'jquery', 'bootstrap', 
        
        // utils
        'anima', 'audio', 'cssBuilder',
        
        // controllers
        './chat.js',
        './clock.js',

        // views
        App.path.view + 'common/header.html',
        App.path.view + 'common/footer.html',
        App.path.view + 'hello.html',
        //App.path.views+ '',
    ],
    function ( evtHandler, $, B, Anima, Audio, CSS, cChat, cClock, vHeader, vFooter, vHello ) {
        var status = 'undefined'

        function init () {
            if ( status !== 'undefined' )
                return status

            $('title').append(App.title)
            $('body')
                .append(vHeader)
                .append(vHello)
                .append(vFooter)

            CSS.load('bootstrap.min')
               .load('bootstrap-responsive.min')
               .load('default')
            // .unload('bootstrap.min')

            Audio
                .init()
                .playSound('menu')
                //.playSound('all') // playSound('a')
                //.stopSound('menu') // stopSound('all')

            cChat
                .init()
                .selfTest()
            cClock.init()

            // eventHandler.attach('newEvent', function() {})
            // evtHandler.trigger('newEvent')

            // Animation example (LOA INTRO):
            Anima.init('autoplay', {
                duration: 0.1,
                interval: 0.1,
            })

            return status = 'started'
        }

        return { init: init }
    }
)