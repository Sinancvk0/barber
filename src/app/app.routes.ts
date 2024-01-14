import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './admin/components/user/user.component';
import { HomeComponent as AdminHomeComponent } from './admin/components/home/home.component';
import { LoginComponent } from './admin/layouts/pages/login/login.component';
import { isLoginGuard, isLogoutGuard } from './admin/custom-functions/guards';
import { ForbiddenComponent } from './admin/layouts/pages/forbidden/forbidden.component';
import { InternalServerErrorComponent } from './admin/layouts/pages/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './admin/layouts/pages/not-found/not-found.component';
import { UserSetCredentialComponent } from './admin/components/user/user-set-credential/user-set-credential.component';
import { UserListWorkingRangeComponent } from './admin/components/user/user-list-working-range/user-list-working-range.component';
import { CategoryComponent } from './admin/components/category/category.component';
import { ProductComponent } from './admin/components/product/product.component';
import { ServiceComponent } from './admin/components/service/service.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'admin/login',component:LoginComponent,canActivate:[isLogoutGuard] },
    {path:'admin/error/forbidden',component:ForbiddenComponent},
    {path:'admin/error/internal-server-error',component:InternalServerErrorComponent},
    {path:'admin/error/not-found',component:NotFoundComponent},
    {path:'admin',component:AdminComponent, canActivate:[isLoginGuard] ,children:[
        {path:'',component:AdminHomeComponent},
        {path:'home',component:AdminHomeComponent},
        {path:'users',component:UserComponent},
        {path:'users/set-credentials/:userId',component:UserSetCredentialComponent},
        {path:'users/list-working-ranges/:userId',component:UserListWorkingRangeComponent},
        {path:'categories',component:CategoryComponent},
        {path:'products',component:ProductComponent},
        {path:'services',component:ServiceComponent}

    ]}
];
