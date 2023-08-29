import type { NextPage } from 'next'
import SubnigditCreationPanel from '../../../components/organism/SubnigditCreationPanel';
import { useRouter } from 'next/router';
import SubnigditService from '../../../util/requests/SubnigditService';
import { useEffect, useRef, useState } from 'react';
import Subnigdit, { strapiSubnigditToSubnigdit } from '../../../models/Subnigdit';
import { toastDisplay } from '../../../components/atoms/Toast';
import ToastType from '../../../models/ToastType';
import Spinner from '../../../components/atoms/Spinner';
import autoAnimate from '@formkit/auto-animate';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/userSlice';

const EditSubnigdit: NextPage = () => {

    const router = useRouter();
    const { name } = router.query;

    const subnigditService = new SubnigditService();
    const [subnigdit, setSubnigdit] = useState<Subnigdit>();

    const {user} = useSelector((state: UserState) => state);

    useEffect(() => {
        if(name) {
            subnigditService.getBySlug(name as string, true).then((res) => {
                if(res.length === 0){
                    toastDisplay(ToastType.Error, "Subnigdit not found, redirecting...")
                    setTimeout(() => {
                        router.push("/")
                    }, 1500)
                    return;
                }
                if(res[0].attributes.owner.data.id !== user?.id) {
                    toastDisplay(ToastType.Error, "You don't have permission to edit this subnigdit, redirecting...")
                    setTimeout(() => {
                        router.push("/")
                    }, 1500)
                    return;
                }
                setSubnigdit(strapiSubnigditToSubnigdit(res[0]))
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name])

    const divRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        divRef.current && autoAnimate(divRef.current);
      }, [divRef])

  return (
    <>    
      <div ref={divRef} className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll">
        {!!subnigdit ? <SubnigditCreationPanel subnigdit={subnigdit}/> : <div className='flex h-screen'>
            <div className="m-auto">
                <Spinner/>
            </div>    
        </div>}
      </div>
    </>
  )
};

export default EditSubnigdit;

