import * as React from 'react';
import {Component} from 'react';
import MapGL, {Marker} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import RoomIcon from '@material-ui/icons/Room';


const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const mapboxgl = require('mapbox-gl');
mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    null,
    true // Lazy load the plugin
);

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: this.props.lat,
                longitude: this.props.lon,
                zoom: this.props.zoom ? this.props.zoom : 16,
                bearing: 0,
                pitch: 0
            },
            marker: {
                latitude: this.props.lat,
                longitude: this.props.lon
            },
            events: {},
        };
        this.mapRef = React.createRef();
    }

    _updateViewport = viewport => {
        if (this.props.editable)
            this.setState({viewport});
    };

    _updateMarker = marker => {
        if (this.props.editable)
            this.setState({marker});
    };

    _logDragEvent(name, event) {
        this.setState({
            events: {
                ...this.state.events,
                [name]: event.lngLat
            }
        });

    }

    _onMarkerDragStart = event => {
        this._logDragEvent('onDragStart', event);
    };

    _onMarkerDrag = event => {
        this._logDragEvent('onDrag', event);
    };

    _onMarkerDragEnd = event => {
        this._logDragEvent('onDragEnd', event);
        const map = {
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        };
        this.setState({
            marker: map
        });
        this.props.onMarkerChanged(map);
    };

    _handleGeocoderViewportChange = (viewport) => {
        const geocoderDefaultOverrides = {transitionDuration: 1000}
        this._updateMarker({
            longitude: viewport.longitude,
            latitude: viewport.latitude
        });
        return this._updateViewport({
            ...viewport,
            ...geocoderDefaultOverrides
        })
    }

    render() {
        const {viewport, marker} = this.state;

        return (
            <MapGL
                asyncRender={true}
                ref={this.mapRef}
                {...viewport}
                width="100%"
                height="100%"
                mapStyle='mapbox://styles/mapbox/streets-v11'
                onViewportChange={this._updateViewport}
                mapboxApiAccessToken={TOKEN}
            >
                {this.props.editable &&
                <Geocoder
                    mapRef={this.mapRef}
                    onViewportChange={this._handleGeocoderViewportChange}
                    mapboxApiAccessToken={TOKEN}
                />
                }
                <Marker
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    offsetTop={-20}
                    offsetLeft={-10}
                    draggable={this.props.editable}
                    onDragStart={this._onMarkerDragStart}
                    onDrag={this._onMarkerDrag}
                    onDragEnd={this._onMarkerDragEnd}
                >
                    <RoomIcon color="secondary"/>
                </Marker>
            </MapGL>
        );
    }
}
