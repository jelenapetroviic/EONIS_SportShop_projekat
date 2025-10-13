import ReactStars from "react-stars";

const Product = ({img}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[550px] m-[10px] cursor-pointer">
            <img src={img} alt="" className="h-[400px] w-[300px] bg-cover" />
            <h2 className="font-semibold text-[18px] w-[300px]">
              Rosehip Seed, Argan, Sweet Almond & Vitamin E Oil-Anti-aging
            </h2>
            <span className="text-[18px] font-semibold flex items-center justify-center">
              $100
            </span>
            <span className="flex items-center">
              <ReactStars
                count={5}
                value={2.8}
                size={30}
                color2={"#ffd700"}
                edit={false}
              /> 
              <span className="ml-2 text-[18px] text-gray-700">(2)</span>
            </span>
          </div>
  )
}

export default Product
