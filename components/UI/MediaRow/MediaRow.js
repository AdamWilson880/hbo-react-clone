import { useState, useEffect } from "react";
import axios from "axios";

const MediaRow = (props) => {
  const [loadingData, setLoadingData] = useState(true);
  // /discover/movie?with_genres=28&primary_release_year=2021
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/discover/movie?with_genres=28&primary_release_year=2021&api_key=f40103be50cc9b93a331d8f0f2eeb811&language=en-US")
      .then(function (response) {
        // handle success
        console.log('Sucess Response For ' + props.title);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log('Error Response For ' + props.title);
        console.log(error);
      }) 
  }, []);

  const loopComp = (comp, digit) => {
    let thumbnails = [];
    for (let index = 0; index <= digit; index++) {
      thumbnails.push(comp);
    }

    return thumbnails;
  };
  const showThumbnails = () => {
    setTimeout(() => setLoadingData(false), 5000);
    return loadingData
      ? loopComp(<Skeleton />, 10)
      : loopComp(<Thumbnail />, 10);
  };
  return (
    <div className={`media-row ${props.type}`}>
      <h3 className="media-row__title">{props.title}</h3>
      <div className="media-row__thumbnails">
        {showThumbnails()}

        {/* {loopComp(
         (<Thumbnail />), 10

          )}  */}
      </div>
    </div>
  );
};

const Thumbnail = () => {
  return (
    <div className="media-row__thumbnail">
      <img src="https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/608x608/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2" />
      <div className="media-row__top-layer">
        <i className="fas fa-play" />
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="media-row__thumbnail-skeleton">
      <div className="media-row__thumbnail-skeleton-img"></div>
    </div>
  );
};

export default MediaRow;
