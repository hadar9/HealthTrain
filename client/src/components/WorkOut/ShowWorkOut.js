import React, { useState } from 'react';
import Slider from 'react-slick';
import ExreciseCard from './ExreciseCard';

export default function ShowWorkOut({ work, index }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const erecisecards = work.exercises.map((exc) => (
    <ExreciseCard exc={exc} key={exc._id} parentcomp={'show'} />
  ));

  return (
    <div className={`showworkout-${index}`}>
      <Slider {...settings}>{erecisecards}</Slider>
    </div>
  );
}
