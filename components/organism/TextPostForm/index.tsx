import { Formik, FormikHelpers, FormikValues } from "formik"
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import TextArea from "../../atoms/TextArea";
import SubnigditRules from "../../molecules/SubnigditRules";

type textPostFormProps = {
    className?: string,
}
const initialValues: FormikValues = {
    title: "",
    text: "",
}
export default function TextPostForm({className = ""}: textPostFormProps) {

    return (
        <div className={className}>
            <Formik initialValues={initialValues} onSubmit={() => {
                return;
            } }>
                {({values, handleChange, handleBlur, handleSubmit}) => (
                    <form onSubmit={handleSubmit} className="mx-2 flex">
                        <div className="w-full ts:w-1/2">
                        <Input type="text" name="title" onChange={handleChange} initialValue={values.title} placeholder={"Title"} className="h-[2rem] mt-2 text-xl"/>
                        <TextArea name="description" placeholder="put yo post contents here yo" className="w-full h-[40vh] ts:h-[12rem] ts:w-full mt-2" />
                        <Button variant="submit" content={"Submit"} className="mt-2 ts:w-full"/>
                        </div>
                        <div className="mt-2 ml-2 w-1/2 flex align-middle">
                            <div className="ml-auto w-1/3">
                            <SubnigditRules id={1}/>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}