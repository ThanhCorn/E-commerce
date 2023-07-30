import CustomInput from "../components/CustomInput";

const Addblogcategory = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">Add Blog Category</h3>
      <div>
        <form action="">
          <CustomInput
            type="text"
            placeholder="Enter Blog Category"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12"
          />

          <button
            type="submit"
            className="button px-2 bg-green-500 py-2 mt-7 rounded-md"
          >
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcategory;
