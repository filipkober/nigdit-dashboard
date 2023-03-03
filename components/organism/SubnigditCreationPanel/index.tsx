import React, {useState, useRef, useImperativeHandle, forwardRef, useEffect, ChangeEvent } from "react";
import makpaj from '../../../assets/makpaj.svg';
import testimage from '../../../assets/testimage.svg'
import Image from 'next/image';
import { Form, Formik } from "formik";
import Input from "../../atoms/Input";
import TextArea from "../../atoms/TextArea";

//regular string does not work for some reason
interface Stringus {
  text: string
}

export default function SubnigditCreationPanel() 
{
  //some banner & icon of subnigdit
  const uploadIcon = (e: any) => {
    document.getElementById("iconUpload")?.click();
  }
  const uploadBanner = (e: any) => {
    document.getElementById("bannerUpload")?.click();
  }

  //deletion of subnigdit
  const [destroy,setDestroy] = useState<boolean>(false);
  const btnDefClass = 'text-white duration-[100ms] text-center font-bold hover:drop-shadow-midget border-black border-solid hover:cursor-pointer font-["Roboto"]';
  function toggleDestruction()
  {
    console.log("toggled D E S T R U C T I O N");
    setDestroy(!destroy);
  }

  //adding rules
  const [rules,setRules] = useState<Stringus[]>([{text:"murder"},{text:"commit adultery"},{text:"steal"}]);
  const [newRule,setNewRule] = useState<string>("");
  function addRule()
  {
    setRules([...rules,{text: newRule}])
    console.log("added rule: "+newRule);
    setNewRule("");
  }
  function removeRule(ruleToDelete: number)
  {
    //this is probably not the best way to do it, but it seems to work fine
    setRules(rules.filter((rule,index) => {
      return index != ruleToDelete ? (rule):(null);
    }))
    rules.splice(ruleToDelete,1);
  }
  const handleNewRuleChange = (event: ChangeEvent<HTMLInputElement>): void =>
  {
    setNewRule(event.target.value);
  }

  //adding moderation
  const [mods,setMods] = useState<Stringus[]>([{text:"Obama"},{text:"Führer"},{text:"palpatine"},{text:"Stealin"}]);
  const [newMod,setNewMod] = useState<string>("");
  function addMod()
  {
    setMods([...mods,{text: newMod}])
    console.log("added moderator: "+newMod);
    setNewMod("");
  }
  function removeMod(modToDelete: number)
  {
    setMods(mods.filter((mod,index) => {
      return index != modToDelete ? (mod):(null);
    }))
    mods.splice(modToDelete,1);
  }
  const handleNewModChange = (event: ChangeEvent<HTMLInputElement>): void =>
  {
    setNewMod(event.target.value);
  }

  return (
    <>
      <div className="flex flex-row justify-between w-[100%]">
        <div className='tl:w-[22%] w-[0%] bg-[rgba(255,0,0,0)] tl:block hidden p-2'>
          <div className="w-[100%] flex flex-row justify-end">
          <div className="w-[95%] max-w-[320px] flex flex-col items-center bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid p-2">
            <p className="w-[100%] ls:h-[9vh] h-[80px] min-h-[45px] max-h-[60px] cs:text-[28px] ls:text-[22px] text-[20px] font-['Roboto'] text-center font-bold">Subnigdit Creator</p>
            <button className={`border-[1px] text-[18px] mb-[8px] w-[100%] h-[6vh] min-h-[30px] max-h-[40px] bg-experimentA hover:bg-experimentB rounded-[10px] ${btnDefClass}`}>Return</button>
            <button className={`border-[1px] text-[18px] mb-[8px] w-[100%] h-[6vh] min-h-[30px] max-h-[40px] bg-cancel hover:bg-cancelH rounded-[10px] ${btnDefClass}`}>Cancel</button>
            <button className={destroy ? (`border-[1px] text-[18px] w-[100%] h-[6vh] min-h-[30px] max-h-[40px] bg-delete hover:bg-deleteH rounded-[10px] ${btnDefClass}`):(`border-[1px] text-[18px] w-[100%] h-[6vh] min-h-[30px] max-h-[40px] bg-apply hover:bg-applyH rounded-[10px] ${btnDefClass}`)}>Submit</button>
          </div>
          </div>
        </div>
        <div className='tl:w-[56%] w-[100%] bg-[rgba(255,255,0,0)] p-2 flex flex-col items-center'>
          <div className="mb-2 p-2 tl:hidden w-[100%] h-[56px] min-h-[40px] max-h-[56px] flex flex-row justify-between bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid">
            <button className={`border-[1px] text-[18px] w-[100%] mr-2 h-[100%] bg-experimentA hover:bg-experimentB rounded-[10px] ${btnDefClass}`}>Return</button>
            <button className={`border-[1px] text-[18px] w-[100%] mr-2 h-[100%] bg-cancel hover:bg-cancelH rounded-[10px] ${btnDefClass}`}>Cancel</button>
            <button className={destroy ? (`border-[1px] text-[18px] w-[100%] h-[100%] bg-delete hover:bg-deleteH rounded-[10px] ${btnDefClass}`) :(`border-[1px] text-[18px] w-[100%] h-[100%] bg-apply hover:bg-applyH rounded-[10px] ${btnDefClass}`)}>Submit</button>
          </div>     
          <div className="overflow-hidden w-[100%] tl:w-[50vw] bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid">
            <Formik initialValues={{banner: makpaj, icon: testimage, name: ""}} onSubmit={(values) => {console.log(values)}}>
              {({values, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                <Form>
                <div className="border-b-[0px] border-black h-[15vh] w-[100%] bg-red-900 relative hover:cursor-pointer overflow-hidden hover:drop-shadow-bigChungus drop-shadow-walter">
                  <Image src={values.banner} alt="banner" width={1000} height={1000} className="w-[100%] h-[100%] object-cover"/>
                  <a onClick={uploadBanner} className="duration-[100ms] text-transparent hover:text-black dark:hover:text-white bg-transparent hover:bg-[rgba(50,50,50,0.4)] absolute w-[100%] h-[15vh] my-[-15vh] flex items-center justify-center text-[1.25rem] ml:text-[1.5rem] ts:text-[2rem] ls:text-[3rem]">
                    Change banner image
                  </a>
                  <input hidden type={"file"} id="bannerUpload" accept="image/*" name="picture" onChange={(e) => {setFieldValue("banner",URL.createObjectURL(e.target.files![0]))}}/>
                </div>
                <div className="border-t-[0px] border-black w-[100%] ts:w-[100%] h-[0vh] absolute flex flex-row justify-start rounded-full bg-black z-100">
                  <div className="overflow-hidden ml-[4%] my-[calc(-5%-12px)] w-[calc((10vw+24px)*98/100)] h-[calc((10vw+24px)*98/100)] tl:w-[calc((10vw+24px)*56/100)] tl:h-[calc((10vw+24px)*56/100)] bg-green-600 rounded-full absolute hover:cursor-pointer hover:drop-shadow-bigChungus drop-shadow-walter">
                    <Image src={values.icon} alt="icon" width={1000} height={1000} className="scale-100 border-[0px] border-black rounded-full object-cover w-[100%] h-[100%]"/>
                    <a onClick={uploadIcon} className="duration-[100ms] rounded-full text-transparent hover:text-black dark:hover:text-white bg-transparent hover:bg-[rgba(50,50,50,0.4)] absolute w-[100%] h-[100%] my-[-100%] flex items-center justify-center text-[0.4rem] ml:text-[0.6rem] ts:text-[0.8rem] ls:text-[1rem]">
                      Change icon
                    </a>
                    <input hidden type={"file"} id="iconUpload" accept="image/*" name="picture" onChange={(e) => {setFieldValue("icon",URL.createObjectURL(e.target.files![0]))}}/>
                  </div>
                </div>
                <div className="flex flex-wrap justify-between w-[100%]">
                  <div className="flex justify-between w-[100%] tl:h-[calc((5vw+12px)*60/100)] h-[calc((5vw+12px)*98/100)]">
                    <div className="flex justify-start w-[calc((14vw+24px)*3*98/100+2vw)] tl:w-[calc((13vw+37px)*3*56/100+1vw)]">
                      <div className="basis-1/3"></div>
                      <div className="basis-2/3 p-[1vw] tl:p-[0.5vw]">
                        <Input name="name" type="text" className="w-[100%] h-[100%] text-[calc(2vw+5px)] tl:text-[calc(1vw+5px)]" placeholder="n/subnigditName..." initialValue={values.name} onChange={handleChange}/>
                      </div>
                    </div> 
                    <div className="w-[20%] p-[1vw] tl:p-[0.5vw]">
                      {destroy ? (
                      // <button type="button" onClick={toggleDestruction} className={`w-[100%] h-[100%] text-[calc(2vw+5px)] tl:text-[calc(1vw+5px)] border-[1px] bg-cancel hover:bg-cancelH rounded-[10px] ${btnDefClass}`}>Cancel</button>
                      <button type="button" onClick={toggleDestruction} className={`w-[100%] h-[90%] text-[calc(2vw+5px)] tl:text-[calc(1vw+5px)] hover:cursor-pointer shrink-1 font-["Roboto"] dark:text-white active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] bg-cancel hover:bg-cancelH px-2 rounded-[6px]`}>Cancel</button>   
                      ):(
                        // <button type="button" onClick={toggleDestruction} className={`w-[100%] h-[100%] text-[calc(2vw+5px)] tl:text-[calc(1vw+5px)] border-[1px] bg-delete hover:bg-deleteH rounded-[10px] ${btnDefClass}`}>Delete</button>
                        <button type="button" onClick={toggleDestruction} className={`w-[100%] h-[90%] text-[calc(2vw+5px)] tl:text-[calc(1vw+5px)] hover:cursor-pointer shrink-1 font-["Roboto"] dark:text-white active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] bg-delete hover:bg-deleteH px-2 rounded-[6px]`}>Delete</button>   
                      )}
                    </div>
                  </div>
                  <div className="w-[100%] h-[150px] p-[1vw] tl:p-[0.5vw]">
                    <div className="w-[100%] h-[100%]">
                      <TextArea name="description" placeholder="The description of your subnigdit..." className="w-full h-full"/>
                    </div>
                  </div>   
                  <div className="w-[100%] cs:w-[50%] h-[200px] tl:h-[300px] p-[1vw] tl:p-[0.5vw]">
                    <div className="w-[100%] h-[100%] overflow-hidden rounded-[10px] border-[2px] border-black">
                      <div className="bg-experimentA border-black border-b-[2px] w-[100%] h-[50px] flex justify-center flex-row items-center p-[0.5vw] tl:p-[0.25vw]">
                        <p className="text-[calc(2vw+18px)] tl:text-[calc(1vw+18px)] font-['Roboto'] font-bold text-white">Subnigdit Rules</p>
                      </div>
                      <div className="bg-experimentC w-[100%] h-[calc(100%-90px)] overflow-hidden bg-scroll bg-cover scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                      {rules.map((x,index) =>{
                          return(
                              <div key={index} className="w-full p-[3px] overflow-hidden flex space-x-1">
                                <span className="w-[calc(100%-30px)] bg-foregroundD rounded-[5px] px-2">{index+1}. {x.text}</span>                                
                                <button type="button" onClick={() => {removeRule(index)}} className="bg-delete hover:bg-deleteH h-[25px] w-[25px] rounded-[5px]">X</button>                                 
                                <div className="h-[25px] w-[5px]"></div> 
                              </div>
                          )
                      })}
                      </div>
                      <div className="bg-experimentA border-black border-t-[2px] w-[100%] h-[40px] flex p-[0.5vw] tl:p-[0.25vw]">
                        <input value={newRule} placeholder="Do not be racist..." name="newRule" type="text" onChange={handleNewRuleChange} className="w-[83%] h-[100%] mr-[2%] outline-none bg-backgroundL dark:bg-backgroundD border-black border-2 hover:bg-foregroundL dark:hover:bg-highlightD rounded-md p-1"/>
                        <button type="button" onClick={addRule} className={`w-[15%] h-[90%] text-[95%] tl:text-[100%] hover:cursor-pointer shrink-1 font-["Roboto"] dark:text-white active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] hover:bg-experimentB bg-experimentA px-2 rounded-[5px]`}>Add</button>     
                      </div>  
                    </div>                  
                  </div>     
                  <div className="w-[100%] cs:w-[50%] h-[200px] tl:h-[300px] p-[1vw] tl:p-[0.5vw]">
                    <div className="w-[100%] h-[100%] overflow-hidden rounded-[10px] border-[2px] border-black">
                      <div className="bg-experimentA border-black border-b-[2px] w-[100%] h-[50px] flex justify-center flex-row items-center p-[0.5vw] tl:p-[0.25vw]">
                        <p className="text-[calc(2vw+18px)] tl:text-[calc(1vw+18px)] font-['Roboto'] font-bold text-white">Moderation</p>
                      </div>
                      <div className="bg-experimentC w-[100%] h-[calc(100%-90px)] overflow-hidden bg-scroll bg-cover scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                      {mods.map((x,index) =>{
                          return(
                              <div key={index} className="w-full p-[3px] overflow-hidden flex space-x-1">
                                <span className="w-[calc(100%-30px)] bg-foregroundD rounded-[5px] px-2">u/{x.text}</span>                                
                                <button type="button" onClick={() => {removeMod(index)}} className="bg-delete hover:bg-deleteH h-[25px] w-[25px] rounded-[5px]">X</button>                                 
                                <div className="h-[25px] w-[5px]"></div> 
                              </div>
                          )
                      })}
                      </div>
                      <div className="bg-experimentA border-black border-t-[2px] w-[100%] h-[40px] flex p-[0.5vw] tl:p-[0.25vw]">
                        <input value={newMod} placeholder="some trusted person..." name="newRule" type="text" onChange={handleNewModChange} className="w-[83%] h-[100%] mr-[2%] outline-none bg-backgroundL dark:bg-backgroundD border-black border-2 hover:bg-foregroundL dark:hover:bg-highlightD rounded-md p-1"/>
                        <button type="button" onClick={addMod} className={`w-[15%] h-[90%] text-[95%] tl:text-[100%] hover:cursor-pointer shrink-1 font-["Roboto"] dark:text-white active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] hover:bg-experimentB bg-experimentA px-2 rounded-[5px]`}>Add</button>     
                      </div>  
                    </div>   
                  </div>            
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
