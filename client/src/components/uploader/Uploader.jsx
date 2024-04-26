import React from 'react'
import { v4 as uuidV4 } from "uuid"

const Uploader = () => {
  
  return (
    <div>
      <input type="file" accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'/>

      <p>Select workflow Id</p>
      <select name="" id="">
        <option value="">select ID</option>
        <option value="">{uuidV4()}</option>
      </select>
    </div>
  )
}

export default Uploader
