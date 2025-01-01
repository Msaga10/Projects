import React, { useState } from 'react'

function FilterItems({ onFilterChange }) {
  const [categories, setCategories] = useState([])
  const [years, setYears] = useState([])

  const handleCategoryChange = (e) => {
    const { checked, value} = e.target
    setCategories(prev => 
      checked ? [...prev, value] : prev.filter(item => item !== value)
    )
  }
  const handleYearsChange = (e) => {
    const { checked, value} = e.target
    setYears(prev => 
      checked ? [...prev, value] : prev.filter(item => item !== value)
    )
  }
  const handleFilterChange = () => {
    onFilterChange({categories, years})
  }

  return (
    <div className='h-full p-3 bg-light-blue'>
      <h2 className='bg-blue-400 text-center rounded-tl-lg rounded-tr-lg'>Category</h2>
      <ul >
      {['Electronics', 'Home & Garden', 'Fashion', 'Collectibles', 'Automotive', 'Sports & Outdoors', 'Art & Crafts', 'Toys & Games', 'Books & Media', 'Health & Beauty'].map(category => (
        <li>
          <label >
            <input 
              type="checkbox" 
              value={category}
              onChange={handleCategoryChange}
            />
            {category}
          </label>
        </li>
      ))}
      </ul> <br /> 

      <h2 className='bg-blue-400 text-center rounded-tl-lg rounded-tr-lg'>Old (In year)</h2>
      <ul>
        {['<1','<3','<5','<10'].map(year => (
          <li>
            <input
              type="checkbox"
              value={year}
              onClick={handleYearsChange}
            />
            {year}
          </li>
        ))}
      
      </ul>
      <button onClick={handleFilterChange} className='bg-blue-400 mx-auto m-1 px-1 rounded'>Apply Filters</button>
      
    </div>
  )
}

export default FilterItems
