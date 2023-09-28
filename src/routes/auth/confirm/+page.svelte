<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import ErrorMessage from "../../../components/ErrorMessage.svelte";
  import { pageType, isLoggedIn, user } from "../../../store";
  import Button from "../../../components/Button.svelte";
  import InputForm from "../../../components/InputForm.svelte";
  import { PhoneAuthProvider, getAuth, signInWithCredential } from "firebase/auth";

  let code = "";
  let alertShow = false;
  let alertContent = "";

  const confirmCode = () => {
    try {
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
        alertContent = "Code invalide";
        alertShow = true;
      });
    } catch (e) {
      // console.log(alertShow);
      alertContent = "Code invalide";
      alertShow = true;
    }
  }

  // @ts-ignore
  const handleInputChange = (e) => {
    code = e.target.value;
  }

  const setAlertShow = (status) => {
    alertShow = status
  }
</script>

<div class="grid grid-cols-1">
  <p class="text-4xl font-bold text-center text-main mb-20 ">Je suis un talent</p>
  <p class="text-2xl font-bold text-center text-main mb-10">Codes SMS</p>
  <ErrorMessage show={alertShow} content={alertContent} setAlertShow={setAlertShow}/>
  <div class="flex justify-center mb-16">
    <InputForm label="" value={code} on:change={handleInputChange} autocomplete="one-time-code"/>
  </div>
  <Button on:click={() => confirmCode()}>Suivant</Button>

</div>