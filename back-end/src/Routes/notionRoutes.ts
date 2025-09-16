import express from 'express';
import { Client } from '@notionhq/client';

const router = express.Router();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Interface para tipar o retorno
export interface NotionPost {
  id: string;
  imagePostBanner: string;
  author: string;
  date: string;
  title: string;
  initText: string;
  title1Notice: string;
  descriptionTitle1Notice: string;
  image1Notice: string;
  textAfterImage1Notice: string;
  listItem1Notice: string;
  listItem2Notice: string;
  listItem3Notice: string;
  listItem4Notice: string;
  subtitleNotice: string;
  afterSubtitleText1Notice: string;
  afterSubtitleText2Notice: string;
  Title2Notice: string;
  afterTitle2Text1Notice: string;
  afterTitle2Text2Notice: string;
  afterTitle2Text3Notice: string;
  image2Notice: string;
  imgLegend: string;
  afterImage2Text1: string;
  afterImage2Text2: string;
  category : string;
  highlight : string;
  sequence : string;
  forWho : string;
  btnProjetcts : string;
  colorCard : string;
  descriptionCard : string;
  titleCard : string;
  subtitleCard : string;
  imageCard : string;
  subCategoryForProjects : string;
}

// Função auxiliar para mapear propriedades
const mapNotionProperties = (page: any): NotionPost => {
  const { properties } = page;
  
  const getText = (propertyName: string) => {
    const prop = properties[propertyName];
    if (!prop) return '';
    return prop.rich_text?.[0]?.plain_text || //puxa todos os campos de input text do notion
           prop.text?.[0]?.plain_text || // puxa o titulo da página
           prop.date?.start || //puxa campos no formato date (ainda precisa revisar como normalizar create at | last edit )
           prop.select?.name || // campos de seleção única ou multiplo select (a última opção vem como array, necessário tratamento)
           prop.unique_id?.number.toString() || // campo de id de tabela, é informado number, mas ele pode possuír pré-fixo, se for informado um pré-fixo e ele for necessário para operação deverá trazer ambos os valores
           '';
  };

  const getImage = (propertyName: string) => {
    const prop = properties[propertyName];
    if (!prop || !prop.files || prop.files.length === 0) return '';
    return prop.files[0]?.file?.url || '';
  };

  return {
    id: page.id,
    imagePostBanner: getImage('Imagem Cabeçalho'),
    author: getText('Autor'),
    date: getText('Data de Postagem').replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1"), //replace com regex para ordenar data que vem em formato YYYY-MM-DD
    title: getText('Titulo Cabeçalho'),
    initText: getText('SubCabeçalho'),
    title1Notice: getText('Texto 1 - highlight'),
    descriptionTitle1Notice: getText('Primeiro Paragrafo'),
    image1Notice: getImage('Imagem 1'),
    textAfterImage1Notice: getText('Descritivo Imagem 1'),
    listItem1Notice: getText('Paragrafo 1 Imagem 1'),
    listItem2Notice: getText('Paragrafo 2 Imagem 1'),
    listItem3Notice: getText('Paragrafo 3 Imagem 1'),
    listItem4Notice: getText('Paragrafo 4 Imagem 1'),
    subtitleNotice: getText('Texto 2 - highlight'),
    afterSubtitleText1Notice: getText('Paragrafo 1 Highlight 2'),
    afterSubtitleText2Notice: getText('Paragrafo 2 Highlight 2'),
    Title2Notice: getText('Titulo Final - Highlight'),
    afterTitle2Text1Notice: getText('Paragrafo 1 Titulo Final'),
    afterTitle2Text2Notice: getText('Paragrafo 2 Titulo Final'),
    afterTitle2Text3Notice: getText('Paragrafo 3 Titulo Final'),
    image2Notice: getImage('Imagem Final'),
    imgLegend: getText('Legenda Imagem Final'),
    afterImage2Text1: getText('Paragrafo Fim 1'),
    afterImage2Text2: getText('Paragrafo Fim 2'),
    category: getText('Categoria'),
    highlight: getText('Controle de Postagem'),
    sequence : getText('sequence'),
    forWho : getText('Card Descrição Fim'),
    btnProjetcts : getText('Card Botão'),
    colorCard : getText('Card Cor'),
    descriptionCard : getText('Card Descrição 1'),
    titleCard : getText('Card Titulo'),
    subtitleCard : getText('Card Subtitulo'),
    imageCard : getImage('Card Imagem'),
    subCategoryForProjects : getText('SubCategoria'),
  };
};

// Rota para buscar um post específico
router.get('/post/:id', async (req, res) => {
  try {
    const pageId = req.params.id;
    const page = await notion.pages.retrieve({ page_id: pageId });
    const mappedPost = mapNotionProperties(page);
    res.json(mappedPost);
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    res.status(500).json({ error: 'Falha ao carregar o post' });
  }
});

// Rota para buscar todos os posts
router.get('/posts', async (req, res) => {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID!;
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{
        property: "Data de Postagem",
        direction: "descending"
      }]
    });
    
    const posts = response.results.map(mapNotionProperties);
    res.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({ error: 'Falha ao carregar posts' as string });
  }
});

export default router;