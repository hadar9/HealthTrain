import React, { useState, useEffect } from "react";
import { useField } from "formik";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
 
  const error = meta.touched && meta.error ? true : false;


  
  return (
    <>
      <FormControl error={error}>
        <InputLabel>{label}</InputLabel>
        <Select {...field} {...props} error={error}>
          {props.values.map((v, index) =>
              <MenuItem key={v} value={index}>
                {v}
            </MenuItem>        
            )}

        </Select>
   
      </FormControl>
    </>
  );
};

export default MySelect;
