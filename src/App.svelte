<script>
  import { setContext } from "svelte";

  import { onMount } from "svelte";

  import { Router, Route, Link } from "svelte-routing";
  import Home from "./lib/Home.svelte";
  import nodesList from "./lib/NodesList.svelte";
  import { apiData } from "./lib/store/nodes";
  import { machineProfile } from "./lib/store/stores";
  import { httpGet } from "./server/server";
  export let url = "";


  httpGet("/profile")
  .then((data)=>{
    console.log('the profileee', data);

  });

  onMount(async () => {
    

    fetch("http://localhost:8080/hello")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        apiData.set(data);
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
    //let profiles = await httpGet("/profiles");
    //console.log(profiles);
  });
</script>

<Router {url}>
  <nav>
    <Link class="nav-link" to="/">Home</Link>
    <Link class="nav-link" to="/nodes">nodes</Link>
  </nav>
  <div>
    <Route path="/" component={Home} />
    <Route path="/nodes" component={nodesList} />
  </div>
</Router>

<style>
  nav {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: 20px;
  }
  nav :global(.nav-link) {
    padding: 20px 30px 10px 30px;
  }
</style>
