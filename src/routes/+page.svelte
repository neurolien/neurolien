<script>
  import { goto } from '$app/navigation';
  import { pageType } from '../store.js';
  import Button from '../components/Button.svelte';
  /**
     * @param {string} type
     */
   export function linkPage (type) {
    pageType.set(type);
    goto('/auth');
  }
</script>

<div class="text-center">
  <div class="pb-40 pt-32">
    <img src="logo.png" alt="" class="w-[100px] m-auto mb-10">
    <p class="text-sky-400 text-5xl uppercase text-center">
      Neurolien
    </p>
    <p class="text-sky-800 text-sm pt-2 font-bold uppercase text-center">
      partageons nos talents
    </p>
  </div>
  
  <div class="flex flex-col items-center justify-center">
    <Button on:click={() => linkPage('consult')}>Consultez nos talents</Button>
    <Button on:click={() => linkPage('share')}>Partager mes talents</Button>
  </div>
</div>
