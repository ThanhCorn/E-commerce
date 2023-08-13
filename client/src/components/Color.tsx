import { IColor } from "../@types/declare";

interface ColorProps {
  colorData: IColor[];
  setColor: (_id: string) => void;
}

const Color = (props: ColorProps) => {
  const { colorData, setColor } = props;

  return (
    <>
      <ul>
        {colorData &&
          colorData.map((color, index) => {
            return (
              <li
                onClick={() => setColor(color._id)}
                key={index}
                className="inline-block mr-2 cursor-pointer "
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color.title }}
                ></div>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
