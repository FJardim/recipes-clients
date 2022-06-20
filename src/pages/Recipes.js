import BannerPage from "../componentes/BannerPage";
import CardRecipes from "../componentes/CardRecipes";
import img1 from "../assets/img1.jpg";
import { Link } from "react-router-dom";
import MenuLeft from "../componentes/MenuLeft";
import useRecipes from "../hooks/useRecipes";
import { useState } from "react";
import SystemInfo from "../util/SystemInfo";
import Pagination from "../componentes/Pagination";
import ButtonOverview from "../componentes/ButtonOverview";
import ModalFiltre from "../componentes/ModalFiltre";


const Recipes = () => {

  const [showModalMenu, setShowModalMenu] = useState(false);
  const [recipesFilters, setRecipesFilters] = useState({
    page: 1,
    perPage: 12
  });

  const [{ recipes, total, numberOfPages, loading }, getRecipes] = useRecipes({ axiosConfig: { params: { ...recipesFilters } } });

  return (
    <div className="">
      <BannerPage image={img1} title="New Recipes" />
      <div className="container md:p-8">
        {/* <ButtonSupr /> */}
      </div>
      <div className="p-6">
        <ButtonOverview name="Filter" onClick={() => setShowModalMenu(true)} />
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-2">
          <MenuLeft />
          <div className="mt-10 md:mt-0 md:col-span-3">
            {
              loading &&
              <h1 className="text-4xl text-center">Cargando...</h1>
            }

            {
              recipes?.length === 0 && !loading ?
                <h1 className="text-4xl text-center text-red-500">
                  No results found.
                </h1>
                :
                null
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:grid-cols-3 md:mr-5">
              {
                recipes?.map((recipe, i) => {
                  return (
                    <Link to={`/recipes/${recipe?.slug}`} key={i}>
                      <CardRecipes
                        key={recipe.id}
                        texto={recipe.name}
                        price={`${recipe?.price}$`}
                        bolsaIng={recipe.numberOfDinners}
                        cestaIng={recipe.numberOfDinners}
                        timePre={recipe.preparationTime}
                        nameSellers={recipe.seller.name}
                        title={recipe.mealPeriods.map(mp => mp.name).join(' - ')}
                        foto={`${SystemInfo?.api}${recipe?.images?.[0]?.path}`}
                        hideCart
                        hideBag
                      />
                    </Link>
                  );
                })}
            </div>
            <br />
            <Pagination
              pages={numberOfPages}
              onChange={(page) => setRecipesFilters((oldFilters) => { return { ...oldFilters, page: page } })}
              activePage={recipesFilters?.page}
            />
          </div>
        </div>
      </div>
      <ModalFiltre show={showModalMenu} onClose={() => setShowModalMenu(false)} />
    </div >
  );
};
export default Recipes;
