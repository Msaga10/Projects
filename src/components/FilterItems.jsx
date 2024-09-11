import React from 'react'

function FilterItems() {
  return (
    <div className='h-full p-2 bg-light-blue'>
      <h2>catagory</h2>
      <ul>
        <li><input  type="checkbox" name="" id="" />Art</li>
        <li><input type="checkbox" name="" id="" />Decoration</li>
        <li><input type="checkbox" name="" id="" />Electronics</li>
        <li><input type="checkbox" name="" id="" />Antique</li>
      
      </ul> <br /> <hr />
      <h2>Old (Year)</h2>
      <ul>
        <li><input type="checkbox" name="" id="" />5</li>
        <li><input type="checkbox" name="" id="" />2</li>
        <li><input type="checkbox" name="" id="" />6</li>
        <li><input type="checkbox" name="" id="" />1.5</li>
      
      </ul>
      
    </div>
  )
}

export default FilterItems
