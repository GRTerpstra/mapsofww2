import React from 'react'
import { GoogleMap, useLoadScript, KmlLayer } from '@react-google-maps/api'

const Maps = () => {

    // TODO: Haal key op uit .env file ipv in de JS code opslaan.
    const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyCVzAS0AE5GqpXxq3fjJeEmB9natOTa-2g' });

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div className="maps">
            <GoogleMap
                id="kml-layer-example"
                zoom={5}
                center={{ lat: 48, lng: 10.73582498356971 }}
                mapContainerClassName="map-container"
            >
                <KmlLayer url="https://drive.google.com/u/0/uc?id=1isBPQYS0OGPPNs0eBDdf-Z7PuwUj2oY9&export=download" />
            </GoogleMap>
        </div>
    )
}

export default Maps