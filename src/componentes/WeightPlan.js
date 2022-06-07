import ButtonCart from "./ButtonCart";

const WeightPlan = ({ img, precio, logo, title, text, hideCart = false }) => {
    return (
        <div className="p-4">
            <div className="relative h-64 w-full flex bg-main rounded-md cursor-pointer bg-cover" style={{ backgroundImage: `url(${img})` }}>
                <div className="absolute bg-black opacity-40 rounded-md ">
                </div>
                <div className="absolute flex left-1 top-1 bg-main-dark rounded-lg opacity-70">
                    <p className="text-white h-6 w-15 ml-1 ">{precio}  </p>
                </div>
                <img className="absolute right-2 top-1 rounded md:h-20 md:w-20" src={logo} alt="Logo" />



                <div className="text-white text-center w-full mt-36 md:text-4xl" style={{ textShadow: "0px 0px 3px #000000" }}>
                    {title}
                    <p className="text-white my-2 text-center md:text-sm m-4">{text}</p>
                </div>

                <div className="bg-white mb-2 rounded-b-lg overflow-hidden">
                    {!hideCart &&
                        <div className="flex justify-center">
                            <ButtonCart />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default WeightPlan;