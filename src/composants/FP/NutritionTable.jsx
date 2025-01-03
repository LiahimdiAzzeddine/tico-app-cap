import React, { useState, useMemo } from "react";
const NutritionTable = ({ product, portion }) => {
  const [unit, setUnit] = useState("100g");

  const organizeHierarchicalData = (lines) => {
    const hierarchy = [];
    const itemMap = new Map();

    lines.forEach((line) => {
      itemMap.set(line.id, {
        ...line,
        children: [],
        value: {
          qt: line.quantity,
          unit: line.unit,
          vnr: line.vnr,
        },
      });
    });

    lines.forEach((line) => {
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

  const calculatePortionVNR = (vnr, portion) => {
    return (vnr / 100) * parseFloat(portion);
  };

  const NutritionRow = ({ item, level = 0, portion, parentId = "" }) => {
    const value =
      unit === "portion" && portion
        ? calculatePortionValue(item.value.qt, portion)
        : item.value.qt;

    const vnr =
      unit === "portion" && portion
        ? calculatePortionVNR(item.value.vnr, portion)
        : item.value.vnr;

    const formattedValue = value % 1 === 0 ? value : value.toFixed(1);
    const formattedVNR = vnr % 1 === 0 ? vnr : vnr.toFixed(1);

    const rowKey = `${parentId}-${item.id}`;

    return (
      <>
        <tr key={rowKey}>
          <td
            style={{
              paddingLeft: `${level * 1.5}rem`,
              color: `${item.parent === 0 ? "#0F548D" : ""}`,
            }}
            className="py-1 Archivo"
          >
            {item.name}
          </td>
          <td className="text-right py-1 Archivo min-w-20">
            {value !== null && value !== undefined && value !== 0 ? (
              <>
                {formattedValue} {item.value.unit}
              </>
            ) : (
              ""
            )}
          </td>
          <td className="text-right text-gray-500 py-1 Archivo min-w-16">
            {vnr !== null && vnr !== undefined && vnr !== 0 ? (
              <>{formattedVNR} %</>
            ) : (
              ""
            )}
          </td>
        </tr>
        {item.children
          ?.filter(
            (child) => child.forced || (child.quantity && child.quantity !== "")
          )
          .map((child) => (
            <NutritionRow
              key={`${rowKey}-${child.id}`}
              item={child}
              level={level + 1}
              portion={portion}
              parentId={item.id}
            />
          ))}

        {item.parent === 0 && (
          <tr>
            <td colSpan="3">
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#bde4e1",
                  margin: "8px 0",
                }}
              />
            </td>
          </tr>
        )}
      </>
    );
  };

  const hierarchicalData = useMemo(
    () => organizeHierarchicalData(product?.lines || []),
    [product?.lines]
  );

  return (
    <div className="p-2">
      {hierarchicalData ? (
        <>
          {portion && portion != 0 && (
            <div className="flex items-center justify-center gap-6 p-4">
              <button
                onClick={() => setUnit("100g")}
                className={`font-medium Archivo py-1 rounded transition-colors ${
                  unit === "100g"
                    ? "text-custom-blue"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Par 100g
              </button>

              <div 
               onClick={() => setUnit(unit === "100g" ? "portion" : "100g")}
               className={`relative w-14 h-8 rounded-full cursor-pointer transition-colors duration-200 ${
                 unit === "portion" ? "bg-custom-blue" : "bg-gray-300"
               }`}
             >
               <div
                 className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 top-1 ${
                   unit === "portion" ? "translate-x-7" : "translate-x-1"
                 }`}
               />
             </div>

              <button
                onClick={() => setUnit("portion")}
                className={`font-medium py-1 rounded transition-colors Archivo ${
                  unit === "portion"
                    ? "text-custom-blue"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Par portion
              </button>
            </div>
          )}
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr>
                <th className="text-left font-medium text-custom-blue pt-2 min-w-20 ArchivoBold">
                  Général
                </th>
                <th className="text-right text-custom-blue pt-2 font-bold ArchivoBold">
                  {unit === "100g" ? "Pour 100g" : "Par portion"}
                </th>
                <th className="text-right text-custom-blue pt-2 font-bold min-w-16 ArchivoBold">
                  % VNR
                </th>
              </tr>
            </thead>
            <tbody>
              {hierarchicalData
                .filter(
                  (item) =>
                    item.forced ||
                    (item.quantity &&
                      item.quantity !== "" &&
                      item.quantity !== null)
                )
                .map((item) => (
                  <NutritionRow
                    key={`root-${item.id}`}
                    item={item}
                    portion={portion}
                  />
                ))}
            </tbody>
          </table>
        </>
      ) : (
        "N/A"
      )}
    </div>
  );
};

export default NutritionTable;
