export default {
 // addressDetail: state => state.addressDetail
  searchobj: state => state.searchobj,
  keyword: state => state.searchobj.keyword,
  ageMin: state => state.searchobj.ageMin,
  ageMax: state => state.searchobj.ageMax,
  sex: state => state.searchobj.sex,
  expectPlace: state => state.searchobj.expectPlace,
  degree: state => state.searchobj.degree,
  currentState: state => state.searchobj.currentState,
  updateDate: state => state.searchobj.updateDate,
  resideAddress: state => state.searchobj.resideAddress,
  workLengthMin: state => state.searchobj.workLengthMin,
  workLengthMax: state => state.searchobj.workLengthMax,
  salaryMin: state => state.searchobj.salaryMin,
  salaryMax: state => state.searchobj.salaryMax,
  currentPage: state => state.pages.currentPage,
  activeName: state => state.activeName,
  platId: state => state.searchobj.platId
}

