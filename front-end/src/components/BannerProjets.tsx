import React from "react";
import "../components/styles/BannerProjetos.css" 

interface BannerProjetosProps{
  title : string;
  highlight : string; 
  text1 : string;
  text2 : string;
  text3 : string;
  image : string;
  imageAlt : string;
}

const BannerProjets:React.FC<BannerProjetosProps>  = ({title,text1,text2,text3,image,imageAlt}) =>{
  return(
    /* Exemplo de uso 
          <BannerProjetos title= {projetos[0].title} 
          image= {projetos[0].imagePostBanner1}
          highlight= {projetos[0].author}
          text1= {projetos[0].afterTitle2Text1Notice}
          text2= {projetos[0].afterTitle2Text2Notice}
          text3= {projetos[0].afterTitle2Text3Notice}
          imageAlt={projetos[0].title} 
          
        />
    */

  <div className="BannerProjetos-wrapper">
    <div className="BannerProjetos-content">
      <h1 className="BannerProjetos-title">{title} Para <span className="BannerProjetos-highlight">Transformar</span></h1>
      <p className="BannerProjetos-text1">{text1}</p>
      <p className="BannerProjetos-text2">{text2}</p>
      <p className="BannerProjetos-text3">{text3}</p>
    </div>
    <div className="BannerProjetos-img">
      <img src={image} alt={imageAlt}/>
    </div>
  </div>

  )
}

export default BannerProjets;