import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '.././environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPIService {

  private API_URL = environment.API_URL;
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getUserDetails(body) {
    return this.http.post(this.API_URL + 'GetUserDetails', body, { withCredentials: true });
  }
  refreshPlatform(body) {
    return this.http.post(this.BASE_URL + 'api/Refresh/PlatformRefresh', body, { withCredentials: true });
  }
  getDD() {
    return this.http.post(this.API_URL + 'GetMenu', {}, { withCredentials: true });
  }

  getOpenCloseTrendInfo(body) {
    return this.http.post(this.API_URL + 'GetOpenCloseTrend', body, { withCredentials: true })
  }
  getActiveCount(body) {
    return this.http.post(this.API_URL + 'GetActiveCount', body, { withCredentials: true })
  }
  GetProgramSummary(body) {
    return this.http.post(this.API_URL + 'GetProgramSummary', body, { withCredentials: true })
  }

  getActiveCountResult(body) {
    return this.http.post(this.API_URL + 'GetActiveCountResult', body, { withCredentials: true })
  }
  getClosedCount(body) {
    return this.http.post(this.API_URL + 'GetClosedCount', body, { withCredentials: true })
  }
  getClosedCountResult(body) {
    return this.http.post(this.API_URL + 'GetClosedCountResult', body, { withCredentials: true })
  }

  getTotalCount(body) {
    return this.http.post(this.API_URL + 'GetTotalCount', body, { withCredentials: true })
  }
  getTotalCountResult(body) {
    return this.http.post(this.API_URL + 'GetTotalCountResult', body, { withCredentials: true })
  }

  getOpenCloseHSDESResult(body) {
    return this.http.post(this.API_URL + 'GetOpenCloseHSDESResult', body, { withCredentials: true })
  }

  // getActiveCountResult(body){
  //   return this.http.post(this.API_URL + 'GetActiveCountResult', body, {withCredentials: true})
  // }
  // getClosedCountResult(body){
  //   return this.http.post(this.API_URL + 'GetClosedCountResult', body, {withCredentials: true})
  // }

  // getTotalCountResult(body){
  //   return this.http.post(this.API_URL + 'GetTotalCountResult', body, {withCredentials: true})
  // }

  getSightingsByIngredienntsAndExposure(body) {
    return this.http.post(this.API_URL + 'GetIngredientsAndExposureHSDESResult', body, { withCredentials: true })
  }

  getDomainAndExposureHSDESResult(body) {
    return this.http.post(this.API_URL + 'GetDomainAndExposureHSDESResult', body, { withCredentials: true })
  }

  pushviewData(body) {
    return this.http.post(this.API_URL + 'UserViewDetails', body, { withCredentials: true })
  }

  getDefectsVsRegressionHSDESResult(body) {
    return this.http.post(this.API_URL + 'GetDefectsVsRegressionHSDESResult', body, { withCredentials: true })
  }

  getIngredientExposureHSDESResult(body) {
    return this.http.post(this.API_URL + 'GetIngredientsAndExposureHSDESResult', body, { withCredentials: true })
  }

  getTargetWiseResult(body) {
    return this.http.post(this.API_URL + 'GetTargetWiseResult ', body, { withCredentials: true })
  }

  getDomainWiseResult(body) {
    return this.http.post(this.API_URL + 'GetDomainWiseCountHSDESResult', body, { withCredentials: true })
  }

  getOpenStatusOnlyResult(body) {
    return this.http.post(this.API_URL + 'GetOpenStatusOnlyResult', body, { withCredentials: true })
  }

  getDaysByDomain(body) {
    return this.http.post(this.API_URL + 'GetDaysByDomain', body, { withCredentials: true })
  }
  getDaysByDomainDebug(body) {
    return this.http.post(this.API_URL + 'GetDaysByDomainDebug', body, { withCredentials: true })
  }

  getDataFilterList() {
    return this.http.post(this.API_URL + 'GetDataFilterList', {}, { withCredentials: true })
  }

  getIngredientWiseResult(body) {
    return this.http.post(this.API_URL + 'GetIngredientWiseResult', body, { withCredentials: true })
  }

  getImplementedReasonResult(body) {
    return this.http.post(this.API_URL + 'GetImplementedReasonResult', body, { withCredentials: true })
  }

  getOpenStatusExposureResult(body) {
    return this.http.post(this.API_URL + 'GetOpenStatusExposureResult', body, { withCredentials: true })
  }

  getCumulativeStatusReport(body) {
    return this.http.post(this.API_URL + 'GetCumulativeStatusReport', body, { withCredentials: true })
  }

  getCriticalQRCvector(body) {
    return this.http.post(this.API_URL + 'GetCriticalQRCvectorHSDESResult', body, { withCredentials: true })
  }

  getHighQRCvector(body) {
    return this.http.post(this.API_URL + 'GetCriticalQRCvectorHSDESResult', body, { withCredentials: true })
  }

  getCriticalDefectVector(body) {
    return this.http.post(this.API_URL + 'GetCriticalFunctionalDefectsHSDESResult', body, { withCredentials: true })
  }

  getHighDefectVector(body) {
    return this.http.post(this.API_URL + 'GetCriticalFunctionalDefectsHSDESResult', body, { withCredentials: true })
  }

  getCriticalQRCvectorHSDESResult(body) {
    return this.http.post(this.API_URL + 'GetCriticalQRCvectorHSDESResult', body, { withCredentials: true })
  }

  getHighQRCvectorHSDESResult(body) {
    return this.http.post(this.API_URL + 'GetHighQRCvectorHSDESResult', body, { withCredentials: true })
  }

  getCriticalFunctionalDefectsHSDESResult(body) {
    return this.http.post(this.API_URL + 'GetCriticalFunctionalDefectsHSDESResult', body, { withCredentials: true })
  }

  getHighFunctionalDefectsHSDESResult(body) {
    return this.http.post(this.API_URL + 'GetCriticalFunctionalDefectsHSDESResult', body, { withCredentials: true })
  }
  getAddQueryDetails(body) {
    return this.http.post(this.API_URL + 'AddQueryDetails', body, { withCredentials: true })
  }
  getEditQueryResult() {
    return this.http.post(this.API_URL + 'GetEditQueryResult', {}, { withCredentials: true })
  }
  getUserViewCount() {
    return this.http.post(this.API_URL + 'GetUserViewDetails', {}, { withCredentials: true })
  }
  getFilters(body) {
    return this.http.post(this.API_URL + 'GetFilters', body, { withCredentials: true })
  }
  esService(body) {
    return this.http.post('https://hsdes.intel.com/ws/ESService', body, { withCredentials: true })
  }
  getLastDataTime() {
    return this.http.post(this.API_URL + 'GetPlatformTimeLog', {}, { withCredentials: true })
  }
  getOpenCloseTrendInfoReport(body) {
    return this.http.post(this.API_URL + 'GetOpenCloseTrendReportGeneration', body, { withCredentials: true })
  }
  GetOpenCloseTrendStatus(body) {
    return this.http.post(this.API_URL + 'GetOpenCloseTrendStatus', body, { withCredentials: true })
  }
  GetNoLosCountRepo(body) {
    return this.http.post(this.API_URL + 'GetNoLosCountRepo', body, { withCredentials: true })
  }
  GetKeyIngredientFailing(body) {
    return this.http.post(this.API_URL + 'GetKeyIngredientFailing', body, { withCredentials: true })
  }
  getDaysByDomainfilter(body) {
    return this.http.post(this.API_URL + 'GetDaysByDomainFilter', body, { withCredentials: true })
  }
  getDaysByDomainDebugfilter(body) {
    return this.http.post(this.API_URL + 'GetDaysByDomainDebugFilter', body, { withCredentials: true })
  }
  GetOpenCriticalQRCVectorHSDESResult(body) {
    return this.http.post(this.API_URL + 'GetOpenCriticalQRCVectorHSDESResult', body, { withCredentials: true })
  }
  GetExposureListOfIssues(body) {
    return this.http.post(this.API_URL + 'GetExposureListOfIssues', body, { withCredentials: true })
  }
  GetSightingAndExposure(body) {
    return this.http.post(this.API_URL + 'GetSightingAndExposure', body, { withCredentials: true })
  }
  GetStatusVerifiedHSDESResult(body) {
    return this.http.post(this.API_URL + 'GetStatusVerifiedHSDESResult', body, { withCredentials: true })
  }
  SendEmailReport(body) {
    return this.http.post(this.API_URL + 'SendEmailReport', body, { withCredentials: true })
  }
  editEservices(body) {
    return this.http.post('hsdes.intel.com/ws/ESService', body, { withCredentials: true })
  }
  UpdateDataHSDES(body) {
    return this.http.post(this.API_URL + 'UpdateDataHSDES', body, { withCredentials: true })
  }
  GetUpdateDataHSDES(body) {
    return this.http.post(this.API_URL + 'GetUpdateDataHSDES', body, { withCredentials: true })
  }
  getMainComponentList(body) {
    return this.http.post(this.API_URL + 'GetMainComponent', body, { withCredentials: true })
  }
  getMappedComponentList(body) {
    return this.http.post(this.API_URL + 'GetMappedComponent', body, { withCredentials: true })
  }
  GetTrendChartByDomain(body) {
    return this.http.post(this.API_URL + 'GetTrendChartByDomain', body, { withCredentials: true })
  }
  getCOELeadcount(body) {
    return this.http.post(this.API_URL + 'GetDomainListOfIssues', body, { withCredentials: true })
  }
  GetVersion() {
    return this.http.post(this.API_URL + 'Getversion', { withCredentials: true })
  }
  GetGroupDomain(body) {
    return this.http.post(this.API_URL + 'GetGroupDomain', body, { withCredentials: true })
  }

  EditSaveComponent(body) {
    return this.http.post(this.API_URL + 'EditSaveComponent', body, { withCredentials: true })
  }
  DeleteComponent(body) {
    return this.http.post(this.API_URL + 'DeleteComponent', body, { withCredentials: true })
  }
  GetunmappedComponent(body) {
    return this.http.post(this.API_URL + 'GetunmappedComponent', body, { withCredentials: true })
  }
  AddNewComponent(body) {
    return this.http.post(this.API_URL + 'AddNewComponent', body, { withCredentials: true })
  }
  AddNewSubComponent(body) {
    return this.http.post(this.API_URL + 'AddNewMainComponent', body, { withCredentials: true })
  }
  EditSaveUnMappedComponent(body) {
    return this.http.post(this.API_URL + 'EditSaveUnMappedComponent', body, { withCredentials: true })
  }
  GetCalculations() {
    return this.http.post(this.API_URL + 'GetCalculations', { withCredentials: true })
  }
  GetCalculationsTrendChartByDomain(chartdetails) {
    return this.http.post(this.API_URL + 'GetTrendChartByDomainHSDESResult', chartdetails, { withCredentials: true })
  }

  getDomainWiseCountHSDES(table) {
    return this.http.post(this.API_URL + 'GetDomainWiseCountHSDESResult', table, { withCredentials: true })
  }
  getCSLPEmailReport(data) {

    return this.http.post(this.API_URL + 'CSLPEmailReport', data, { withCredentials: true })

  }

  getWorkWeek(data) {

    return this.http.get(this.API_URL + 'GetWorkWeek')

  }

  public GetToken() {
    return this.http.get(environment.iamWindowsAuth,{ withCredentials: true }).toPromise();

  }
  //*** WhoamI APi(user Authentication) ****//
  public getUserDetailByIAM(req: any) {
    const serviceUrl = this.BASE_URL + 'api/Members/WhoAmI';
    return this.http.post(serviceUrl, req).toPromise();
  }

}
