import React, { useState } from 'react';

const NutritionTable = () => {
  const [unit, setUnit] = useState('100g');

  // Exemple de données nutritionnelles
  const nutritionData = {
    '100g': {
      energy: { kcal: 135, kj: 555 },
      fats: 555,
      saturatedFats: 555,
      monounsaturatedFats: 555,
      omega3to6: '1/4'
    },
    'portion': {
      energy: { kcal: 270, kj: 1110 },
      fats: 1110,
      saturatedFats: 1110,
      monounsaturatedFats: 1110,
      omega3to6: '1/4'
    }
  };

  const handleSwitch = (value) => {
    setUnit(value);
  };

  return (
    <div className="max-w-md p-2">
      <div className="flex items-center gap-4 mb-4">
        {/* Switch buttons */}
        <div className="flex items-center">
          <span
            className={`cursor-pointer px-3 py-1 rounded-full font-semibold ${
              unit === '100g' ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => handleSwitch('100g')}
          >
            Par 100g
          </span>
          <span
            className={`cursor-pointer px-3 py-1 rounded-full font-semibold ${
              unit === 'portion' ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => handleSwitch('portion')}
          >
            Par portion
          </span>
        </div>
      </div>

      {/* Tableau des données nutritionnelles */}
      <table className="w-full text-sm text-gray-700">
        <tbody>
          <tr>
            <td colSpan="1" className="font-medium text-emerald-700 pt-2">Général</td>
            <td colSpan="1" className="text-right text-emerald-700 pt-2 font-bold">Pour 100g</td>
            <td colSpan="1" className="text-right text-emerald-700 pt-2 font-bold">% VNR</td>
          </tr>
          <tr>
            <td>Énergie</td>
            <td className="text-right">{nutritionData[unit].energy.kcal} kcal</td>
            <td className="text-right text-gray-500">6 %</td>
          </tr>
          <tr>
            <td></td>
            <td className="text-right text-gray-500">{nutritionData[unit].energy.kj} kJ</td>
            <td></td>
          </tr>

          <tr>
            <td className="font-medium pt-4">Graisses</td>
            <td className="text-right">{nutritionData[unit].fats} g</td>
            <td></td>
          </tr>
          <tr>
            <td className="pl-4 text-gray-600">Dont AGS</td>
            <td className="text-right">{nutritionData[unit].saturatedFats} g</td>
            <td></td>
          </tr>
          <tr>
            <td className="pl-4 text-gray-600">Dont AGMI</td>
            <td className="text-right">{nutritionData[unit].monounsaturatedFats} g</td>
            <td></td>
          </tr>
          
          <tr>
            <td className="pl-4 text-gray-600">Dont Oméga 9</td>
            <td></td>
            <td></td>
          </tr>
          <tr className="text-gray-600">
            <td className="pl-8">Dont Oméga 3 - ALA</td>
            <td></td>
            <td></td>
          </tr>
          <tr className="text-gray-600">
            <td className="pl-8">Dont Oméga 3 - EPA</td>
            <td></td>
            <td></td>
          </tr>
          <tr className="text-gray-600">
            <td className="pl-8">Dont Oméga 3 - DHA</td>
            <td></td>
            <td></td>
          </tr>
          <tr className="text-gray-600">
            <td className="pl-8">Dont Oméga 6 - AL</td>
            <td></td>
            <td></td>
          </tr>
          <tr className="text-gray-600">
            <td className="pl-4">Rapport Oméga 3/6</td>
            <td className="text-right">{nutritionData[unit].omega3to6}</td>
            <td></td>
          </tr>

          {['Glucides', 'Dont sucres', 'Fibres', 'Protéines', 'Sel'].map(item => (
            <tr key={item}>
              <td className="font-medium pt-4">{item}</td>
              <td></td>
              <td></td>
            </tr>
          ))}

          <tr>
            <td colSpan="3" className="font-medium text-emerald-700 pt-4">Vitamines</td>
          </tr>
          {['Vitamine D', 'Vitamine K'].map(vitamin => (
            <tr key={vitamin}>
              <td className="pl-4">{vitamin}</td>
              <td></td>
              <td></td>
            </tr>
          ))}

          <tr>
            <td colSpan="3" className="font-medium text-emerald-700 pt-4">Minéraux</td>
          </tr>
          <tr>
            <td className="pl-4">Calcium</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NutritionTable;
