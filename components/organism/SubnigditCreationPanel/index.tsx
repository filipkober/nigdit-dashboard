import React, {useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import makpaj from '../../../assets/makpaj.svg';
import testimage from '../../../assets/testimage.svg'
import Image from 'next/future/image';
import { Form, Formik } from "formik";
import Input from "../../atoms/Input";

export default function SubnigditCreationPanel() 
{
  const uploadIcon = (e: any) => {
    document.getElementById("iconUpload")?.click();
  }
  const uploadBanner = (e: any) => {
    document.getElementById("bannerUpload")?.click();
  }

  return (
    <>
      <div className="flex flex-row justify-between w-[100%]">
        <div className='tl:w-[22%] w-[0%] bg-[rgba(255,0,0,0)] tl:block hidden p-2'>
          <div className="w-[100%] flex flex-row justify-end">
          <div className="w-[95%] max-w-[320px] flex flex-col items-center bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid p-2">
            <p className="w-[100%] ls:h-[9vh] h-[80px] min-h-[45px] max-h-[60px] cs:text-[28px] ls:text-[22px] text-[20px] font-['Roboto'] text-center font-bold">Subnigdit Creator</p>
            <button className={`mb-[8px] w-[100%] h-[6vh] min-h-[30px] max-h-[40px] hover:cursor-pointer text-[18px] font-["Roboto"] text-white duration-[100ms] text-center font-bold hover:drop-shadow-midget border-black border-solid border-[1px] bg-experimentA hover:bg-experimentB rounded-[10px]`}>Return</button>
            <button className={`mb-[8px] w-[100%] h-[6vh] min-h-[30px] max-h-[40px] hover:cursor-pointer text-[18px] font-["Roboto"] text-white duration-[100ms] text-center font-bold hover:drop-shadow-midget border-black border-solid border-[1px] bg-cancel hover:bg-cancelH rounded-[10px]`}>Cancel</button>
            <button className={`w-[100%] h-[6vh] min-h-[30px] max-h-[40px] hover:cursor-pointer text-[18px] font-["Roboto"] text-white duration-[100ms] text-center font-bold hover:drop-shadow-midget border-black border-solid border-[1px] bg-apply hover:bg-applyH rounded-[10px]`}>Submit</button>
          </div>
          </div>
        </div>
        <div className='tl:w-[56%] w-[100%] bg-[rgba(255,255,0,0)] p-2 flex flex-col items-center'>
          <div className="mb-2 p-2 tl:hidden w-[100%] h-[56px] min-h-[40px] max-h-[56px] flex flex-row justify-between bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[5px] border-black border-[2px] border-solid">
            <button className={`w-[100%] mr-2 h-[100%] hover:cursor-pointer text-[18px] font-["Roboto"] text-white duration-[100ms] text-center font-bold hover:drop-shadow-midget border-black border-solid border-[1px] bg-experimentA hover:bg-experimentB rounded-[10px]`}>Return</button>
            <button className={`w-[100%] mr-2 h-[100%] hover:cursor-pointer text-[18px] font-["Roboto"] text-white duration-[100ms] text-center font-bold hover:drop-shadow-midget border-black border-solid border-[1px] bg-cancel hover:bg-cancelH rounded-[10px]`}>Cancel</button>
            <button className={`w-[100%] h-[100%] hover:cursor-pointer text-[18px] font-["Roboto"] text-white duration-[100ms] text-center font-bold hover:drop-shadow-midget border-black border-solid border-[1px] bg-apply hover:bg-applyH rounded-[10px]`}>Submit</button>
          </div>     
          <div className="overflow-hidden w-[100%] tl:w-[50vw] h-[1600px] bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid">
            <Formik initialValues={{banner: makpaj, icon: testimage, name: ""}} onSubmit={(values) => {console.log(values)}}>
              {({values, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                <Form>
                <div className="h-[15vh] w-[100%] bg-red-900 relative hover:cursor-pointer overflow-hidden hover:drop-shadow-bigChungus drop-shadow-walter">
                  <Image src={values.banner} alt="banner" width={100} height={100} className="w-[100%] h-[100%] object-cover"/>
                  <a onClick={uploadBanner} className="duration-[100ms] text-transparent hover:text-black dark:hover:text-white bg-transparent hover:bg-[rgba(50,50,50,0.4)] absolute w-[100%] h-[15vh] my-[-15vh] flex items-center justify-center text-[1.25rem] ml:text-[1.5rem] ts:text-[2rem] ls:text-[3rem]">
                    Change banner image
                  </a>
                  <input hidden type={"file"} id="bannerUpload" accept="image/*" name="picture" onChange={(e) => {setFieldValue("banner",URL.createObjectURL(e.target.files![0]))}}/>
                </div>
                <div className="w-[14vh] ts:w-[15vh] h-[12vh] relative my-[-6vh] flex flex-row justify-end rounded-full">
                  <div className="w-[12vh] h-[12vh] bg-green-600 rounded-full absolute hover:cursor-pointer hover:drop-shadow-bigChungus drop-shadow-walter">
                    <Image src={values.icon} alt="icon" width={25} height={25} className="rounded-full overflow-hidden object-cover w-[100%] h-[100%]"/>
                    <a onClick={uploadIcon} className="duration-[100ms] rounded-full text-transparent hover:text-black dark:hover:text-white bg-transparent hover:bg-[rgba(50,50,50,0.4)] absolute w-[100%] h-[100%] my-[-12vh] flex items-center justify-center text-[0.4rem] ml:text-[0.6rem] ts:text-[0.8rem] ls:text-[1rem]">
                      Change icon
                    </a>
                    <input hidden type={"file"} id="iconUpload" accept="image/*" name="picture" onChange={(e) => {setFieldValue("icon",URL.createObjectURL(e.target.files![0]))}}/>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-[15vh] h-[6vh]"></div>                  
                  {/* <p className=" ml-2 mt-1"></p> */}
                  <Input name="name" type="text" className="ml-2 mt-1 text-[0.6rem] ml:text-[0.8rem] ts:text-[1rem] ls:text-[1.2rem]" placeholder="n/subnigditName..." initialValue={values.name} onChange={handleChange}/>
                </div>
            </Form>
            )}
            </Formik>

          </div>  
        </div>
        <div className='tl:w-[22%] w-[0%] bg-[rgba(255,0,255,0)] tl:block hidden p-2'></div>
      </div>
    </>
  )
}
