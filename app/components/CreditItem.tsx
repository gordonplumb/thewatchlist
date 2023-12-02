import styles from '../styles/CreditItem.module.css'
import { AddIcon } from './AddIcon'

type CreditItemProps = {
  name: string,
  detail: string,
  onAdd: (name: string) => void
}

export function CreditItem({ name, detail, onAdd }: CreditItemProps) {
  return <div className={styles.creditItemContainer}>
    <div className={styles.textContainer}>
      <p>{name}</p>
      <p className='secondaryText'>{detail}</p>
    </div>
    <div onClick={() => onAdd(name)}>
      <AddIcon />
    </div>
  </div>
}
