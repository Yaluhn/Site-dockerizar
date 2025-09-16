import Footer from "../components/Footer";
import '../components/styles/Pages.css'
import '../components/styles/Parceiros.css'
import HeaderInternal from "../components/Header";
import ContactBanner from "../components/ContactBanner";
import BannerWho from "../components/BannerWho";
import TopHeader from "../components/TopHeader";
import ObjectMDecoretionM2 from "../components/ObjectDecoretionM2";
import ObjectPDecoretion from "../components/ObjectPDecoretion";
import CardsContainerProjects from "../components/CardsContainerProjects";



const Parceiros = () => {
  return(
    <>
    
    <div className="parceiros">
      <TopHeader/>
      <HeaderInternal/>
        <div className="Content-parceiros">
          <BannerWho/>
          <CardsContainerProjects/>
          <ContactBanner id={1} forWho="" adtinionalInfo="" titleColor="#FFFFFF"/>
          <ObjectMDecoretionM2 style={{position:'absolute', bottom:"-60px", right:"50%" }}/>
          <ObjectPDecoretion style={{position : 'absolute', bottom:'-60px' , right:'48%', backgroundColor : '#FEC820'}} />
        </div>
      
    </div>
    <Footer/>
    </>
  )
};
export default Parceiros;