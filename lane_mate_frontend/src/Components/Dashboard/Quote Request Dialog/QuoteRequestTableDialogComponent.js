import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PreviewIcon from "@mui/icons-material/Preview";

import EditIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from "@mui/icons-material/DoneAllTwoTone";
import RevertIcon from "@mui/icons-material/NotInterestedOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CustomTableCell from "../Shared Components/CustomTableCell";

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

export default function QuoteRequestTableDialogComponent({ rows, setRows }) {
  const updateQuoteRequest = async (row) => {
    try {
      const body = JSON.stringify(row);
      console.log(body);
      const response = await fetch(
        `http://localhost:5000/quoteRequests/${row.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("Access Token"),
          },
          body,
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          updateQuoteRequest(row);
          return { ...row, isEditMode: !row.isEditMode };
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

  const deleteQuoteRequest = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `http://localhost:5000/quoteRequests/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
          },
        }
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setRows(rows.filter((row) => row.id !== id)); //removes the quoterequestidentified quote request from the table without reloading the page
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
            <TableCell align="left">Quote Request Id</TableCell>
            <TableCell align="left">Customer</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Origin</TableCell>
            <TableCell align="left">Destination</TableCell>
            <TableCell align="left">Equipment</TableCell>

            <TableCell align="left">See More Details</TableCell>
            <TableCell align="left">See Offers</TableCell>
            <TableCell align="left">View In Dashboard</TableCell>
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
                  onClick={() => deleteQuoteRequest(row.id)}
                ></DeleteOutlineOutlinedIcon>
              </TableCell>
              <CustomTableCell {...{ row, name: "id", onChange }} />
              <CustomTableCell {...{ row, name: "companyName", onChange }} />
              <CustomTableCell {...{ row, name: "date", onChange }} />
              <CustomTableCell {...{ row, name: "originName", onChange }} />
              <CustomTableCell
                {...{ row, name: "destinationName", onChange }}
              />
              <CustomTableCell {...{ row, name: "equipmentType", onChange }} />
              <TableCell>
                <FactCheckIcon></FactCheckIcon>
              </TableCell>
              <TableCell>
                <AttachMoneyIcon></AttachMoneyIcon>
              </TableCell>
              <TableCell>
                <PreviewIcon></PreviewIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
