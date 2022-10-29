import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import getStyle from '../../../util/reactSelectCustomClasses';
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
                // ! TODO: Add a way to toggle between dark and light mode
                styles={getStyle('dark')}
                className="w-[80vw] ts:w-[25rem] mb-2 mt-4 ml-2"
            />
            <TabSelector tabs={['Text', 'Media']} selected={selected} setSelected={setSelected}/>
            {selected === 0 ? <TextPostForm/> : <MediaPostForm className='mx-2'/>}
        </div>
    )
}