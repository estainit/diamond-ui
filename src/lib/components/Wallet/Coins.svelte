<script>
  import { onMount } from "svelte";
  import { httpGet } from "../../../server/server";
  import { hash6c, mapBlockTypeToColor } from "../../cutils";

  onMount(async () => {});

  let coins = null;
  let promiseCoins = loadFunds();
  async function loadFunds() {
    coins = await httpGet("/getCoins");
    console.log("coins", coins);
    return coins;
  }

  const refreshCoins = async () => {
      console.log("refreshCoins", coins);
    coins = await httpGet("/refreshCoins");
    console.log("coins in refresh", coins);
  };
</script>

{#await promiseCoins}
  <p>...waiting for coins info</p>
{:then theFunds}
  <div class="row">
    <h5>Coins</h5>
  </div>
  <table class="table table-sm">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Type</th>
        <th scope="col">Title</th>
        <th scope="col">Receiver</th>
      </tr>
    </thead>
    <tbody>
      {#each theFunds as a_record, inx}
        <tr title={a_record["sq_code"]}>
          <th scope="row">{inx + 1}</th>
          <td>{a_record["sq_type"]}</td>
          <td>{a_record["sq_title"]} </td>
          <td>{a_record["sq_receiver"]}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <button class="btn btn-success btn-sm m-1" on:click={refreshCoins}>
    Refresh Coins</button
  >
{:catch error}
  <p style="color: red">{error}</p>
{/await}
