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
</script>

<h2>DAG</h2>
<div>
  {#await promise}
    <p>...waiting</p>
  {:then blocks}
    {#each blocks as block, inx}
      <div style="text-align: left; width: 300px;">
        <span style="background-color:#{hash6c(block.b_hash)} ;"
          >&nbsp;{inx + 1}&nbsp;</span
        >
        <span
          style="background-color:{mapBlockTypeToColor(block.b_type)} ;"
          title={block.b_hash}>{hash6c(block.b_hash)}</span
        >
        <span style="background-color:{mapBlockTypeToColor(block.b_type)} ;"
        title="{block.b_type}"
          >{block.b_creation_date}</span
        >
      </div>
    {/each}
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
</div>

<style>
</style>
