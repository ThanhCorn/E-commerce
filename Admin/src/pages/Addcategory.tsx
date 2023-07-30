import CustomInput from "../components/CustomInput";

const Addcategory = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">Add Category</h3>
      <div>
        <form action="">
          <CustomInput
            type="text"
            placeholder="Enter Category"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12"
          />

          <button
            type="submit"
            className="button px-2 bg-green-500 py-2 mt-7 rounded-md"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcategory;
