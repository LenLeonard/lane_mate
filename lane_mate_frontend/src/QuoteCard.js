import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

//QuoteCard takes in a quoteRequest object and displays the current quoteRequest information in a card
export default function QuoteCard({
  handleQuoteRequestOpen,
  dimensions,
  quantities,
  origin,
  destination,
  quoteNumber,
  quoteDate,
  customerName,
  equipmentType,
  weight,
  handlingUnits,
}) {
  let linearFeet = 0;
  let totalPallets = 0;

  if (handlingUnits) {
    for (let i = 0; i < Object.keys(handlingUnits).length; i++) {
      if (
        handlingUnits[i].type === "Pallet" ||
        handlingUnits[i].type === "Skid"
      ) {
        totalPallets = parseInt(quantities[i].quantity);
        let palletLength = parseInt(dimensions[i].length);

        linearFeet = ((totalPallets / 2) * palletLength) / 12;
      }
    }
  }

  console.log(
    "QuoteCard:",
    dimensions,
    quantities,
    origin,
    destination,
    quoteNumber,
    quoteDate,
    customerName,
    equipmentType,
    weight,
    handlingUnits,
    linearFeet
  );

  return (
    <Card elevation={6}>
      {quoteNumber === "" ? (
        <CardHeader
          title={"Enter a Quote Request "}
          onClick={handleQuoteRequestOpen}
        />
      ) : (
        <CardHeader title={"Quote Request " + quoteNumber} />
      )}
      <CardContent>
        <span className="laneCardText" title="Customer">
          {"// " + customerName + " //"}
        </span>
        <span className="laneCardText" title="Date of Quote">
          {" " + quoteDate + " // "}
        </span>
        <span className="laneCardText" title="Origin">
          {" " + origin[0].cityName + ", " + origin[0].stateProvinceId + " to "}
        </span>
        <span className="laneCardText" title="Destination">
          {" " +
            destination[0].cityName +
            ", " +
            destination[0].stateProvinceId +
            "//"}
        </span>
        <span className="laneCardText" title="Equipment Type">
          {" " + equipmentType + " // "}
        </span>
        <span className="laneCardText" title="Weight in Pounds">
          {" " + weight + " lbs // "}
        </span>
        <span className="laneCardText" title="Number of Pallets">
          {" " + totalPallets + " pallets // "}
        </span>
        <span className="laneCardText" title="Dimensions">
          {" " +
            dimensions[0].length +
            "x" +
            dimensions[0].width +
            "x" +
            dimensions[0].height +
            " // "}
        </span>
        <span className="laneCardText" title="Number of Feet">
          {" " + linearFeet + " feet"}
        </span>
      </CardContent>
    </Card>
  );
}
