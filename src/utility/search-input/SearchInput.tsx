import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import TypeWriterInput from "../typewritter-input/TypeWritterInput";
import { useTranslation } from "react-i18next";

type PropsType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput = ({ search, setSearch }: PropsType) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (search.trim().length > 0) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 mt-10 w-full"
    >
      <div className="flex items-center border pl-4 rounded-full focus-within:border-primary duration-150 w-full bg-white">
        <FiSearch className="text-2xl text-gray-500" />
        <TypeWriterInput inputValue={search} setInputValue={setSearch} />
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primary-hover duration-150 h-12 px-10 rounded-full text-white"
      >
        {t("search")}
      </button>
    </form>
  );
};
export default SearchInput;
