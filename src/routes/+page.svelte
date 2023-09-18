<script>
  import { goto } from '$app/navigation';
  import { pageType } from '../store.js';
  /**
     * @param {string} type
     */
   export function linkPage (type) {
    pageType.set(type);
    goto('/auth');
  }
</script>

<div class="text-center">
  <div class="pb-40 pt-40">
    <img src="logo.png" alt="" class="w-[100px] m-auto">
    <p class="text-sky-400 text-5xl uppercase text-center">
      Neurolien
    </p>
    <p class="text-sky-800 text-sm pt-2 font-bold uppercase text-center">
      partageons nos talents
    </p>
  </div>
  
  <div class="flex flex-col items-center justify-center">
    <button class="rounded-none bg-sky-400 text-2xl font-bold w-[330px] py-3 mb-10" on:click={() => linkPage('consult')}>Consult our talents</button>
    <button class="rounded-none bg-sky-400 text-2xl font-bold w-[330px] py-3" on:click={() => linkPage('share')}>Share my talents</button>
  </div>
</div>
