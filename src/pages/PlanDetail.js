import Coco from "../assets/coco.jpg";
import ProductImagesCarousel from "../componentes/ProductImagesCarousel";
import ProductInfo from "../componentes/ProductInfo";
import { TabsProvider } from "../contexts/TabsContext";
import Tab from "../componentes/Tab";
import TabsContainer from "../componentes/TabsContainer";
import TabPanel from "../componentes/TabPanel";
import IngredientRow from "../componentes/IngredientRow";
import IngredientRowDetails from "../componentes/IngredientRowDetails";
import Checkbox from "../componentes/Checkbox";
import Calendar from "../componentes/Calendar";
import WaPay from "../componentes/WaPay";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from '../hooks/useAxios';
import { useEffect, useState } from "react";
import SystemInfo from "../util/SystemInfo";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import clsx from "clsx";
import { useFeedBack } from "../contexts/FeedBackContext";
import favoriteTypes from "../consts/favoriteTypes";

const PlanDetail = () => {
    const { setLoading } = useFeedBack();

    const { slug } = useParams();

    const navigate = useNavigate();

    const [{ data }] = useAxios({ url: `/plans/${slug}` }, { useCache: false });

    const [{ data: createFavoriteData, loading: createFavoriteLoading }, createFavorite] = useAxios({ url: '/favorites', method: 'POST' }, { manual: true });

    const [{ data: toggleSavedData, loading: toggleSavedLoading }, toggleSaved] = useAxios({ url: '/saved/toggle', method: 'POST' }, { manual: true });

    const [selectedDay, setSelectedDay] = useState(null);

    const [selectedPeriod, setSelectedPeriod] = useState(null);

    const [currentPlan, setCurrentPlan] = useState();

    const [currentWeeks, setCurrentWeeks] = useState([]);

    useEffect(() => {
        if (data) {
            setCurrentPlan(data);
        }
    }, [data]);

    useEffect(() => {
        setLoading({ message: 'Cargando', show: createFavoriteLoading });
    }, [createFavoriteLoading]);

    useEffect(() => {
        setLoading({ message: 'Guardando', show: toggleSavedLoading });
    }, [toggleSavedLoading]);

    useEffect(() => {
        if (createFavoriteData) {
          navigate(createFavoriteData.nextSlug ? `/plans/${createFavoriteData.nextSlug}` : '/plans', { replace: true });
        }
    }, [createFavoriteData]);

    useEffect(() => {
        if (currentPlan?.fullPlanDays?.length > 0) {

            var weeks = [];

            var week = [];

            currentPlan?.fullPlanDays?.forEach((planday, i) => {
                if (week.length === 7) {
                    weeks = [...weeks, {
                        week: weeks?.length + 1,
                        days: week
                    }];

                    week = [];
                    week.push(planday);
                } else {
                    week.push(planday);
                }
            });

            weeks = [...weeks, {
                week: weeks?.length + 1,
                days: week
            }];
            setCurrentWeeks(weeks);
        }
    }, [currentPlan]);

    useEffect(() => {
        if (typeof toggleSavedData !== 'undefined') {
            setCurrentPlan(prevData => ({
                ...prevData,
                saved: toggleSavedData,
            }));
        }
    }, [toggleSavedData]);

    const handleFavoriteClicked = ({ type, reaction }) => {
        if (!currentPlan) {
            return;
        }
    
        createFavorite({
            data: {
                type,
                reaction,
                planId: currentPlan.id
            }
        });
    }
    
    const handleSavedClicked = ({ type }) => {
        if (!currentPlan) {
            return;
        }
        
        toggleSaved({ data: {
            type,
            planId: currentPlan.id,
        }});
    }

    const handleDay = (e, day) => {
        setSelectedDay(day);
        setSelectedPeriod(day?.mealPeriods?.[0])
    }

    return (
        <>
            <div className="p-4 md:p-16">
                <div className="flex container p-2 md:space-x-6 md:p-2">
                    {/* Imagenes carousel */}
                    <div className="md:w-1/2 md:flex md:flex-col">
                        <ProductImagesCarousel images={currentPlan?.images} />
                    </div>

                    {/* ProductInfo*/}
                    <ProductInfo
                        name={currentPlan?.name}
                        details={currentPlan?.uniqueRecipes}
                        detailsLabel={"Recipes:"}
                        ingredients={[]}
                        price={`$${currentPlan?.price}`}
                        saved={currentPlan?.saved}
                        onSaveClicked={handleSavedClicked}
                        onFavoriteClicked={handleFavoriteClicked}
                        type={favoriteTypes.PLAN}
                    />
                </div>
                {/* Calendar */}
                <div className="mt-4 rounded-lg bg-white container w-full h-full grid grid-cols-2 md:grid-cols-1">
                    {currentWeeks?.map((week, i) => {
                        return <Calendar
                            onDayClick={handleDay}
                            key={i}
                            week={week}
                        />
                    })}
                </div>

                {/* Recipes day */}
                {
                    selectedDay &&
                    <h1 className="text-center mt-8 md:text-6xl text-3xl font-bold">
                        Day {selectedDay?.day}
                    </h1>
                }
                <div className="container md:p-8">
                    {
                        selectedDay ?
                            <div className="grid grid-cols-1 justify-center space-x-4 md:flex m-auto mb-4">
                                {
                                    selectedDay?.mealPeriods?.map((period, i) => {
                                        return <div
                                            className={clsx(["cursor-pointer hover:border-b hover:border-main"], { "border-b border-main": selectedPeriod?.id === period?.id })}
                                            key={i}
                                            onClick={() => { setSelectedPeriod(period) }}
                                        >
                                            {period?.name} ({period?.recipes?.length})
                                        </div>
                                    })
                                }
                            </div>
                            :
                            null
                    }

                    {
                        selectedPeriod &&
                        <div className="md:grid md:grid-cols-2 md:gap-14 space-y-4">
                            {
                                selectedPeriod?.recipes?.map((recipe, i) => <div className="md:grid md:grid-cols-3 bg-white rounded">
                                    <div style={{ minHeight: "200px", background: `url(${SystemInfo?.api}${recipe?.recipeImages[0]?.path})`, backgroundSize: 'cover', backgroundPosition: "center" }} className="rounded"></div>
                                    <div className="p-4 text-gray-400 col-span-2 space-y-1">
                                        <div className="md:grid md:grid-cols-3 items-center">
                                            <h4 className="font-bold col-span-2">{recipe?.name}</h4>
                                            <h4 className="text-black text-xl col-span-1 text-right">
                                                {recipe?.price}$
                                            </h4>
                                        </div>
                                        <p>{recipe?.shortDescription?.length > 35 ? `${recipe?.shortDescription?.slice(0, 35)}...` : recipe?.shortDescription}</p>
                                        <div className="flex">
                                            <AiFillStar className="mt-2 text-yellow-300" />
                                            <AiFillStar className="mt-2 text-yellow-300" />
                                            <AiFillStar className="mt-2 text-yellow-300" />
                                            <AiFillStar className="mt-2 text-yellow-300" />
                                            <AiOutlineStar className="mt-2 text-gray-300" />
                                        </div>
                                        <p>
                                            <b>Level: </b> Expert
                                        </p>
                                        <p>
                                            <b>Time: </b> {recipe?.preparationTime} minutes.
                                        </p>
                                    </div>
                                </div>)
                            }
                        </div>
                    }
                </div>
                <TabsProvider>
                    {/* Tabs */}
                    <TabsContainer className="md:flex flex md:m-10 m-2 mt-6 text-center">
                        <Tab value={0}>Preparation</Tab>
                        <Tab value={1}>Ingredients purchase List</Tab>
                        <Tab value={2}>Ingredients price Comparator</Tab>
                    </TabsContainer>

                    {/* TAB PANELS */}
                    {/* Preparation */}
                    < div className="mt-4 md:p-4" >
                        <TabPanel
                            className="animate__animated animate__fadeInUp  bg-white rounded-lg "
                            value={0}
                        >
                            <p className="text-justify p-4">
                                Open our coconut, and save the water that it brings inside,
                                since we will not use it. Extract the meat from the coconut, cut
                                into small cubes and set aside. Put the coconut pieces, coconut
                                milk and condensed milk in the blender, and blend for a couple
                                of minutes, or until thick.{" "}
                            </p>
                            <p className="text-justify p-4">
                                Once we take out our cocada, we add sugar and cinnamon to taste,
                                and serve.
                            </p>
                        </TabPanel>

                        {/* Ingredients purchase List */}
                        < TabPanel
                            className="animate__animated animate__fadeInUp bg-white rounded-lg"
                            value={1}
                        >
                            <IngredientRow>
                                <IngredientRowDetails
                                    title={"Noodles"}
                                    subtitle={"1 kg"}
                                    imageSource={Coco}
                                />
                                <div className="flex items-center ml-28 ">
                                    <Checkbox />
                                </div>
                            </IngredientRow>
                            <IngredientRow>
                                <IngredientRowDetails
                                    title={"Noodles"}
                                    subtitle={"1 kg"}
                                    imageSource={Coco}
                                />
                                <div className="flex items-center ml-28">
                                    <Checkbox />
                                </div>
                            </IngredientRow>
                            <IngredientRow>
                                <IngredientRowDetails
                                    title={"Noodles"}
                                    subtitle={"1 kg"}
                                    imageSource={Coco}
                                />
                                <div className="flex items-center ml-28">
                                    <Checkbox />
                                </div>
                            </IngredientRow>
                        </TabPanel>

                        {/* Ingredients price Comparator */}
                        <TabPanel
                            className="animate__animated animate__fadeInUp bg-white rounded-lg"
                            value={2}
                        >
                            <WaPay />
                        </TabPanel>
                    </div>
                </TabsProvider>
            </div>
        </>
    );
};

export default PlanDetail;
