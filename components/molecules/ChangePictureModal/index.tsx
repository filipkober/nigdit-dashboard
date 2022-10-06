import Image from "next/image"
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
        <div className={`rounded-lg border-2 border-black bg-foregroundL dark:bg-foregroundD absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25rem] h-[10rem] flex flex-row z-2`}>
        <div className="top-0 left-0 absolute">
            <button className="ml-2" onClick={changeVisible}>X</button>
        </div>
        
        <div className="rounded-full bg-white w-[20vw] h-[20vw] ts:w-[5vw] ts:h-[5vw] ml-10 my-auto hover:cursor-pointer">
            <Image src={values.picture} alt="profile picture" width={100} height={100} className="rounded-full z-2" objectFit="cover" layout="responsive" loader={() => values.picture}/>
            <div className="rounded-full text-transparent hover:text-black dark:hover:text-white bg-transparent hover:bg-[rgba(50,50,50,0.4)] absolute w-[20vw] h-[20vw] ts:w-[5vw] ts:h-[5vw] flex items-center my-[-20vw] ts:my-[-5vw] text-2xl">
            <a onClick={uploadImage}>Change picture</a>
            </div>
            <input hidden type={"file"} id="imgUpload" accept="image/*" name="picture" onChange={(e) => {setFieldValue("picture",URL.createObjectURL(e.target.files![0]))}}/>
        </div>
        <div className="my-auto ml-[20%]">
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