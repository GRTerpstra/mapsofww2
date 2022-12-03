import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, useLoadScript, KmlLayer, Marker } from '@react-google-maps/api'
import { default as kmlLayerData } from '../../data/kmlLayersMock.json'
import { default as kmlLayerHighlightData } from '../../data/kmlLayersHighlightsMock.json'
import { default as documentData } from '../../data/documentsMock.json'
import { selectDocument } from '../../store/slices/documentsSlice'
import { useSelector, useDispatch } from 'react-redux'
import MapsInfo from './MapsInfo'
import { stepIconClasses } from '@mui/material'
import { convertCompilerOptionsFromJson } from 'typescript'

// TODO: Typing fixen in het hele component
const Maps = () => {

    const dispatch = useDispatch();
    const selectedDocument = useSelector((state: any) => state.documents.selectedDocument)
    const mapRef: any = useRef<GoogleMap>();
    const onLoad: any = useCallback((map: any) => (mapRef.current = map), []);

    // TODO: Initial values hier niet invullen maar in een begin menu voordat de kaart getoont wordt.
    const [state, setState] = useState({
        countryMarkers: kmlLayerData.kmlLayers.filter((layer) => layer.theatre === "europe" && layer.month === 5 && layer.year === 1940)[0].countryMarkers,
        kmlLayerUrl: "https://drive.google.com/u/0/uc?id=18eBAJxKIBrQBXRcZ0MBbB6SnhoP4ukKa&export=download",
        kmlLayerHighlight: "",
        theatre: "europe",
        month: 5,
        year: 1940,
        document: selectedDocument,
        documentTitle: selectedDocument?.title,
        coordinates: selectedDocument?.coordinates,
        zoom: 5,
        loadingIcon: true,
        sliderMonthMin: 1,
        sliderMonthMax: 12,
        countryMarkersLarge: [],
        countryMarkersMedium: [],
        countryMarkersSmall: []
    })

    /* Save the coordinates where the map pans to in a variable with the help of the useMemo React hook.
    This to prevent the map from always panning to the same unchanged coordinates on a re-render. */
    const center = useMemo(() => (state.coordinates), [state.coordinates]);

    const monthArray: Array<String> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    const monthElements = monthArray.map((months, i) =>
        <div className={state.year === 1939 && i < 8 ? "maps__month maps__month--disabled" : "maps__month"}>{months}</div>
    )

    const mapOptions = {
        mapId: "399a6059fa43175f",
        streetViewControl: true,
        mapTypeControl: false,
        minZoom: 2,
    }

    function refreshCountryMarkers() {
        let zoomLevel: number = 5;
        if(mapRef.current?.getZoom() !== undefined) zoomLevel = mapRef.current?.getZoom()
        let countryMarkersLarge: any = []
        let countryMarkersMedium: any = []
        let countryMarkersSmall: any = []
        if (zoomLevel < 4) {
        }
        else if (zoomLevel < 5) {
            countryMarkersLarge = state.countryMarkers.filter((countryMarker: any) => countryMarker.type === "large")
        }
        else if (zoomLevel < 7) {
            countryMarkersLarge = state.countryMarkers.filter((countryMarker: any) => countryMarker.type === "large")
            countryMarkersMedium = state.countryMarkers.filter((countryMarker: any) => countryMarker.type === "medium")
        }
        else if (zoomLevel >= 7) {
            countryMarkersLarge = state.countryMarkers.filter((countryMarker: any) => countryMarker.type === "large")
            countryMarkersMedium = state.countryMarkers.filter((countryMarker: any) => countryMarker.type === "medium")
            countryMarkersSmall = state.countryMarkers.filter((countryMarker: any) => countryMarker.type === "small")
        }
        console.log(countryMarkersLarge)
        setState((prevState: any) => ({
            ...prevState,
            countryMarkersLarge: countryMarkersLarge,
            countryMarkersMedium: countryMarkersMedium,
            countryMarkersSmall: countryMarkersSmall
        }))
    }

    function setKmlLayer(theatre: string, month: number, year: number) {
        // TODO: Laat typescript weten dat hier een string uit komt ipv onnodig de toString() method aan te roepen.
        let newKmlLayer = kmlLayerData.kmlLayers.filter((layer) => layer.theatre === theatre && layer.month === month && layer.year === year)[0];
        let newKmlLayerUrl = newKmlLayer?.url
        if (newKmlLayerUrl && newKmlLayerUrl != state.kmlLayerUrl) {
            toggleLoadingIconOn()
            setState((prevState: any) => ({
                ...prevState,
                kmlLayerUrl: newKmlLayerUrl,
                kmlLayerHighlight: "",
                countryMarkers: newKmlLayer.countryMarkers,
                countryMarkersLarge: newKmlLayer?.countryMarkers?.filter((countryMarker) => countryMarker.type === "large"),
                countryMarkersMedium: newKmlLayer?.countryMarkers?.filter((countryMarker) => countryMarker.type === "medium"),
                countryMarkersSmall: newKmlLayer?.countryMarkers?.filter((countryMarker) => countryMarker.type === "small")
            }))
        }
    }

    function setKmlLayerHighlight(newKmlLayerHighlight: string) {
        // TODO: Laat typescript weten dat hier een string uit komt ipv onnodig de toString() method aan te roepen.
        let newKmlLayerUrl = kmlLayerHighlightData.kmlLayersHighlights.filter((highlight) => highlight.title === newKmlLayerHighlight)[0]?.kmlLayer
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
        setKmlLayer(newTheatre, state.month, state.year);
        setDocument(newTheatre);
    }

    function setMonth(newMonth: number) {
        setState((prevState: any) => ({
            ...prevState,
            month: newMonth
        }));
        setKmlLayer(state.theatre, newMonth, state.year);
        setKmlLayerHighlight(state.documentTitle + "-" + newMonth + "-" + state.year)
    }

    function setYear(newYear: number) {
        setState((prevState: any) => ({
            ...prevState,
            year: newYear
        }));
        newYear === 1939 ? setMonthMin(9) : setMonthMin(1);
        if (state.month < 9) {
            setMonth(9);
            setKmlLayer(state.theatre, 9, newYear);
        }
        else {
            setKmlLayer(state.theatre, state.month, newYear);
        }
        setKmlLayerHighlight(state.documentTitle + "-" + state.month + "-" + newYear);
    }

    function setMonthMin(monthMin: number) {
        setState((prevState: any) => ({
            ...prevState,
            sliderMonthMin: monthMin
        }))
    }

    function setDocument(documentTitle: string) {
        let newDocument: any
        newDocument = documentData.documents.filter((document) => document.title == documentTitle)[0];
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

    // TODO: Haal key op uit .env file ipv in de JS code opslaan.
    const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyCVzAS0AE5GqpXxq3fjJeEmB9natOTa-2g' });

    // TODO: Google Maps Scripts weghalen, want die stacken in <head> bij elke render.
    useEffect(() => {
        return () => {
            
        };
    }, [])

    // TODO: loader icon
    if (!isLoaded) return <div>Loading...</div>

    return (
        <div className="maps">
            <div className="maps__container">
                <div className="maps__theatre-buttons">
                    <button className={state.theatre == 'europe' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("europe")}>Europe</button>
                    <button className={state.theatre == 'The Atlantic' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("The Atlantic")}>The Atlantic</button>
                    <button className={state.theatre == 'The African Theatre' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("The African Theatre")}>Africa</button>
                    <button className={state.theatre == 'The Asian Theatre' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("The Asian Theatre")}>Asia</button>
                    <button className={state.theatre == 'The Pacific' ? "maps__theatre-button maps__button--selected" : "maps__theatre-button"} onClick={() => setTheatre("The Pacific")}>The Pacific</button>
                </div>
                <div className="maps__map-document-container">
                    <GoogleMap
                        mapContainerClassName="maps__map"
                        zoom={state.zoom}
                        center={center}
                        options={mapOptions}
                        onZoomChanged={refreshCountryMarkers}
                        onLoad={onLoad}
                    >
                        <KmlLayer
                            url={state.kmlLayerUrl}
                            options={{ preserveViewport: true, suppressInfoWindows: true }}
                            onStatusChanged={() => toggleLoadingIconOff()}
                            onClick={(event: any) => (setDocument(event.featureData.name), console.log(event.featureData.name), setKmlLayerHighlight(event.featureData.name + "-" + state.month + "-" + state.year))}
                        />
                        {state.countryMarkersLarge?.map((countryMarker: any) => (
                            <Marker
                                position={countryMarker.position}
                                options={{
                                    label: {
                                        text: countryMarker.title,
                                        fontSize: (countryMarker.font * (mapRef.current?.getZoom() / 3)) + "px",
                                        fontWeight: '800',
                                        fontFamily: "Roboto Condensed sans-serif"
                                    },
                                    clickable: false,
                                    icon: "false"
                                }}
                            />
                        ))}
                        {state.countryMarkersMedium?.map((countryMarker: any) => (
                            <Marker
                                position={countryMarker.position}
                                options={{
                                    label: {
                                        text: countryMarker.title,
                                        fontSize: (countryMarker.font * (mapRef.current?.getZoom() / 3)) + "px",
                                        fontWeight: '600',
                                    },
                                    clickable: false,
                                    icon: "false"
                                }}
                            />
                        ))}
                        {state.countryMarkersSmall?.map((countryMarker: any) => (
                            <Marker
                                position={countryMarker.position}
                                options={{
                                    label: {
                                        text: countryMarker.title,
                                        fontSize: (countryMarker.font * (mapRef.current?.getZoom() / 3)) + "px",
                                        fontWeight: '600',
                                    },
                                    clickable: false,
                                    icon: "false"
                                }}
                            />
                        ))}
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
                            <button className={state.year == 1939 ? 'maps__year-button maps__button--selected' : 'maps__year-button'} onClick={() => setYear(1939)}>1939</button>
                            <button className={state.year == 1940 ? 'maps__year-button maps__button--selected' : 'maps__year-button'} onClick={() => setYear(1940)}>1940</button>
                            <button className={state.year == 1941 ? 'maps__year-button maps__button--selected' : 'maps__year-button maps__button--disabled'} >1941</button>
                            <button className={state.year == 1942 ? 'maps__year-button maps__button--selected' : 'maps__year-button maps__button--disabled'} >1942</button>
                            <button className={state.year == 1943 ? 'maps__year-button maps__button--selected' : 'maps__year-button maps__button--disabled'} >1943</button>
                            <button className={state.year == 1944 ? 'maps__year-button maps__button--selected' : 'maps__year-button maps__button--disabled'} >1944</button>
                            <button className={state.year == 1945 ? 'maps__year-button maps__button--selected' : 'maps__year-button maps__button--disabled'} >1945</button>
                        </div>
                    </div>
                    <div className={state.sliderMonthMin == 9 ? "maps__month-slider maps__month-slider--1939" : "maps__month-slider"}>
                        <div className="maps__slider-text"> {monthElements} </div>
                        {/* TODO: Kijken of de manier waarop de value van deze range input wordt opgehaald wel best practice is met React */}
                        <input type="range" id="monthSlider" min={state.sliderMonthMin} max={state.sliderMonthMax} value={state.month} onChange={() => setMonth(Number((document.getElementById('monthSlider') as HTMLInputElement).value))} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Maps