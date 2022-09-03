<script>
  import { onMount } from "svelte";
  import { httpGet } from "../../../server/server";
  import { hash6c, mapBlockTypeToColor } from "../../cutils";

  onMount(async () => {
    loadOutboxFiles();
  });

  let sendingQ = null;
  let promiseSendingQ = loadsendingQ();
  async function loadsendingQ() {
    sendingQ = await httpGet("/listSendingQ");
    return sendingQ;
  }

  let hardOutboxFiles = null;
  let promiseOutboxFiles = loadOutboxFiles();
  async function loadOutboxFiles() {
    hardOutboxFiles = await httpGet("/hardOutboxFiles");
    return hardOutboxFiles;
  }

</script>

<h2>Egress</h2>
<div class="container">
  {#await promiseSendingQ}
    <p>...waiting paring Q</p>
  {:then sendingQRecords}
    <div class="row">
      <h5>Records in sending Q</h5>
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
        {#each sendingQRecords as a_record, inx}
          <tr title={a_record["sq_code"]}>
            <th scope="row">{inx + 1}</th>
            <td>{a_record["sq_type"]}</td>
            <td>{a_record["sq_title"]} </td>
            <td>{a_record["sq_receiver"]}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <button class="btn btn-success btn-sm m-1">4. Brodcast manually</button>
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
  <hr class="col-xs-12" />

  {#await promiseOutboxFiles}
    <p>...waiting inbox files</p>
  {:then inboxFiles}
    <div class="row">
      <h5>Files on Hard drive</h5>
    </div>
    {#each inboxFiles as fileName, inx}
      <div style="text-align: left; width: 300px;">
        <span>&nbsp;{inx + 1}.&nbsp;</span>
        <span>{fileName}</span>
      </div>
    {/each}
    <button class="btn btn-success btn-sm m-1">5. Push to network</button>
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
  <hr class="col-xs-12" />
</div>

<style>
</style>
