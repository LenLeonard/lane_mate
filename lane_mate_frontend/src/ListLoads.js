import { Button, Table, TableContainer } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import EditLoad from "./EditLoad";

export default function ListLoads() {
  const loadTemplate = {
    num_pallets: 1,
    pallet_dims_id: 1,
    commodity: "",
    weight_lbs: 0,
    weight_kgs: 0,
    feet: 0,
    packaging_type: "",
    equipment_type: "",
    special_instructions: "",
    pals_same_dims: true,
    is_palletized: true,
    is_stackable: true,
    is_haz_mat: false,
    is_oversized: false,
    is_fragile: false,
    is_frozen: false,
    is_perishable: false,
    is_expedited: false,
    is_inbond: false,
    requires_tarp: false,
    requires_team: false,
    requires_ventilation: false,
    requires_tailgate: false,
    requires_blanket_wrap: false,
    requires_chains: false,
    requires_straps: false,
    requires_temp_control: false,
    requires_dunnage: false,
  };

  const [loads, setLoads] = useState([{ loadTemplate }]);

  const getLoads = async () => {
    //getLoads is a function that returns a promise
    try {
      //try to get the quote requests from the database
      const response = await fetch("http://localhost:3000/loads");
      const jsonData = await response.json(); //convert the response to json
      console.log(jsonData);

      setLoads(jsonData); //set the quote requests to the json data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoads();
  }, []);

  function populateTable() {
    getLoads();
  }

  const deleteLoad = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:3000/loads/${id}`, {
        method: "DELETE",
      });
      setLoads(loads.filter((load) => load.id !== id)); //removes the identified quote request from the table without reloading the page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>List Loads</h1>
      <Button onClick={populateTable}>Populate Table</Button>
      <TableContainer component={Paper} elevation={6}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Num Pallets</TableCell>
              <TableCell align="left">Pallet Dims ID</TableCell>
              <TableCell align="left">Commodity</TableCell>
              <TableCell align="left">Weight Lbs</TableCell>
              <TableCell align="left">Weight Kgs</TableCell>
              <TableCell align="left">Feet</TableCell>
              <TableCell align="left">Packaging Type</TableCell>
              <TableCell align="left">Equipment Type</TableCell>
              <TableCell align="left">Special Instructions</TableCell>
              <TableCell align="left">Pals Same Dims</TableCell>
              <TableCell align="left">Is Palletized</TableCell>
              <TableCell align="left">Is Stackable</TableCell>
              <TableCell align="left">Is Haz Mat</TableCell>
              <TableCell align="left">Is Oversized</TableCell>
              <TableCell align="left">Is Fragile</TableCell>
              <TableCell align="left">Is Frozen</TableCell>
              <TableCell align="left">Is Perishable</TableCell>
              <TableCell align="left">Is Expedited</TableCell>
              <TableCell align="left">Is Inbond</TableCell>
              <TableCell align="left">Requires Tarp</TableCell>
              <TableCell align="left">Requires Team</TableCell>
              <TableCell align="left">Requires Ventilation</TableCell>
              <TableCell align="left">Requires Tailgate</TableCell>
              <TableCell align="left">Requires Blanket Wrap</TableCell>
              <TableCell align="left">Requires Chains</TableCell>
              <TableCell align="left">Requires Straps</TableCell>
              <TableCell align="left">Requires Temp Control</TableCell>
              <TableCell align="left">Requires Dunnage</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loads.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.num_pallets}</TableCell>
                <TableCell align="left">{row.pallet_dims_id}</TableCell>
                <TableCell align="left">{row.commodity}</TableCell>
                <TableCell align="left">{row.weight_lbs}</TableCell>
                <TableCell align="left">{row.weight_kgs}</TableCell>
                <TableCell align="left">{row.feet}</TableCell>
                <TableCell align="left">{row.packaging_type}</TableCell>
                <TableCell align="left">{row.equipment_type}</TableCell>
                <TableCell align="left">{row.special_instructions}</TableCell>

                <TableCell align="left">
                  {row.is_palletized ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.pallets_same_dims ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.is_haz_mat ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.is_oversized ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.is_fragile ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.is_frozen ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.is_perishable ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.is_expedited ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.is_inbond ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.requires_tarp ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.requires_team ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.requires_ventilation ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.requires_tailgate ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.requires_blanket_wrap ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.requires_chains ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.requires_straps ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.requires_temp_control ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  {row.requires_dunnage ? "Yes" : "No"}
                </TableCell>

                <TableCell align="left">
                  <EditLoad loadRow={row} getLoads={getLoads} />
                </TableCell>

                <TableCell align="left">
                  <Button onClick={() => deleteLoad(row.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
