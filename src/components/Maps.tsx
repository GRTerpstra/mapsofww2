import { useEffect, useState } from 'react'
import { GoogleMap, useLoadScript, KmlLayer } from '@react-google-maps/api'
import kmlLayersMock from '../data/kmlLayersMock.json'

const Maps = () => {

    const [state, setState] = useState({
        kmlLayer: "",
        theatre: "",
        month: "",
        year: ""
    })

    function setKmlLayer(newKmlLayer: string) {
        setState((prevState: any) => ({
            ...prevState,
            kmlLayer: kmlLayersMock.kmlLayers[newKmlLayer as keyof Object],
        }))
    }

    function setTheatre(newTheatre: string) {
        setState((prevState: any) => ({
            ...prevState,
            theatre: newTheatre
        }));
        setKmlLayer(newTheatre + "-" + state.month + "-" + state.year);
    }

    function setMonth(newMonth: string) {
        setState((prevState: any) => ({
            ...prevState,
            month: newMonth
        }));
        setKmlLayer(state.theatre + "-" + newMonth + "-" + state.year);
    }

    function setYear(newYear: string) {
        setState((prevState: any) => ({
            ...prevState,
            year: newYear
        }));
        setKmlLayer(state.theatre + "-" + state.month + "-" + newYear);
    }

    useEffect(() => {
        setKmlLayer(state.theatre + "-" + state.month + "-" + state.year);
        const timer = setTimeout(() => {

        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [])

    // TODO: Haal key op uit .env file ipv in de JS code opslaan.
    const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyCVzAS0AE5GqpXxq3fjJeEmB9natOTa-2g' });

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div className="maps">
            <div className="maps__container">
                <div className="maps__theatre-buttons">
                    <button className={state.theatre == 'europe' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("europe")}>Europe</button>
                    <button className={state.theatre == 'theAtlantic' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("theAtlantic")}>The Atlantic</button>
                    <button className={state.theatre == 'africa' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("africa")}>Africa</button>
                    <button className={state.theatre == 'asia' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("asia")}>Asia</button>
                    <button className={state.theatre == 'thePacific' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("thePacific")}>The Pacific</button>
                </div>
                <div className="maps__map-document-container">
                    <GoogleMap
                        mapContainerClassName="maps__map"
                        zoom={5}
                        center={{ lat: 48, lng: 10.73582498356971 }}
                    >
                        <KmlLayer
                            url={state.kmlLayer}
                            options={{ preserveViewport: true }}
                        />
                    </GoogleMap>
                    <div className="maps__document"></div>
                </div>
                <div className="maps__year-month-container">
                    <div className="year-buttons">
                        <div className="maps__year-buttons">
                            <button className={state.year == "1939" ? 'maps__year-button maps__button--selected' : 'maps__year-button'} onClick={() => setYear("1939")}>1939</button>
                            <button className={state.year == "1940" ? 'maps__year-button maps__button--selected' : 'maps__year-button'} onClick={() => setYear("1940")}>1940</button>
                            <button className={state.year == "1941" ? 'maps__year-button maps__button--selected' : 'maps__year-button maps__button--disabled'} >1941</button>
                            <button className={state.year == "1942" ? 'maps__year-button maps__button--selected' : 'maps__year-button maps__button--disabled'} >1942</button>
                            <button className={state.year == "1943" ? 'maps__year-button maps__button--selected' : 'maps__year-button maps__button--disabled'} >1943</button>
                            <button className={state.year == "1944" ? 'maps__year-button maps__button--selected' : 'maps__year-button maps__button--disabled'} >1944</button>
                            <button className={state.year == "1945" ? 'maps__year-button maps__button--selected' : 'maps__year-button maps__button--disabled'} >1945</button>
                        </div>
                    </div>
                    <div className="maps__month-slider">
                        <div className="maps__slider-text">
                            {/* TODO: Waarschijnlijk maar even via een lijstje doen */}
                            <div className="maps__month">Jan</div>
                            <div className="maps__month">Feb</div>
                            <div className="maps__month">Mar</div>
                            <div className="maps__month">Apr</div>
                            <div className="maps__month">May</div>
                            <div className="maps__month">Jun</div>
                            <div className="maps__month">Jul</div>
                            <div className="maps__month">Aug</div>
                            <div className="maps__month">Sep</div>
                            <div className="maps__month">Okt</div>
                            <div className="maps__month">Nov</div>
                            <div className="maps__month">Dec</div>
                        </div>
                        {/* TODO: Kijken of de manier waarop de value van deze range input wordt opgehaald wel best case is met React */}
                        <input type="range" id="monthSlider" min="1" max="12" value={state.month} onChange={() => setMonth((document.getElementById('monthSlider') as HTMLInputElement).value)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Maps