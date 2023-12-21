import { useRouter } from 'next/router';
import { twMerge } from "tailwind-merge";
import { GenericComponentProps } from "../../../models/GenericComponentProps";
import ToastType from "../../../models/ToastType";
import { toastDisplay } from "../Toast";

function copyLinkToClipboard(url: string) {
  navigator.clipboard.writeText(url).then(() => {
    console.log('Link copied to clipboard:', url);
  }).catch((error) => {
    console.error('Failed to copy link to clipboard:', error);
  });
}

type ShareProps = {
  floatRight?: boolean;
} & GenericComponentProps;

export default function Share({floatRight = true, className}: ShareProps) {
  const router = useRouter();
  const url = `${window.location.origin}${router.asPath}`;

  return (
    <p className={twMerge('cursor-pointer select-none',floatRight ? 'ml-auto ' : '', className)} onClick={() => {
      copyLinkToClipboard(url);
      toastDisplay(ToastType.Success, 'Copied to clipboard');
    }}>
      Share
    </p>
  );
}