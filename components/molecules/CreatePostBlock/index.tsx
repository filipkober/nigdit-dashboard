import Link from "next/link";
import { GenericComponentProps } from "../../../models/GenericComponentProps";

type CreatePostBlockProps = {
  subnigditSlug?: string;
} & GenericComponentProps;

export default function CreatePostBlock({subnigditSlug}: CreatePostBlockProps) {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-left font-normal dark:text-white bg-foregroundL dark:bg-foregroundD border-black border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden mb-2 ">
          <p className="mb-[6px]">Want to post something here?</p>
        <button
          className={`border-[1px] text-[18px] mb-[8px] w-[100%] h-[6vh] min-h-[30px] max-h-[40px] bg-experimentA hover:bg-experimentB rounded-[10px] text-white duration-[100ms] text-center font-bold hover:drop-shadow-midget border-black border-solid hover:cursor-pointer font-["Roboto"]`}
        >
          <Link href={{
            pathname: "/new/post",
            query: subnigditSlug ? {
              subnigdit: subnigditSlug
            } : undefined
          }}>Create Post</Link>
        </button>
      </div>
    </>
  );
}
