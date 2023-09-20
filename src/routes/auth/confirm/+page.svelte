<script>
  import { goto } from "$app/navigation";
  import { pageType } from "../../../store";
  import Button from "../../../components/Button.svelte";

  export function goMain() {
    let type;
    pageType.subscribe(value => {
      type = value;
    });
    if (type === "consult") {
      goto("/consult/main")
    } else {
      goto("/share/main")
    }
  }
</script>

<div class="grid grid-cols-1">
  <p class="text-4xl font-bold text-center text-sky-400 mb-20 ">Je suis un talent</p>
  <p class="text-2xl font-bold text-center text-sky-400 mb-10">Codes SMS</p>
  <p class="text-4xl font-bold text-center text-sky-400 mb-20">_ _ _ _ _ _</p>
  <Button on:click={() => goMain()}>Suivante</Button>
</div>