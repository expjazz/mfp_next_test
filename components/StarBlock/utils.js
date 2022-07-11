export const getLocalisedProfessions = (starProfList, mainProfList=[]) => {
  return starProfList.map(starProf => {
    if (starProf.parent_id === undefined) {
      const mainProf = mainProfList.find(mainProfession => mainProfession.id === starProf.id) || {};
      return ({
        ...starProf,
        title: mainProf.title || starProf.title,
      })
    }
    const mainProf = mainProfList.find(mainProfession => mainProfession.title === starProf.parent_id);
    const childProf = mainProf ? mainProf.child.find(childProfession => childProfession.id === starProf.id) : {};
    return ({
      ...starProf,
      title: childProf.title || starProf.title,
    })
  })
}
