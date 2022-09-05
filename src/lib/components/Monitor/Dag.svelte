<script>
  import { onMount } from "svelte";
  import { httpGet } from "../../../server/server";
  import { hash6c, mapBlockTypeToColor } from "../../cutils";

  onMount(async () => {
    loadData();
  });

  let dagInfo = null;
  let promise = loadData();
  async function loadData() {
    dagInfo = await httpGet("/dagInfo");
    return dagInfo;
  }

  const refreshAllInfo = async () => {
    console.log("Refresh All Info of DAG");
  };
</script>

<h2 style="cursor: pointer;" on:click={refreshAllInfo}>DAG</h2>
<div>
  {#await promise}
    <p>...waiting</p>
  {:then blocks}
    <div class="container bg-light m-2 p-3">
      {#each blocks as block, inx}
        <div style="text-align: left; width: 300px;">
          <span style="background-color:#{hash6c(block.b_hash)} ;"
            >&nbsp;{inx + 1}&nbsp;</span
          >
          <span
            style="background-color:{mapBlockTypeToColor(block.b_type)} ;"
            title={block.b_hash}>{hash6c(block.b_hash)}</span
          >
          <span
            style="background-color:{mapBlockTypeToColor(block.b_type)} ;"
            title={block.b_type}>{block.b_creation_date}</span
          >
        </div>
      {/each}
    </div>
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
</div>

<style>
</style>
