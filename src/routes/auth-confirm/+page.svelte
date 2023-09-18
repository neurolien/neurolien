<script>
    import { goto } from "$app/navigation";
  import { pageType } from "../../store";

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

<a href="/">
  <img src="logo.png" alt="" class="w-[100px] m-5">
</a>
<div class="flex flex-col justify-center items-center mt-24">
  <p class="text-2xl bg-sky-400 w-[330px] py-3 font-bold text-center mb-20">I am a talent</p>
  <p class="text-2xl font-bold mb-20">Code SMS</p>
  <p class="text-4xl font-bold mb-20">_ _ _ _ _ _</p>
  <button class="border border-4 border-black w-[330px] text-center text-xl font-bold py-3" on:click={() => goMain()}>Following</button>
</div>