<script>
  import { get, writable } from "svelte/store";
  import Clock from "./components/Clock.svelte";
  import Neighbors from "./components/Neighbors.svelte";
  import Wallet from "./components/Wallet/Wallet.svelte";
  import Monitor from "./components/Monitor/Monitor.svelte";
  import Settings from "./components/Settings/Settings.svelte";
  import Tab2 from "./Tab2.svelte";
  import Tabs from "./Tabs.svelte";
  // @ts-ignore
  import Nodes from "./Nodes.svelte";
  import { httpGet } from "../server/server";

  // List of tab items with labels, values and assigned components
  let items = [
    { label: "Monitor", value: 1, component: Monitor },
    { label: "Wallet", value: 2, component: Wallet },
    { label: "Neighbors", value: 3, component: Neighbors },
    { label: "Settings", value: 4, component: Settings },
    { label: "test", value: 5, component: Tab2 },
  ];

  let isSynchronizing = true;
  let promiseSyncStatus = loadSyncStatus();
  async function loadSyncStatus() {
    isSynchronizing = await httpGet("/isSynchronizing");
  }
</script>

<Nodes />

<div class="container">
  <div class="row">
    <div class="col-sm">
      <div class="clock">
        <Clock />
        <div class="tLbl">UTC Time</div>
      </div>
    </div>
    <div class="col-sm">Machine Profile</div>
    <div class="col-sm">
      Some Machine Statistics
      {#if isSynchronizing}
        <div class="glow">Machine is Synchronizing</div>
      {:else}
        <div>Up to dated</div>
      {/if}
    </div>
  </div>
</div>

<Tabs {items} />

<style>
  .tLbl {
    font-size: smaller;
  }
  .clock {
    width: 75px;
    height: 75px;
  }

  .glow {
    background-color: #f71e0f;
    box-shadow: 0px 5px 7px 5px #f71e0f;
    /* in order: x offset, y offset, blur size, spread size, color */
    /* blur size and spread size are optional (they default to 0) */
  }
</style>
