import React from "react";
import "./carousel.scss";
import classNames from "classnames";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail.component";
import moveIcon from "../../assets/move-icon.svg";

const Carousel = ({
  items = [],
  rows = 1,
  className = "",
  infinite = false,
}) => {
  return (
    <CarouselProvider
      naturalSlideHeight={300}
      naturalSlideWidth={250}
      totalSlides={items.length}
      visibleSlides={4}
      infinite={infinite}
      className="carousel-flex"
    >
      <ButtonBack className="button back">
        <img src={moveIcon}></img>
      </ButtonBack>
      <Slider className="slider-flex">
        <div className="slider-shadow"></div>
        {items.map((item, index) => (
          <Slide index={index} className="thumbnail">
            <ItemThumbnail item={item}></ItemThumbnail>
          </Slide>
        ))}
      </Slider>

      <ButtonNext className="button">
        <img src={moveIcon}></img>
      </ButtonNext>
    </CarouselProvider>
  );
};

export default Carousel;
