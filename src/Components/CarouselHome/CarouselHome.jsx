import Carousel from 'react-bootstrap/Carousel';
import image1 from '../../imagenes/image1.gif';
import image2 from '../../imagenes/image2.jpg';
import image3 from '../../imagenes/image3.jpg';


function CarouselHome() {
  return (
    <Carousel>
      <Carousel.Item interval={5000}>
        <img className="d-block w-100" src={image1} alt="img1"/>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img className="d-block w-100" src={image2} alt="img2"/>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
      <img className="d-block w-100" src={image3} alt="img3"/>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;