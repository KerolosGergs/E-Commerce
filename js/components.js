
export  function showAlert() {
    const alert = document.getElementById("success-alert");
    alert.classList.remove("hidden");
    setTimeout(() => {
      alert.classList.add("show");
    }, 10);

    // Hide after 3 seconds
    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.classList.add("hidden"), 400);
    }, 2000);
  }


  export  function showloading() {
    const loading = document.getElementById("loading");
    loading.classList.remove("hidden");
    loading.classList.add("show");
 
  }
  export  function Hideloading() {
    const loading = document.getElementById("loading");
    loading.classList.remove("show");
    loading.classList.add("hidden");
  }