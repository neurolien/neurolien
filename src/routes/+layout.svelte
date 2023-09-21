<script>
  import { onMount } from 'svelte';
  import "../app.css";
  import { pageType, user, isLoggedIn } from '../store.js';
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
  import { initFirebase } from '$lib/client/firebase';
  onMount(() => {
    // @ts-ignore
    pageType.set(localStorage.getItem("pageType") ? localStorage.getItem("pageType") : null);
    // @ts-ignore
    pageType.set(localStorage.getItem("user") ? localStorage.getItem("user") : null);
    
    initFirebase();
    const auth = getAuth();
    onAuthStateChanged(auth, function(userRes) {
    if (userRes) {
      // User is signed in, check if the session is expired
      var now = new Date().getTime();
      // @ts-ignore
      var expirationTime = (userRes.metadata.lastLoginAt * 1) + (userRes.stsTokenManager.expiresIn * 1000);

      if (now >= expirationTime) {
        // Perform any necessary actions, such as signing the user out
        signOut(auth);
        // @ts-ignore
        localStorage.setItem("user", null);
      } else {
        // @ts-ignore
        user.set(userRes);
        // @ts-ignore
        localStorage.setItem("user", userRes);
        isLoggedIn.set(true);
      }
    } else {
      // User is signed out
      console.log("User is signed out");
    }
  });
  })
</script>

<div class="flex items-center justify-center">
  <div class="w-[400px] xs:w-full px-5">
    <slot />
  </div>
</div>

