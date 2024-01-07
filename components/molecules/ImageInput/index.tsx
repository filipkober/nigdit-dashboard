import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import emptyIcon from "../../../assets/emptyIcon.jpg";

type Props = {
  name: string;
  register: UseFormRegister<any>
  customOnChange?: (file: File) => any;
  img?: string;
  emptyImg?: StaticImageData;
};

const ImageInput: React.FC<Props> = ({ name, register, customOnChange, img, emptyImg = emptyIcon }) => {

  const [image, setImage] = useState<File | null>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (customOnChange) customOnChange(e.target.files[0]);
      else setImage(e.target.files[0]);
    }
  };

  return (
    <div className="border-t-[0px] border-black w-[100%] ts:w-[100%] h-[0vh] absolute flex flex-row justify-start rounded-full bg-black z-100">
      <div className="overflow-hidden ml-[4%] my-[calc(-5%-12px)] w-[calc((10vw+24px)*98/100)] h-[calc((10vw+24px)*98/100)] tl:w-[calc((10vw+24px)*56/100)] tl:h-[calc((10vw+24px)*56/100)] rounded-full absolute hover:drop-shadow-bigChungus drop-shadow-walter">
        <Image
          src={img ? img : (image ? URL.createObjectURL(image) : emptyImg)}
          alt="icon"
          width={256}
          height={256}
          className="scale-100 border-[0px] border-black rounded-full object-cover w-[100%] h-[100%]"
        />
        <label
          htmlFor="iconUpload"
          className="hover:cursor-pointer duration-[100ms] rounded-full text-transparent hover:text-black dark:hover:text-white bg-transparent hover:bg-[rgba(50,50,50,0.4)] absolute w-[100%] h-[100%] my-[-100%] flex items-center justify-center text-[0.4rem] ml:text-[0.6rem] ts:text-[0.8rem] ls:text-[1rem]"
        >
          Change icon
        </label>
        <input
          hidden
          type="file"
          id="iconUpload"
          accept="image/*"
          {...{...register(name), onChange: handleImageChange}}
        />
      </div>
    </div>
  );
};

export default ImageInput;