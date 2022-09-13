<script>
  import { onMount } from "svelte";
  import { httpGet, httpPost } from "../../../server/server";
  import {
    BILLION,
    convertBPaiToPai,
    getColorCode,
    hash32c,
    mapBlockTypeToColor,
    numberWithCommas,
    shortBech16,
  } from "../../cutils";

  onMount(async () => {});

  let serverRes = null;
  async function createBasic1of1Address() {
    serverRes = await httpGet("/createBasic1of1Address");
    callParentToLoadFunds();
    return serverRes;
  }

  async function createBasic2of3Address() {
    serverRes = await httpGet("/createBasic2of3Address");
    callParentToLoadFunds();
    return serverRes;
  }

  async function createBasic3of5Address() {
    serverRes = await httpGet("/createBasic3of5Address");
    callParentToLoadFunds();
    return serverRes;
  }

  export let callParentToLoadFunds = () => {};
  export let callParentToDeselectCoins = () => {};

  let txRecepient = "";
  let txAmount = null;
  let txFeeCalcMethod = "auto";
  let txFee = 0;
  let changeBackMod = "generateNewAddress";
  let changeBackAmount = null;
  let changeBackAddress = "";
  let selectedCoins = [];
  let selectedCoinsAmount = 0;

  $: changeBackAmount = numberWithCommas(
    convertBPaiToPai(selectedCoinsAmount - txAmount * BILLION)
  );

  const resetForm = async () => {
    txRecepient = "";
    txAmount = null;
    txFeeCalcMethod = "auto";
    txFee = 0;
    changeBackMod = "generateNewAddress";
    changeBackAmount = null;
    changeBackAddress = "";

    callParentToDeselectCoins();
  };

  const signTrx = async () => {
    let selCoins = [];
    selectedCoins.forEach((element) => {
      selCoins.push(element["coin_code"]);
    });
    let postInfo = {
      txRecepient,
      txAmount,
      txFeeCalcMethod,
      txFee,
      selectedCoins: selCoins,
      changeBackMod,
      changeBackAmount,
      changeBackAddress,
      dComment: "",
    };
    console.log("postInfo: ", postInfo);
    let res = await httpPost("/signTrxAndPushToBuffer", postInfo);
    console.log("res: ", res);
  };

  export const childUpdSelectedCoins = (sCoins) => {
    selectedCoins = sCoins;
    selectedCoinsAmount = 0;
    selectedCoins.forEach((element) => {
      selectedCoinsAmount += parseInt(element["wf_o_value"]);
      console.log("Remittance Selected Coins", element);
    });
  };
</script>

<div class="row">
  <h5>Remittance</h5>
</div>
<div class="row p-2" style="background-color: #eeeeef;">
  <div class="row">
    <table class="table table-sm">
      <tbody>
        <tr class="bg-success">
          <td style="text-align: right;">Recipient: </td>
          <td style="text-align: left;"
            ><input
              type="text"
              bind:value={txRecepient}
              placeholder="im1..."
            /></td
          >
        </tr>
        <tr class="bg-success">
          <td style="text-align: right;">Amount to send: </td>
          <td style="text-align: left;"
            ><input type="text" bind:value={txAmount} placeholder="0" /> in PAIs</td
          >
        </tr>
        <tr class="bg-success">
          <td style="text-align: right;">Selected Coins Amount: </td>
          <td
            style="text-align: left;"
            title="{numberWithCommas(selectedCoinsAmount)} BPAIs"
            >{numberWithCommas(convertBPaiToPai(selectedCoinsAmount))} PAIs</td
          >
        </tr>
        <tr class="bg-warning">
          <td style="text-align: right; min-width:171px"
            >Max Transaction fee <br />(Willing to pay):
          </td>
          <td style="text-align: left;"
            ><input type="text" bind:value={txFee} placeholder="0" />
            <br />
            <label>
              <input type="radio" bind:group={txFeeCalcMethod} value="exact" />
              Pay exact fee
            </label>

            <label>
              <input type="radio" bind:group={txFeeCalcMethod} value="auto" />
              Pay less (if it is posiible)
            </label>
          </td>
        </tr>
        <tr class="bg-secondary">
          <td style="text-align: right; min-width:171px"
            >Changeback Amount:
          </td>
          <td style="text-align: left;"
            ><input
              type="text"
              disabled
              bind:value={changeBackAmount}
              placeholder="0"
            />
          </td>
        </tr>
        <tr class="bg-secondary">
          <td style="text-align: right; min-width:171px"
            >Changeback Address:
          </td>
          <td style="text-align: left;"
            ><input
              type="text"
              bind:value={changeBackAddress}
              placeholder="im1..."
              disabled={changeBackMod != "thisAddress"}
            />
            <br />
            <label>
              <input
                type="radio"
                bind:group={changeBackMod}
                value="generateNewAddress"
              />
              Generate a new address
            </label>
            <label>
              <input
                type="radio"
                bind:group={changeBackMod}
                value="useBackerAddress"
              />
              Use backer address
            </label>
            <label>
              <input
                type="radio"
                bind:group={changeBackMod}
                value="thisAddress"
              />
              Manually
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="row">
    <button
      class="btn btn-warning btn-sm"
      style="width: 90px;"
      on:click={resetForm}>Reset Form</button
    >&nbsp;
    <button
      class="btn btn-success btn-sm"
      style="width: 170px;"
      on:click={signTrx}>Sign transaction & send to Block buffer</button
    >
  </div>
</div>

<div class="row mt-5">
  <div>Generate new Address:</div>
  <button
    class="btn btn-success btn-sm"
    style="width: 90px;"
    on:click={createBasic1of1Address}>1 Signature</button
  >&nbsp;
  <button
    class="btn btn-primary btn-sm"
    style="width: 130px;"
    on:click={createBasic2of3Address}>2 of 3 Signatures</button
  >&nbsp;
  <button
    class="btn btn-primary btn-sm"
    style="width: 130px;"
    on:click={createBasic3of5Address}>3 of 5 Signatures</button
  >&nbsp;
  <div class="m-1">
    <button class="btn btn-warning btn-sm" style="width: 180px;"
      >Strickt 2 of 3 Signatures</button
    >
  </div>
</div>
