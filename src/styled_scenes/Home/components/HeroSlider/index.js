// NPM
import React, { Component } from 'react';
import styled from 'styled-components';

// COMPONENTS
import { ArrowIcon } from '../../../../shared_components/icons';
import SliderPerson from './SliderPerson';

// ACTIONS/CONFIG
import { resetButton } from '../../../../libs/styled';

// STYLES
const Wrap = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
`;

const BGImage = styled.div`
  background-image: linear-gradient(176deg, rgba(0, 0, 0, 0.31) 0%, rgba(0, 0, 0, 0.72)),
    url(${props => props.img || '#'});
  background-size: cover;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
`;

const Arrow = styled.button`
  ${resetButton()};
  align-items: center;
  color: white;
  display: flex;
  font-size: 24px;
  height: 30px;
  opacity: 1;
  outline: none;
  position: absolute;
  top: 50%;
  transition: opacity 0.15s ease-in;
  width: 30px;
  z-index: 2;

  &:hover {
    opacity: 0.75;
  }
`;

const LeftArrow = Arrow.extend`
  left: 35px;
  transform: translateY(-50%) rotate(180deg);
`;

const RightArrow = Arrow.extend`
  right: 35px;
  transform: translateY(-50%);
`;

// NOTE: If you update any of the urls in the below array, make sure you also update it in index.html
// where we're pre-fetching all these images
// If you fail to do so, we might load images that may never be used.
// YOU HAVE BEEN WARNED!!
// - @jaydp
const slider = [
  {
    name: 'Cycling',
    location: 'Patagonia, Chile',
    avatar: '#',
    image: 'https://please-com.imgix.net/static/hero-slider/beach-2018-07-13.jpg',
  },
  {
    name: 'Rock diving',
    location: 'Bali, Indonesia',
    avatar: '#',
    image: 'https://please-com.imgix.net/static/hero-slider/back-2018-07-13.jpg',
  },
  {
    name: 'Sky diving',
    location: 'Chaing Mai, Thailand',
    avatar: '#',
    image: 'https://please-com.imgix.net/static/hero-slider/jump-2018-07-13.jpg',
  },
  {
    name: 'Beach',
    location: 'Chaing Mai, Thailand',
    avatar: '#',
    image: 'https://please-com.imgix.net/static/hero-slider/beach-2018-07-13.jpg',
  },
  {
    name: 'Field',
    location: 'Chaing Mai, Thailand',
    avatar: '#',
    image: 'https://please-com.imgix.net/static/hero-slider/field-2018-07-13.jpg',
  },
  {
    name: 'Trekking',
    location: 'Chaing Mai, Thailand',
    avatar: '#',
    image: 'https://please-com.imgix.net/static/hero-slider/trekking-2018-07-13.jpg',
  },
];

export default class HeroSlider extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };

    this.goToNext = this.goToNext.bind(this);
    this.goToPrevious = this.goToPrevious.bind(this);
  }

  goToPrevious() {
    let index;
    if (this.state.index - 1 < 0) {
      index = slider.length - 1;
    } else {
      index = this.state.index - 1;
    }

    this.setState({ index });
  }

  goToNext() {
    let index;
    if (this.state.index + 1 >= slider.length) {
      index = 0;
    } else {
      index = this.state.index + 1;
    }
    this.setState({ index });
  }

  tick() {
    if (this.state.index < slider.length - 1) {
      this.setState({ index: this.state.index + 1 });
    } else if (this.state.index === slider.length - 1) {
      this.setState({ index: 0 });
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 6000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const currImg = slider[this.state.index];
    return (
      <Wrap>
        <BGImage
          rel="img"
          img={currImg.image}
          aria-label={`${currImg.name}, ${currImg.location}`}
        />
        <LeftArrow onClick={this.goToPrevious}>
          <ArrowIcon />
        </LeftArrow>
        <RightArrow onClick={this.goToNext}>
          <ArrowIcon />
        </RightArrow>
        <SliderPerson name={currImg.name} location={currImg.location} avatar={currImg.avatar} />
      </Wrap>
    );
  }
}

// Props Validation
HeroSlider.propTypes = {};
