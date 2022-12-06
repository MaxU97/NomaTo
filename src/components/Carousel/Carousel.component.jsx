import React from "react";
import "./carousel.scss";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail.component";
import { MoveIcon } from "../../assets/Icons";
import CarouselSkeleton from "../../skeletons/CarouselSkeleton/CarouselSkeleton.component";

const Carousel = ({
  items = [],
  rows = 1,
  className = "",
  infinite = false,
}) => {
  debugger;
  return items.length ? (
    <CarouselProvider
      naturalSlideWidth={200}
      naturalSlideHeight={225}
      totalSlides={items.length}
      visibleSlides={5}
      infinite={infinite}
      className="carousel-flex"
    >
      <ButtonBack className="button back">
        <MoveIcon />
      </ButtonBack>
      <Slider className="slider-flex">
        <div className="slider-shadow"></div>
        {items.map((item, index) => (
          <Slide key={index} index={index} className="thumbnail">
            <ItemThumbnail item={item}></ItemThumbnail>
          </Slide>
        ))}
      </Slider>

      <ButtonNext className="button">
        <MoveIcon />
      </ButtonNext>
    </CarouselProvider>
  ) : (
    <CarouselSkeleton></CarouselSkeleton>
  );
};

export default Carousel;
