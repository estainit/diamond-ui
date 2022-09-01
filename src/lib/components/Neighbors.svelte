<script>
  import { getContext } from "svelte";
  import { Nodes } from "../store/nodes";
  let settings = null;
  LoadData();
  Nodes.current((x) => {
    let activeTab = getContext("activeTabValue");
    if (activeTab === 1) {
      console.log("active setting tab");
    }
    LoadData();
  });
  function LoadData() {
    //return
    settings = null;
    let node = Nodes.getCurrent();
    if (!node) return;
    let url = node.url + node.url.endsWith("/") ? "" : "/" + "settings";
    fetch(url).then((res) => {
      settings = res.json();
    });
  }
</script>

<h2>Settings</h2>
{#if settings}
  <div>
    {JSON.stringify(settings)}
  </div>
{:else}
  <h3>No neighbors yet!</h3>
{/if}

<style>
</style>
