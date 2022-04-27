# angular-10-role-based-authorization-example-heqnta

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-10-role-based-authorization-example-heqnta)

------------------------------------------------------------

 Token-based authentication

Token-based authentication technologies enable users to enter their credentials once and receive a unique encrypted string of random characters in exchange. You can then use the token to access protected systems instead of entering your credentials all over again. The digital token proves that you already have access permission. Use cases of token-based authentication include RESTful APIs that are used by multiple frameworks and clients.
------------------------------------------------------

# angular-10-role-based-authorization-example-heqnta

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-10-role-based-authorization-example-heqnta)

---

Token-based authentication

## Token-based authentication technologies enable users to enter their credentials once and receive a unique encrypted string of random characters in exchange. You can then use the token to access protected systems instead of entering your credentials all over again. The digital token proves that you already have access permission. Use cases of token-based authentication include RESTful APIs that are used by multiple frameworks and clients.

<input type="text" formControlName="username" class="form-control" />
<input type="password" formControlName="password" class="form-control" />

<button [disabled]="loading" class="btn btn-primary">
Login
</button>

<div *ngIf="error" class="alert alert-danger mt-3 mb-0">
          {{ error }}
        </div>

\***\*\_\_\_\*\***login.component.ts-------------

    ngOnInit() {
        // form builder group validators
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f(){
    return this.loginForm.controls;
    }

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    Onsubmit
    ----------------------------------------

onSubmit() {
console.log(this.f.username.value, this.f.password.value);
this.authenticationService
.login(this.f.username.value, this.f.password.value)
.subscribe();
}

    -----       ------------
    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        },
      });

      ------------------------------------------authenticationService-------------------------

Import HTTPClient

private http: HttpClient

this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
this.user = this.userSubject.asObservable();

login(){
return this.http
.post<any>(`${environment.apiUrl}/users/authenticate`, {
username,
password,
})
.pipe(
map(user => {
// store user details and jwt token in local storage to keep user logged in between page refreshes
localStorage.setItem("user", JSON.stringify(user));
this.userSubject.next(user);
return user;
})
);
}
--------------login ------------Failure

  <div *ngIf="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
-------------login---------------Success
Navigated to Home component

--------------go app component---

constructor(
private userService: UserService,
private authenticationService: AuthenticationService
) {
this.user = this.authenticationService.userValue;
}

ngOnInit() {
this.loading = true;
this.userService
.getById(this.user.id)
.pipe(first())
.subscribe(user => {
this.loading = false;
this.userFromApi = user;
});
}

{ user.role }}

--------if user already loggged -- login

        // redirect to home if already logged in
        if (this.authenticationService.userValue) {
            this.router.navigate(['/']);
        }

------- Authorization---------------  
app.component

constructor(private authenticationService: AuthenticationService) {
this.authenticationService.user.subscribe(x => (this.user = x));
}

get isAdmin() {
return this.user && this.user.role === Role.Admin;
}

logout() {
this.authenticationService.logout();
}
------------------------Add logout authentication service--------------
localStorage.removeItem('user');
this.userSubject.next(null);
this.router.navigate(['/login']);

-------------------Home component --------
add user

this.user = this.authenticationService.userValue;

{user.name}
=---------------------------Gaurd --- route restriction------------
ng generate guard guard-name

ng g guard Auth

-------------Routing.module-----------------------

import { GuardNameGuard } from "./\_helpers";

{
path: "admin",
component: AdminComponent,
canActivate: [GuardNameGuard],
data: { roles: [Role.Admin] },
},

--------------GAURD------

    private router: Router,
    private authenticationService: AuthenticationService



    const user = this.authenticationService.userValue;
    if (user) {
      if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(["/"]);
        return false;
      }
    }

------------------------------------------------Home Component-----Interceptor--------

MakeAPI button & function

<button (click)="makepicall()">Make API Call</button>

makepicall() {
this.userService.getData();
}

getData() {
return this.http.get("/assets/header.json").subscribe(data => data);
}

not able to see any http header

--------------------- Create interceptor
Got to \_helpers folder

ng g interceptor header

import {
JwtInterceptor,
ErrorInterceptor,
HeaderInterceptor,
} from "./\_helpers";

    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },

----------inside interceptor file ---------------

private authenticationService: AuthenticationService

intercept(
httpRequest: HttpRequest<any>,
next: HttpHandler
): Observable<HttpEvent<any>> {
const API_KEY = "123456";
const TOKEN = this.user.token;
return next.handle(httpRequest.clone({ setHeaders: { API_KEY, TOKEN } }));
}

    -------

