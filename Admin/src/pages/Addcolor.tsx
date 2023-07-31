import CustomInput from "../components/CustomInput";

const Addcolor = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Add Color</h3>
      <div>
        <form action="">
          <CustomInput
            type="color"
            placeholder="Enter Color"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12 pr-2"
          />

          <button
            type="submit"
            className="button px-2 bg-green-500 py-2 mt-7 rounded-md"
          >
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
