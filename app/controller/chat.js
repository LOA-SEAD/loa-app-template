/*
 * Controller Chat
 *
 * Created at: 07/23/2014
 * Updated at: 07/23/2014
 *
 */
define(
    [
        'jquery',

        App.path.config + 'controller/chat.js',

        App.path.model + 'chat.js',
        App.path.view  + 'chat/chat.html',
        App.path.view  + 'chat/message.html',
    ],
    function ( $, config, mChat, vChat, vMessage, e ) {

        var ChatBox = [],
        foiIniciado = false

        function init () {
            if ( foiIniciado ) {
                return false
            }

            ChatBox = []

            $('#vChat').remove()
            
            $('#main') .prepend(vChat)
            $('#vChat').hide()

            setTimeout(function() {
                $('#vChat').fadeIn("slow")
            }, config.timeBeforeShowChat)

            // Event handlers
            $('#chat-textarea').keypress(function(evt) {
                var currEvent  = evt               || event,
                    keyPressed = currEvent.keyCode || currEvent.which

                // enter without shift been pressed
                if ( ! currEvent.shiftKey && 13 == keyPressed ) {
                    send()
                    $('#chat-textarea').val('')
                    return false
                }    
            })

            foiIniciado = true
            return this
        }

        function selfTest() {
            setTimeout(function() {
                receive('random', 'random', new Date())
            }, config.timeBetweenMessages + config.timeBeforeShowChat)

            setTimeout(function() {
                receive('random', 'random', new Date())
            }, 2*config.timeBetweenMessages + config.timeBeforeShowChat)
        }

        function send ( _usr, _msg, _time ) {
            if ( ! foiIniciado )
                return false

            if ( ! _usr )
                _usr = 'User'

            if ( ! _msg )
                _msg = $('#chat-textarea').val()
            
            if ( ! _time )
                _time = new Date()

            _usr = decodePredefinedMessages( _usr, 'user' )
            _msg = decodePredefinedMessages( _msg,'message' )
            
            var newMsg = new mChat(_usr, _msg, _time)
            ChatBox.push(newMsg)
            showMessage(newMsg)

            return this
        }
        function receive ( _usr, _msg, _time ) {
            if ( ! foiIniciado )
                return false

            _usr = decodePredefinedMessages( _usr, 'user' )
            _msg = decodePredefinedMessages( _msg,'message' )

            var newMsg = new mChat(_usr, _msg, _time)
            
            ChatBox.push(newMsg)
            showMessage(newMsg)

            return this
        }

        function showMessage ( _newMsg ) {
            $('#chat-msg-list').append(vMessage)
            var $appMsg = $('#chat-msg-list').children().last(),
                $appMsgFields = $appMsg.children().children()

            $appMsgFields.filter('.usr').html(_newMsg.usr)
            $appMsgFields.filter('.msg').html(_newMsg.msg)
            $appMsgFields.filter('.time').html(
                _newMsg.time.getHours() + ':' + _newMsg.time.getMinutes() + ':' + _newMsg.time.getSeconds()
            )

            $appMsg.slideDown("slow")

            return this
        }

        function decodePredefinedMessages ( _content, _type ) {
            // _type doesn't exists. Nothing to decode
            if ( ! config.predefined[_type] ) {
                return _content
            }

            // type defined and random _content requested
            if ( _content === 'random' ) {
                var currMsg = ~~(Math.random() * config.predefined[_type].length)
                return config.predefined[_type][currMsg]
            }

            // type defined and specific _content requested
            if ( typeof _content === 'number' ) {
                return config.predefined[_type][_content]
            }

            // type defined but freely defined _content
            return _content
        }

        return {
            init : init,
            send : send,
            receive : receive,
            selfTest: selfTest,
        }
    }
)