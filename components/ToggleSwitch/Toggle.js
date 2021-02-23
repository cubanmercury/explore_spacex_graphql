import { useEffect } from 'react'
import styles from './toggle.module.scss'

const Toggle = ({id, enabled, onStateChange, leftLabel, rightLabel}) => {

    if (enabled === undefined) return <p>Loading</p>

    return (
        <label className={styles.switchlabel} htmlFor={id}>
            <input id={id} type="checkbox" className={styles.switchcheckbox} checked={enabled} onChange={onStateChange} />
            <span className={styles.switchbutton} />
            <span className={styles.on}>{leftLabel}</span>
            <span className={styles.off}>{rightLabel}</span>
        </label>
    )
}

export default Toggle