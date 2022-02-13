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
  handling_units,
}) {
  let linearFeet = 0;
  let totalPallets = 0;

  if (handling_units) {
    for (let i = 0; i < Object.keys(handling_units).length; i++) {
      if (
        handling_units[i].type === "Pallet" ||
        handling_units[i].type === "Skid"
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
    handling_units,
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
          {" " +
            origin[0].city_name +
            ", " +
            origin[0].state_province_id +
            " to "}
        </span>
        <span className="laneCardText" title="Destination">
          {" " +
            destination[0].city_name +
            ", " +
            destination[0].state_province_id +
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
