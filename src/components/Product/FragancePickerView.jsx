import React, { Component } from 'react';
import styled from 'styled-components';
import GatsbyImg from 'gatsby-image';

import { device } from '../../utilities/device';

const PageTitle = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({theme}) => theme.color.black};
  position: relative;

  ::after {
    content: "";
    display: block;
    margin: 0.1em 0;
    height: 2px;
    background-color: ${({theme}) => theme.color.orange};
  }

  ${device.tablet} {
    font-size: 2em;
  }
`;

const FraganceListDisplay = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  display: grid;
  grid-gap: 5vw;
  grid-auto-rows: auto;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  margin: 3em 0;

  ${device.laptop} {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  ${device.tablet} {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  ${device.mobile} {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
`;

const FraganceDisplay = styled.figure`
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  margin: 2em;
  width: 15em;

  @supports (display: grid) {
    margin: 0;
    width: auto;
  }
`;

const HorizontalBar = styled.div`
  background: ${({theme}) => theme.color.orange};
  height: 2px;
  margin: 1em;
  width: 30%;
  align-self: center;
  box-sizing: border-box;
`;

const FraganceName = styled.h4`
  text-align: center;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({theme}) => theme.color.black};
  font-size: 1.5em;
  font-weight: 700;
  text-transform: lowercase;

  ::first-letter {
    text-transform: uppercase;
  }
`;

class FragancePickerView extends Component {
  state = {
    currentSex: 0,
  }

  render() {
    const { 
      fragances, 
      onFraganceClick 
    } = this.props;
    console.table(fragances);

    return (
      <React.Fragment>
        <PageTitle>Fragancias</PageTitle>
        <FraganceListDisplay>
          {fragances.map(fragance => (
            <FraganceDisplay 
              key={fragance.id}
              onClick={() => onFraganceClick(fragance)}
            >
              <GatsbyImg sizes={fragance.image.sizes} />
              <HorizontalBar />
              <FraganceName>{fragance.displayName}</FraganceName>
            </FraganceDisplay>
          ))}
        </FraganceListDisplay>
      </React.Fragment>
    )
  }
}

export default FragancePickerView;