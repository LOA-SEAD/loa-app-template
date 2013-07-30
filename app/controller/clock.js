/*
 * ClockController
 *
 * Created at: 07/24/2014
 * Updated at: 07/24/2014
 * 
 */
define(
    [
        'jquery',
        App.path.model + 'clock.js',
        App.path.view + 'clock.html',
    ],
    function ( $, mClock, vClock ) {

        var jaIniciado = false,
            Clock,
            ticking

        function init() {
            if ( jaIniciado ) {
                return false
            }

            jaIniciado = true
            Clock = new mClock()
            ticking = setInterval(tick, 1000)

            $('#nav-header').append(vClock)
            return this
        }

        function destroy() {
            jaIniciado = false
            Clock = undefined
            clearInterval(ticking)
        }

        function tick() {
            Clock.time = new Date()

            var hours = Clock.time.getHours(),
            minutes = Clock.time.getMinutes(),
            seconds = Clock.time.getSeconds()

            $('#clock-visible').html( '<i class="icon-time"></i> ' + hours + ':' + minutes + ':' + seconds )
        }

        return { 
            init: init,
            destroy: destroy,
        }
    }
)
