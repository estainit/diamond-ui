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
</script>

<div class="row">
  <h5>Remittance</h5>
</div>
<div class="row">
  <div>Generate new Address:</div>
  <button
    class="btn btn-primary btn-sm"
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
  <button class="btn btn-primary btn-sm" style="width: 180px;"
    >Strickt 2 of 3 Signatures</button
  >
</div>
