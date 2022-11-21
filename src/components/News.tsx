

import { useEffect, useState } from 'react';

const News = () => {

    const [state, setState] = useState({
        news: {}
    })

    var news: any;
    const url = 'https://newsapi.org/v2/everything?' +
        'q=Apple&' +
        'from=2022-11-21&' +
        'sortBy=popularity&' +
        'apiKey=a04e43ab681544aeafc42489705bcb76';
    var req = new Request(url);

    useEffect(() => {
        fetch(req).then((response) => response.json())
            .then((data) => {
                setState({
                    news: data.articles[0].title
                })
                console.log(data.articles[0].title);
            });
    }, [])

    return (
        <div className="news">{state.news.toString()}</div>
    )
}

export default News