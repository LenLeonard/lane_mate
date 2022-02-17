import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from "@mui/icons-material/DoneAllTwoTone";
import RevertIcon from "@mui/icons-material/NotInterestedOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CustomTableCell from "./CustomTableCell";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

export default function TableComponent({ rows, setRows }) {
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const updateCarrier = async (row) => {
    try {
      const body = JSON.stringify(row);
      console.log(body);
      const response = await fetch(`http://localhost:5000/carriers/${row.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Access Token"),
        },
        body,
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onToggleEditMode = (id) => {
    console.log(id);
    setRows((state) => {
      //state is the current state of the table
      return rows.map((row) => {
        //row is a single row of the table
        if (row.id === id) {
          //if the row is the row we want to edit
          //update the database

          updateCarrier(row);

          return { ...row, isEditMode: !row.isEditMode }; //return a new row with the isEditMode property set to the opposite of the current value
        }

        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  const deleteCarrier = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:5000/carriers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Access Token"),
        },
      });
      const jsonData = await response.json();
      console.log(jsonData);
      setRows(rows.filter((row) => row.id !== id)); //removes the identified quote request from the table without reloading the page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left" />
            <TableCell align="left">Carrier Name</TableCell>
            <TableCell align="left">Phone Number</TableCell>
            <TableCell align="left">Contact Ext</TableCell>
            <TableCell align="left">Contact Email</TableCell>
            <TableCell align="left">Contact Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                <DeleteOutlineOutlinedIcon
                  onClick={() => deleteCarrier(row.id)}
                ></DeleteOutlineOutlinedIcon>
              </TableCell>
              <CustomTableCell {...{ row, name: "carrier_name", onChange }} />
              <CustomTableCell {...{ row, name: "phone", onChange }} />
              <CustomTableCell {...{ row, name: "contact_ext", onChange }} />
              <CustomTableCell {...{ row, name: "contact_email", onChange }} />
              <CustomTableCell {...{ row, name: "contact_name", onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
