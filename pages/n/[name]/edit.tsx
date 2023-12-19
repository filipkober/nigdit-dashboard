import autoAnimate from '@formkit/auto-animate';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../../components/atoms/Spinner';
import { toastDisplay } from '../../../components/atoms/Toast';
import SubnigditCreationPanel from '../../../components/organism/SubnigditCreationPanel';
import Subnigdit, { strapiSubnigditToSubnigdit } from '../../../models/Subnigdit';
import ToastType from '../../../models/ToastType';
import { UserState } from '../../../store/userSlice';
import SubnigditService from '../../../util/requests/SubnigditService';

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
      <div ref={divRef} className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen">
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

