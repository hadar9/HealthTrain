import React, { useState } from 'react';
import Slider from 'react-slick';
import ShowWorkOut from './ShowWorkOut';

export function WorkOut() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='workout'>
      <Slider {...settings}>
        <div>
          <ShowWorkOut />
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}
