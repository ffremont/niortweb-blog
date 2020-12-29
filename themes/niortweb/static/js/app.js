$(() => {
    window.appReady.forEach(ar => ar());
})

window.copyToClip = function(cssSelectorInput){
    const copyText = document.querySelector(cssSelectorInput);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");
    alert("C'est copié !");
}