define(function() {

    var appenedLinks = []

    return {
        // verify if appendLinks is empty
        isEmpty: function() {
            return appenedLinks.length === 0
        },
        // clear appendLinks and remove HTML elements from DOM
        empty: function() {
            while ( ! this.isEmpty() ) {
                this.unload(appenedLinks[0])
            }
        },
        // load a CSS file into the HTML document
        // @param _link: filename inside 'cssPath' directory
        load: function( _link ) {
            for ( var link in appenedLinks ) {
                if ( link === _link ) {
                    // file already appended
                    return false
                }
            }

            appenedLinks.push(_link)

            var link = document.createElement("link")
            link.id = "css-builder-item-" + _link
            link.type = "text/css"
            link.rel = "stylesheet"
            link.href = App.path.public + "css/" + _link + ".css"
            document.getElementsByTagName("head")[0].appendChild(link)

            return this
        },
        // unload a CSS file and remove it from the document
        // @param _link: element in appendedLinks array
        unload: function ( _link ) {
            // for each appended link
            for ( var currIndex in appenedLinks ) {
                if ( appenedLinks[currIndex] === _link ) {
                    found = currIndex
                    appenedLinks.splice(currIndex, 1)
                    var links = document.getElementById("css-builder-item-" + _link)
                    links.remove()

                    return this
                }
            }

            // link wasn't found
            return false
        }
    }
})