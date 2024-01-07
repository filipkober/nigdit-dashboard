import { useRouter } from "next/router";
import { copyLinkToClipboard } from "../components/atoms/Share";
import { toastDisplay } from "../components/atoms/Toast";
import ToastType from "../models/ToastType";

export const useShare = () => {
    const router = useRouter();
    const url = `${window.location.origin}${router.asPath}`;
    return () => {
        toastDisplay(ToastType.Success, 'Copied to clipboard');
        copyLinkToClipboard(url);
    }
}   