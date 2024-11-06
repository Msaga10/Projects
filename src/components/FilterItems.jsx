import React from 'react'

function FilterItems() {
  return (
    <div className='h-full p-3 bg-light-blue'>
      <h2 className='bg-blue-400 text-center'>catagory</h2>
      <ul >
        <li><label className='cursor-pointer'><input  type="checkbox" name="" id="" />Electronics</label></li>
        <li><label className='cursor-pointer'><input type="checkbox" name="" id="" />Home & Garden</label></li>
        <li><label className='cursor-pointer'><input type="checkbox" name="" id="" />Fashion</label></li>
        <li><label className='cursor-pointer'><input type="checkbox" name="" id="" />Collectibles</label></li>
        <li><label className='cursor-pointer'><input type="checkbox" name="" id="" />Automotive</label></li>
        <li><label className='cursor-pointer'><input type="checkbox" name="" id="" />Sports & Outdoors</label></li>
        <li><label className='cursor-pointer'><input type="checkbox" name="" id="" />Art & Crafts</label></li>
        <li><label className='cursor-pointer'><input type="checkbox" name="" id="" />Toys & Games</label></li>
        <li><label className='cursor-pointer'><input type="checkbox" name="" id="" />Books & Media</label></li>
        <li><label className='cursor-pointer'><input type="checkbox" name="" id="" />Health & Beauty</label></li>
      
      </ul> <br /> <hr />
      <h2 className='bg-blue-400 text-center'>Old (Year)</h2>
      <ul>
        <li><input type="checkbox" name="" id="" />1</li>
        <li><input type="checkbox" name="" id="" />5</li>
        <li><input type="checkbox" name="" id="" />10</li>
        <li><input type="checkbox" name="" id="" />50</li>
      
      </ul>
      
    </div>
  )
}

export default FilterItems
