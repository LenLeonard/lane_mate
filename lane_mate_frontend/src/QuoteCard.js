import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

export default function QuoteCard(props) {
  console.log(props);
  console.log(props.quote.Customer);
  const customer = props.quote.Customer;
  const date = props.quote.quoteDate;
  const quoteNumber = props.quote.quoteNumber;
  const destination = props.quote.destination;
  const origin = props.quote.origin;
  const equipment = props.quote.equipment;
  const weight = props.quote.weight;
  const numberOfPallets = props.quote.numberOfPallets;
  const dimensions = props.quote.dimensions;

  return (
    <Card>
      <CardHeader title={"Quote Request # " + quoteNumber} />
      <CardContent>
        {"Customer: " + customer + " "}
        {"Date: " + date + " "}
        {"Destination: " + destination + " "}
        {"Origin: " + origin + " "}
        {"Equipment: " + equipment + " "}
        {"Weight: " + weight + "lbs" + " "}
        {"Number of Pallets: " + numberOfPallets + " "}
        {"Dimensions: " + dimensions + " "}
      </CardContent>
    </Card>
  );
}
