import SubnigditRulesType from "../../../models/SubnigditRule";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import TextArea from "../../atoms/TextArea";
import SubnigditRules from "../../molecules/SubnigditRules";
import { SubnigditN } from "../../../models/Subnigdit";
import { SubmitHandler, useForm } from "react-hook-form";

type textPostFormProps = {
    className?: string,
    subnigdit?: SubnigditN
}
const initialValues: Inputs = {
    title: "",
    text: "",
}

type Inputs = {
    title: string,
    text: string,
}

export default function TextPostForm({className = "", subnigdit}: textPostFormProps) {
    

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = async (values) => {}

    return (
        <div className={className}>
                    <form onSubmit={handleSubmit(onSubmit)} className={"mx-2 ts:flex flex-row-reverse"}>
                        {subnigdit && <div className="mt-2 ts:ml-2 ts:w-1/2 ts:flex align-middle">
                            <div className="ml-auto ts:w-1/2 mx-auto">
                            <SubnigditRules subnigdit={subnigdit}/>
                            </div>
                        </div>}
                        <div className={"w-full " + (subnigdit ? "ts:w-1/2" : '')} >
                        <Input type="text" name="title" initialValue={initialValues.title} placeholder={"Title"} className="h-[2rem] mt-2 text-xl w-full" register={register}/>
                        <TextArea name="description" placeholder="put yo post contents here yo" className="w-full h-[40vh] ts:h-[12rem] ts:w-full mt-2" register={register}/>
                        <Button variant="submit" content={"Submit"} className="mt-2 ts:w-full"/>
                        </div>
                    </form>
        </div>
    )
}