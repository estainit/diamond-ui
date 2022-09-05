<script>
  import { onMount } from "svelte";
  import { httpGet } from "../../../server/server";
  import { hash6c, mapBlockTypeToColor } from "../../cutils";

  onMount(async () => {
    loadInboxFiles();
  });

  let hardInboxFiles = null;
  let promiseInboxFiles = loadInboxFiles();
  async function loadInboxFiles() {
    hardInboxFiles = await httpGet("/hardInboxFiles");
    console.log('hardInboxFiles', hardInboxFiles)
    return hardInboxFiles;
  }

  let parsingQ = null;
  let promiseParsingQ = loadParsingQ();
  async function loadParsingQ() {
    parsingQ = await httpGet("/listParsingQ");
    return parsingQ;
  }

  let missedBlocks = null;
  let promiseMissedBlocks = loadMissedBlocks();
  async function loadMissedBlocks() {
    missedBlocks = await httpGet("/listMissedBlocks");
    return missedBlocks;
  }

  const prettifyPrereq = (pre) => {
    let pres = pre.split(",");
    let out = [];
    pres.forEach((element) => {
      out.push(hash6c(element));
    });
    return out;
  };
</script>

<h2>Ingress</h2>
<div class="container">
  <div class="row">
    <button class="btn btn-success btn-sm m-1">1.1. fetch private email</button>
    <button class="btn btn-success btn-sm m-1">1.2. fetch public email</button>
  </div>

  <hr class="col-xs-12" />
  {#await promiseInboxFiles}
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
    <button class="btn btn-success btn-sm m-1" on:click={loadInboxFiles}>2. Read harddick manually</button
    >
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
  <hr class="col-xs-12" />

  {#await promiseParsingQ}
    <p>...waiting paring Q</p>
  {:then parsingQRecords}
    <div class="row">
      <h5>Records paring Q</h5>
    </div>
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Attempts</th>
          <th scope="col">Prerequisities</th>
        </tr>
      </thead>
      <tbody>
        {#each parsingQRecords as a_record, inx}
          <tr title={a_record["pq_code"]}>
            <th scope="row">{inx + 1}</th>
            <td>{a_record["pq_type"]}</td>
            <td>{a_record["pq_parse_attempts"]}</td>
            <td>{prettifyPrereq(a_record["pq_prerequisites"])}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <button class="btn btn-success btn-sm m-1" on:click={loadParsingQ}
      >3. Pull from parsing Q manually</button
    >
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
  <hr class="col-xs-12" />

  {#await promiseMissedBlocks}
    <p>...waiting Missed blocks</p>
  {:then missedBlocksRecords}
    <div class="row">
      <h5>Missed blocks</h5>
    </div>
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Attempts</th>
          <th scope="col">Last Attempts</th>
        </tr>
      </thead>
      <tbody>
        {#each missedBlocksRecords as a_record, inx}
          <tr title={a_record["mb_block_hash"]}>
            <th scope="row">{inx + 1}</th>
            <td>{hash6c(a_record["mb_block_hash"])}</td>
            <td>{a_record["mb_invoke_attempts"]}</td>
            <td>{a_record["mb_last_invoke_date"]}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <button class="btn btn-info btn-sm m-1">Controll Missed Blocks</button>
    <button class="btn btn-info btn-sm m-1">Invoke All Missed Blocks</button>
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
  <hr class="col-xs-12" />
</div>

<style>
</style>
