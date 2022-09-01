<script>
  import { setContext } from 'svelte';
  export let onCancel = null
  // export let onOkey = null
  export let headerText=""
  export let footerText=""
  export let id = "1"
  let isVisible = false
  export const open=()=>{
    isVisible=true
  }
  export const close=()=>{
    isVisible=false
  }
  setContext('close', close)
  setContext('open', open)
  function getId() {
        return "modalContainer_"+id
    }
    document.addEventListener("keyup", e => {
  if (e.key == "Escape" && isVisible) {
    close()
    if (onCancel) onCancel()
  }
});
</script>
<div class="modal" class:is-visible="{isVisible}" id={getId()} data-animation="mixInAnimations">
    <div class="modal-dialog">
      <header class="modal-header">
        {headerText}
        <button class="close-modal" aria-label="close modal" on:click={close}>
          ✕  
        </button>
      </header>
      <section class="modal-content">
        <slot></slot>
      </section>
      <footer class="modal-footer">
        {footerText}
      </footer>
    </div>
  </div>
<style>
    :root {
  --lightgray: #242424;
  --blue: steelblue;
  --white: #242424;
  --black: rgba(0, 0, 0, 0.8);
  --bounceEasing: cubic-bezier(0.51, 0.92, 0.24, 1.15);
}
.modal { 
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--black);
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
  transition: all 0.35s ease-in;
}
.modal-dialog {
  position: relative;
  max-width: 800px;
  max-height: 80vh;
  border-radius: 5px;
  background: var(--white);
  overflow: auto;
  cursor: default;
}
.modal-dialog > * {
  padding: 1rem;
}
 
.modal-header,
.modal-footer {
  background: var(--lightgray);
}
 
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
 
.modal-header .close-modal {
  font-size: 1.5rem;
  padding: 0
}

.modal {
  visibility: hidden;
  opacity: 0;
  transition: all 0.35s ease-in;
}
 
.modal.is-visible {
  visibility: visible;
  opacity: 1;
}
</style>