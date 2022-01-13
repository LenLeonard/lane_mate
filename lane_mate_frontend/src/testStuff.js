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
