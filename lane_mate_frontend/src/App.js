import "./App.css";
import CarrierTable from "./CarrierTable";
import QuoteCard from "./QuoteCard";

function App() {
  const quoteObject = {
    Customer: "Avalon Drywall",
    quoteDate: "12/12/2019",
    quoteNumber: "12345",
    destination: "Vancouver",
    origin: "Toronto",
    equipment: "Dry Van",
    weight: "1000",
    numberOfPallets: "10",
    dimensions: "20x20x20",
  };

  return (
    <div className="App">
      <header className="App-header">
        <QuoteCard quote={quoteObject} />
        <CarrierTable />
      </header>
    </div>
  );
}

export default App;
