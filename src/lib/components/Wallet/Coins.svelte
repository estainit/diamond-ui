<script>
  import { onMount } from "svelte";
  import { httpGet } from "../../../server/server";
  import {
    convertBPaiToPai,
    hash6c,
    hash32c,
    mapBlockTypeToColor,
    numberWithCommas,
    getColorCode,
  } from "../../cutils";
  //   import keccak256 from '../../../../public/vendor/keccak256';

  //   console.log('keccak256-----',hash6c(keccak256("hello").toString("hex"))); // "1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8"
  //   console.log(keccak256(Buffer.from("hello")).toString("hex")); // "1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8"

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
  <div style="overflow:scroll; height:400px;">
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Coin</th>
          <th scope="col">Maturation Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Spend</th>
        </tr>
      </thead>
      <tbody>
        {#each theFunds as aRecord, inx}
          <tr title={aRecord["sq_code"]}>
            <td>
              <input
                type="checkbox"
                id="{aRecord['wf_trx_hash']}:{aRecord['wf_o_index']}"
                checked={false}
                disabled={false}
              />
            </td>
            <th scope="row">{inx + 1}</th>
            <td
              style="background-color:#{getColorCode(aRecord['wf_address'])} ;"
              >{hash32c(aRecord["wf_trx_hash"])}:{aRecord["wf_o_index"]}</td
            >
            <td>{aRecord["wf_mature_date"]} </td>
            <td title={numberWithCommas(aRecord["wf_o_value"])}
              >{numberWithCommas(convertBPaiToPai(aRecord["wf_o_value"]))}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <button class="btn btn-success btn-sm m-1" on:click={refreshCoins}>
    Refresh Coins</button
  >
{:catch error}
  <p style="color: red">{error}</p>
{/await}
