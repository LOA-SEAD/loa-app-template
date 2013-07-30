/*
 * Model Chat
 * 
 * Created at: 07/23/2014
 * Updated at: 07/23/2014
 *
 */
define(function () {

    return function ChatModel ( _usr, _msg, _time ) {
        this.usr  = _usr
        this.msg  = _msg
        this.time = _time

        this.toString = function () {
            return this.usr + " (" + this.time + "): " + this.msg
        }
    }
    
})