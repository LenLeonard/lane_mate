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
