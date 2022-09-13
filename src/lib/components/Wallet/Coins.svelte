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
    arrayRemove,
    arrayContains,
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
    coins.forEach((aCoin) => {
        coinsInfo[aCoin["coin_code"]] = aCoin;
    });
    return coins;
  }

  let coinsInfo = {};
  const refreshCoins = async () => {
    console.log("refreshCoins", coins);
    coins = await httpGet("/refreshCoins");
    coins.forEach((aCoin) => {
        coinsInfo[aCoin["coin_code"]] = aCoin;
    });
  };

  let selectedCoins = [];
  const chkChg = (e) => {
    if (e.target.checked) {
      selectedCoins.push(coinsInfo[e.target.id]);
    } else {
      selectedCoins = arrayRemove(selectedCoins, e.target.id, 'coin_code');
    }
    callParentToUpdSelectedCoins(selectedCoins);
  };

  export let callParentToUpdSelectedCoins = (sCoins) => {};
  export const childDeselectCoins = () => {
    alert("childDeselectCoins");
    selectedCoins = [];
  };
</script>

{#await promiseCoins}
  <p>...waiting for coins info</p>
{:then theCoins}
  <div class="row">
    <h5>Coins</h5>
  </div>
  <div style="overflow:scroll; height:400px;">
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Coin</th>
          <th scope="col">Amount</th>
          <th scope="col">Spend</th>
        </tr>
      </thead>
      <tbody>
        {#each theCoins as aCoin, inx}
          <tr title={aCoin["sq_code"]}>
            <td>{inx + 1}</td>
            <td
              style="background-color:#{getColorCode(
                aCoin['wf_address']
              )} ; font-size:15px"
              >{hash32c(aCoin["wf_trx_hash"])}:{aCoin["wf_o_index"]}
              <br />
              Maturation Date: {aCoin["wf_mature_date"]}
            </td>
            <td title={numberWithCommas(aCoin["wf_o_value"])}
              >{numberWithCommas(convertBPaiToPai(aCoin["wf_o_value"]))}</td
            >
            <td>
              <input
                type="checkbox"
                id="{aCoin['coin_code']}"
                checked={arrayContains(
                  selectedCoins,
                  aCoin["coin_code"]
                )}
                disabled={false}
                on:change={(e) => chkChg(e)}
              />
            </td>
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
