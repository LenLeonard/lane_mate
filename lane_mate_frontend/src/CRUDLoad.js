import { Fragment, useState } from "react";
import React from "react";
import ListLoads from "./ListLoads.js";
import { Card } from "@mui/material";
import { Dialog } from "@mui/material";

export default function CRUDLoad() {
  //CARRIER TABLE POST REQUEST//

  const loadTemplate = {
    num_pallets: 1,
    pallet_dims_id: 1,
    commodity: "",
    weight_lbs: 0,
    weight_kgs: 0,
    feet: 0,
    packaging_type: "",
    equipment_type: "",
    special_instructions: "",
    pallets_same_dims: true,
    is_palletized: true,
    is_stackable: true,
    is_haz_mat: false,
    is_oversized: false,
    is_fragile: false,
    is_frozen: false,
    is_perishable: false,
    is_expedited: false,
    is_inbond: false,
    requires_tarp: false,
    requires_team: false,
    requires_ventilation: false,
    requires_tailgate: false,
    requires_blanket_wrap: false,
    requires_chains: false,
    requires_straps: false,
    requires_temp_control: false,
    requires_dunnage: false,
  };

  const [load, setLoad] = useState({ ...loadTemplate });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify(load);
      const response = await fetch("http://localhost:3000/loads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      console.log(body);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1>Input Load Info</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="num_pallets"
          placeholder="Number of Pallets"
          onChange={(e) => setLoad({ ...load, num_pallets: e.target.value })}
        />

        <input
          type="text"
          name="commodity"
          placeholder="Commodity"
          onChange={(e) => setLoad({ ...load, commodity: e.target.value })}
        />

        <input
          type="text"
          name="weight_lbs"
          placeholder="Weight (lbs)"
          onChange={(e) => setLoad({ ...load, weight_lbs: e.target.value })}
        />

        <input
          type="text"
          name="weight_kgs"
          placeholder="Weight (kgs)"
          onChange={(e) => setLoad({ ...load, weight_kgs: e.target.value })}
        />

        <input
          type="text"
          name="feet"
          placeholder="Feet"
          onChange={(e) => setLoad({ ...load, feet: e.target.value })}
        />

        <input
          type="text"
          name="packaging_type"
          placeholder="Packaging Type"
          onChange={(e) => setLoad({ ...load, packaging_type: e.target.value })}
        />

        <input
          type="text"
          name="equipment_type"
          placeholder="Equipment Type"
          onChange={(e) => setLoad({ ...load, equipment_type: e.target.value })}
        />

        <input
          type="text"
          name="special_instructions"
          placeholder="Special Instructions"
          onChange={(e) =>
            setLoad({ ...load, special_instructions: e.target.value })
          }
        />
        <Card>
          <input
            type="checkbox"
            name="pallets_same_dims"
            id="pallets_same_dims"
            placeholder="Pallets Same Dimensions"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, pallets_same_dims: true })
                : setLoad({ ...load, pallets_same_dims: false })
            }
          />

          <label htmlFor="pallets_same_dims">
            Pallets Have Same Dimensions
          </label>

          <input
            type="checkbox"
            name="is_palletized"
            id="is_palletized"
            placeholder="Is Palletized"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, is_palletized: true })
                : setLoad({ ...load, is_palletized: false })
            }
          />

          <label htmlFor="is_palletized">Is Palletized</label>

          <input
            type="checkbox"
            name="is_stackable"
            id="is_stackable"
            placeholder="Is Stackable"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, is_stackable: true })
                : setLoad({ ...load, is_stackable: false })
            }
          />

          <label htmlFor="is_stackable">Is Stackable</label>

          <input
            type="checkbox"
            name="is_haz_mat"
            id="is_haz_mat"
            placeholder="Is Haz Mat"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, is_haz_mat: true })
                : setLoad({ ...load, is_haz_mat: false })
            }
          />

          <label htmlFor="is_haz_mat">Is Haz Mat</label>

          <input
            type="checkbox"
            name="is_oversized"
            id="is_oversized"
            placeholder="Is Oversized"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, is_oversized: true })
                : setLoad({ ...load, is_oversized: false })
            }
          />

          <label htmlFor="is_oversized">Is Oversized</label>

          <input
            type="checkbox"
            name="is_fragile"
            id="is_fragile"
            placeholder="Is Fragile"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, is_fragile: true })
                : setLoad({ ...load, is_fragile: false })
            }
          />

          <label htmlFor="is_fragile">Is Fragile</label>

          <input
            type="checkbox"
            name="is_frozen"
            id="is_frozen"
            placeholder="Is Frozen"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, is_frozen: true })
                : setLoad({ ...load, is_frozen: false })
            }
          />

          <label htmlFor="is_frozen">Is Frozen</label>

          <input
            type="checkbox"
            name="is_perishable"
            id="is_perishable"
            placeholder="Is Perishable"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, is_perishable: true })
                : setLoad({ ...load, is_perishable: false })
            }
          />

          <label htmlFor="is_perishable">Is Perishable</label>

          <input
            type="checkbox"
            name="is_expedited"
            id="is_expedited"
            placeholder="Is Expedited"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, is_expedited: true })
                : setLoad({ ...load, is_expedited: false })
            }
          />

          <label htmlFor="is_expedited">Is Expedited</label>

          <input
            type="checkbox"
            name="is_inbond"
            id="is_inbond"
            placeholder="Is Inbond"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, is_inbond: true })
                : setLoad({ ...load, is_inbond: false })
            }
          />

          <label htmlFor="is_inbond">Is Inbond</label>

          <input
            type="checkbox"
            name="requires_tarp"
            id="requires_tarp"
            placeholder="Requires Tarp"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, requires_tarp: true })
                : setLoad({ ...load, requires_tarp: false })
            }
          />

          <label htmlFor="requires_tarp">Requires Tarp</label>

          <input
            type="checkbox"
            name="requires_team"
            id="requires_team"
            placeholder="Requires Team"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, requires_team: true })
                : setLoad({ ...load, requires_team: false })
            }
          />

          <label htmlFor="requires_team">Requires Team</label>

          <input
            type="checkbox"
            name="requires_ventilation"
            id="requires_ventilation"
            placeholder="Requires Ventilation"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, requires_ventilation: true })
                : setLoad({ ...load, requires_ventilation: false })
            }
          />

          <label htmlFor="requires_ventilation">Requires Ventilation</label>

          <input
            type="checkbox"
            name="requires_tailgate"
            id="requires_tailgate"
            placeholder="Requires Tailgate"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, requires_tailgate: true })
                : setLoad({ ...load, requires_tailgate: false })
            }
          />

          <label htmlFor="requires_tailgate">Requires Tailgate</label>

          <input
            type="checkbox"
            name="requires_blanket_wrap"
            id="requires_blanket_wrap"
            placeholder="Requires Blanket Wrap"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, requires_blanket_wrap: true })
                : setLoad({ ...load, requires_blanket_wrap: false })
            }
          />

          <label htmlFor="requires_blanket_wrap">Requires Blanket Wrap</label>

          <input
            type="checkbox"
            name="requires_chains"
            id="requires_chains"
            placeholder="Requires Chains"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, requires_chains: true })
                : setLoad({ ...load, requires_chains: false })
            }
          />

          <label htmlFor="requires_chains">Requires Chains</label>

          <input
            type="checkbox"
            name="requires_straps"
            id="requires_straps"
            placeholder="Requires Straps"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, requires_straps: true })
                : setLoad({ ...load, requires_straps: false })
            }
          />

          <label htmlFor="requires_straps">Requires Straps</label>

          <input
            type="checkbox"
            name="requires_temp_control"
            id="requires_temp_control"
            placeholder="Requires Temp Control"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, requires_temp_control: true })
                : setLoad({ ...load, requires_temp_control: false })
            }
          />

          <label htmlFor="requires_temp_control">Requires Temp Control</label>

          <input
            type="checkbox"
            name="requires_dunnage"
            id="requires_dunnage"
            placeholder="Requires Dunnage"
            onChange={(e) =>
              e.checked
                ? setLoad({ ...load, requires_dunnage: true })
                : setLoad({ ...load, requires_dunnage: false })
            }
          />

          <label htmlFor="requires_dunnage">Requires Dunnage</label>
        </Card>

        <button type="submit"> Submit </button>
      </form>

      <ListLoads />
    </Fragment>
  );
}
