import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import data from "../../../site-data"
import MainHeader from "../../components/sections/main-header"
import WeSupportYouSection from "../../components/sections/we-support-you-section"
import DescriptionSection from "../../components/sections/description-section"

const CURRENT_LANG = "fr"
const footerData = data.footer[CURRENT_LANG]
const navData = data.nav[CURRENT_LANG]
const sectionsData = data.pages.find(({ name }) => name === "index").sections
const mainHeaderData = sectionsData[0]
const weSupportYouData = sectionsData[1]
const descriptionData = sectionsData[2]

export const query = graphql`
  query {
    pictures: allFile(filter: { relativeDirectory: { eq: "pages/home" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 600, quality: 90) {
              ...GatsbyImageSharpFluid
              originalName
            }
          }
        }
      }
    }
  }
`

const getImageByName = (data, name) => {
  const element = data.pictures.edges.find(
    el =>
      el.node.childImageSharp &&
      el.node.childImageSharp["fluid" || "fixed"].originalName === name
  )

  return element.node.childImageSharp
}

const HomePage = ({ data }) => (
  <Layout lang={CURRENT_LANG} nav={navData} footer={footerData}>
    <MainHeader
      picture={getImageByName(data, mainHeaderData.imageName)}
      title={mainHeaderData.title}
      text={mainHeaderData.text}
    />
    <WeSupportYouSection
      picture={getImageByName(data, weSupportYouData.imageName)}
      title={weSupportYouData.title}
      text={weSupportYouData.text}
    />
    <DescriptionSection
      picture={`pages/home/${descriptionData.imageName}`}
      appendText={descriptionData.appendText}
      text={descriptionData.text}
      link={descriptionData.link}
      title={descriptionData.title}
      subtitle={descriptionData.subtitle}
      list={descriptionData.list}
    />
  </Layout>
)

export default HomePage
