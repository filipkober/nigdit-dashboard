import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import getStyle from '../../../util/reactSelectCustomClasses';
import TabSelector from '../../molecules/TabSelector';
import MediaPostForm from '../MediaPostForm';
import TextPostForm from '../TextPostForm';
import SubnigditService from '../../../util/requests/SubnigditService';
import { debounce, forIn } from 'lodash';
import { SingleValue } from 'react-select';


type newPostFormProps = {
} 

export default function NewPostForm({}: newPostFormProps){
    const [selected, setSelected] = useState<number>(0);
    const subnigditService = new SubnigditService();

    const [selectedSubnigdit, setSelectedSubnigdit] = useState<number | undefined>(undefined);
    const [bufferedSubnigdits, setBufferedSubnigdits] = useState<{label: string, value: number}[]>([]);

    return(
        <div>
            <h1 className='text-black dark:text-white text-3xl mt-4 ml-4'>Create a post</h1>
            <hr className='mt-4'/>
            <AsyncSelect
                loadOptions={debounce(async (inputValue: string) => {

                    if(bufferedSubnigdits.find(sub => sub.label === inputValue)) {
                        console.log("sub exists")
                        return bufferedSubnigdits.filter(sub => sub.label.toLowerCase() === inputValue.toLowerCase());
                    }

                    if(inputValue.length < 3) {
                        console.log("input too short")
                        return [];
                    }

                    const subs = await subnigditService.searchSubnigdits(inputValue);

                    subs.forEach(sub => {
                        if(!bufferedSubnigdits.find(bufferedSub => bufferedSub.label === sub.name)) setBufferedSubnigdits([...bufferedSubnigdits, {label: sub.name, value: sub.id}]);
                    });

                    return subs.map(sub => {
                        return {
                            label: sub.name,
                            value: sub.id
                        }
                    });
                }, 300)}
                isSearchable={true}
                // ! TODO: Add a way to toggle between dark and light mode
                styles={getStyle('dark')}
                className="w-[80vw] ts:w-[25rem] mb-2 mt-4 ml-2"
                onChange={(option: SingleValue<{label: string, value: number}>) => setSelectedSubnigdit(option?.value)}
            />
            <TabSelector tabs={['Text', 'Media']} selected={selected} setSelected={setSelected}/>
            {selected === 0 ? <TextPostForm subnigditId={selectedSubnigdit}/> : <MediaPostForm className='mx-2' subnigditId={selectedSubnigdit}/>}
        </div>
    )
}