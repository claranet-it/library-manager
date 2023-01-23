const date = new Date();

export const stockData = {
  headerTitle: 'Library Manager',
  footerTitle: `Classroom ${date.getFullYear()}`,
  add: 'Aggiungi nuovo libro',
  list: 'Lista libri',
  formCreate: {
    info: 'Compila il modulo con i campi richiesti.',
    title: 'Titolo',
    titlePlaceholder: 'Inserisci il titolo del libro',
    author: 'Autore',
    authorPlaceholder: "Inserisci nome dell'autore",
    description: 'Descrizione',
    descriptionPlaceholder: 'Inserisci la descrizione del libro',
    price: 'Prezzo €',
    pricePlaceholder: 'Inserisci il prezzo',
    buttonSubmit: 'Salva',
    buttonCancel: 'Annulla',
    buttonLoading: 'Attendi..',
  },

  error: 'Ops! Qualcosa è andato storto.',
  errorBookNotFound: 'Errore: libro non trovato. Controlla che sia presente nel catalogo.',
  errorNoBooks: 'Non ci sono libri nel catalogo',
  loadError: 'Errore caricamento dati',
};
