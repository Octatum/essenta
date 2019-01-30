import React, { Component } from 'react';
import styled from 'styled-components';
import GatsbyImg from 'gatsby-image';
import { Link } from '@reach/router';

import { device } from '../../utilities/device';
import { Select } from '../Input';
import { StaticQuery, graphql } from 'gatsby';

const TitleSection = styled.section`
  display: flex;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em 5em;

  ${device.tablet} {
    padding: 2em;
  }

  ${device.mobile} {
    padding: 2em 1em;
  }
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

    const acceptedValues = ['hombre', 'mujer'];
    let selectedGender = acceptedValues.includes(
      props.genderFilter.toLowerCase()
    )
      ? props.genderFilter.toLowerCase()
      : 'general';

    this.state = {
      selectedFraganceFamily: 'todos',
      selectedGender,
    };
  }

  handleFraganceSelectChange = ({ target }) => {
    this.setState({
      selectedFraganceFamily: target.value,
    });
  };

  handleGenderSelectChange = ({ target }) => {
    const { value } = target;

    this.setState({
      selectedGender: value,
      selectedFraganceFamily: 'todos',
    });
  };

  filterByGender = fragance => {
    return (
      this.state.selectedGender === 'general' ||
      fragance.objectiveGender === this.state.selectedGender
    );
  };

  getFilteredFamilyGroupsByGender = () => {
    const familyGroups = this.props.fragances;
    const filteredGroups = {};
    Object.keys(familyGroups).forEach(key => {
      const familyGroup = familyGroups[key];
      if (familyGroup.filter(this.filterByGender).length > 0) {
        filteredGroups[key] = familyGroup;
      }
    });
    return filteredGroups;
  };

  render() {
    const { fragances } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query AllCategories {
            manlyBanner: contentfulImagen(
              usage: { eq: "Banner fragancia hombre" }
            ) {
              image {
                fluid {
                  ...GatsbyContentfulFluid_withWebp_noBase64
                }
              }
            }

            girlBanner: contentfulImagen(
              usage: { eq: "Banner fragancia mujer" }
            ) {
              image {
                fluid {
                  ...GatsbyContentfulFluid_withWebp_noBase64
                }
              }
            }

            generalBanner: contentfulImagen(
              usage: { eq: "Banner fragancia general" }
            ) {
              image {
                fluid {
                  ...GatsbyContentfulFluid_withWebp_noBase64
                }
              }
            }
          }
        `}
        render={data => {
          const { manlyBanner, girlBanner, generalBanner } = data;

          const filteredFamilyGroupsByGender = this.getFilteredFamilyGroupsByGender();
          const finalFilteredFamilyGroups =
            this.state.selectedFraganceFamily === 'todos'
              ? filteredFamilyGroupsByGender
              : {
                  [this.state.selectedFraganceFamily]:
                    fragances[this.state.selectedFraganceFamily],
                };

          let currentBanner = generalBanner;
          if (this.state.selectedGender.toLowerCase() === 'mujer') {
            currentBanner = girlBanner;
          }

          if (this.state.selectedGender.toLowerCase() === 'hombre') {
            currentBanner = manlyBanner;
          }

          return (
            <React.Fragment>
              <GatsbyImg fluid={currentBanner.image.fluid} />
              <Layout>
                <TitleSection>
                  <PageTitle>Elige tu fragancia</PageTitle>
                  <CustomSelect
                    value={this.state.selectedGender}
                    onChange={this.handleGenderSelectChange}
                  >
                    <CustomOption value="general">General</CustomOption>
                    <CustomOption value="mujer">Mujer</CustomOption>
                    <CustomOption value="hombre">Hombre</CustomOption>
                  </CustomSelect>
                  <CustomSelect
                    value={this.state.selectedFraganceFamily}
                    onChange={this.handleFraganceSelectChange}
                  >
                    <CustomOption value="todos">Todos</CustomOption>
                    {Object.keys(filteredFamilyGroupsByGender).map(key => (
                      <CustomOption key={key} value={key}>
                        {key}
                      </CustomOption>
                    ))}
                  </CustomSelect>
                </TitleSection>
                <Spacer />
                {Object.keys(finalFilteredFamilyGroups).map(key => {
                  const filteredFragances = fragances[key].filter(
                    this.filterByGender
                  );

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
              </Layout>
            </React.Fragment>
          );
        }}
      />
    );
  }
}

export default FragancePickerView;
