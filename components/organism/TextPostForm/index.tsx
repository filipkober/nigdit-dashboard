import SubnigditRulesType from "../../../models/SubnigditRule";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import TextArea from "../../atoms/TextArea";
import SubnigditRules from "../../molecules/SubnigditRules";
import { SubnigditN, subnigditAdapter, subnigditLimitedAdapter } from "../../../models/Subnigdit";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import SubnigditService from "../../../util/requests/SubnigditService";
import PostService from "../../../util/requests/PostService";
import { toastDisplay } from "../../atoms/Toast";
import ToastType from "../../../models/ToastType";
import { useRouter } from "next/router";
import autoAnimate from "@formkit/auto-animate";

type textPostFormProps = {
    className?: string,
    subnigditId?: number
}
const initialValues: Inputs = {
    title: "",
    description: "",
}

type Inputs = {
    title: string,
    description: string,
}

export default function TextPostForm({className = "", subnigditId}: textPostFormProps) {
    
    const [subnigdit, setSubnigdit] = useState<SubnigditN | null>(null)
    const subnigditService = new SubnigditService();
    const postService = new PostService();

    const router = useRouter();

    useEffect(() => {
        if(subnigditId) {
            subnigditService.getOne(subnigditId).then((res) => {
                setSubnigdit(subnigditLimitedAdapter(res))
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subnigditId])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = async (values) => {
        if(subnigditId) {
            const post = await postService.createText({subnigdit: subnigditId, title: values.title, description: values.description});
            toastDisplay(ToastType.Success, "Post created, redirecting...")
            setTimeout(() => {
                router.push(`/post/${post.id}`)
            }, 1500)
        }
      }

      const formRef = useRef<HTMLFormElement>(null);

      useEffect(() => {
        formRef.current && autoAnimate(formRef.current);
      }, [formRef])

    return (
        <div className={className}>
                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={"mx-2 ts:flex flex-row-reverse"}>
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