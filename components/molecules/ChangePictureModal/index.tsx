import Image from "next/future/image"
import Button from "../../atoms/Button"
import { Formik } from "formik"

type ChangePictureModalProps = {
    open: boolean,
    changeVisible: (a: any) => any,
    initialImage: string
}

const macias = "https://media.tenor.com/hVm01utkmM8AAAAS/maciek-sze%C5%9Bcia%C5%84czyk-maciasek05.gif"

export default function ChangePictureModal({open, changeVisible, initialImage}: ChangePictureModalProps){
    const uploadImage = (e: any) => {
        document.getElementById("imgUpload")?.click();
    }

    return (
        <Formik 
        initialValues={{picture: initialImage}}
        onSubmit={(values) => {
            console.log(values)
        }}
        >
        {({values, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
        <form>
        <div className={`${!open && "hidden"} w-screen h-screen z-1 absolute top-0 left-0`}>
        <div className={`rounded-lg border-2 border-black bg-foregroundL dark:bg-foregroundD absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full ts:w-[25rem] h-[10rem] flex flex-row z-2`}>
        <div className="top-0 left-0 absolute">
            <button className="ml-2" onClick={changeVisible}>X</button>
        </div>
        
        <div className="rounded-full bg-white aspect-square w-[100px] ml-10 my-auto hover:cursor-pointer relative">
            <Image src={values.picture} alt="profile picture" width={100} height={100} className="rounded-full z-2 object-cove absolute left-1/5" loader={() => values.picture}/>
            <div onClick={uploadImage} className="rounded-full text-transparent hover:text-black dark:hover:text-white bg-transparent hover:bg-[rgba(50,50,50,0.4)] fixed flex items-center text-2xl aspect-square w-[100px]">
            <span className="text-2xl rounded-full align-middle text-center w-full">Change picture</span>
            </div>
            <input hidden type={"file"} id="imgUpload" accept="image/*" name="picture" onChange={(e) => {setFieldValue("picture",URL.createObjectURL(e.target.files![0]))}}/>
        </div>
        <div className="my-auto mr-4 ml-auto">
            <Button variant="submit" content="Submit" onClick={handleSubmit}/>
        </div>
        </div>
        </div>
        </form>
        )
        }
        </Formik>
    )
}