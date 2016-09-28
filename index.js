var L = require('leaflet');

var IconPulse = L.DivIcon.extend({

    options: {
        className: '',
        iconSize: [
            12, 12
        ],
        color: 'red',
        animate: true,
        heartbeat: 1
    },

    initialize: function(options) {
        L.setOptions(this, options);

        // css

        var uniqueClassName = 'lpi-' + new Date().getTime() + '-' + Math.round(Math.random() * 100000);

        var before = ['background-color: ' + this.options.color];
        var after = [

            'box-shadow: 0 0 6px 2px ' + this.options.color,

            'animation: pulsate ' + this.options.heartbeat + 's ease-out',
            'animation-iteration-count: infinite',
            'animation-delay: ' + (this.options.heartbeat + .1) + 's'
        ];

        if (!this.options.animate) {
            after.push('animation: none');
        }

        var css = [
            '.' + uniqueClassName + '{' + before.join(';') + ';}',
            '.' + uniqueClassName + ':after{' + after.join(';') + ';}'
        ].join('');

        var el = document.createElement('style');
        if (el.styleSheet) {
            el.styleSheet.cssText = css;
        } else {
            el.appendChild(document.createTextNode(css));
        }

        document.getElementsByTagName('head')[0].appendChild(el);

        // apply css class

        this.options.className = this.options.className + ' leaflet-pulsing-icon ' + uniqueClassName;

        // initialize icon

        L.DivIcon.prototype.initialize.call(this, options);

    }
});

function iconPulse(options) {
    return new IconPulse(options);
};

var MarkerPulse = L.Marker.extend({
    initialize: function(latlng, options) {
        options.icon = iconPulse(options);
        L.Marker.prototype.initialize.call(this, latlng, options);
    }
});

function markerPulse(latlng, options) {
    return new MarkerPulse(latlng, options);
};

module.exports = {
    iconPulse: iconPulse,
    markerPulse: markerPulse
};
