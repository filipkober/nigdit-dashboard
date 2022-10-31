import { Formik } from "formik";
import { useContext, useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { darkModeContext } from "../../../pages/_app";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import TextArea from "../../atoms/TextArea";
import VerticalDivider from "../../atoms/VerticalDivider";
import ChangePictureModal from "../../molecules/ChangePictureModal";
import Switch from "../../Switch";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Makpaj from '../../../assets/makpaj.svg'
import Image from "next/future/image";

const macias = "https://media.tenor.com/hVm01utkmM8AAAAS/maciek-sze%C5%9Bcia%C5%84czyk-maciasek05.gif"
export default function MyAccountPanel(){
    const {visible, changeVisible} = useModal();
    const [changePassVisible, setChangePassVisible] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useContext(darkModeContext);
    const [parent] = useAutoAnimate<HTMLDivElement>({duration: 100, easing: 'ease-in-out'});


    const initialValuesAbout = {
        username: "",
        email: "",
        aboutMe: "",
    }
    const initialValuesPass = {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
    }


    return (
        <div className="flex justify-center flex-col py-4">
        <div className="bg-foregroundL dark:bg-foregroundD w-full ls:w-[98%] cs:h-[60vh] font-[IBM_Plex_Sans] text-3xl flex-col ls:flex-row flex ls:mx-5 pb-4">
            <div className="flex-col w-[100%] ls:w-[12%] ls:h-[100%] flex ml-2">
            <p className="mt-1 ml-2 text-md">My account</p>
            <div className="text-center mt-8 justify-center flex flex-col">
            <div className="rounded-full bg-white mt-2 mx-auto aspect-square w-[100px]">
                <Image src={Makpaj} alt="profile picture" className="rounded-full object-cover aspect-square" width={100} height={100}/>
            </div>
            <Button variant="button" content="Change" onClick={changeVisible} className="mt-6"/>
            <ChangePictureModal open={visible} changeVisible={changeVisible} initialImage={macias}/>
            </div>
            </div>
            <div className="h-full justify-center items-center ml-8 hidden ls:flex">
            <VerticalDivider height="80%"/>
            </div>
            <div className="flex flex-col cs:flex-row">
            <div className="flex mx-auto ls:mx-0">
                <Formik
                initialValues={initialValuesAbout}
                onSubmit={(values) => {
                    console.log(values)
                }}

                >
                {({values, handleChange, handleBlur, handleSubmit}) => (
                <form onSubmit={handleSubmit} className="flex flex-col ts:ml-2 cs:ml-8">
                    <div className="flex flex-col ls:flex-row">
                    <div className="flex flex-col">
                    <Input type="text" className="mt-8 ls:ml-8" name="username" placeholder="Username" initialValue={values.username} onChange={handleChange}/>
                    <Input type="email" className="mt-8 ls:ml-8 mx-auto" name="email" placeholder="Email" initialValue={values.email} onChange={handleChange}/>
                    <Button variant="submit" content="Save" className="ls:ml-8 mt-8 ls:top-1/4 ls:self-auto self-center w-full ls:w-auto"/>

                    </div>
                    <div className="flex flex-col ls:ml-2 mt-8">
                    <TextArea name={"aboutMe"} placeholder={"About me"} initialValue={values.aboutMe} onChange={handleChange} className="ls:self-auto self-center mx-auto ls:mx-0 h-[20vh] ls:h-full"/>
                    </div>
                    </div>
                </form>
                )}
                
                </Formik>
            </div>
            <div className="h-full justify-center items-center ml-8 hidden ls:flex">
            <VerticalDivider height="80%"/>
            </div>
            <div className="flex flex-col">
            <div className="flex flex-col ml-2 self-center ls:self-start">
                        <Button variant="button" content="Change password" className="mx-auto ls:ml-8 mt-8" onClick={() => {setChangePassVisible(!changePassVisible)}}/>
                    </div>
            <div ref={parent}>
                {changePassVisible && <Formik
                initialValues={initialValuesPass}
                onSubmit={(values) => {
                    console.log(values)
                }}

                >
                {({values, handleChange, handleBlur, handleSubmit}) => (
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex flex-col cs:flex-row">
                    <div className="flex flex-col ml-2 cs:ml-2">
                    <Input type="password" className="mt-8 ls:ml-8 mx-auto" name="oldPassword" placeholder="Old password" initialValue={values.oldPassword} onChange={handleChange}/>
                    <Input type="password" className="mt-8 ls:ml-8 mx-auto" name="newPassword" placeholder="New password" initialValue={values.newPassword} onChange={handleChange}/>
                    <Input type="password" className="mt-8 ls:ml-8 mx-auto" name="newPasswordConfirm" placeholder="Confirm new pass" initialValue={values.newPasswordConfirm} onChange={handleChange}/>
                    <Button variant="submit" content="Submit" className="ls:ml-8 mt-8 mx-auto"/>
                    </div>
                    </div>
                </form>
                )}
                
                </Formik>}
                </div>
            </div>
            </div>
        </div>
        <div className="bg-foregroundL dark:bg-foregroundD ls:w-[98%] ls:h-[20vw] font-[IBM_Plex_Sans] text-3xl flex-row flex mt-5 ls:mx-5">
        <div className="flex-col flex">
        <p className="mt-1 ml-2">Preferences</p>
        <div className="flex flex-row">
        <p className="mt-[30%] ml-2 mb-4">Dark mode</p><Switch isSet={darkMode} setIsSet={setDarkMode} className="mt-[34%] ml-5"/>
        </div>
        </div>
        </div>
        </div>
    )
}