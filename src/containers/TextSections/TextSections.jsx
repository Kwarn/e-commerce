import React from 'react';
import TextSection from '../../components/textSection/TextSection';

export default function TextSections() {
  const textSectionContent = {
    welcomeText: [
      <h1>Find Your Perfect Wood Floor</h1>,
      <p>
        We supply beautiful real wood flooring from responsibly sourced timber
      </p>,
    ],
    customers: [
      <h2>Our Customers Love Us!</h2>,
      <p>We pride ourselves on our support team</p>,
    ],
  };

  const textSections = Object.keys(textSectionContent).map(key => (
    <TextSection key={key}>{textSectionContent[key]}</TextSection>
  ));
  return { textSections };
}
