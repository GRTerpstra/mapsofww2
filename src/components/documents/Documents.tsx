import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { selectDocument } from "../../store/slices/documentsSlice";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Documents = () => {

    const dispatch = useDispatch();
    const documents = useSelector((state: any) => state.documents.documents)
    const selectedDocument = useSelector((state: any) => state.documents.selectedDocument)

    const [state, setState] = useState({
        selectedTheatre: "The European Theatre",
        selectedView: "wikipedia",
        loadingIcon: true,
    })

    function selectNewTheatre(theatre: string) {
        if(theatre !== state.selectedTheatre) setLoadingIconTrue();
        selectNewDocument(theatre)
        setState((prevState: any) => ({
            ...prevState,
            selectedTheatre: theatre
        }))
    }

    function selectNewDocument(documentTitle: string) {
        if(documentTitle !== selectedDocument.title) setLoadingIconTrue();
        var newDocument: any = documents.filter((document: any) => document.title == documentTitle)[0];
        dispatch(selectDocument(newDocument));
    }

    function changeView(view: string) {
        if(view !== state.selectedView) setLoadingIconTrue()
        setState((prevState: any) => ({
            ...prevState,
            selectedView: view
        }))
    }

    function setLoadingIconTrue() {
        setState((prevState) => ({
            ...prevState,
            loadingIcon: true
        }))
    }
    
    function setLoadingIconFalse() {
        setState((prevState) => ({
            ...prevState,
            loadingIcon: false
        }))
    }

    const theatres: Array<string> = ["The European Theatre", "The Atlantic", "The African Theatre", "The Asian Theatre", "The Pacific"];
    const documentElements = theatres.map((theatre) => (
        <li className="documents__menu-category-wrapper">
            <ul className="documents__menu-category"><h2 className={theatre === selectedDocument.title ? "documents__theatre documents__theatre--selected" : "documents__theatre"} onClick={() => selectNewTheatre(theatre)}>{theatre}</h2>
                {theatre === state.selectedTheatre && documents.filter((document: any) => (theatre === document.theatre && theatre !== document.title)).map((document: any) =>
                    <li className={document.title === selectedDocument.title ? "documents__menu-document documents__menu-document--selected" : "documents__menu-document"} onClick={() => selectNewDocument(document.title)}>{document.title}</li>
                )}
            </ul>
        </li>
    ))

    return (
        <div className="documents">
            <div className="documents__container">
                <ul className="documents__menu">
                    <div className="documents__menu-container">
                        {documentElements}
                    </div>
                </ul>
                <div className="documents__document-container">
                    {state.loadingIcon && <div className="maps__loader-icon-container">
                        <div className="maps__loader-icon-background" />
                        <img className="maps__loader-icon" id="loaderIcon" src="icons/loader-icon.svg" alt="Loading map..." />
                    </div>}
                    <iframe className="documents__document" id="myFrame" src={selectedDocument[state.selectedView + 'Url']} onLoad={() => setLoadingIconFalse()} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    <div className="documents__buttons">
                        <Link to="/maps" className="documents__button animation-delay-100"><TravelExploreIcon /></Link>
                        <div className="documents__button animation-delay-200" onClick={() => changeView("wikipedia")}><MenuBookIcon /></div>
                        <div className="documents__button animation-delay-300" onClick={() => changeView("youtube")}><YouTubeIcon /></div>
                        <div className="documents__button animation-delay-400" onClick={() => changeView("google")}><GoogleIcon /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Documents