import { Formik } from "formik"
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";

type mediaPostFormProps = {
    className?: string,
}
const initialValues = {
    title: "",
    media: "",
}
export default function MediaPostForm({className}: mediaPostFormProps) {
    return (
        <div className={className}>
            <Formik initialValues={initialValues} onSubmit={() => {
                return;
            } }>
                {({values, handleChange, handleSubmit}) => (
                    <form onSubmit={handleSubmit} >
                        <Input type="text" name="title" onChange={handleChange} initialValue={values.title} placeholder={"Title"}/>
                        <input type="file" name="media" onChange={handleChange} />
                        <Button variant="submit" content={"Submit"} />
                    </form>
                )}
            </Formik>
        </div>
    )
}