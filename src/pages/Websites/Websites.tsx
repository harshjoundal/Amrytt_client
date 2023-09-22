import React from 'react'
import { useSelector } from 'react-redux'
import { addwebsite, getAllWebsite, selectWebsites } from './websites.slice'
import {  Modal,Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './websites.module.css'
import { useAppDispatch } from '../../Store/Hooks';
import {useEffect,useState} from 'react'
import {useForm} from 'react-hook-form'
// const URL = require('url'); 

interface DataType {
  key: string;
  websiteDomain: string;
  profileLink: string;
  processCount: number;
}

const columns: ColumnsType<DataType> = [
{
  title: 'WebsiteDomain',
  dataIndex: 'websiteURL',
  key: 'domainName',
  render: (_: any, record:any) => {
    let url = record.websiteURL;
    let domainNamee = record.domainName
    return (
      <a href={url} target='_blank' rel="noreferrer">{domainNamee}</a>
    )

},
},
{
  title: 'Profile Link',
  dataIndex: 'profileLink',
  key: 'profileLink',
},
{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
},
{
  title: 'Process Count',
  dataIndex: 'processCount',
  key: 'processCount',
}
];



const Websites = () => {

  const {websites} = useSelector(selectWebsites) 
  const dispatch = useAppDispatch()

  
    const { register, handleSubmit } = useForm();

  const [openModal,setOpenModal] = useState(false)

  useEffect(()=>{
    dispatch(getAllWebsite())
  },[])

  const handleFormSubmit = (data:any) =>{
    dispatch(addwebsite(data))
  }

  return (
    <div>
      <button className={styles.addWebsiteButton} onClick={()=>setOpenModal(true)}>Add Website</button>
      <div className={styles.tableContainer}>
      <Table columns={columns} dataSource={websites} />
      </div>

      <Modal
        title="Add website"
        open={openModal}
        onCancel={()=>setOpenModal(false)}
        okText={"Add User"}
        footer={false}
        width={"50%"}
      >

        <div>
          <form onSubmit={handleSubmit((data) => {handleFormSubmit(data)}
          )} className={styles.userform}>

            <div>
              <label>Website Url</label>
              <input required={true} {...register("websiteURL")} placeholder='websiteUrl'/>
            </div>
            <div>
              <label>Profile Link</label>
              <input required={true} {...register("profileLink")} placeholder='ProfileLink'/>
            </div>
            <div>
              <label>Name</label>
              <input required={true} {...register("name")} placeholder='name'/>
            </div>
            <div>
              <label>Process Count</label>
              <input required={true} {...register("processCount")} type='number' placeholder='process_count'/>
            </div>

            <button type='submit' className={styles.submit}>Submit</button>
          </form>
        </div>

      </Modal>
    </div>
  )
}

export default Websites