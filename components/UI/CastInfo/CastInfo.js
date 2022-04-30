import {useState, useEffect} from 'react';
import axios from 'axios'

const CastInfo = (props) => {
  const [loadingData, setLoadingData] = useState(true);
  const [credits, setCredits] = useState([]);

  // /discover/movie?with_genres=28&primary_release_year=2021
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.mediaId}/credits?api_key=f40103be50cc9b93a331d8f0f2eeb811&language=en-US`
      )
      .then(function (response) {
        setCredits(response.data);
        setLoadingData(false);
        // handle success
        console.log("Sucess Response For cast and crew ");
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("Error Response For cast and crew");
        console.log(error);
      });
  }, []);

  const showCast = () => {
    return credits.cast.map((item) => {
      return(
        <ul className="cast-info__crew">
          <li>
            {item.character}
          </li>
          <li>
            {item.name}
          </li>
        </ul>
      )
    })   
  }

  return(
    <div className="cast-info">
      <div className="cast-info__group-title">
        Cast 
      </div>
      <div className="cast-info__list">
        {showCast()}
      </div>  
      <div className="cast-info__group-title">
        Crew
      </div>
      <div className="cast-info__list">
        <ul className="cast-info__crew">
          <li>
            James
          </li>
          <li>
            George Lucas
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CastInfo;



















const MediaRow = (props) => {
  const [loadingData, setLoadingData] = useState(true);
  const [movies, setMoviesData] = useState([]);

  // /discover/movie?with_genres=28&primary_release_year=2021
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${props.endpoint}&api_key=f40103be50cc9b93a331d8f0f2eeb811&language=en-US`
      )
      .then(function (response) {
        setMoviesData(shuffleArray(response.data.results));
        setLoadingData(false);
        // handle success
        console.log("Sucess Response For " + props.title);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("Error Response For " + props.title);
        console.log(error);
      });
  }, []);

  const loopComp = (comp, digit) => {
    let thumbnails = [];
    for (let index = 1; index <= digit; index++) {
      thumbnails.push(comp);
    }

    return thumbnails;
  };
  const showThumbnails = (type) => {
    return loadingData
      ? loopComp(<Skeleton />, 10)
      : movies.map((movie) => {
          return <Thumbnail movieData={movie} type={type} />;
        });
  };

  return (
    <div className={`media-row ${props.type}`}>
      <h3 className="media-row__title">{props.title}</h3>
      <div className="media-row__thumbnails">
        {showThumbnails(props.type)}

        {/* {loopComp(
         (<Thumbnail />), 10

          )}  */}
      </div>
    </div>
  );
};

const Thumbnail = (props) => {
  const thumbSize = (type) => {
    if (type === "large-v") {
      return "400";
    }
    if (type === "small-v") {
      return "185";
    }
    if (type === "large-h") {
      return "500";
    }
    if (type === "small-h") {
      return "342";
    }
  };
  return (
    <Link href={`/movie/${props.movieData.id}`}>
      <a>
        <div className="media-row__thumbnail">
          <img
            src={`https://image.tmdb.org/t/p/w${thumbSize(props.type)}/${
              props.movieData.poster_path
            }`}
          />
          <div className="media-row__top-layer">
            <i className="fas fa-play" />
          </div>
        </div>
      </a>
    </Link>
  );
};

const Skeleton = () => {
  return (
    <div className="media-row__thumbnail-skeleton">
      <div className="media-row__thumbnail-skeleton-img"></div>
    </div>
  );
};


