import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./componentes/AppLayout";
import Recipes from "./pages/Recipes";
import Categories from "./pages/Categories";
import PlanDetail from "./pages/PlanDetail";
import Combos from "./pages/Combos";
import RecipesSellers from "./pages/RecipesSellers";
import CombosSellers from "./pages/CombosSellers";
import BlogChef from "./pages/BlogChef";
import Sellers from "./pages/Sellers";
import RecipesDetail from "./pages/RecipesDetail";
import Plans from "./pages/Plans";
import CombosDetail from "./pages/CombosDetail";
import MyAccountLayout from "./componentes/MyAccountLayout";
import OverviewUser from "./pages/OverviewUser";
import MyFavoritesUser from "./pages/MyFavoritesUser";
import Contactus from "./pages/Contactus";
import MyShoppingList from "./pages/MyShoppingList";
import Saves from "./pages/Saves";
import AccountInfo from "./pages/AccountInfo";
import Configuration from "./pages/Configuration"
import MealPlanOverview from "./pages/MealPlanOverview";
import PaymentMethod from "./pages/PaymentMethod"
import RequireAuth from "./componentes/RequireAuth";
import { FeedBackProvider } from "./contexts/FeedBackContext";
import FeedbackComponents from "./componentes/FeedbackComponents/FeedbackComponents";
import PlansSellers from "./pages/PlansSellers";

function App() {
  return (
    <BrowserRouter>
      <FeedBackProvider>
        <FeedbackComponents />
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/plan/:slug" element={<PlanDetail />} />
            <Route path="/combos" element={<Combos />} />
            <Route path="/sellers/:slug/recipes" element={<RecipesSellers />} />
            <Route path="/sellers/:slug/plans" element={<PlansSellers />} />
            <Route path="/sellers/:slug/combos" element={<CombosSellers />} />
            <Route path="/sellers/:slug/blog" element={<BlogChef />} />
            <Route path="/sellers" element={<Sellers />} />
            <Route path="/recipes/:slug" element={<RecipesDetail />} />
            <Route path="/combos/:slug" element={<CombosDetail />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/payment" element={<PaymentMethod />} />
            <Route element={
              <RequireAuth>
                <MyAccountLayout />
              </RequireAuth>
            }>
              <Route path="/accountinfo" element={<AccountInfo />} />
              <Route path="/configuration" element={<Configuration />} />
              <Route path="/overview" element={<OverviewUser />} />
              <Route path="/favorites" element={<MyFavoritesUser />} />
              <Route path="/shopping" element={<MyShoppingList />} />
              <Route path="/contactus" element={<Contactus />} />
              <Route path="/saves" element={<Saves />} />
              <Route path="/meanplanoverview" element={<MealPlanOverview />} />
            </Route>
          </Routes>
        </AppLayout>
      </FeedBackProvider>
    </BrowserRouter>
  );
}

export default App;
