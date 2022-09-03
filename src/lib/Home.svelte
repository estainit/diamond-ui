<script>
  import { get,writable } from 'svelte/store';
  import Clock from "./components/Clock.svelte";
  import Neighbors from "./components/Neighbors.svelte";
  import Monitor from "./components/Monitor/Monitor.svelte";
  import Settings from "./components/Settings/Settings.svelte";
  import Tab2 from "./Tab2.svelte";
  import Tabs from "./Tabs.svelte";
  // @ts-ignore
  import Nodes from "./Nodes.svelte";

  // List of tab items with labels, values and assigned components
  let items = [
    { label: "Monitor", value: 1, component: Monitor },
    { label: "Neighbors", value: 2, component: Neighbors },
    { label: "Settings", value: 3, component: Settings },
    { label: "test", value: 4, component: Tab2 },
  ];
  

</script>

<Nodes />

<div class="container">
  <div class="row">
    <div class="col-sm">
      <div class="clock">
        <Clock />
        <div class="tLbl">
          UTC Time
        </div>
      </div>
      
    </div>
    <div class="col-sm">
      Machine Profile
    </div>
    <div class="col-sm">
      Some Machine Statistics
    </div>
  </div>
</div>


<Tabs {items} />

<style>
  .tLbl{
    font-size: smaller;
  }
  .clock {
    width: 75px;
    height: 75px;
  }
</style>
