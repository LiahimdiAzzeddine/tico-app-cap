import React from 'react'
import FICHETOP from "../../../assets/fb/FICHETOP.svg";

function LabelsInfo() {
  return (
    <div className="bg-custom-green-clear rounded-e-[2.5rem] left-0 w-[95%] min-h-72 z-0">
    <h1 className="text-2xl text-custom-blue font-bold py-3 px-2">
      <span className="marker-effect">titre</span>
    </h1>
    <div className="px-4 py-1 flex flex-col gap-1">
      <div className="indent-8 text-sm text-custom-green-text">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus esse
        deserunt eius. Sint dignissimos voluptatem perferendis cum totam!
        Maiores hic natus quaerat iure quibusdam atque tempora accusantium in
        non. Molestias!
      </div>
      <div className="indent-8 text-sm text-custom-green-text">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
        dolores est eos distinctio, quo dicta fugit inventore nihil placeat
        non similique accusantium ipsam veniam laborum quis mollitia quisquam
        culpa. Vel!
      </div>
    </div>
  </div>
  )
}

export default LabelsInfo