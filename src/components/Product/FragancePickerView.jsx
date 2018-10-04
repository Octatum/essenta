import React, { Component } from 'react';
import styled from 'styled-components';
import GatsbyImg from 'gatsby-image';
import { navigate, Link } from '@reach/router';

import { device } from '../../utilities/device';
import { Select } from '../Input';

const TitleSection = styled.section`
  display: flex;
`;

const PageTitle = styled.h1`
  flex: 1;
  font-size: 2.5em;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({ theme }) => theme.color.black};
  position: relative;

  ${device.tablet} {
    font-size: 2em;
  }
`;

const Spacer = styled.div`
  display: block;
  margin: 0.5em 0;
  height: 2px;
  background-color: ${({ theme }) => theme.color.orange};
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

const FraganceDisplay = styled(Link)`
  text-decoration: none;
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
  background: ${({ theme }) => theme.color.orange};
  height: 2px;
  margin: 1em;
  width: 30%;
  align-self: center;
  box-sizing: border-box;
`;

const FraganceName = styled.h4`
  text-align: center;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({ theme }) => theme.color.black};
  font-size: 1.5em;
  font-weight: 700;
  text-transform: lowercase;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const FamilySection = styled.section`
  margin-bottom: 2em;
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

const CustomSelect = styled(Select)`
  box-sizing: border-box;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-size: 1.2em;
`;

const CustomOption = styled.option`
  font-weight: 700;
`;

class FragancePickerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGender: props.genderFilter,
    };
  }

  handleSelectChange = ({ target }) => {
    const { value } = target;

    this.setState({
      selectedGender: value,
    });
  };

  filterByGender = fragance => {
    return (
      this.state.selectedGender === 'general' ||
      fragance.objectiveGender === this.state.selectedGender
    );
  };

  render() {
    const { fragances } = this.props;

    return (
      <React.Fragment>
        <TitleSection>
          <PageTitle>Elige tu fragancia</PageTitle>
          <CustomSelect
            value={this.state.selectedGender}
            onChange={this.handleSelectChange}
          >
            <CustomOption value="general">General</CustomOption>
            <CustomOption value="mujer">Mujer</CustomOption>
            <CustomOption value="hombre">Hombre</CustomOption>
          </CustomSelect>
        </TitleSection>
        <Spacer />
        {Object.keys(fragances).map(key => {
          const filteredFragances = fragances[key].filter(this.filterByGender);

          return filteredFragances.length === 0 ? (
            ''
          ) : (
            <FamilySection key={key}>
              <FraganceFamily>{key}</FraganceFamily>
              <FamilySpacer />
              <FraganceListDisplay>
                {filteredFragances.map(fragance => (
                  <FraganceDisplay
                    key={fragance.id}
                    to={`/producto/${this.props.categoryPath}/${
                      this.state.selectedGender
                    }/${fragance.id}`}
                  >
                    <GatsbyImg fluid={fragance.image.fluid} />
                    <HorizontalBar />
                    <FraganceName>{fragance.displayName}</FraganceName>
                  </FraganceDisplay>
                ))}
              </FraganceListDisplay>
            </FamilySection>
          );
        })}
      </React.Fragment>
    );
  }
}

export default FragancePickerView;
