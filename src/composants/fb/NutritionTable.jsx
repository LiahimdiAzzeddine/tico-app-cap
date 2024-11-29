import React, { useState } from "react";

const NutritionTable = ({ product }) => {
  const [unit, setUnit] = useState("100g");

  const organizeHierarchicalData = (lines) => {
    const hierarchy = [];
    const itemMap = new Map();

    lines.forEach(line => {
      itemMap.set(line.id, {
        ...line,
        children: [],
        value: {
          qt: line.quantity,
          unit: line.unit,
          vnr: line.vnr
        }
      });
    });

    lines.forEach(line => {
      const item = itemMap.get(line.id);
      if (line.parent && itemMap.has(line.parent)) {
        const parent = itemMap.get(line.parent);
        parent.children.push(item);
      } else {
        hierarchy.push(item);
      }
    });

    return hierarchy;
  };

  const calculatePortionValue = (value, portion) => {
    return (value / 100) * parseFloat(portion);
  };

  const NutritionRow = ({ item, level = 0, portion, parentId = '' }) => {
    const value = unit === "portion" && portion 
      ? calculatePortionValue(item.value.qt, portion)
      : item.value.qt;

    const rowKey = `${parentId}-${item.id}`;

    return (
      <>
        <tr key={rowKey} >
          <td style={{ paddingLeft: `${level * 1.5}rem`,color: `${item.parent==0?'#047857':''}` }} className="py-1">
            {item.name}
          </td>
          <td className="text-right py-1">
            {value?.toFixed(2)} {item.value.unit}
          </td>
          <td className="text-right text-gray-500 py-1">
            {item.value.vnr || "-"} %
          </td>
        </tr>
        {item.children?.map((child, index) => (
          <NutritionRow 
            key={`${rowKey}-${child.id}-${index}`}
            item={child} 
            level={level + 1} 
            portion={portion}
            parentId={item.id}
          />
        ))}
        
      </>
    );
  };

  const hierarchicalData = organizeHierarchicalData(product?.lines || []);

  console.log('Hierarchical Data:', hierarchicalData); // Debug log

  return (
    <div className="max-w-md p-2">
      <div className="flex items-center justify-center gap-6 p-4">
        <button
          onClick={() => setUnit("100g")}
          className={`font-medium py-1 rounded transition-colors ${
            unit === "100g"
              ? "text-emerald-700"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Par 100g
        </button>

        <div className="relative">
          <button
            onClick={() => setUnit(unit === "100g" ? "portion" : "100g")}
            className="w-14 h-7 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
            role="switch"
            aria-checked={unit === "portion"}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 bg-emerald-600 rounded-full transition-transform duration-200 ease-in-out ${
                unit === "portion" ? "translate-x-7" : ""
              }`}
            />
          </button>
        </div>

        <button
          onClick={() => setUnit("portion")}
          className={`font-medium py-1 rounded transition-colors ${
            unit === "portion"
              ? "text-emerald-700"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Par portion
        </button>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr>
            <th className="text-left font-medium text-emerald-700 pt-2">
              Général
            </th>
            <th className="text-right text-emerald-700 pt-2 font-bold">
              {unit === "100g" ? "Pour 100g" : "Par portion"}
            </th>
            <th className="text-right text-emerald-700 pt-2 font-bold">
              % VNR
            </th>
          </tr>
        </thead>
        <tbody>
          {hierarchicalData.map((item, index) => (
            <NutritionRow 
              key={`root-${item.id}-${index}`}
              item={item} 
              portion={product?.portion}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionTable;