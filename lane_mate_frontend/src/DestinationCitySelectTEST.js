import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function DestinationCitySelectTEST({
  cities,
  handleInputChange,
  destinationIDs,
  setDestinationIDs,
  setLaneStops,
  index,
}) {
  const onCityChange = (event, values) => {
    setInputValue(`${values.name}, ${values.state_province_name}`);
    const destination_city_id = values.id;
    console.log(values);
    const inputList = [...destinationIDs];
    inputList[index].city_id = destination_city_id;
    inputList[index].is_origin = false;
    setDestinationIDs(inputList);
    setLaneStops({
      destinations: destinationIDs,
    });
    console.log(destinationIDs);
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
        <TextField
          {...params}
          label="Start Typing Destination"
          variant="outlined"
        />
      )}
      open={inputValue.length > 2}
    />
  );
}

// get the city data from the backend
