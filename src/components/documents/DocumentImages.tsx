const DocumentImages = (props: any) => {

    const imageElements: any = props.images.map((imageURL: string) => (
        <div className="document-images__image-wrapper">
            <img className="document-images__image" src={imageURL} />
        </div>
    ))

    return (
        <div className="document-images">
            <div className="document-images__wrapper">
                <div className="document-images__container">
                    {imageElements}
                </div>
            </div>
        </div>
    )
}

export default DocumentImages