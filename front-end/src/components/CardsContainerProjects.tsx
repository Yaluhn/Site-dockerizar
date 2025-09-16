import "../components/styles/CardsContainer.css";
import { useEffect, useState } from "react";
import { fetchAllPosts, NotionPost } from "../services/notion";
import CardProjects from "./CardProjects";

const CardsContainerProjects = () => {

    const [projetos, setProjetos] = useState<NotionPost[]>([]);
  
    useEffect(() => {
  const fetchProjetos = async () => {
    const allPosts = await fetchAllPosts();
    const projetosFiltrados = allPosts.filter(post => 
      post.category?.trim().toLowerCase() === "parceiros" 
    );

    setProjetos(projetosFiltrados);
  };

  fetchProjetos();
}, []);


  return (
    /* Exemplo de uso 
      <CardsContainerProjects/>
    */

    <div className="CardsContainer">
      <div className="cardsContainer-menu-projects">
        <h2 className="CardsContainer-title">
          Por Onde Passamos
        </h2>

      </div>
     
    <div className="cardsContainer-Wrapper">
        {projetos.map(projeto => (
  <CardProjects
    key={projeto.id} 
    title={projeto.titleCard}
    audience={projeto.forWho}
    subtitle={projeto.subtitleCard}
    description={projeto.descriptionCard}
    image={projeto.imageCard}
    themeColor={projeto.colorCard}
  />
  ))}
    </div>
      


    </div>
  );
};

export default CardsContainerProjects;
