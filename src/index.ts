// main 
import { getAllCountries, getCountryDetail } from "./apiService.js";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div class="flex flex-col items-center justify-center min-h-screen bg-red-500 text-white">
    <h1 class="text-4xl font-extrabold drop-shadow">Rest Countries Api</h1>
    <p class="mt-4 text-slate-200"> Today we are creating the rest countries api project</p>
  </div>
</section> `;


// TEST if api fetch is working - confirm its working
getAllCountries().then((countries) => {
  console.log("Total countries:", countries.length);
  console.log("First country:", countries[0]);
});

getCountryDetail("BEL").then((country) => {
  console.log("Beligum from live API:", country);}).catch((error) => {
    console.log("getCountryDetail failed:", error);
    
  });
  