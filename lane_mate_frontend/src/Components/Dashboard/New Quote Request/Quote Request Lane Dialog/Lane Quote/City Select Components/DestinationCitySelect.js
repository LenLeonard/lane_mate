import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function DestinationCitySelect({
  cities,
  handleInputChange,
  destinationIDs,
  setDestinationIDs,
  setLaneStops,
  index,
}) {
  const onCityChange = (event, values) => {
    setInputValue(`${values.name}, ${values.stateProvinceName}`);
    const destinationCityId = values.id;

    const inputList = [...destinationIDs];
    inputList[index].cityId = destinationCityId;
    inputList[index].isOrigin = false;
    inputList[index].cityName = values.name;
    inputList[index].stateProvinceName = values.stateProvinceName;
    inputList[index].stateProvinceId = values.stateProvinceId;
    setDestinationIDs(inputList);
    setLaneStops({
      destinations: destinationIDs,
    });
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
            {option.name} , {option.stateProvinceName}
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
