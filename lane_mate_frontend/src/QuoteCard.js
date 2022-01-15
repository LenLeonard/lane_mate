import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

//QuoteCard takes in a quoteRequest object and displays the current quoteRequest information in a card
export default function QuoteCard({
  dimensions,
  numberOfFeet,
  numberOfPallets,
  origin,
  destination,
  quoteNumber,
  quoteDate,
  customerName,
  equipmentType,
  weight,
}) {
  return (
    <Card>
      <CardHeader title={"Quote Request " + quoteNumber} />
      <CardContent>
        <span className="laneCardText" title="Customer">
          {"// " + customerName + " //"}
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
          {" " + equipmentType + " // "}
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
        <span className="laneCardText" title="Number of Feet">
          {" " + numberOfFeet + " feet"}
        </span>
      </CardContent>
    </Card>
  );
}
