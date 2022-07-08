import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import TagsPage from "./Pages/TagsPage";
import NewsPage from "./Pages/NewsPage";
import CategoryPage from "./Pages/CategoryPage";
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
        <Routes>
            <Route path="/" element={<TagsPage/>}/>
            <Route path="/news" element={<NewsPage/>}/>
            <Route path="/categories" element={<CategoryPage/>}/>
        </Routes>
       <Footer />
    </>
  );
}

export default App;
