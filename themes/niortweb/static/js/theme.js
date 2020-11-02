$(() =>{
    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Fermer",
        cssClass: ['app-modal'],
        beforeClose: function() {
            return true; 
        }
    });
    
    modal.setContent(`
    <h1>NiortWeb actualité</h1>
    <p>Pour suivre les <strong>nouvelles dates</strong>, des mesures sanitaires et <strong>se tenir informer des nouveautés</strong> autour du meetup collaboratif NiortWeb.</p>
    `);

    modal.addFooterBtn(`S'abonner à la newsletter`, 'tingle-btn tingle-btn--primary btn-app-centered', function() {
        if(window.sessionStorage){
            window.sessionStorage.setItem('newsletter', '1');
        }
        window.location.href = window.newsletterForm;
    });

    if(!window.sessionStorage || window.sessionStorage.getItem('newsletter') !== '1')
        modal.open();

    window.openNewsletter = function() {
        modal.open();
    }
})
