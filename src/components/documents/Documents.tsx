import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { selectDocument } from "../../store/slices/documentsSlice";

const Documents = () => {

    const dispatch = useDispatch();
    const documents = useSelector((state: any) => state.documents.documents)
    const selectedDocument = useSelector((state: any) => state.documents.selectedDocument)

    function selectNewDocument() {
        dispatch(selectDocument("test"));
    }

    return (
        <div className="documents">
            <div className="documents__container">
                <div className="documents__menu"></div>
                <div className="documents__document-container">
                    <iframe className="documents__document" id="myFrame" src={selectedDocument.contentUrl} title="Wikipedia" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <div className="documents__buttons">
                    <Link to="/maps" className="documents__button">See on map</Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Documents