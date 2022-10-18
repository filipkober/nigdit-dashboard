import { Formik, FormikHelpers, FormikValues } from "formik"
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";

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
                    <form onSubmit={handleSubmit} >
                        <Input type="text" name="title" onChange={handleChange} initialValue={values.title} placeholder={"Title"}/>
                        <Input type="text" name="description" onChange={handleChange} initialValue={values.description} placeholder={"Description"} />
                        <Button variant="submit" content={"Submit"} />
                    </form>
                )}
            </Formik>
        </div>
    )
}