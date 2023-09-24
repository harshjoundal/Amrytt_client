import { Spin ,Alert,message as msg} from 'antd'
import React from 'react'
import styles from './sidebar.module.css'

const Loader = ({message}:{message:string}) => {
  return (
    <div className={styles.loader}>
      <Spin size='large' tip={message} />
    </div>
  )
}

export default Loader