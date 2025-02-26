/**
 * ************************************
 *
 * @module  MapDisplay
 * @author
 * @date
 * @description presentation component that display the map
 *
 * ************************************
 */

import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
// import * as hikeData from '../../hike-data.js';
// import { hikeData } from '../../hike-data.js';
import SvgTrekking from "./Icons/Trekking.js";

const MapDisplay = props => {
    const [viewport, setViewport] = useState({
       latitude: 34.1053,
       longitude: -118.352,
       width: '70vw',
       height: '70vh',
       zoom: 11
    });
    
    const [selectedHike, setSelectedHike] = useState(null);

    // const [trailArray, setTrailArray] = useState(props.trailData);
    
    // useEffect(() => {
    //     setTrailArray(props.trailData)
    // }, [trailArray]);

    // const [getTrailState, setGetTrailState] = useState(props.getTrail);

    // useEffect(() => {
    //     setGetTrailState(props.getTrail)
    // }, [getTrailState]);

    // console.log('props.trailData is', props.trailData);
    // console.log('trailArray is', trailArray);
    // console.log('props.getTrail is', props.getTrail);
    return (
        <div id="map-display">
            <ReactMapGl 
            {...viewport} 
            mapboxApiAccessToken={`pk.eyJ1IjoiZXJlYXN0bWFuIiwiYSI6ImNrMHUyemE4bTBqdmwzYnFnMGk0Z2VzaWgifQ.AL6aKHfOcWqKwC72i3FyBg`}
            mapStyle={`mapbox://styles/ereastman/ck0vjqz9x7y0g1cqs0vq5l9ld`}
            onViewportChange={viewport => setViewport(viewport)}
            >
            {props.trailData.map(trail => (
                <Marker 
                key={trail.id}
                latitude={trail.latitude}
                longitude={trail.longitude}
                >
                    {/* <div>Hike</div> */}
                    <button
                    onClick={e => {
                        e.preventDefault();
                        setSelectedHike(trail);
                    }}
                    >
                        {/* <img src='../../assets/trekking.svg' /> */}
                        <SvgTrekking width='30px' height='30px' />
                    </button>
                </Marker>
            ))}

            {selectedHike && (
                <Popup
                latitude={selectedHike.latitude}
                longitude={selectedHike.longitude}
                // onClose={() => setSelectedHike(null)}
                className='popup'
                >
                    {/* <div> */}
                    <div onClick={() => props.displayTrail(selectedHike)}>
                        <h4 className='popup-name'>{selectedHike.name}</h4>
                        <p className='popup-summary'>{selectedHike.location}</p>
                        <p className='popup-difficulty'>difficulty: {selectedHike.difficulty}</p>
                    </div>
                    {/* <img 
                    src={`${selectedHike.imgSqSmall}`} 
                    width='40'
                    height='40'
                    alt='Photo of hike'
                    /> */}
                </Popup>
            )}
            </ReactMapGl>
        </div>
    );
};

export default MapDisplay;