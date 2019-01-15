import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import Slide from "./components/Slide";
const nicknames = [
  "gaearon",
  "acdlite",
  "yyx990803",
  "unclebob",
  "martinfowler"
];
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlideIndex: 0
    };
  }
  updateSlide(direction) {
    //First Slide
    // <<<< direction
    if (this.state.currentSlideIndex === 0 && direction < 0) {
      this.setState(state => ({ currentSlideIndex: state.nicknames.length - 1 }));
      return;
    }
    //Last Slide
    // direction >>>
    else if (
      this.state.currentSlideIndex === nicknames.length - 1 &&
      direction > 0
    ) {
      this.setState({ currentSlideIndex: 0 });
      return;
    }
    //Other cases
    this.setState(state => ({ currentSlideIndex: state.currentSlideIndex + direction }));
  }
  render() {
    const slides = nicknames.map((nickname, index) => (
      <Slide
        nickname={nickname}
        key={index}
        shouldLoadAvatar={this.state.currentSlideIndex === index}
      />
    ));
    return (
      <div id="slider">
        <div
          className="slidesWrapper"
          style={{
            transform: `translateX(${-this.state.currentSlideIndex * 100}%)`,
            transition: `transform .2s ease-in`
          }}>
          {slides}
        </div>
        <button className="btn btn-prev" onClick={() => this.updateSlide(-1)}>
          Previous
        </button>
        <button className="btn btn-next" onClick={() => this.updateSlide(1)}>
          Next
        </button>
      </div>
    );
  }
}

export default hot(Slider);
