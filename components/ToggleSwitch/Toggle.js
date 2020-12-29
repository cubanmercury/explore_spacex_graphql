import styles from './toggle.module.scss'

const Toggle = ({enabled, onStateChange, leftLabel, rightLabel}) => {
    console.log("inside toggle: ", enabled)
    return (
        <>
            <label className={styles.switchlabel} htmlFor={`toggle-switch`}>
                <input id="toggle-switch" type="checkbox" className={styles.switchcheckbox} checked={enabled} onChange={onStateChange} />
                <span className={styles.switchbutton} />
                <span className={styles.on}>{leftLabel}</span>
                <span className={styles.off}>{rightLabel}</span>
            </label>
        </>
    )
}

export default Toggle