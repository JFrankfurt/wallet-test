import { PropsWithChildren } from "react";
import styles from "./functionTile.module.css";

const FunctionTile = ({ children, ...rest }: PropsWithChildren<{}>) => {
  return (
    <div className={styles.main} {...rest}>
      {children}
    </div>
  );
};

type TitleProps = React.HTMLAttributes<HTMLHeadingElement>;
FunctionTile.Title = ({ children, ...rest }: PropsWithChildren<TitleProps>) => (
  <h3 {...rest}>{children}</h3>
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
FunctionTile.Button = ({
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => (
  <button className={styles.button} {...rest}>
    {children}
  </button>
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
FunctionTile.Input = ({ children, ...rest }: PropsWithChildren<InputProps>) => (
  <input className={styles.input} {...rest}>
    {children}
  </input>
);

export default FunctionTile;
