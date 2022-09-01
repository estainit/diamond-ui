<script>
    import { Nodes } from './store/nodes'
    import { getContext } from 'svelte'
    export let nodeId = -1
    let close = getContext('close')
    $: node = Nodes.getById(nodeId)
    
    function remove() {
      Nodes.remove(nodeId)
      if (close) close()
    }
  </script>
  
  <div>
    <p>Are you sure to remove {node? node.name: 'wtf'} node?</p>
  </div>
  
  <div>
    <button on:click={remove}>Delete any way</button>
    <button on:click={close}>Cancel</button>
  </div>
  
  <style>
  </style>
  