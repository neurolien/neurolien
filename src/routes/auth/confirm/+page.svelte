<script>
  import { goto } from "$app/navigation";

  import { pageType, isLoggedIn, user } from "../../../store";
  import Button from "../../../components/Button.svelte";
  import { PhoneAuthProvider, getAuth, signInWithCredential } from "firebase/auth";

  let code = "";
  const confirmCode = () => {
    const auth = getAuth();
    // @ts-ignore
    const credential = PhoneAuthProvider.credential(window.confirmationResult.verificationId, code);

    // @ts-ignore
    signInWithCredential(auth, credential)
    .then((confirmationResult) => {
      // @ts-ignore
      user.set(confirmationResult.user);
      // @ts-ignore
      localStorage.setItem("user", confirmationResult.user);
      isLoggedIn.set(true);
      
      let type;
      pageType.subscribe(value => {
        type = value;
      });
      if (type === "consult") {
        goto("/consult/main")
      } else {
        goto("/share/main")
      }
    }).catch((error) => {
      alert(`${error.name}: ${error.code}`);
    });
  }

  export function goMain() {
    
  }

  // @ts-ignore
  const handleInputChange = (e) => {
    code = e.target.value;

  }
</script>

<div class="grid grid-cols-1">
  <p class="text-4xl font-bold text-center text-main mb-20 ">Je suis un talent</p>
  <p class="text-2xl font-bold text-center text-main mb-10">Codes SMS</p>
  <div class="flex justify-center">
    <input value={code} on:change={handleInputChange} type="text" class="block w-1/2 text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500 sm:text-sm sm:leading-6 px-2 mb-16">
  </div>
  <Button on:click={() => confirmCode()}>Suivant</Button>

</div>