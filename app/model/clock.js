define(function() {

    return function Clock( _time ) {
        if ( ! _time )
            _time = new Date()

        this.hours = _time.getHours()
        this.minutes = _time.getMinutes()
        this.seconds = _time.getSeconds()

        return this
    }

})