<script>
  import { httpGet } from "../server/server";

  import { onMount } from "svelte";

  import { Nodes } from "./store/nodes";
  let selected;
  let profiles;
  function changeNode() {
    Nodes.setCurrent(selected);
  }

  onMount(async () => {
    profiles = await httpGet("/profiles");
    console.log(profiles);
    console.log('Nodes', Nodes);
  });
</script>

<span style="margin-right: 20px;">Current Profile</span>
<select bind:value={selected} on:change={changeNode}>
  {#each $Nodes as node}
    <option value={node.id}>{node.name}</option>
  {/each}
</select>
