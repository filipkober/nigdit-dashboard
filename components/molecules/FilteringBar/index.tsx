import React from "react";

type PostFilters = {
    postTypeSelection: string,
}

export default function FilteringBar({postTypeSelection} : PostFilters)
{
    return(
        <div className="w-[100%] flex justify-center flex-row items-center">
            <div className="m-2 w-[30%] h-[4.5vh] min-h-[40px] max-h-[3rem] bg-foregroundL dark:bg-foregroundD border-black border-[1px] border-solid rounded-[5px] drop-shadow-minimalistic flex justify-center flex-row items-center">

            </div>
        </div>
    )
}