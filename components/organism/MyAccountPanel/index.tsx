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
import Image from "next/image";

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
    const initialValuesPicture = {
        picture: "",
    }


    return (
        <div className="flex justify-center flex-col">
        <div className="bg-foregroundL dark:bg-foregroundD w-full ls:w-[98%] h-[150vh] ls:h-[60vh] font-[IBM_Plex_Sans] text-3xl flex-col ls:flex-row flex ls:mx-5 ls:mt-5">
            <div className="flex-col w-[100%] ls:w-[9%] ls:h-[100%] flex">
            <p className="mt-1 ml-2 text-md">My account</p>
            <div className="text-center mt-8 justify-center flex flex-col">
            <div className="rounded-full bg-white w-[10vw] h-[10vw] ms:w-[5vw] ms:h-[5vw] mt-2 mx-auto">
                <Image src={Makpaj} alt="profile picture" width={100} height={100} className="rounded-full w-[10vw] h-[10vw] ms:w-[5vw]" objectFit="cover" layout="responsive"/>
            </div>
            <Button variant="button" content="Change" onClick={changeVisible} className="mt-6"/>
            <ChangePictureModal open={visible} changeVisible={changeVisible} initialImage={macias}/>
            </div>
            </div>
            <div className="h-full justify-center items-center ml-8 hidden ls:flex">
            <VerticalDivider height="80%"/>
            </div>
            <div>
                <Formik
                initialValues={initialValuesAbout}
                onSubmit={(values) => {
                    console.log(values)
                }}

                >
                {({values, handleChange, handleBlur, handleSubmit}) => (
                <form onSubmit={handleSubmit} className="flex flex-col ml-8">
                    <div className="flex flex-col ls:flex-row">
                    <div className="flex flex-col">
                    <Input type="text" className="mt-8 ml-8" name="username" placeholder="Username" initialValue={values.username} onChange={handleChange}/>
                    <Input type="email" className="mt-8 ml-8" name="email" placeholder="Email" initialValue={values.email} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col ls:ml-2 mt-8">
                    <TextArea name={"aboutMe"} rows={12} cols={15} placeholder={"About me"} initialValue={values.aboutMe} onChange={handleChange} className="ls:self-auto self-center mx-auto ls:mx-0"/>
                    </div>
                    <Button variant="submit" content="Save" className="mt-8 ls:ml-8 ls:absolute ls:top-1/4 ls:self-auto self-center"/>
                    </div>
                </form>
                )}
                
                </Formik>
            </div>
            <div className="h-full justify-center items-center ml-8 hidden ls:flex">
            <VerticalDivider height="80%"/>
            </div>
            <div className="flex flex-col ml-2 self-center ls:self-auto">
                        <Button variant="button" content="Change password" className="ml-8 mt-8" onClick={() => {setChangePassVisible(!changePassVisible)}}/>
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
                    <div className="flex flex-col ls:flex-row">
                    <div className="flex flex-col ml-2">
                    <Input type="password" className="mt-8 ml-8" name="oldPassword" placeholder="Old password" initialValue={values.oldPassword} onChange={handleChange}/>
                    <Input type="password" className="mt-8 ml-8" name="newPassword" placeholder="New password" initialValue={values.newPassword} onChange={handleChange}/>
                    <Input type="password" className="mt-8 ml-8" name="newPasswordConfirm" placeholder="Confirm new password" initialValue={values.newPasswordConfirm} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col ml-2 mt-8">
                        <Button variant="submit" content="Submit" className="ml-8"/>
                    </div>
                    </div>
                </form>
                )}
                
                </Formik>}
            </div>
        </div>
        <div className="bg-foregroundL dark:bg-foregroundD ls:w-[98%] ls:h-[20vw] h-[40vw] font-['IBM_Plex_Sans'] text-3xl flex-row flex mt-5 ls:mx-5">
        <div className="flex-col flex">
        <p className="mt-1 ml-2">Preferences</p>
        <div className="flex flex-row">
        <p className="mt-[40%] ml-2">Dark mode</p><Switch isSet={darkMode} setIsSet={setDarkMode} className="mt-[43%] ml-5"/>
        </div>
        </div>
        </div>
        </div>
    )
}