import styles from "./error.module.scss"

export const Error = ({message}) => {
  return (
    <div className={styles.errorcontainer}>
      <p>{message}</p>
    </div>
  )
}