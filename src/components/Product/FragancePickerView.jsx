import React, { Component } from 'react';
import styled from 'styled-components';
import GatsbyImg from 'gatsby-image';

import { device } from '../../utilities/device';

const TitleSection = styled.section`
  display: flex;
`;

const PageTitle = styled.h1`
  flex: 1;
  font-size: 2.5em;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({theme}) => theme.color.black};
  position: relative;

  ${device.tablet} {
    font-size: 2em;
  }
`;

const Spacer = styled.div`
  display: block;
  margin: 0.5em 0;
  height: 2px;
  background-color: ${({theme}) => theme.color.orange};
`;

const FraganceListDisplay = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  display: grid;
  grid-gap: 5vw;
  grid-auto-rows: auto;
  grid-template-columns: repeat(4, minmax(200px, 1fr));

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

const FamilySection = styled.section`
  margin-bottom: 2em ;
`;

const FraganceFamily = FraganceName.withComponent('h5').extend`
  font-size: 1.5em;
  text-align: left;
  margin-top: 1em;

  ${device.tablet} {
    align-self: center;
  }
`;

const FamilySpacer = Spacer.extend`
  width: 50%;
  margin: 1em 0;

  ${device.tablet} {
    align-self: center;
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

    return (
      <React.Fragment>
        <TitleSection>
          <PageTitle>Elige tu fragancia</PageTitle>
        </TitleSection>
        <Spacer />
        {Object.keys(fragances).map((key, index) => (
          <FamilySection>
            <FraganceFamily>{key}</FraganceFamily>
            <FamilySpacer />
            <FraganceListDisplay key={key}>
              {fragances[key].map(fragance => (
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
          </FamilySection>
        ))}
      </React.Fragment>
    )
  }
}

export default FragancePickerView;