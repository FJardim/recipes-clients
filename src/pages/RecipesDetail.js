import ProductImagesCarousel from "../componentes/ProductImagesCarousel";
import ProductInfo from "../componentes/ProductInfo";
import { TabsProvider } from "../contexts/TabsContext";
import Tab from "../componentes/Tab";
import TabsContainer from "../componentes/TabsContainer";
import TabPanel from '../componentes/TabPanel';
import DescriptionCard from "../componentes/DescriptionCard";
import useAxios from '../hooks/useAxios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFeedBack } from '../contexts/FeedBackContext';
import imgUrl from "../helpers/imgUrl";
import useRecipe from "../hooks/useRecipe";
import favoriteTypes from "../consts/favoriteTypes";
import { BsTelephone } from "react-icons/bs";

const RecipesDetail = () => {
  const { setLoading } = useFeedBack();

  const { slug } = useParams();

  const navigate = useNavigate();

  const [{ recipe, recipeLoading, setRecipe }] = useRecipe(slug);

  const [{ data: createFavoriteData, loading: createFavoriteLoading }, createFavorite] = useAxios({ url: '/favorites', method: 'POST' }, { manual: true });

  const [{ data: toggleSavedData, loading: toggleSavedLoading }, toggleSaved] = useAxios({ url: '/saved/toggle', method: 'POST' }, { manual: true });

  useEffect(() => {
    setLoading({ message: 'Cargando receta', show: recipeLoading });
  }, [recipeLoading]);

  useEffect(() => {
    setLoading({ message: 'Cargando', show: createFavoriteLoading });
  }, [createFavoriteLoading]);

  useEffect(() => {
    setLoading({ message: 'Guardando', show: toggleSavedLoading });
  }, [toggleSavedLoading]);

  useEffect(() => {
    if (createFavoriteData) {
      navigate(createFavoriteData.nextSlug ? `/recipes/${createFavoriteData.nextSlug}` : '/recipes', { replace: true });
    }
  }, [createFavoriteData]);

  useEffect(() => {
    if (typeof toggleSavedData !== 'undefined') {
      setRecipe(prevData => ({
        ...prevData,
        saved: toggleSavedData,
      }));
    }
  }, [toggleSavedData]);

  const handleFavoriteClicked = ({ type, reaction }) => {
    if (!recipe) {
      return;
    }

    createFavorite({
      data: {
        type,
        reaction,
        recipeId: recipe.id
      }
    });
  }

  const handleSavedClicked = ({ type }) => {
    if (!recipe) {
      return;
    }

    toggleSaved({
      data: {
        type,
        recipeId: recipe.id,
      }
    });
  }

  return (
    <>
      <div className="p-4 md:p-16">
        <div className="flex container p-2 md:space-x-6 md:p-2">
          {/* Imagenes carousel */}
          <div className="md:w-1/2 md:flex md:flex-col">
            <ProductImagesCarousel images={recipe?.images} />
          </div>

          {/* ProductInfo*/}
          <ProductInfo
            name={recipe?.name}
            price={`$${recipe?.price}`}
            ingredients={recipe?.recipeIngredients}
            onFavoriteClicked={handleFavoriteClicked}
            onSaveClicked={handleSavedClicked}
            saved={recipe?.saved}
            type={favoriteTypes.RECIPE}
            description={recipe?.shortDescription}
          />
        </div>

        <DescriptionCard
          showMarketButtons
          hideMarketButtons
          recipe={recipe}
        />

        <TabsProvider>
          {/* Tabs */}
          <TabsContainer className="md:flex flex md:m-10 m-2 mt-6 text-center">
            <Tab value={0}>Vendedor</Tab>
            <Tab value={1}>Descripción</Tab>
          </TabsContainer>

          {/* TAB PANELS */}
          {/* Vendedor */}
          <div className="mt-4 md:p-4">
            <TabPanel
              className="animate__animated animate__fadeInUp  bg-white rounded-lg"
              value={0}
            >
              <ul className="space-y-4">
                <li>
                  <img
                    className="w-full h-48 object-cover"
                    src={imgUrl(recipe?.seller.banner)}
                    alt=""
                  />
                </li>
                <li className="flex justify-between items-center p-4">
                  <div className="flex items-center space-x-2">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={imgUrl(recipe?.seller.logo)}
                      alt=""
                    />
                    <b>{recipe?.seller?.name}</b>
                  </div>
                  <p className="flex items-center space-x-1"><BsTelephone /> <span>{recipe?.seller.phoneNumber}</span></p>
                </li>
              </ul>
            </TabPanel>

            {/* Descripción */}
            <TabPanel
              className="animate__animated animate__fadeInUp bg-white rounded-lg p-4"
              value={1}
            >
              {recipe?.description}
            </TabPanel>
          </div>
        </TabsProvider>
      </div>
    </>
  );
};

export default RecipesDetail;
