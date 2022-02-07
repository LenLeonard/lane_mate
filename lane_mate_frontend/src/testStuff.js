//This is returned from the dialog pop up
let quoteObject = {
  quoteNumber: 1,
  quoteDate: new Date().toDateString(),
  customerName: "W.C. Smith",
  origin: "Montreal",
  destination: "Clifford",
  equipmentType: "Dry Van",
  weight: 9500,
  numberOfPallets: 28,
  dimensions: "48x48x48",
  numberOfFeet: 50,
};

//This is returned as an event from the CarrierForm onSubmit
let tableData = {
  carrierName: "ABC Carrier",
  phoneNumber: "5555555555",
  dispatchEmail: "dispatch@carrier.Com",
  contactName: "Larry",
  rate: "800",
  notes: "Pick up at 5",
};

let searchObject = { quoteObject, tableData };

let searchObjectArray = [searchObject];

let tableDataArrayOne = [
  {
    carrierName: "ABC Carrier",
    phoneNumber: "5555555555",
    dispatchEmail: "dispatch@carrier.Com",
    contactName: "Larry",
    rate: "800",
    notes: "Pick up at 5",
  },
  {
    carrierName: "BBC Carrier",
    phoneNumber: "6666666666",
    dispatchEmail: "dispatch@BBCcarrier.Com",
    contactName: "Barry",
    rate: "100",
    notes: "Pick up at 5",
  },
];

let testQuoteObjectOne = {
  quoteNumber: 1,
  quoteDate: new Date().toDateString(),
  customerName: "ABC Tile",
  origin: "Toronto",
  destination: "Vancouver",
  equipmentType: "Dry Van",
  weight: 5500,
  numberOfPallets: 5,
  dimensions: "48x48x48",
  numberOfFeet: 10,
};

let tableDataArrayTwo = [
  {
    carrierName: "Iway Carrier",
    phoneNumber: "5555555555",
    dispatchEmail: "dispatch@carrier.Com",
    contactName: "Larry",
    rate: "800",
    notes: "Pick up at 5",
  },
  {
    carrierName: "Cosmo Carrier",
    phoneNumber: "6666666666",
    dispatchEmail: "dispatch@BBCcarrier.Com",
    contactName: "Barry",
    rate: "100",
    notes: "Pick up at 5",
  },
];

let testQuoteObjectTwo = {
  quoteNumber: 2,
  quoteDate: new Date().toDateString(),
  customerName: "Big Steel Co",
  origin: "Moncton",
  destination: "Regina",
  equipmentType: "Flatbed",
  weight: 9500,
  numberOfPallets: 0,
  dimensions: "50ft",
  numberOfFeet: 50,
};

let tableDataArrayThree = [
  {
    carrierName: "Raja Carrier",
    phoneNumber: "5555555555",
    dispatchEmail: "dispatch@carrier.Com",
    contactName: "Larry",
    rate: "4000",
    notes: "Pick up at 5",
  },
  {
    carrierName: "Northline",
    phoneNumber: "6666666666",
    dispatchEmail: "dispatch@BBCcarrier.Com",
    contactName: "Barry",
    rate: "5000",
    notes: "Pick up at 5",
  },
];

let testQuoteObjectThree = {
  quoteNumber: 3,
  quoteDate: new Date().toDateString(),
  customerName: "Big Steel Co",
  origin: "Ottawa",
  destination: "Edmonton",
  equipmentType: "Dry Van",
  weight: 9500,
  numberOfPallets: 28,
  dimensions: "48x48x48",
  numberOfFeet: 50,
};

let firstDashBoardObject = {
  quoteObject: testQuoteObjectOne,
  tableDataArray: tableDataArrayOne,
};

let secondDashBoardObject = {
  quoteObject: testQuoteObjectTwo,
  tableDataArray: tableDataArrayTwo,
};

let thirdDashBoardObject = {
  quoteObject: testQuoteObjectThree,
  tableDataArray: tableDataArrayThree,
};

let testDashBoardObjectArray = [
  firstDashBoardObject,
  secondDashBoardObject,
  thirdDashBoardObject,
];

/*
   } else if (dataForDownload.fileType === "csv") {
      // Prepare data:
      let contents = [];
      contents.push(["State", "Electors"]);
      this.state.data.forEach((row) => {
        contents.push([row.state, row.electors]);
      });
      output = this.makeCSV(contents);

       makeCSV (content) {
  	let csv = '';
    content.forEach(value => {
    	value.forEach((item, i) => {
        let innerValue = item === null ? '' : item.toString();
        let result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) {
          result = '"' + result + '"'
        }
        if (i > 0) {csv += ','}
        csv += result;
      })
    	csv += '\n';
	  })
    return csv
  }
  */

// The following code is for the download button

const defaultFileType = "json";

let fileNames = {
  json: "quoteRequest.json",
  //csv: "states.csv",
  text: "quoteRequest.txt",
};

const [dataForDownload, setDataForDownload] = useState({
  fileType: defaultFileType,
  fileDownloadUrl: null,
  status: "",
  data: {
    quoteObject: {
      quoteNumber: "",
      quoteDate: "",
      customerName: "",
      origin: "",
      destination: "",
      equipmentType: "",
      weight: "",
      numberOfPallets: "",
      dimensions: "",
      numberOfFeet: "",
    },
    tableDataArray: [
      {
        carrierName: "",
        phoneNumber: "",
        dispatchEmail: "",
        contactName: "",
        rate: "",
        notes: "",
      },
    ],
  },
});

function changeFileType(event) {
  const value = event.target.value;
  setDataForDownload({ fileType: value });
}

let dofileDownload;

function download(event) {
  event.preventDefault();
  // Prepare the file
  let output;
  if (dataForDownload.fileType === "json") {
    output = JSON.stringify(dataForDownload.data, null, 4);
  } else if (dataForDownload.fileType === "text") {
    // Prepare data:
    output = "";
    for (const quoteProperty in dataForDownload.data.quoteObject) {
      output +=
        quoteProperty +
        ": " +
        dataForDownload.data.quoteObject[quoteProperty] +
        "\n";
      dataForDownload.data.tableDataArray.forEach((carrier) => {
        output += "Carrier Name: " + carrier.carrierName + "\n";
        output += "Phone Number: " + carrier.phoneNumber + "\n";
        output += "Dispatch Email: " + carrier.dispatchEmail + "\n";
        output += "Contact Name: " + carrier.contactName + "\n";
        output += "Rate: " + carrier.rate + "\n";
        output += "Notes: " + carrier.notes + "\n";
      });
    }
  }
  // Download it
  const blob = new Blob([output]);
  const fileDownloadUrl = URL.createObjectURL(blob);
  setDataForDownload({ fileDownloadUrl: fileDownloadUrl }, () => {
    dofileDownload.click();
    URL.revokeObjectURL(fileDownloadUrl); // free up storage--no longer needed.
    setDataForDownload({ fileDownloadUrl: "" });
  });
}

<a
  style={{ display: "none" }}
  download={fileNames[dataForDownload.fileType]}
  href={dataForDownload.fileDownloadUrl}
  ref={(e) => (dofileDownload = e)}
>
  download it
</a>;

/*

    let output = "";
    for (const dashBoardObject in dashBoardObjectArray) {
      for (const quoteProperty in dashBoardObjectArray[dashBoardObject]
        .quoteObject) {
        output +=
          quoteProperty +
          ": " +
          dashBoardObjectArray[dashBoardObject].quoteObject[quoteProperty] +
          "\n";
      }
      dashBoardObject.tableDataArray.forEach((array) =>
        array.forEach((carrier) => {
          output += "Carrier Name: " + carrier.carrierName + "\n";
          output += "Phone Number: " + carrier.phoneNumber + "\n";
          output += "Dispatch Email: " + carrier.dispatchEmail + "\n";
          output += "Contact Name: " + carrier.contactName + "\n";
          output += "Rate: " + carrier.rate + "\n";
          output += "Notes: " + carrier.notes + "\n";
        })
      );
    }
    */

<Button variant="outlined" onClick={populateDashboardForTesting}>
  Populate dashboard Object Array for testing
</Button>;

const populateDashboardForTesting = () => {
  let tableDataArrayOne = [
    {
      carrierName: "ABC Carrier",
      phoneNumber: "5555555555",
      dispatchEmail: "dispatch@carrier.Com",
      contactName: "Larry",
      rate: "800",
      notes: "Pick up at 5",
    },
    {
      carrierName: "BBC Carrier",
      phoneNumber: "6666666666",
      dispatchEmail: "dispatch@BBCcarrier.Com",
      contactName: "Barry",
      rate: "100",
      notes: "Pick up at 5",
    },
  ];

  let testQuoteObjectOne = {
    quoteNumber: 1,
    quoteDate: new Date().toDateString(),
    customerName: "ABC Tile",
    origin: "Toronto",
    destination: "Vancouver",
    equipmentType: "Dry Van",
    weight: 5500,
    numberOfPallets: 5,
    dimensions: "48x48x48",
    numberOfFeet: 10,
  };

  let tableDataArrayTwo = [
    {
      carrierName: "Iway Carrier",
      phoneNumber: "5555555555",
      dispatchEmail: "dispatch@carrier.Com",
      contactName: "Larry",
      rate: "800",
      notes: "Pick up at 5",
    },
    {
      carrierName: "Cosmo Carrier",
      phoneNumber: "6666666666",
      dispatchEmail: "dispatch@BBCcarrier.Com",
      contactName: "Barry",
      rate: "100",
      notes: "Pick up at 5",
    },
  ];

  let testQuoteObjectTwo = {
    quoteNumber: 2,
    quoteDate: new Date().toDateString(),
    customerName: "Big Steel Co",
    origin: "Moncton",
    destination: "Regina",
    equipmentType: "Flatbed",
    weight: 9500,
    numberOfPallets: 0,
    dimensions: "50ft",
    numberOfFeet: 50,
  };

  let tableDataArrayThree = [
    {
      carrierName: "Raja Carrier",
      phoneNumber: "5555555555",
      dispatchEmail: "dispatch@carrier.Com",
      contactName: "Larry",
      rate: "4000",
      notes: "Pick up at 5",
    },
    {
      carrierName: "Northline",
      phoneNumber: "6666666666",
      dispatchEmail: "dispatch@BBCcarrier.Com",
      contactName: "Barry",
      rate: "5000",
      notes: "Pick up at 5",
    },
  ];

  let testQuoteObjectThree = {
    quoteNumber: 3,
    quoteDate: new Date().toDateString(),
    customerName: "Big Steel Co",
    origin: "Ottawa",
    destination: "Edmonton",
    equipmentType: "Dry Van",
    weight: 9500,
    numberOfPallets: 28,
    dimensions: "48x48x48",
    numberOfFeet: 50,
  };

  let firstDashBoardObject = {
    quoteObject: testQuoteObjectOne,
    tableDataArray: tableDataArrayOne,
  };

  let secondDashBoardObject = {
    quoteObject: testQuoteObjectTwo,
    tableDataArray: tableDataArrayTwo,
  };

  let thirdDashBoardObject = {
    quoteObject: testQuoteObjectThree,
    tableDataArray: tableDataArrayThree,
  };

  let testDashBoardObjectArray = [
    firstDashBoardObject,
    secondDashBoardObject,
    thirdDashBoardObject,
  ];

  setDashBoardObjectArray(testDashBoardObjectArray);
};

//How to model the quote request object to account for pallets with multiple dimensions

const quoteRequestObject = {
  equipmentType: "Dry Van",
  customerName: "ABC Tile",
  date: new Date().toDateString(),
  lane: {
    origin: "Toronto",
    destination: "Vancouver",
  },
  load: {
    commodity: "Tile",
    numberOfFeet: 10,
    totalWeight: 5500,
    isPalletized: true,
    numberOfPallets: 5,
    allPalletsHaveTheSameDimensions: true,
    pallets: [
      { weight: 1100, dimensions: "48x48x48" },
      { weight: 1100, dimensions: "48x48x48" },
      { weight: 1100, dimensions: "48x48x48" },
      { weight: 1100, dimensions: "48x48x48" },
      { weight: 1100, dimensions: "48x48x48" },
    ],
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function addDashes(f) {
  f_val = f.value.replace(/\D[^\.]/g, "");
  f.value = f_val.slice(0, 3) + "-" + f_val.slice(3, 6) + "-" + f_val.slice(6);
}

///////////////////////////////////////////////////////////////////////
//LOAD TABLE API
///////////////////////////////////////////////////////////////////////

app.post("/loads", async (req, res) => {
  try {
    const {
      num_pallets,
      pallet_dims_id,
      commodity,
      weight_lbs,
      weight_kgs,
      feet,
      packaging_type,
      equipment_type,
      special_instructions,
      pallets_same_dims,
      is_palletized,
      is_stackable,
      is_haz_mat,
      is_oversized,
      is_fragile,
      is_frozen,
      is_perishable,
      is_expedited,
      is_inbond,
      requires_tarp,
      requires_team,
      requires_ventilation,
      requires_tailgate,
      requires_blanket_wrap,
      requires_chains,
      requires_straps,
      requires_temp_control,
      requires_dunnage,
    } = req.body;
    console.log(req.body);
    const newLoad = await pool.query(
      "INSERT INTO loads (num_pallets, pallet_dims_id, commodity, weight_lbs, weight_kgs, feet, packaging_type, equipment_type, special_instructions, pallets_same_dims, is_palletized, is_stackable, is_haz_mat, is_oversized, is_fragile, is_frozen, is_perishable, is_expedited, is_inbond, requires_tarp, requires_team, requires_ventilation, requires_tailgate, requires_blanket_wrap, requires_chains, requires_straps, requires_temp_control, requires_dunnage) VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28) RETURNING *",
      [
        num_pallets,
        pallet_dims_id,
        commodity,
        weight_lbs,
        weight_kgs,
        feet,
        packaging_type,
        equipment_type,
        special_instructions,
        pallets_same_dims,
        is_palletized,
        is_stackable,
        is_haz_mat,
        is_oversized,
        is_fragile,
        is_frozen,
        is_perishable,
        is_expedited,
        is_inbond,
        requires_tarp,
        requires_team,
        requires_ventilation,
        requires_tailgate,
        requires_blanket_wrap,
        requires_chains,
        requires_straps,
        requires_temp_control,
        requires_dunnage,
      ]
    );
    res.json(newLoad);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get a quote request

//Get all quote requests

app.get("/loads", async (req, res) => {
  try {
    const allLoads = await pool.query("SELECT * FROM loads "); //returns an array of objects
    res.json(allLoads.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get a quote request by id//

app.get("/loads/:id", async (req, res) => {
  try {
    const { id } = req.params; //id is the parameter
    console.log(req.params);
    const load = await pool.query("SELECT * FROM loads WHERE id = $1", [id]); //query the database for the id
    res.json(load.rows); //send the results to the front end
  } catch (err) {
    console.error(err.message);
  }
});

//Update a quote request

app.put("/loads/:id", async (req, res) => {
  try {
    const { id } = req.params; //id is the parameter
    const {
      num_pallets,
      pallet_dims_id,
      commodity,
      weight_lbs,
      weight_kgs,
      feet,
      packaging_type,
      equipment_type,
      special_instructions,
      pallets_same_dims,
      is_palletized,
      is_stackable,
      is_haz_mat,
      is_oversized,
      is_fragile,
      is_frozen,
      is_perishable,
      is_expedited,
      is_inbond,
      requires_tarp,
      requires_team,
      requires_ventilation,
      requires_tailgate,
      requires_blanket_wrap,
      requires_chains,
      requires_straps,
      requires_temp_control,
      requires_dunnage,
    } = req.body; //body is the data that is being sent to the database
    const updateLoad = await pool.query(
      //query the database for the id
      "UPDATE loads SET (num_pallets, pallet_dims_id, commodity, weight_lbs, weight_kgs, feet, packaging_type, equipment_type, special_instructions, pallets_same_dims, is_palletized, is_stackable, is_haz_mat, is_oversized, is_fragile, is_frozen, is_perishable, is_expedited, is_inbond, requires_tarp, requires_team, requires_ventilation, requires_tailgate, requires_blanket_wrap, requires_chains, requires_straps, requires_temp_control, requires_dunnage) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13$, 14$, 15$, 16$, 17$, 18$, 19$, 20$, 21$, 22$, 23$, 24$, 25$, 26$, 27$, 28$) WHERE id = $29",
      [
        num_pallets,
        pallet_dims_id,
        commodity,
        weight_lbs,
        weight_kgs,
        feet,
        packaging_type,
        equipment_type,
        special_instructions,
        pallets_same_dims,
        is_palletized,
        is_stackable,
        is_haz_mat,
        is_oversized,
        is_fragile,
        is_frozen,
        is_perishable,
        is_expedited,
        is_inbond,
        requires_tarp,
        requires_team,
        requires_ventilation,
        requires_tailgate,
        requires_blanket_wrap,
        requires_chains,
        requires_straps,
        reuires_temp_control,
        requires_dunnage,
      ]
    );
    res.json(updateLoad.rows); //send the results to the front end
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a quote request

app.delete("/loads/:id", async (req, res) => {
  try {
    const { id } = req.params; //id is the parameter
    const deleteLoad = await pool.query(
      //query the database for the id
      "DELETE FROM loads WHERE id = $1", //$1 is the placeholder for the value in the query
      [id] //the value in the query is the value in the array
    );
    res.json(deleteLoad.rows); //send the results to the front end
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

   <DialogTitle>{JSON.stringify(editRowsModel)}</DialogTitle>
        <DialogContent dividers style={{ height: "200px" }}>
          <div style={{ display: "flex" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onEditRowModelChange={handleEditRowModelChange}
              editRowsModel={editRowsModel}
              autoHeight
            />
          </div>
        </DialogContent>
        <AddCustomerDialog
          handleClickOpen={openAddNewCustomer}
          handleClose={handleNewCustomerClose}
          addNewCustomer={addNewCustomer}
        />

          async function getCustomerName(customer_id) {
      try {
        const response = await fetch(
          `http://localhost:5000/customers/${customer_id}`
        );
        const customer = await response.json();

        console.log(customer);
      } catch (error) {
        console.log(error);
      }
    }
    getCustomerName(rawQuoteRequestData.customer_id);