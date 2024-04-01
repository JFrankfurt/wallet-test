import { PropsWithChildren } from 'react'
import styles from './functionTile.module.css'

const FunctionTile = ({ children, ...rest }: PropsWithChildren<{}>) => {
  return (
    <div className={styles.main} {...rest}>
      {children}
    </div>
  )
}

type TitleProps = React.HTMLAttributes<HTMLHeadingElement>
FunctionTile.Title = ({ children, ...rest }: PropsWithChildren<TitleProps>) => (
  <h1 {...rest}>{children}</h1>
)
type H2Props = React.HTMLAttributes<HTMLHeadingElement>
FunctionTile.H2 = ({ children, ...rest }: PropsWithChildren<H2Props>) => (
  <h2 {...rest}>{children}</h2>
)

type ContentProps = React.HTMLAttributes<HTMLHeadingElement>
FunctionTile.Content = ({
  children,
  ...rest
}: PropsWithChildren<ContentProps>) => (
  <div className={styles.content} {...rest}>
    {children}
  </div>
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
FunctionTile.Button = ({
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => (
  <button className={styles.button} {...rest}>
    {children}
  </button>
)

type InputProps = React.InputHTMLAttributes<HTMLInputElement>
FunctionTile.Input = ({ children, ...rest }: PropsWithChildren<InputProps>) => (
  <input className={styles.input} {...rest}>
    {children}
  </input>
)

export default FunctionTile
