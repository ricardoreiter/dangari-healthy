angular.module("dangari-healthy")

    .service("Utils", [function () {
        this.base64ArrayBuffer = function (arrayBuffer) {
            var base64 = '';
            var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

            var bytes = new Uint8Array(arrayBuffer);
            var byteLength = bytes.byteLength;
            var byteRemainder = byteLength % 3;
            var mainLength = byteLength - byteRemainder;

            var a, b, c, d;
            var chunk;

            for (var i = 0; i < mainLength; i = i + 3) {
                chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

                a = (chunk & 16515072) >> 18;
                b = (chunk & 258048) >> 12;
                c = (chunk & 4032) >> 6;
                d = chunk & 63;

                base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
            }

            if (byteRemainder == 1) {
                chunk = bytes[mainLength];

                a = (chunk & 252) >> 2;
                b = (chunk & 3) << 4;

                base64 += encodings[a] + encodings[b] + '=='
            } else if (byteRemainder == 2) {
                chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
                a = (chunk & 64512) >> 10;
                b = (chunk & 1008) >> 4;
                c = (chunk & 15) << 2;

                base64 += encodings[a] + encodings[b] + encodings[c] + '='
            }

            return base64
        };

        this.centralizeMap = function(map, lat, lng){
            var position = new google.maps.LatLng(lat, lng);
            map.panTo(position); // centraliza o mapa na nova posição
        };

        this.setMarker = function(map, lat, lng){
            var position = new google.maps.LatLng(lat, lng);
            if (self.marker){
                self.marker.setMap(null); // remove o marcador anterior
            }
            self.marker = new google.maps.Marker();
            self.marker.setPosition(position);
            self.marker.setMap(map); // adiciona o novo marcador no mapa
        };

    }]);

