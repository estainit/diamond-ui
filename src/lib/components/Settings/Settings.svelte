<script>
  import { onMount } from "svelte";
  import { httpGet, httpPost } from "../../../server/server";

  let settings = null;
  let ToS = false;
  let publicEmailAddress,
    publicEmailPass,
    publicEmailFetchInterval,
    publicEmailServer,
    publicEmailIMAP,
    publicEmailPOP3;

  onMount(async () => {
    loadData();
  });

  let promise = loadData();
  async function loadData() {
    settings = await httpGet("/profile");
    console.log(settings);
    let the_settings = settings.m_mp_settings;
    ToS = the_settings.m_term_of_services == "Y";
    console.log("ToS", the_settings.m_term_of_services);
    console.log("ToS", ToS);
    publicEmailAddress = the_settings.m_public_email.m_address;
    publicEmailPass = the_settings.m_public_email.m_password;
    publicEmailFetchInterval =
      the_settings.m_public_email.m_fetching_interval_by_minute;
    publicEmailServer = the_settings.m_public_email.m_incoming_mail_server;
    publicEmailIMAP = the_settings.m_public_email.m_income_imap;
    publicEmailPOP3 = the_settings.m_public_email.m_income_pop3;

    return settings;
  }

  let saveSettings = async () => {
    let postInfo = {
      mpCode: "Default",
      ToS,
      publicEmailAddress,
      publicEmailPass,
      publicEmailFetchInterval,
      publicEmailIMAP,
      publicEmailPOP3,
      publicEmailServer,
    };
    console.log("postInfo: ", postInfo);
    let res = await httpPost("/saveSettings", postInfo);
    console.log("res: ", res);
  };
</script>

<h2>Machine Settings</h2>
<div>
  {#await promise}
    <p>...waiting</p>
  {:then machineProfile}
    <div class="container" style="text-align: left;">
      <p>
        Machine Address: {machineProfile.m_mp_settings.m_backer_detail
          .m_account_address}
      </p>
      <p>Machine Alias: {machineProfile.m_mp_settings.m_machine_alias}</p>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-6">
          Public Email Settings

          <div class="row">
            <div class="col-6">Email Address:</div>
            <div class="col-6">
              <input
                class="form-control"
                bind:value={publicEmailAddress}
                placeholder="Your dedicated email"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-6">Password:</div>
            <div class="col-6">
              <input class="form-control" bind:value={publicEmailPass} />
            </div>
          </div>
          <div class="row">
            <div class="col-4">Email fetch Interval:</div>
            <div class="col-4">
              <input
                class="form-control"
                bind:value={publicEmailFetchInterval}
              />
            </div>
            <div class="col-4">Minutes</div>
          </div>

          <div class="row">
            <div class="col-6">Mailserver Host:</div>
            <div class="col-6">
              <input class="form-control" bind:value={publicEmailServer} />
            </div>
          </div>

          <div class="row">
            <div class="col-6">IMAP Port:</div>
            <div class="col-6">
              <input class="form-control" bind:value={publicEmailIMAP} />
            </div>
          </div>

          <div class="row">
            <div class="col-6">POP3 Port:</div>
            <div class="col-6">
              <input class="form-control" bind:value={publicEmailPOP3} />
            </div>
          </div>

          <div class="row">
            <div class="col-6"><button>Test Send Email</button></div>
            <div class="col-6">
              <button>Test Read Email</button>
            </div>
          </div>
        </div>
        <div class="col-6">
          Private Email Settings
          <br />
          ...
        </div>

        <div class="row">
          <div class="col-6">
            <label>
              <input type="checkbox" bind:checked={ToS} />
              License GPL.V.2 <br />
              Terms and Services
            </label>
          </div>
          <div class="col-6">...</div>
        </div>
      </div>
      <div class="row">
        <div class="col-1">
          <button
            type="button"
            class="btn btn-success btn-sm"
            on:click={saveSettings}>Save</button
          >
        </div>
      </div>
    </div>
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
</div>

<style>
</style>
