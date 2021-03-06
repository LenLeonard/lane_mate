import * as React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Autocomplete } from "@mui/material";
import OriginCitySelect from "./City Select Components/OriginCitySelect";
import DestinationCitySelect from "./City Select Components/DestinationCitySelect";
import { useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  CardHeader,
  CardContent,
  Card,
  CardActions,
} from "@material-ui/core";

export default function LaneStopInput({ getLaneStops, cities }) {
  const [originIDs, setOriginIDs] = useState([{ cityId: "", isOrigin: true }]);
  const [destinationIDs, setDestinationIDs] = useState([
    { cityId: "", isOrigin: false },
  ]);

  const [LaneStops, setLaneStops] = useState({
    origins: originIDs,
    destinations: destinationIDs,
  });

  // handle click event of the Remove button
  const handleOriginRemoveClick = (e, index) => {
    e.preventDefault();
    const inputList = [...originIDs];
    inputList.splice(index, 1);
    setOriginIDs(inputList);
    setLaneStops({
      origins: originIDs,
    });
  };

  // handle click event of the Add button
  const handleOriginAddClick = (e) => {
    e.preventDefault();
    setOriginIDs([
      ...originIDs,
      {
        cityId: "",
        isOrigin: false,
      },
    ]);
    console.log(originIDs);
    setLaneStops({
      origins: originIDs,
    });
  };

  const handleDestinationRemoveClick = (e, index) => {
    e.preventDefault();
    const inputList = [...originIDs];
    inputList.splice(index, 1);
    setDestinationIDs(inputList);
    setLaneStops({
      destinations: destinationIDs,
    });
  };

  // handle click event of the Add button
  const handleDestinationAddClick = (e) => {
    e.preventDefault();
    setDestinationIDs([
      ...destinationIDs,
      {
        cityId: "",
        isOrigin: false,
      },
    ]);
    setLaneStops({
      destinations: destinationIDs,
    });
  };

  useEffect(() => {
    getLaneStops(LaneStops);
  }, [LaneStops]);

  return (
    <Container>
      <Card>
        <CardHeader title="Enter Load Information" />
        <CardContent>
          {originIDs.map((x, i) => {
            return (
              <div key={i}>
                <OriginCitySelect
                  cities={cities}
                  setOriginIDs={setOriginIDs}
                  index={i}
                  originIDs={originIDs}
                  setLaneStops={setLaneStops}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOriginAddClick}
                >
                  Add Origin
                </Button>

                {i > 0 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={(e) => handleOriginRemoveClick(e, i)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            );
          })}
          {destinationIDs.map((x, j) => {
            return (
              <div key={j}>
                <DestinationCitySelect
                  cities={cities}
                  setDestinationIDs={setDestinationIDs}
                  index={j}
                  destinationIDs={destinationIDs}
                  setLaneStops={setLaneStops}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleDestinationAddClick}
                >
                  Add Destination
                </Button>

                {j > 0 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={(e) => handleDestinationRemoveClick(e, j)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </Container>
  );
}
