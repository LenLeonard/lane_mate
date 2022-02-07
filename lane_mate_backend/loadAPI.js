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
  pals_same_dims: true,
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
      pals_same_dims,
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
      "INSERT INTO loads (num_pallets, pallet_dims_id, commodity, weight_lbs, weight_kgs, feet, packaging_type, equipment_type, special_instructions, pals_same_dims, is_palletized, is_stackable, is_haz_mat, is_oversized, is_fragile, is_frozen, is_perishable, is_expedited, is_inbond, requires_tarp, requires_team, requires_ventilation, requires_tailgate, requires_blanket_wrap, requires_chains, requires_straps, requires_temp_control, requires_dunnage) VALUES ( ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 13$, 14$, 15$, 16$, 17$, 18$, 19$, 20$, 21$, 22$, 23$, 24$, 25$, 26$, 27$, 28$) RETURNING *",
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
        pals_same_dims,
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
    res.json(newLoad.rows[0]);
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
      pals_same_dims,
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
      "UPDATE loads SET (num_pallets, pallet_dims_id, commodity, weight_lbs, weight_kgs, feet, packaging_type, equipment_type, special_instructions, pals_same_dims, is_palletized, is_stackable, is_haz_mat, is_oversized, is_fragile, is_frozen, is_perishable, is_expedited, is_inbond, requires_tarp, requires_team, requires_ventilation, requires_tailgate, requires_blanket_wrap, requires_chains, requires_straps, requires_temp_control, requires_dunnage) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13$, 14$, 15$, 16$, 17$, 18$, 19$, 20$, 21$, 22$, 23$, 24$, 25$, 26$, 27$, 28$) WHERE id = $29",
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
        pals_same_dims,
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
