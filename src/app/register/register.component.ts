import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserRegister } from '../_models';
import { AlertService, UserService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    public firstDigit: number;
    public secondDigit: number;
    userPost: UserRegister;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.firstDigit = Math.floor((Math.random() * 10)  + 1);
        this.secondDigit = Math.floor((Math.random() * 10)  + 1);
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            jaime: ['', [Validators.required, Validators.minLength(6)]],
            answer: ['', [Validators.required, Validators.pattern((this.firstDigit + this.secondDigit).toString())]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        if (this.registerForm.controls['password'].value !== this.registerForm.controls['jaime'].value) {
            this.alertService.error('A confirmação da sua senha está errada');
            return;
        }
        this.loading = true;
        this.userService.register(this.registerForm.value, this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Usuário registrado com sucesso', true);
                    setTimeout(() =>
                        {
                            this.router.navigate(['/login']);
                        },
                        3000);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
