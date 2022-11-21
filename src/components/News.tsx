

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
                setState({
                    news: data.articles
                })
                console.log(data.articles);
            });
    }, [])

    return (
        <div className="news">
            <div className="news__header">
                <h1>Latest WW2 News:</h1>
            </div>
            <div className="news__articles-container">
                {state.news.slice(0, 15).map((article: any) => (
                    <li className="news__article">
                        <div className="news__article-title">
                            {article.title}
                        </div>
                        <img className="news__article-image" src={article.urlToImage} />
                        <div className="news__article-description" >
                            {article.description}
                        </div>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default News