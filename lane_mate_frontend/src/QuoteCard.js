import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

export default function QuoteCard(props) {
  const customer = props.quote.customerName;
  const quoteDate = props.quote.quoteDate;
  const quoteNumber = props.quote.quoteNumber;
  const destination = props.quote.destination;
  const origin = props.quote.origin;
  const equipment = props.quote.equipmentType;
  const weight = props.quote.weight;
  const numberOfPallets = props.quote.numberOfPallets;
  const dimensions = props.quote.dimensions;

  return (
    <Card>
      <CardHeader title={"Quote Request " + quoteNumber} />
      <CardContent>
        <span className="laneCardText" title="Customer">
          {"// " + customer + " //"}
        </span>
        <span className="laneCardText" title="Date of Quote">
          {" " + quoteDate + " // "}
        </span>
        <span className="laneCardText" title="Origin">
          {" " + origin + " to "}
        </span>
        <span className="laneCardText" title="Destination">
          {" " + destination + " // "}
        </span>
        <span className="laneCardText" title="Equipment Type">
          {" " + equipment + " // "}
        </span>
        <span className="laneCardText" title="Weight in Pounds">
          {" " + weight + " lbs // "}
        </span>
        <span className="laneCardText" title="Number of Pallets">
          {" " + numberOfPallets + " pallets // "}
        </span>
        <span className="laneCardText" title="Dimensions">
          {" " + dimensions + " // "}
        </span>
      </CardContent>
    </Card>
  );
}
