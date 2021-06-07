import walnut from '../../assets/Walnut/Walnut_Beauty_01-min.jpg';
import walnutTopdown from '../../assets/Walnut/Range_Topdown-min.jpg';
import walnutActual from '../../assets/Walnut/Walnut_actual-min.jpg';
import greybark from '../../assets/Grey_Bark/Grey_Bark_Beauty-min.jpg';
import greybarkTopdown from '../../assets/Grey_Bark/Grey_Bark_TopDown-min.jpg';
import greybarkActual from '../../assets/Grey_Bark/Grey_Bark_actual-min.jpg';
import warwickcastle from '../../assets/Warwick_Castle/WarwickCastle_Beauty-min.jpg';
import warwickcastleTopdown from '../../assets/Warwick_Castle/WarwickCastle_TopDown-min.jpg';
import warwickcastleActual from '../../assets/Warwick_Castle/WarwickCastle_actual-min.jpg';
const woodFlooringData = {
  light: {
    warwickCastle: {
      titles: ['Warwick Castle'],
      images: [warwickcastle, warwickcastleTopdown, warwickcastleActual],
      descriptions: [
        'This is an untreated smooth sanded oak plank. The first striking difference between this board and the other oak we sell is the pale colouration, the raw colour of seasoned oak. This creates a canvas full of rustic character to which any surface application can be added once installed on your floor.',
      ],
    },
    walnut: {
      titles: ['Walnut', 'Rich & Warm'],
      images: [walnut, walnutTopdown, walnutActual],
      descriptions: [
        'Traditionally proportioned random length planks are milled from mixed grade Black American Walnut. The surface is smooth sanded and sealed with matt aluminium oxide lacquer to accentuate the wonderfully varied grain and rich earthy walnut tones which over time mellow to suit the character of any interior space.',
      ],
    },
    greyBark: {
      titles: ['Grey Bark'],
      images: [greybark, greybarkTopdown, greybarkActual],
      descriptions: [
        'Beautifully crafted coloured floors created from an oak top layer which is lightly brushed to release the natural grain. Wood lye is then applied to bleach and colour the floors to create the deep lustred and distinctive oak tones and grain variations found in the collection.',
      ],
    },
  },
  dark: {},
};

export const lightwoodSliderData = {
  titles: [],
  descriptions: [],
  images: [],
  modalImageSets: [],
};

for (const product in woodFlooringData.light) {
  lightwoodSliderData.titles.push(woodFlooringData.light[product].titles[0]);
  lightwoodSliderData.descriptions.push(
    woodFlooringData.light[product].descriptions[0]
  );
  lightwoodSliderData.images.push(woodFlooringData.light[product].images[0]);
  lightwoodSliderData.modalImageSets.push(
    woodFlooringData.light[product].images
  );
}

export default woodFlooringData;
