<script>
    import { onMount } from "svelte";
    import { httpGet } from "../../../server/server";
    import { hash6c, mapBlockTypeToColor } from "../../cutils";
  
    onMount(async () => {
    });
  
    let funds = null;
    let promiseFunds = loadFunds();
    async function loadFunds() {
      funds = await httpGet("/getAddresses");
      console.log('funds', funds);
      return funds;
    }

</script>  


{#await promiseFunds}
    <p>...waiting funds info</p> 
  {:then theFunds}
    <div class="row">
      <h5>Funds</h5>
    </div>
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Type</th>
          <th scope="col">Title</th>
          <th scope="col">Receiver</th>
        </tr>
      </thead>
      <tbody>
        {#each theFunds as a_record, inx}
          <tr title={a_record["sq_code"]}>
            <th scope="row">{inx + 1}</th>
            <td>{a_record["sq_type"]}</td>
            <td>{a_record["sq_title"]} </td>
            <td>{a_record["sq_receiver"]}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}