

import { useEffect, useState } from 'react';

const News = () => {

    const [state, setState]: any = useState({
        news: []
    })

    const url = 'https://newsapi.org/v2/everything?' +
        'q="ww2" OR "world war 2" OR "second world war" NOT (games OR game OR shooter OR putin)&' +
        'language=en&' +
        'apiKey=a04e43ab681544aeafc42489705bcb76';
    var req = new Request(url);

    useEffect(() => {
        fetch(req).then((response) => response.json())
            .then((data) => {
                document.getElementById("loaderIcon")?.remove();
                setState({
                    news: data.articles
                })
            });
    }, [])

    return (
        <div className="news">
            <div className="news__header">
                <h1>Latest WW2 News:</h1>
            </div>
        <img className="news__loader-icon" id="loaderIcon" src="icons/loader-icon.svg" alt="Loading Articles..." />
            <div className="news__articles-container">
                {state.news?.slice(0, 12).map((article: any) => (
                    <a className="news__article" href={article.url} target="_blank">
                        <div className="news__article-title">
                            {article.title}
                        </div>
                        <div className="news__article-image-wrapper">
                            <img className="news__article-image" src={article.urlToImage} />
                        </div>
                        <div className="news__article-description" >
                            {article.description}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default News