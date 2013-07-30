/*
 * HtmlBuilder
 * 
 * Created at: 07/24/2013
 * Updated at: 07/24/2013
 *
 * Usage example:
 * HTML.link('btn-redirect-google', 'http://www.google.com', 'google', 'btn btn-primary', 'menuInicial')
 * undefined container returns the jQuery object:
 * var $link = HTML.link('btn-redirect-google', 'http://www.google.com', 'google', 'btn btn-primary')
 * HTML.remove('btn-redirect-google')
 *
 */
define(
    ['jquery'],
    function( $ ) {

        var createdElements = []

        function validElement ( _el ) {
            return $(_el).length > 0
        }
        function add ( _id ) {
            if ( ! _id ) {
                return false
            }
            
            createdElements.push(_id)
            return true
        }
        function createBaseElement( _tag, _attr, _innerText, _container ) {
            if ( ! _tag || ! add( _attr.id ) )
                return false

            var $newEl = $('<'+ _tag + ' />', _attr)
                .html(_innerText)

            if ( ! validElement(_container) ) {
                return $newEl
            }

            $(_container).append($newEl)
            return true
        }

        return {
            isEmpty: function() {
                return createdElements.length === 0
            },
            empty: function() {
                if ( this.empty() )
                    return false

                while ( ! this.isEmpty() ) {
                    remove(createdElements[0])
                }

                return true
            },
            remove: function( _id ) {
                if ( ! validElement( '#' + _id ) )
                    return false

                for (var index in createdElements) {                
                    if ( createdElements[index] === _id ) {
                        createdElements.splice(createdElements.indexOf(index), 1)
                        $('#' + _id).remove()
                    }
                }
            },
            
            // html elements which can be created
            link: function( _id, _href, _innerHtml, _class, _containerId ) {
                return createBaseElement('a', {
                    id: _id, href: _href, class: _class
                }, _innerHtml, '#' + _containerId)
            },
            div: function( _id, _innerHtml, _class, _containerId ) {
                return createBaseElement('div', {
                    id: _id, class: _class
                }, _innerHtml, '#' + _containerId)
            },
            form: function( _id, _action, _method, _innerHtml, _class, _containerId ) {
                if ( ! _method || _method != 'GET' && _method != 'POST')
                    _method = 'GET'

                return createBaseElement('form', {
                    id: _id,
                    action: _action,
                    method: _method,
                    class: _class,
                }, _innerHtml, '#' + _containerId)
            },

            /**
             * el: function( _params ) {
             *    return createBaseElement('el', _params)
             * },
             */
        }
    }
)
