import { GenericComponentProps } from '../../../models/GenericComponentProps';
import { twMerge } from 'tailwind-merge';

type Color = 'black' | 'white' | 'red-500' | 'green-500';
type DarkColor = 'black' | 'white' | 'red-500' | 'green-500';
type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
type Weight = 'thin' | 'normal' | 'medium' | 'bold';
type LineHeight = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
type LetterSpacing =
  | 'tighter'
  | 'tight'
  | 'normal'
  | 'wide'
  | 'wider'
  | 'widest';

interface TypographyProps extends GenericComponentProps {
  color?: Color;
  darkColor?: DarkColor;
  size?: Size;
  weight?: Weight;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
}

export default function Typography({
  children,
  className,
  color = 'black',
  darkColor,
  size = 'base',
  weight = 'normal',
  lineHeight = 'normal',
  letterSpacing = 'normal',
}: TypographyProps) {
  const classes = twMerge(
    `text-${color}`,
    `dark:text-${darkColor ? darkColor : color === 'black' ? 'white' : color}`,
    `text-${size}`,
    `font-${weight}`,
    `leading-${lineHeight}`,
    `tracking-${letterSpacing}`,
    className
  );

  return <p className={classes}>{children}</p>;
}
