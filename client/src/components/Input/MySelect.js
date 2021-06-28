import React from "react";
import { useField } from "formik";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";

const MySelect = ({ label, makeUpperTag, ...props }) => {
  const [field, meta] = useField(props);
 
  const error = meta.touched && meta.error ? true : false;


  
  return (
    <>
      <FormControl error={error}>
        <InputLabel>{label}</InputLabel>
        <Select {...field} {...props} 
          error={error}
           >
          {props.values.map((v, index) =>{
               const tagVal = v.slice(-2)
               const tagJSX = makeUpperTag ? <sup style={{verticalAlign: 'super',fontSize: 'smaller'}}>{tagVal}</sup> : null
               const value = makeUpperTag ? v.slice(0, -2) : v
               return <MenuItem key={index} value={index}>{value}{tagJSX}</MenuItem>
         }
            )}

        </Select>
   
      </FormControl>
    </>
  );
};

export default MySelect;
