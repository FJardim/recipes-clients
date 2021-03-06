import { TabsProvider } from "../contexts/TabsContext";
import TabPanel from "../componentes/TabPanel";
import Tab from "../componentes/Tab";
import TabsContainer from "../componentes/TabsContainer";
import Checkbox from "../componentes/Checkbox";
import AmazonF from "../assets/Img-button/Amazon-Logo.jpg";
import Instacart from "../assets/Img-button/Instacart-Logo.webp";
import Walmart from "../assets/Img-button/Walmart-Logo.png";
import TotalShopping from "../componentes/TotalShopping";
import TotalShoppingPrecio from "../componentes/TotalShoppingPrecio";

const MyShoppingList = () => {

    const info = [
        { id: 1, name: '1 pack of dried funghi' },
        { id: 2, name: '1 pack 400g butter' },
        { id: 3, name: '1 pack sliced paris mushrooms' },
        { id: 4, name: '1 pack sliced shiltake mushrooms and funghi' },
        { id: 5, name: '1 pack separate shimeji mushrooms' },
        { id: 6, name: '1 galon of milk' },
        { id: 7, name: '1 packet of thyme' },
        { id: 8, name: '1 bottle olive oil 16oz' },
        { id: 9, name: '1 bag 3lb onion' },
        { id: 10, name: '1 garlic bunch' },
        { id: 11, name: '1 pack 2lb tree rice' },
        { id: 12, name: '1 bottle dry white wine' },
        { id: 13, name: '2 quarts vegetable broth' },
        { id: 14, name: '5 lb potato' },
    ];

    return (
        <div className="flex">
            <div className="container p-4 md:p-20 h-full w-full mb-20">
                <p className="md:text-4xl text-2xl text-center md:text-justify font-bold text-black mb-6 md:mb-12">My Shopping List</p>
                <div className="bg-white p-8 md:p-10 rounded-lg h-full w-full shadow">
                    <TabsProvider>
                        {/* Tabs */}
                        <TabsContainer className="flex m-4 md:space-x-40">
                            <Tab value={0}>Today</Tab>
                            <Tab value={1}>Weekly</Tab>
                            <Tab value={2}>Plans</Tab>
                        </TabsContainer>
                        {/* TAB PANELS */}
                        {/* TODAY */}
                        <div className="p-4 border-b md:mb-8 ">
                            <TabPanel className="animate__animated animate__fadeInUp  bg-white rounded-lg" value={0}>
                                <div className='p-2 md:space-y-4 space-y-2'>
                                    {info.map(info => <div className="md:m-4 md:grid md:grid-cols-2 md:gap-96" key={info.id}>
                                        {info.name}
                                        <Checkbox className="ml-2" />
                                    </div>)}
                                </div>
                            </TabPanel>
                            {/* WEEKLY*/}
                            <TabPanel className="animate__animated animate__fadeInUp  bg-white rounded-lg" value={1}>
                                <div className='p-2 space-y-4'>
                                    {info.map(info => <div className="md:m-4 md:grid md:grid-cols-2 md:gap-96" key={info.id}>
                                        {info.name}
                                        <Checkbox className="ml-2" />
                                    </div>)}
                                </div>
                            </TabPanel>
                            {/* PLANS*/}
                            <TabPanel className="animate__animated animate__fadeInUp  bg-white rounded-lg" value={2}>
                                <div className='p-2 space-y-4'>
                                    {info.map(info => <div className="md:m-4 md:grid md:grid-cols-2 md:gap-96" key={info.id}>
                                        {info.name}
                                        <Checkbox className="ml-2" />
                                    </div>)}
                                </div>
                            </TabPanel>
                        </div>
                    </TabsProvider>
                    <div className="grid grid-cols-2 h-full md:grid-cols-1 w-full">
                        <div className="space-y-10">
                            <div className="p-4">
                                <p className="ml-4 md:text-2xl text-lg font-bold text-gray-400">Total:</p>
                            </div>
                            <TotalShoppingPrecio price={"$ 102.00"} />
                            <TotalShoppingPrecio price={"$ 102.00"} />
                            <TotalShoppingPrecio price={"$ 100.00"} />
                        </div>
                        <div className="">
                            <div className="p-4">
                                <p className="ml-4 md:text-2xl text-lg font-bold text-gray-400">Enviamelo con:</p>
                            </div>
                            <TotalShopping img={Instacart} />
                            <TotalShopping img={AmazonF} />
                            <TotalShopping img={Walmart} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyShoppingList;