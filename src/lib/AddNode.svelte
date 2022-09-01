<script>
  import { Nodes } from './store/nodes'
  import { getContext } from 'svelte'
  export let nodeId = -1
  let close = getContext('close')
  $: node = getNode(nodeId)
  function getNode(id) {
    console.log('node id', id)
    let node = Nodes.getById(id)
    if (!node) {
      node = {
        name: '',
        id: -1,
        url: ''
      }
    }
    return node
  }
  function save() {
    Nodes.addOrUpdate(node)
    nodeId = node.id
    if (close) close()
  }
</script>

<div>
  <span>server id:</span>
  <input type="number" bind:value={node.id} />
</div>
<div>
  <span>server name:</span>
  <input type="text" bind:value={node.name} />
</div>
<div>
  <span>server url:</span>
  <input type="text" bind:value={node.url} />
</div>
<div>
  <button on:click={save}>Save</button>
</div>

<style>
  div{
    padding: 10px;
  }
  span{
    padding-right: 20px;
  }
</style>
