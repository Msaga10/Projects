import { useId } from "react"
import React from "react"
// import 
// import 
// import 


const Input = React.forwardRef(function Input({
    label,
    type="text",
    placeholder,
    className="",
    ...props
},ref){
    const id = useId()
    return (
        <div className="flex flex-col">
          {label && <label
            htmlFor={id}
            className="text-xs">
                {label}
            </label>}  
            <input 
            type={type}
            placeholder={placeholder}
            className = { `p-1 text-black rounded ${className} `} 
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input