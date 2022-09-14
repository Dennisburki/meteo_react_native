export const getMeteoByDay = (arrayList) => {

    return arrayList.reduce((acc, elt) => {
      let key = new Date(elt.dt_txt).getDate()
      if(!acc[key])
        acc[key] = []
      acc[key].push(elt)

      return acc}, []).filter(val =>val)
  }

  export const getDays = () => {

    const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    let jourActuel = new Date().toLocaleDateString('fr-FR', { weekday: 'long' })

    jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

    return joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel))).slice(0, 5);

}