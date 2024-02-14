"use client";
import { useState } from 'react';

import {
  Filter,
  FilterOptions,
  ShowOptions,
} from '@/Ts/Filter';

export const Aside = ({ count, onMaterialChange, onSizeChange }: Filter) => {
  const [showOptions, setShowOptions] = useState<ShowOptions>({ Material: false, Tamaño: false });
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<string>('');

  const filterOptions: FilterOptions = {
    Material: ["ABS", "PLA", "TPU"],
    Tamaño: ["S", "M", "L"]
  };

  const toggleOptions = (filter: keyof FilterOptions) => {
    setShowOptions({ ...showOptions, [filter]: !showOptions[filter] });
  };

  const handleFilterClick = (filter: keyof FilterOptions, option: string) => {
    try {
      const currentFilter = activeFilters[filter];
      if (currentFilter === option) {
        const newFilters = { ...activeFilters, [filter]: '' };
        setActiveFilters(newFilters);
        updateParentFilter(filter, '');
      } else {
        const newFilters = { ...activeFilters, [filter]: option };
        setActiveFilters(newFilters);
        updateParentFilter(filter, option);
      }
    } catch (err) {
      setError('An error occurred while updating filters');
    }
  };

  const updateParentFilter = (filter: keyof FilterOptions, value: string) => {
    try {
      if (filter === 'Material') {
        onMaterialChange(value);
      } else if (filter === 'Tamaño') {
        onSizeChange(value);
      }
    } catch (err) {
      setError('An error occurred while communicating with the parent component');
    }
  };

  const resetFilters = () => {
    setActiveFilters({});
    onMaterialChange('');
    onSizeChange('');
    setError('');
  };

  return (
    <aside className="inline-block w-full h-full rounded-3xl mt-2 justify-center text-center p-5 bg-gradient-to-b from-sky-700 via-blue-500 to-sky-600">
      {error && <div className="text-red-500">{error}</div>}
      <section className="flex justify-between items-center mb-4">
        <div className="text-gray-900 text-2xl leading-8">
          Filter results
          <span className="text-sky-900 "> ({count})</span>
        </div>
        <button
          onClick={resetFilters}
          className="bg-transparent border-0 text-sky-200 text-lg active:text-sky-900 leading-4 px-4 ">
          Reset All
        </button>
      </section>

      <section>
        <h1 className="text-[38px]">Filtros</h1>
        <section>
          {Object.keys(filterOptions).map((filter) => (
            <div key={filter} className="mb-6">
              <h2
                className="text-xl text-border font-semibold mb-2 bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600 text-white rounded-lg cursor-pointer flex justify-between items-center px-4 py-2 border"
                onClick={() => toggleOptions(filter as keyof FilterOptions)}
              >
                {filter}
                <span>{showOptions[filter as keyof FilterOptions] ? '↑' : '↓'}</span>
              </h2>
              {showOptions[filter as keyof FilterOptions] && (
                <div className="flex flex-col gap-2">
                  {filterOptions[filter as keyof FilterOptions].map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleFilterClick(filter as keyof FilterOptions, option)}
                      className={`px-3 py-1 rounded text-slate-950 active:bg-sky-700 active:border ${activeFilters[filter] === option ? 'bg-sky-300' : 'bg-sky-200'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

            </div>
          ))}
        </section>
      </section>
      {showAlert && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Alerta</h2>
            <p>No hay productos que coincidan con los filtros seleccionados.</p>
            <button onClick={() => setShowAlert(false)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">Cerrar</button>
          </div>
        </div>
      )}

    </aside>
  );
};
