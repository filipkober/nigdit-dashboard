import { GenericComponentProps } from "../../../models/GenericComponentProps";
import { twMerge } from "tailwind-merge";
import Typography from "../Typography";

type ErrorMessageProps = GenericComponentProps;

export default function ErrorMessage({
  children,
  className,
}: ErrorMessageProps) {

  return <Typography color="red-500">{children}</Typography>;
}