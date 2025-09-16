import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Parceiros from './pages/Parceiros.tsx'
import FaleComnosco from './pages/FaleComnosco.tsx'
import Servicos from './pages/Servicos.tsx'
import NossosProjetos from './pages/NossosProjetos.tsx'
import Blog from './pages/Blog.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import NewsPost from './pages/NewPost.tsx'
import Projetos from './pages/Projetos.tsx'
import NewsPostProjects from './pages/NewPostProjects.tsx'


const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
  },
  {
    path:'/parceiros',
    element: <Parceiros/>, 
  },
  {
    path:'/fale-conosco',
    element: <FaleComnosco/>,
  },
  {
    path:'/servicos',
    element: <Servicos/>,
  },
  {
    path:'/nossos-projetos',
    element: <NossosProjetos/>,
  },
  {
    path:'/blog',
    element: <Blog/>,
  },
  {
    path:'/projetos',
    element : <Projetos/>,
  },
    {
    path:'/post-projects/:id',
    element : <NewsPostProjects/>,
  },
  {
   path: '/post/:id',
   element : <NewsPost />
  }
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
