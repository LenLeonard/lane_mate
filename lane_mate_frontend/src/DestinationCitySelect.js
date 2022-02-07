import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function DestinationCitySelect({ cities, getFormData }) {
  const [autoCompleteDisabled, setAutoCompleteDisabled] = React.useState(false);

  const onCityChange = (event, values) => {
    setInputValue(`${values.name}, ${values.state_province_name}`);
    const destination_city_id = values.id;

    getFormData({
      destination: {
        destination_city_id: destination_city_id,
        is_origin: false,
      },
    });
    setAutoCompleteDisabled(true);
  };

  const [inputValue, setInputValue] = React.useState("");
  function onInputChange(e) {
    if (e != null) {
      setInputValue(e.target.value);
    }
  }
  return (
    <Autocomplete
      autoComplete={autoCompleteDisabled}
      freeSolo
      inputValue={inputValue}
      onInputChange={onInputChange}
      id="combo-box-demo"
      key={cities.id}
      options={cities}
      style={{ width: 300 }}
      onChange={onCityChange}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.name} , {option.state_province_name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" />
      )}
      open={inputValue.length > 2}
    />
  );
}

// get the city data from the backend
