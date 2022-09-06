<script>
  import { onMount } from "svelte";
  import { httpGet } from "../../../server/server";
  import {
    convertBPaiToPai,
    getColorCode,
    hash32c,
    mapBlockTypeToColor,
    numberWithCommas,
    shortBech16,
  } from "../../cutils";

  onMount(async () => {});

  let funds = null;
  let promiseFunds = loadFunds();
  async function loadFunds() {
    funds = await httpGet("/getAddresses");
    let keys = Object.keys(funds);
    return { keys, funds };
  }

  export const childLoadFunds = () => {
    promiseFunds = loadFunds();
  };
</script>

{#await promiseFunds}
  <p>...waiting funds info</p>
{:then theFunds}
  <div class="row">
    <h5>Funds</h5>
  </div>
  <div style="overflow:scroll; height:400px;">
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Address</th>
          <th scope="col">Maturated</th>
          <th scope="col">Un-Maturated</th>
        </tr>
      </thead>
      <tbody>
        {#each theFunds.keys as anAddress, inx}
          <tr title={anAddress["sq_code"]}>
            <th scope="row">{inx + 1}</th>
            <td style=""
              >{theFunds.funds[anAddress]["wa_title"]
                ? theFunds.funds[anAddress]["wa_title"]
                : ""}
            </td>
            <td
              style="background-color:#{getColorCode(anAddress)} ;"
              title={anAddress}>{anAddress}</td
            >
            <td title="{theFunds.funds[anAddress]['mat_sum']} BPai"
              >{theFunds.funds[anAddress]["mat_sum"]
                ? numberWithCommas(
                    convertBPaiToPai(theFunds.funds[anAddress]["mat_sum"])
                  )
                : 0} PAIs
            </td>
            <td
              >{theFunds.funds[anAddress]["unmat_sum"]
                ? theFunds.funds[anAddress]["unmat_sum"]
                : 0}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:catch error}
  <p style="color: red">{error}</p>
{/await}
