import React from "react";

function NameProduct(props) {
  return (
    <div className="flex flex-col  py-1 text-center items-center	px-4">
      <h3 className="text-4xl text-center titre-roboto-bold text-[#0f548d]">{props.Name}</h3>
      <div className="text-2xl text-[#47a29a] mt-1 ">{props.Brand}</div>
    </div>
  );
}

export default NameProduct;
