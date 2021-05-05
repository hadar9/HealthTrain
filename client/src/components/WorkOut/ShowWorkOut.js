import React, { useState } from 'react';
import Slider from 'react-slick';
import ExreciseCard from './ExreciseCard';

export default function ShowWorkOut({ work, index }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const erecisecards = work.exercises.map((exc) => <ExreciseCard exc={exc} />);

  return (
    <div className={`showworkout-${index}`}>
      <p className='hadar'></p>
      <Slider {...settings}>{erecisecards}</Slider>
    </div>
  );
}
