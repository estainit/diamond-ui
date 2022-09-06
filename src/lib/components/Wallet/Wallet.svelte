<script>
  import Funds from "./Funds.svelte";
  import Coins from "./Coins.svelte";
  import Remittance from "./Remittance.svelte";

  let childLoadFunds;

  function callChildLoadFunds() {
    childLoadFunds();
  }
</script>

<div class="container">
  <div class="row">
    <div class="col-12">
      <Funds bind:childLoadFunds />
    </div>
    <div class="row">
      <div class="col-6">
        <Coins />
      </div>
      <div class="col-6">
        <Remittance callParentToLoadFunds={() => callChildLoadFunds()} />
      </div>
    </div>
  </div>
</div>
