import { useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, useLoadScript, KmlLayer } from '@react-google-maps/api'
import { default as kmlLayerData } from '../../data/kmlLayersMock.json'
import { default as documentData } from '../../data/documentsMock.json'
import { selectDocument } from '../../store/slices/documentsSlice'
import { useSelector, useDispatch } from 'react-redux'
import MapsInfo from './MapsInfo'

const Maps = () => {

    const dispatch = useDispatch();
    const selectedDocument = useSelector((state: any) => state.documents.selectedDocument)

    // TODO: Remove initial values of kmlLayer, theatre, month and year and set loadingIcon to true.
    // TODO: Initial values hier niet invullen maar in een begin menu voordat de kaart getoont wordt.
    const [state, setState] = useState({
        kmlLayer: "https://drive.google.com/u/0/uc?id=18eBAJxKIBrQBXRcZ0MBbB6SnhoP4ukKa&export=download",
        kmlLayerHighlight: "",
        theatre: "europe",
        month: "5",
        year: "1940",
        document: documentData.documents[0],
        documentTitle: documentData.documents[0].title,
        coordinates: selectedDocument.coordinates,
        zoom: 5,
        loadingIcon: true
    })


    /* Save the coordinates where the map pans to in a variable with the help of the useMemo React hook.
    This to prevent the map from always panning to the same unchanged coordinates on a re-render. */
    const center = useMemo(() => (state.coordinates), [state.coordinates]);

    const mapOptions = {
        mapId: "399a6059fa43175f",
        streetViewControl: true,
        mapTypeControl: false,
    }

    function setKmlLayer(newKmlLayer: string) {
        // TODO: Laat typescript weten dat hier een string uit komt ipv onnodig de toString() method aan te roepen.
        let newKmlLayerUrl = kmlLayerData.kmlLayers[newKmlLayer as keyof Object]?.toString()
        if (newKmlLayerUrl && newKmlLayerUrl != state.kmlLayer) {
            toggleLoadingIconOn()
            setState((prevState: any) => ({
                ...prevState,
                kmlLayer: newKmlLayerUrl,
                kmlLayerHighlight: ""
            }))
        }
    }

    function setKmlLayerHighlight(newKmlLayerHighlight: string) {
        // TODO: Laat typescript weten dat hier een string uit komt ipv onnodig de toString() method aan te roepen.
        let newKmlLayerUrl = kmlLayerData.kmlLayers[newKmlLayerHighlight as keyof Object]?.toString()
        console.log("new" + newKmlLayerUrl)
        if (!newKmlLayerUrl) newKmlLayerUrl = "";
        setState((prevState: any) => ({
            ...prevState,
            kmlLayerHighlight: newKmlLayerUrl
        }))
    }

    function setTheatre(newTheatre: string) {
        setState((prevState: any) => ({
            ...prevState,
            theatre: newTheatre,
            kmlLayerHighlight: ""
        }));
        setKmlLayer(newTheatre + "-" + state.month + "-" + state.year);
        setDocument(newTheatre);
    }

    function setMonth(newMonth: string) {
        setState((prevState: any) => ({
            ...prevState,
            month: newMonth
        }));
        setKmlLayer(state.theatre + "-" + newMonth + "-" + state.year);
        setKmlLayerHighlight(state.documentTitle + "-" + newMonth + "-" + state.year)
    }

    function setYear(newYear: string) {
        setState((prevState: any) => ({
            ...prevState,
            year: newYear
        }));
        setKmlLayer(state.theatre + "-" + state.month + "-" + newYear);
        setKmlLayerHighlight(state.documentTitle + "-" + state.month + "-" + newYear)
    }

    function setDocument(documentTitle: string) {
        let newDocument: any
        try {
            newDocument = documentData.documents.filter((document) => document.title == documentTitle)[0];
        } catch (error) {
            console.error(error);
        }
        dispatch(selectDocument(newDocument))
        setState((prevState) => ({
            ...prevState,
            document: newDocument,
            documentTitle: newDocument?.title,
            coordinates: newDocument?.coordinates,
            zoom: newDocument?.zoom
        }))
    }

    // TODO: Misschien hier één gezamelijke function van maken ipv één voor on en één voor off.
    function toggleLoadingIconOff() {
        setState((prevState: any) => ({
            ...prevState,
            loadingIcon: false
        }))
    }

    function toggleLoadingIconOn() {
        setState((prevState: any) => ({
            ...prevState,
            loadingIcon: true
        }))
    }

    // TODO: Google Maps Scripts weghalen, want die stacken in <head> bij elke render.
    // TODO: State hier niet zette maar in een begin menu voordat de kaart getoont wordt.
    useEffect(() => {
        if (state.coordinates === undefined) {
            console.log("undefined")
            setState((prevState: any) => ({
                ...prevState,
                coordinates: { "lat": 50, "lng": 10 }
            }))
        }
        return () => {
        };
    }, [])

    // TODO: Haal key op uit .env file ipv in de JS code opslaan.
    const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyCVzAS0AE5GqpXxq3fjJeEmB9natOTa-2g' });

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div className="maps">
            <div className="maps__container">
                <div className="maps__theatre-buttons">
                    <button className={state.theatre == 'europe' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("Europe")}>Europe</button>
                    <button className={state.theatre == 'atlantic' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("The Atlantic")}>The Atlantic</button>
                    <button className={state.theatre == 'africa' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("The African Theatre")}>Africa</button>
                    <button className={state.theatre == 'asia' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("The Asian Theatre")}>Asia</button>
                    <button className={state.theatre == 'Pacific' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("The Pacific")}>The Pacific</button>
                </div>
                <div className="maps__map-document-container">
                    <GoogleMap
                        mapContainerClassName="maps__map"
                        zoom={state.zoom}
                        center={center}
                        options={mapOptions}

                    >
                        <KmlLayer
                            url={state.kmlLayer}
                            options={{ preserveViewport: true, suppressInfoWindows: true }}
                            onStatusChanged={() => toggleLoadingIconOff()}
                            onClick={(event: any) => (setDocument(event.featureData.name), console.log(event.featureData.name), setKmlLayerHighlight(event.featureData.name + "-" + state.month + "-" + state.year))}
                        />
                        <KmlLayer
                            url={state.kmlLayerHighlight}
                            options={{ preserveViewport: true, suppressInfoWindows: true }}
                        />
                        {state.loadingIcon && <div className="maps__loader-icon-container">
                            <div className="maps__loader-icon-background" />
                            <img className="maps__loader-icon" id="loaderIcon" src="icons/loader-icon.svg" alt="Loading map..." />
                        </div>
                        }
                    </GoogleMap>
                    <div className="maps__document"><MapsInfo document={state.document} /></div>
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
                        {/* TODO: Kijken of de manier waarop de value van deze range input wordt opgehaald wel best practice is met React */}
                        <input type="range" id="monthSlider" min="1" max="12" value={state.month} onChange={() => setMonth((document.getElementById('monthSlider') as HTMLInputElement).value)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Maps