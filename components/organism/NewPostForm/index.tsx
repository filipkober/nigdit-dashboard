import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import {customStyles} from '../../../util/reactSelectCustomClasses';
import TabSelector from '../../molecules/TabSelector';
import MediaPostForm from '../MediaPostForm';
import TextPostForm from '../TextPostForm';


type newPostFormProps = {
} 

export default function NewPostForm({}: newPostFormProps){
    const [selected, setSelected] = useState<number>(0);
    return(
        <div>
            <h1 className='text-black dark:text-white text-3xl mt-4 ml-4'>Create a post</h1>
            <hr className='mt-4'/>
            <AsyncSelect
                loadOptions={async (inputValue: string) => {
                    return [
                        {label: "test", value: "test"},
                        {label: "test2", value: "test2"},
                    ].filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))
                }}
                isSearchable={true}
                styles={customStyles}
                className="w-[80vw] ts:w-[25rem] mb-2 mt-4 mx-auto"
            />
            <TabSelector tabs={['Text', 'Media']} selected={selected} setSelected={setSelected}/>
            {selected === 0 ? <TextPostForm/> : <MediaPostForm/>}
        </div>
    )
}