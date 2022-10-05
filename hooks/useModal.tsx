import { useState } from "react"

export const useModal = () => {
    const [visible, setVisible] = useState<boolean>(false)

    const changeVisible = (e: any) => {
        e.preventDefault();
        setVisible(!visible)
    }

    return { visible, changeVisible}
}