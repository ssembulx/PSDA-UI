import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestComponent } from './test/test.component';
import { PlatformOnboardingComponent } from './platform-onboarding/platform-onboarding.component'
const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  }, {
    path: "test",
    component: TestComponent
  },
  {
    path: "platformonboarding",
    component: PlatformOnboardingComponent
  },
  {
    path: "query",
    loadChildren: () => import('./query/query.module').then(m => m.QueryModule)
  },
  {
    path: "home",
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: "sample",
    loadChildren: () => import('./sample/sample.module').then(m => m.SampleModule)
  },
  {
    path: "table",
    loadChildren: () => import('./table-details/table-details.module').then(m => m.TableDetailsModule)
  },
  {
    path: "domainComponent",
    loadChildren: () => import('./daysdomain/daysdomain.module').then(m => m.DaysdomainModule)
  },
  {
    path: "domainDebugComponent",
    loadChildren: () => import('./days-domain-debug/days-domain-debug.module').then(m => m.DaysDomainDebugModule)
  },
  {
    path: "opentarget",
    loadChildren: () => import('./opentargetwise/opentargetwise.module').then(m => m.OpentargetwiseModule)
  },
  {
    path: "openDomain",
    loadChildren: () => import('./opendomainwise/opendomainwise.module').then(m => m.OpendomainwiseModule)
  }, {
    path: "openDomainDebug",
    loadChildren: () => import('./open-domain-debug/open-domain-debug.module').then(m => m.OpenDomainDebugModule)
  },
  {
    path: "ingredientWise",
    loadChildren: () => import('./openingredientwise/openingredientwise.module').then(m => m.OpeningredientwiseModule)
  },
  {
    path: "qrc-hsdes",
    loadChildren: () => import('./qrc-hsdes/qrc-hsdes.module').then(m => m.QrcHsdesModule)
  },
  {
    path: "critical-defect",
    loadChildren: () => import('./critical-defect/critical-defect.module').then(m => m.CriticalDefectModule)
  },
  {
    path: "high-defect",
    loadChildren: () => import('./high-defect/high-defect.module').then(m => m.HighDefectModule)
  },
  {
    path: "high-qrc",
    loadChildren: () => import('./high-qrc/high-qrc.module').then(m => m.HighQrcModule)
  },
  {
    path: "report",
    loadChildren: () => import('./report-generation/report-generation.module').then(m => m.ReportGenerationModule)
  },
  {
    path: "mail",
    loadChildren: () => import('./report-template/report-template.module').then(m => m.ReportTemplateModule)
  },
  {
    path: "component_mapped",
    loadChildren: () => import('./component-mapped/component-mapped.module').then(m => m.ComponentMappedModule)
  },
  {
    path: "component_unmapped",
    loadChildren: () => import('./component-unmapped/component-unmapped.module').then(m => m.ComponentUnmappedModule)
  },
  {
    path: "admin",
    component: LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
