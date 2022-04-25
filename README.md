# angular-10-role-based-authorization-example-heqnta

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-10-role-based-authorization-example-heqnta)

------------------------------------------------------------

 Token-based authentication

Token-based authentication technologies enable users to enter their credentials once and receive a unique encrypted string of random characters in exchange. You can then use the token to access protected systems instead of entering your credentials all over again. The digital token proves that you already have access permission. Use cases of token-based authentication include RESTful APIs that are used by multiple frameworks and clients.
------------------------------------------------------

<input type="text" formControlName="username" class="form-control" />
 <input type="password" formControlName="password" class="form-control" />

   <button [disabled]="loading" class="btn btn-primary">
          Login
        </button>
<div *ngIf="error" class="alert alert-danger mt-3 mb-0">
          {{ error }}
        </div>


___________login.component.ts-------------


    ngOnInit() {
        // form builder group validators
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
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

  <div *ngIf="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
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


-------------login---------------Success
Navigated to Home component

ng constructor    ngOnInit



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

-------  Authorization---------------  
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



  =---------------------------Gaurd --- route restriction------------

