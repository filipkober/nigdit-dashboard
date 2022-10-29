import { Formik, FormikHelpers, FormikValues } from "formik"
import SubnigditRulesType from "../../../models/SubnigditRulesType";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import TextArea from "../../atoms/TextArea";
import SubnigditRules from "../../molecules/SubnigditRules";

type textPostFormProps = {
    className?: string,
    subnigdit?: SubnigditRulesType
}
const initialValues: FormikValues = {
    title: "",
    text: "",
}
export default function TextPostForm({className = "", subnigdit = {name: 'n/subnigdit', rules: ['rule']}}: textPostFormProps) {
    
    return (
        <div className={className}>
            <Formik initialValues={initialValues} onSubmit={() => {
                return;
            } }>
                {({values, handleChange, handleBlur, handleSubmit}) => (
                    <form onSubmit={handleSubmit} className={"mx-2 ts:flex flex-row-reverse"}>
                        {subnigdit && <div className="mt-2 ts:ml-2 ts:w-1/2 ts:flex align-middle">
                            <div className="ml-auto ts:w-1/2 mx-auto">
                            <SubnigditRules rules={subnigdit}/>
                            </div>
                        </div>}
                        <div className={"w-full " + (subnigdit ? "ts:w-1/2" : '')} >
                        <Input type="text" name="title" onChange={handleChange} initialValue={values.title} placeholder={"Title"} className="h-[2rem] mt-2 text-xl w-full"/>
                        <TextArea name="description" placeholder="put yo post contents here yo" className="w-full h-[40vh] ts:h-[12rem] ts:w-full mt-2" />
                        <Button variant="submit" content={"Submit"} className="mt-2 ts:w-full"/>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}