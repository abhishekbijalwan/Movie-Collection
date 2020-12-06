import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import './MovieCard.css';

const MovieCard = (props) => {
  const url = `https://image.tmdb.org/t/p/w500/${props.url}`
  return (
    <>
      <div class="cellphone-container">
        <div class="movie">
          <div class="menu">
            <i class="material-icons">
              <CloseIcon fontSize="large"
                onClick={() => props.aremoveMovie(props.index)}
              />
            </i>
          </div>
          <div
            class="movie-img"
            style={{
              "background-image": `url(${url})`,
            }}
          ></div>
          {/* <img src={props.url} alt={props.title} className='movie-img' /> */}
          <div class="text-movie-cont">
            <div class="mr-grid">
              <div class="col1">
                <h1 class='title'>{props.title}</h1>
                <ul class="movie-gen">
                  <li>PG-13 /</li>
                  <li>2h 49min /</li>
                  <li>Adventure, Drama, Sci-Fi,</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
