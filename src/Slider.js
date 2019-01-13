import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import Slide from "./components/Slide";
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nicknames: [
        "gaearon",
        "acdlite",
        "yyx990803",
        "unclebob",
        "martinfowler"
      ],
      currentSlide: 0
    };
  }
  updateSlide(direction) {
    //First Slide
    // <<<< direction
    if (this.state.currentSlide === 0 && direction < 0) {
      this.setState(state => ({ currentSlide: state.nicknames.length - 1 }));
      return;
    }
    //Last Slide
    // direction >>>
    else if (
      this.state.currentSlide === this.state.nicknames.length - 1 &&
      direction > 0
    ) {
      this.setState({ currentSlide: 0 });
      return;
    }
    //Other cases
    this.setState(state => ({ currentSlide: state.currentSlide + direction }));
  }
  render() {
    const slides = this.state.nicknames.map((nickname, index) => (
      <Slide
        nickname={nickname}
        key={index}
        shouldLoadAvatar={this.state.currentSlide === index}
      />
    ));
    return (
      <div id="slider">
        <div
          className="slidesWrapper"
          style={{
            transform: `translateX(${-this.state.currentSlide * 100}%)`,
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
