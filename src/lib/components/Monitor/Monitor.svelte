<script>
    import Ingress from "./Ingress.svelte";
    import Egress from "./Egress.svelte";
    import Dag from "./Dag.svelte";
    import Leaves from "./Leaves.svelte";
</script>
<div class="container">
  <div class="row">
    <div class="col-3">
        <Ingress />
    </div>
    <div class="col-6">
        <Dag />
        <Leaves />
    </div>
    <div class="col-3">
      <Egress />
    </div>
  </div>
</div>
