<script>
  import { Nodes } from './store/nodes'
  import Modal from './Modal.svelte'
  import AddNode from './AddNode.svelte'
  // @ts-ignore
  import RemoveNode from './RemoveNode.svelte'
  let openAddModal, openDeleteModal
  let currentId = -1
  function edit(id) {
    currentId = id
    openAddModal()
  }
  function remove(id) {
    currentId = id
    openDeleteModal()
  }
  function Add() {
    currentId = -1
    openAddModal()
  }
</script>

<button style="margin-top:20px ;" on:click={Add}>Add new node</button>
<table style="margin-top:20px ;">
  <thead>
    <tr>
      <th>Name</th>
      <th>Base Url</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each $Nodes as server}
      <tr>
        <td>{server.name}</td>
        <td>{server.url}</td>
        <td>
          <button
            class="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin"
            on:click={() => {
              edit(server.id)
            }}>Edit</button
          >
          <button
            class="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin"
            on:click={() => {
              remove(server.id)
            }}>Remove</button
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>
<Modal bind:open={openAddModal}>
  <AddNode bind:nodeId={currentId} />
</Modal>

<Modal bind:open={openDeleteModal}>
  <RemoveNode bind:nodeId={currentId} />
</Modal>
<style>
    td{
        padding: 10px 30px 5px 10px;
    }
</style>
