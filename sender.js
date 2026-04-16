
<script>
   (function(){
       emailjs.init("YOUR_USER_ID"); // stavi svoj user ID
   })();

   const form = document.getElementById("contactForm");
   form.addEventListener("submit", function(e){
       e.preventDefault();

       // validacija (sva polja required, već smo u HTML stavili required)
       const formData = {
           name: form.name.value,
           city: form.city.value,
           email: form.email.value,
           message: form.message.value
       };

       emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID", formData)
       .then(() => {
           alert("Poruka je poslana!");
           form.reset();
       }, (error) => {
           alert("Greška pri slanju: " + JSON.stringify(error));
       });
   });
</script>
