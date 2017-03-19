(function (exports) {
    function smsListener() {

        // Use a "/test" namespace.
        // An application can open a connection on multiple namespaces, and
        // Socket.IO will multiplex all those connections on a single
        // physical channel. If you don't care about multiple channels, you
        // can set the namespace to an empty string.
        namespace = '';

        // Connect to the Socket.IO server.
        // The connection URL has the following format:
        //     http[s]://<domain>:<port>[/<namespace>]
        var socket = io.connect("https://mysterious-mountain-91403.herokuapp.com");
        var data = {}

        window.socket = socket
        window.data = data

        // Event handler for server sent data.
        // The callback function is invoked whenever the server emits data
        // to the client. The data is then displayed in the "Received"
        // section of the page.
        socket.on('sms', function(msg) {
            sms = JSON.parse(msg)
            var state = Reveal.getState();
            data[[state.indexh, state.indexv]].push(sms)
            plots.smsCallback(sms)
        });

        Reveal.addEventListener( 'slidechanged', function( event ) {
            // event.previousSlide, event.currentSlide, event.indexh, event.indexv
            console.log(event.indexh, event.indexv)

            if ( data[[event.indexh, event.indexv]] === undefined ) {
                data[[event.indexh, event.indexv]] = []
            }

        } );

        var state = Reveal.getState();
        if ( data[[state.indexh, state.indexv]] === undefined ) {
            data[[state.indexh, state.indexv]] = []
        }
    }

    exports.smsListener = smsListener

}(window.sms = window.sms || {}));
