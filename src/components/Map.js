import React from 'react'
import { Map as LeafletMap, TileLayer } from "react-leaflet"
//import { Map as M, TileLayer, Marker, Popup } from 'react-leaflet'
import { showDataOnMap } from "../utils/utils";
import "./Map.css";

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            {/* center   zoom : how far you want to zoom in */}
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </LeafletMap>

        </div>
    )
}

// function Map({ countries, casesType, center, zoom }) {
//     const position = [51.505, -0.09]
//     return (

//         <div className="map">
//             {console.log("Yolo")}
//             <M center={position} zoom={13} scrollWheelZoom={false} >
//                 <TileLayer
//                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <Marker position={position}>
//                     <Popup>
//                         A pretty CSS3 popup. <br /> Easily customizable.
//                     </Popup>
//                 </Marker>
//             </M>
//         </div>

//     )
// }
export default Map
