/**
 * eventHandler.js
 *
 * Handles different events through the app execution
 *
 * created at: 07/27/2013
 * updated at: 07/27/2013
 *
 */
define(['../app/events'], function( Events ) {

    var active = false,
        attachedEvents = {},
        disabledEvents = {}

    /**
     * @param string _eventID
     * @returns boolean
     */
    function isEventAttached( _eventID )
    {
        if ( _eventID === undefined || _eventID.length == 0 )
            return false  // invalid _eventID
        
        return attachedEvents[_eventID] !== undefined
    }

    /**
     * @param string _eventID
     * @returns boolean
     */
    function isEventDisabled( _eventID )
    {
        if ( _eventID === undefined || _eventID.length == 0 )
            return false  // invalid _eventID
        
        return disabledEvents[_eventID] !== undefined
    }

    /**
     * @param string _eventID, closure _callback, boolean _disabled
     * @returns eventHandler
     */
    function attach( _eventID, _callback, _disabled )
    {
        // eventHandler has not been initiated.
        if ( ! active )
            return false

        // event already attached
        if ( isEventAttached( _eventID ) )
            return false

        // if event were disabled, remove it
        if ( isEventDisabled( _eventID ) ) {
            disabledEvents[_eventID] = undefined
        }

        // optional param _disabled passed with value 'true'
        // _callback must start in disabled events list.
        if ( _disabled === true )
            disabledEvents[_eventID] = _callback
        else
            attachedEvents[_eventID] = _callback
        
        return this
    }

    /**
     * @param string _eventID
     * @returns mixed
     */
    function disable( _eventID )
    {
        // eventHandler has not been initiated.
        if ( ! active )
            return false

        if ( ! isEventAttached( _eventID ) )
            return false

        disabledEvents[_eventID] = isEventAttached[_eventID]
        currEventAttached[_eventID] = undefined

        return this
    }

    /**
     * @param string _eventID
     * @returns mixed
     */
    function enable( _eventID )
    {
        // eventHandler has not been initiated.
        if ( ! active )
            return false

        if ( ! isEventDisabled( _eventID ) )
            return false

        attachedEvents[_eventID] = disabledEvents[_eventID]
        disabledEvents[_eventID] = undefined

        return this
    }

    /**
     * @param string _eventID
     * @param array _params
     * @returns mixed: closure returned value
     */
    function trigger( _eventID, _params )
    {
        // eventHandler has not been initiated.
        if ( ! active )
            return undefined

        //console.log(attachedEvents)
        // undefined or disabled event triggered
        if ( ! isEventAttached ( _eventID ) )
            return undefined

        return attachedEvents[_eventID](_params)
    }

    /**
     * @returns mixed
     */
    function init()
    {
        if ( active )
            return false

        for ( var evtID in Events ) {
            attachedEvents[evtID] = Events[evtID]
        }

        active = true

        return this
    }

    /**
     * @returns mixed
     */
    function destroy()
    {
        // eventHandler has not been initiated.
        if ( ! active )
            return false
        
        attachedEvents = []
        disabledEvents = []
        active = false

        return this
    }

    return {
        init : init,
        destroy : destroy,
        attach : attach,
        enable : enable,
        disable : disable,
        trigger : trigger,
    }
})
