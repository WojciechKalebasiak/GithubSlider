import React, { Component } from "react";
import axios from "axios";
import Loader from "./loader";
class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      loading: false,
      error: false
    };
  }
  loadAvatar() {
    this.setState({ loading: true }, () => {
      axios
        .get(`https://api.github.com/users/${this.props.nickname}`)
        .then(res => {
          this.setState({
            avatar: res.data.avatar_url,
            loading: false,
            error: false
          });
        })
        .catch(() => {
          this.setState({ error: true, loading: false });
        });
    });
  }
  componentDidMount() {
    if (this.props.shouldLoadAvatar) {
      this.loadAvatar();
    }
  }
  componentDidUpdate(prevProps) {
    if (
      !this.state.avatar &&
      this.props.shouldLoadAvatar !== prevProps.shouldLoadAvatar &&
      this.props.shouldLoadAvatar
    ) {
      this.loadAvatar();
    }
  }
  render() {
    const { nickname } = this.props;
    const { avatar, loading, error } = this.state;
    return (
      <div className="slide">
        {/* When avatar loaded */}
        {avatar ? (
          <img src={this.state.avatar} className="avatar" alt="github-avatar" />
        ) : null}
        {/* When avatar is loading */}
        {loading ? <Loader /> : null}
        {/* When error occurs */}
        {error ? (
          <h3 className="error-info">
            Something wen't wrong. We are unable to load image.
          </h3>
        ) : null}
        <h3 className="nickname">{nickname}</h3>
      </div>
    );
  }
}
export default Slide;
