<script>
  import { onMount } from "svelte";
  import { httpGet } from "../../../server/server";
  import { hash6c, mapBlockTypeToColor } from "../../cutils";

  let leavesByKV = null;
  let promiseLeavesByKV = loadLeavesByKV();
  async function loadLeavesByKV() {
    leavesByKV = await httpGet("/listLeavesByKV");
    return leavesByKV;
  }

  let freshLeaves = null;
  let promiseFreshLeaves = loadFreshLeaves();
  async function loadFreshLeaves() {
    freshLeaves = await httpGet("/listFreshLeaves");
    console.log("freshLeaves", freshLeaves);
    return freshLeaves;
  }
  
</script>

<div class="container">
  <div class="row">
    <div class="col col-">
      Leaves by KV
      {#await promiseLeavesByKV}
        <p>...waiting paring Q</p>
      {:then leavesByKVRecords}
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type</th>
              <th scope="col">Title</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.keys(leavesByKVRecords) as a_key, inx}
              <tr
                title="{leavesByKVRecords[a_key][
                  'm_creation_date'
                ]} {leavesByKVRecords[a_key]['m_block_hash']}"
                style="background-color: {mapBlockTypeToColor(
                  leavesByKVRecords[a_key]['m_block_type']
                )};"
              >
                <th scope="row">{inx + 1}</th>
                <td>{leavesByKVRecords[a_key]["m_block_type"]}</td>
                <td>{hash6c(leavesByKVRecords[a_key]["m_block_hash"])}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:catch error}
        <p style="color: red">{error}</p>
      {/await}
    </div>

    <div class="col col-">Leaves by DAG</div>

    <div class="col col-">
        Fresh Leaves
        {#await promiseFreshLeaves}
          <p>...waiting paring Q</p>
        {:then freshLeaves}
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type</th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              {#each Object.keys(freshLeaves) as a_key, inx}
                <tr
                  title="{freshLeaves[a_key][
                    'm_creation_date'
                  ]} {freshLeaves[a_key]['m_block_hash']}"
                  style="background-color: {mapBlockTypeToColor(
                    freshLeaves[a_key]['m_block_type']
                  )};"
                >
                  <th scope="row">{inx + 1}</th>
                  <td>{freshLeaves[a_key]["m_block_type"]}</td>
                  <td>{hash6c(freshLeaves[a_key]["m_block_hash"])}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        {:catch error}
          <p style="color: red">{error}</p>
        {/await}
      </div>
  </div>
</div>
