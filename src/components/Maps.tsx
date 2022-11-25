import React from 'react'
import { GoogleMap, useLoadScript, KmlLayer } from '@react-google-maps/api'

const Maps = () => {

    // TODO: Haal key op uit .env file ipv in de JS code opslaan.
    const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyCVzAS0AE5GqpXxq3fjJeEmB9natOTa-2g' });

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div className="maps">
            <GoogleMap
                zoom={5}
                center={{ lat: 48, lng: 10.73582498356971 }}
                mapContainerClassName="map-container"
            >
                <KmlLayer url="https://drive.google.com/file/d/1uKjx-38C37WyAI4WS79EMYkVQbBAYtyk/view?usp=sharing"
                    options={{ preserveViewport: true }}
                />
            </GoogleMap>
        </div>
    )
}

export default Maps