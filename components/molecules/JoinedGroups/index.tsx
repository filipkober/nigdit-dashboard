import autoAnimate from '@formkit/auto-animate';
import router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/userSlice';
import GroupListElement, {
  GroupListElementMobile,
} from '../../atoms/GroupListElement';

type Props = {};

export default function JoinedGroups({}: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [h, seth] = useState<string>('28vh');
  const [expandButtonText, setExpandButtonText] = useState<string>('Expand');
  const user = useSelector((state: UserState) => state.user);

  const subnigdits = user?.subnigdits?.map((x, index) => {
    return (
      <GroupListElement
        last={index === (user?.subnigdits?.length || 1) - 1}
        key={index}
        num={index + 1}
        name={x.name}
        link={'/n/' + x.name_uid}
        image={process.env.NEXT_PUBLIC_STRAPI_URL + x.icon.url}
      />
    );
  });

  function expand() {
    setExpanded(!expanded);
    setExpandButtonText(expanded ? 'Expand' : 'Collapse');
  }

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current && autoAnimate(divRef.current);
  }, [divRef]);

  return (
    <div
      className={
        'object-fill w-[100%] ls:w-[80%] bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid'
      }
    >
      <div className="w-[100%] h-[100%] flex flex-col object-fill justify-between">
        <div className="flex flex-col justify-between items-center h-[3vw]">
          <div
            onClick={() => router.push('/subnigdits')}
            className="w-[100%] h-[98%] flex flex-col justify-end items-center bg-joinedGroups bg-cover bg-left overflow-hidden object-cover rounded-[10px] cursor-pointer"
          >
            <p className=" shrink-1 text-[1.3vw] font-['Roboto'] dark:text-white font-bold">
              Your Communities
            </p>
          </div>
          <div className="w-[100%] h-[2%] min-h-[1px]">
            <hr className="h-[1px] border-solid border-[0px] w-[100%] bg-black drop-shadow-lucifer"></hr>
          </div>
        </div>
        <div
          ref={divRef}
          className={
            'w-[100%] overflow-hidden bg-scroll bg-cover scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll '
          }
        >
          {expanded
            ? subnigdits
            : subnigdits?.map((x, index) => {
                if (index < 5) {
                  return x;
                }
              })}
        </div>
        {(subnigdits?.length || 0) > 5 && (
          <div className="flex flex-col justify-between items-center h-[3vw]">
            <div className="w-[100%] h-[2%] min-h-[1px]">
              <hr className="h-[1px] border-solid border-[0px] w-[100%] bg-black"></hr>
            </div>
            <div className="w-[100%] h-[98%] flex flex-col justify-center items-center">
              <button
                onClick={expand}
                className={`w-[100%] h-[100%] hover:cursor-pointer text-[1.2vw] font-["Roboto"] text-white duration-[100ms] text-center hover:drop-shadow-midget bg-experimentA hover:bg-experimentB rounded-b-[10px]`}
              >
                {expandButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export function JoinedGroupsMobile({}: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [h, seth] = useState<string>('28vh');
  const [expandButtonText, setExpandButtonText] = useState<string>('Expand');
  const user = useSelector((state: UserState) => state.user);

  const subnigditsMobile = user?.subnigdits?.map((x, index) => {
    return (
      <GroupListElementMobile
        last={index === (user?.subnigdits?.length || 1) - 1}
        key={index}
        num={index + 1}
        name={x.name}
        link={'/n/' + x.name_uid}
        image={process.env.NEXT_PUBLIC_STRAPI_URL + x.icon.url}
      />
    );
  });

  function expand() {
    setExpanded(!expanded);
    setExpandButtonText(expanded ? 'Expand' : 'Collapse');
  }

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current && autoAnimate(divRef.current);
  }, [divRef]);

  return (
    <div
      className={
        'object-fill w-[100%] ls:w-[80%] bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid'
      }
    >
      <div className="w-[100%] h-[100%] flex flex-col object-fill justify-between">
        <div className="flex flex-col justify-between items-center h-auto">
          <div className="w-[100%] h-[10vw] flex flex-col justify-end items-center bg-joinedGroups bg-cover bg-left overflow-hidden object-cover rounded-[10px]">
            <p className=" shrink-1 text-[5vw] font-['Roboto'] dark:text-white font-bold">
              Your Communities
            </p>
          </div>
          <div className="w-[100%] h-[2%] min-h-[1px]">
            <hr className="h-[1px] border-solid border-[0px] w-[100%] bg-black drop-shadow-lucifer"></hr>
          </div>
        </div>
        <div
          ref={divRef}
          className={
            'w-[100%] overflow-hidden bg-scroll bg-cover scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll '
          }
        >
          {expanded
            ? subnigditsMobile
            : subnigditsMobile?.map((x, index) => {
                if (index < 5) {
                  return x;
                }
              })}
        </div>
        {(subnigditsMobile?.length || 0) > 5 && (
          <div className="flex flex-col justify-between items-center h-auto">
            <div className="w-[100%] h-[2%] min-h-[1px]">
              <hr className="h-[1px] border-solid border-[0px] w-[100%] bg-black"></hr>
            </div>
            <div className="w-[100%] h-[98%] flex flex-col justify-center items-center">
              <button
                onClick={expand}
                className={`w-[100%] h-[100%] p-[2.5%] hover:cursor-pointer text-[3vw] font-["Roboto"] text-white duration-[100ms] text-center hover:drop-shadow-midget bg-experimentA hover:bg-experimentB rounded-b-[10px]`}
              >
                {expandButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
