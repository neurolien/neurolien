<script>
  import InputForm from "../../components/InputForm.svelte";
  import Button from "../../components/Button.svelte";
  import { goto } from "$app/navigation";
</script>

<div class="grid grid-cols-1">
  <p class="text-4xl font-bold text-center text-sky-400 mb-24 ">Je suis un talent</p>
  <div class="mb-24">
    <InputForm label="Téléphone" />
  </div>
  
  <Button on:click={() => goto("/auth/confirm")}>Suivante</Button>
</div>