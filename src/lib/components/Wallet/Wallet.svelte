<script>
  import Funds from "./Funds.svelte";
  import Coins from "./Coins.svelte";
  import Remittance from "./Remittance.svelte";

  let childLoadFunds;
  let childDeselectCoins;
  let childUpdSelectedCoins;

  function callChildToLoadFunds() {
    childLoadFunds();
  }

  function callChildDeselectCoins() {
    childDeselectCoins();
  }

  function callChildToUpdSelectedCoins(sCoins) {
    childUpdSelectedCoins(sCoins);
  }
</script>

<div class="container">
  <div class="row">
    <div class="col-12">
      <Funds bind:childLoadFunds />
    </div>
    <div class="row">
      <div class="col-6">
        <Coins
          bind:childDeselectCoins
          callParentToUpdSelectedCoins={(sCoins) => callChildToUpdSelectedCoins(sCoins)}
        />
      </div>
      <div class="col-6">
        <Remittance
        bind:childUpdSelectedCoins
          callParentToLoadFunds={() => callChildToLoadFunds()}
          callParentToDeselectCoins={() => callChildDeselectCoins()}
        />
      </div>
    </div>
  </div>
</div>
