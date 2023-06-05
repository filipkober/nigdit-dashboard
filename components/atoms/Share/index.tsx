import ToastType from "../../../models/ToastType";
import { toastDisplay } from "../Toast";
import { useRouter } from 'next/router';

function copyLinkToClipboard(url: string) {
  navigator.clipboard.writeText(url).then(() => {
    console.log('Link copied to clipboard:', url);
  }).catch((error) => {
    console.error('Failed to copy link to clipboard:', error);
  });
}

export default function Share({}: any) {
  const router = useRouter();
  const url = `${window.location.origin}${router.asPath}`;

  return (
    <p className="ml-auto cursor-pointer select-none">
      <a onClick={() => {
        copyLinkToClipboard(url);
        toastDisplay(ToastType.Success, 'Copied to clipboard');
      }}>
        Share
      </a>
    </p>
  );
}