import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { NodeGroup } from 'react-move';

const defaultTimeBetweenSlides = 5000;

const Controllers = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  height: 8vh;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`;

const FullSizeDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SlideButton = styled.div.attrs({
  style: ({ selected }) => ({
    background: `${selected ? 'black' : 'white'}`,
  }),
})`
  margin: 0 0.5rem;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  transition: 0.3s linear all;
`;

class Slideshow extends Component {
  state = {
    currentSlide: 0,
  };

  componentDidMount() {
    this.timeBetweenSlides =
      this.props.timeBetweenSlides || defaultTimeBetweenSlides;
    // Set timer and store it
    this.slideTimer = setInterval(this.nextSlide, this.timeBetweenSlides);
  }

  componentWillUnmount() {
    // Delete slide-changing timer
    clearInterval(this.slideTimer);
  }

  nextSlide = () => {
    // Advance slide counter and set it
    const currentSlide =
      (this.state.currentSlide + 1) % this.props.items.length;
    this.setState({ currentSlide });
  };

  previousSlide = () => {
    // Make counter go back one slide.
    const currentSlide =
      (this.state.currentSlide + this.props.items.length - 1) %
      this.props.items.length;
    this.setState({ currentSlide });
  };

  /**
   * Reset slide-changing timer
   */
  resetTimer = () => {
    // Clear interval if it exists, then create it again
    if (!this.slideTimer) return;

    clearInterval(this.slideTimer);
    this.slideTimer = setInterval(this.nextSlide, this.timeBetweenSlides);
  };

  setCurrentSlide = slideIndex => {
    this.setState({
      currentSlide: slideIndex,
    });
    this.resetTimer();
  };

  render() {
    const SlideButtons = this.props.items.map((_, index) => (
      <SlideButton
        selected={index === this.state.currentSlide}
        key={index}
        onClick={() => this.setCurrentSlide(index)}
      />
    ));

    const currentItem = this.props.items[this.state.currentSlide];

    return (
      <Fragment>
        <NodeGroup
          data={[
            {
              // Required. Identifier for each element
              key: currentItem.key,
              // Spread remaining props
              ...currentItem,
            },
          ]}
          keyAccessor={c => c.key}
          start={() => ({
            opacity: [0],
            translateY: [-10],
          })}
          enter={() => ({
            opacity: [1],
            timing: { duration: 600, delay: 200 },
            translateY: [0],
          })}
          update={() => ({
            opacity: [1],
          })}
          leave={() => ({
            opacity: [0],
            translateY: [10],
            timing: { duration: 200 },
          })}>
          {nodes => (
            <FullSizeDiv>
              {nodes.map(({ key, data, state: { opacity } }) => (
                <div
                  key={key}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    opacity,
                  }}>
                  {data.render
                    ? data.render(data)
                    : this.props.defaultElementRender(data)}
                </div>
              ))}
            </FullSizeDiv>
          )}
        </NodeGroup>
        <Controllers>{SlideButtons}</Controllers>
      </Fragment>
    );
  }
}

export default Slideshow;
