/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import useDebounce from "../hook/useDebounce";
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
  const [{ searchTerm }, dispatch] = useStateValue();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { t } = useTranslation()

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      setSearchTerm(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const setSearchTerm = (value) => {
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: value,
    });
  };

  return (
    <div className="w-full bg-card containeR justify-center h-14 my-5 mx-auto">
      <div className="w-full gap-4 p-4 md:w-2/3 bg-primary shadow-xl mt-12 rounded-md flex items-center">
        <IoSearch className="text-2xl text-textColor" />
        <input
          type="text"
          value={searchTerm}
          className="w-full bg-transparent text-lg text-textColor  border-none outline-none"
          placeholder={t('searchHere')}
          style={{ height: 20 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
