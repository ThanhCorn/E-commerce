import CustomInput from "../components/CustomInput";

const Addbrand = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Add Brand</h3>
      <div>
        <form action="">
          <CustomInput
            type="text"
            placeholder="Enter Brand"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12"
          />

          <button
            type="submit"
            className="button px-2 bg-green-500 py-2 mt-7 rounded-md"
          >
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
