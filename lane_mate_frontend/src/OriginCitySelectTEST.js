import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function OriginCitySelectTEST({
  cities,
  setLaneStops,
  originIDs,
  setOriginIDs,
  index,
}) {
  const onCityChange = (event, values) => {
    setInputValue(`${values.name}, ${values.state_province_name}`);
    const origin_city_id = values.id;
    console.log(values);
    const inputList = [...originIDs];
    inputList[index].city_id = origin_city_id;
    inputList[index].is_origin = true;
    setOriginIDs(inputList);
    setLaneStops({
      origins: originIDs,
    });
    console.log(originIDs);
  };

  const [inputValue, setInputValue] = React.useState("");
  function onInputChange(e) {
    if (e != null) {
      setInputValue(e.target.value);
    }
  }
  return (
    <Autocomplete
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
        <TextField {...params} label="Start Typing Origin" variant="outlined" />
      )}
      open={inputValue.length > 2}
    />
  );
}

// get the city data from the backend
