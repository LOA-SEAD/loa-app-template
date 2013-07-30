define(
    [
        'cssBuilder',
        App.path.config + 'util/audio.js',
        App.path.view + 'util/audio.html'
    ],
    function ( CSS, Config, vAudio ) {
    
        var started = false,
            $controls,
            $btnToogleMute,

            soundList = Config.soundList,
            muted = false

        function isAudioElSupported()
        {
            return 'undefined' !== typeof document.createElement('audio').canPlayType
        }

        function playSound ( _soundID )
        {
            if ( _soundID === 'todos' || _soundID === 'all' || _soundID === 'a' ) {
                for ( var curr in soundList )
                    soundList[curr].el.play()
            } else {
                var curr = soundList[_soundID].el

                if ( curr === undefined )
                    return false // undefined sound file

                curr.play()
            }
            return this
        }

        function stopSound( _soundID )
        {
            if ( _soundID === 'todos' || _soundID === 'all' || _soundID === 'a' ) {
                for ( var curr in soundList )
                    soundList[curr].el.pause()
            } else {
                var curr = soundList[_soundID].el
                
                if ( curr === undefined )
                    return false // undefined sound file

                curr.pause()
            }

            return this
        }
            
        function saveAndInterrupt()
        {
            for ( var curr in soundList ) {
                // saves previous condition
                soundList[curr].previousState = soundList[curr].el.paused
                    ? 'paused'
                    : 'playing'
                soundList[curr].el.pause()
            }

            return this
        }

        function restorePreviousState()
        {
            for ( var curr in soundList )
                if ( soundList[curr].previousState == 'playing' )
                    soundList[curr].play()
                else
                    soundList[curr].pause()

            return this
        }

        /* 
         * se _forcedBehavior esta definido, forca que ele seja o proximo estado
         * a aplicado aos sons. Caso contrario inverte mudo de cada som.
         * @param boolean _forcedBehavior
         * @return this
         */
        function toogleMute( _forcedBehavior )
        {
            if ( typeof _forcedBehavior == 'boolean' )
                muted = _forcedBehavior
            else 
                muted = ! muted

            for ( var curr in soundList ) {
                soundList[curr].el.muted = muted
            }

            $btnToogleMute.children().hide()
            $btnToogleMute.children().filter(
                muted
                ? '#audio-label-disabled'
                : '#audio-label-activated'
            ).show()

            return this
        }

        /*
         * Cria elementos de audios definidos pelo array soundList
         * e adiciona elementos de controle ao html
         */
        function init ()
        {
            if ( started )
                return false
            
            started = true

            if ( isAudioElSupported() ) {
                
                for ( var curr in soundList ) {
                    // creates a new Audio element with file path
                    soundList[curr].el      = new Audio()

                    $(soundList[curr].el)
                        .append($('<source />', {
                            src: App.path.public + 'audio/' + soundList[curr].file + '.ogg',
                            type: 'audio/ogg',
                        }))
                        .append($('<source />', {
                            src: App.path.public + 'audio/' + soundList[curr].file + '.mp3',
                            type: 'audio/mp3',
                        }))

                    // repeat attribute declared as boolean in soundList's element
                    soundList[curr].el.loop = ( typeof soundList[curr].repeat === 'boolean' )
                        ? soundList[curr].repeat
                        : false
                }

                CSS.load('audio')
                $('body').append(vAudio)

                // searching controls in html document
                $controls = $('#audio-util-controls')
                $btnToogleMute = $('#audio-util-btn-toogleMuted')
                
                $btnToogleMute.click(toogleMute)

                // defines initial condition
                toogleMute(Config.initiallyMuted)
            }

            return this
        }

        function destroy()
        {
            soundList = []
            muted = false

            CSS.unload('audio')
            $controls.remove()
            $controls = $btnToogleMute = undefined
            
            started = false
        }

        return {
            init    : init,
            destroy : destroy,
            playSound : playSound,
            stopSound : stopSound,
            saveAndInterrupt     : saveAndInterrupt,
            restorePreviousState : restorePreviousState,
        }
    }
)
