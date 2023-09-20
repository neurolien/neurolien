
<script>
  import InputForm from "../../../components/InputForm.svelte";
  import TextArea from "../../../components/TextArea.svelte";
  import Button from "../../../components/Button.svelte";
  import { goto } from "$app/navigation";
</script>

<div class="grid grid-cols-1">
  <p class="text-4xl font-bold text-center text-sky-400 mb-24">je recherche des talents</p>
  <InputForm label="Prénom"/>
  <InputForm label="Nom"/>
  <InputForm label="Ville"/>
  <TextArea label="Ma recherche:" />
  <div class="mt-10">
    <Button on:click={() => goto("/share/success")}>Suivante</Button>
  </div>
</div>
