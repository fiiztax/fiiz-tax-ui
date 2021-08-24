import {Router, ActivatedRoute} from '@angular/router';
import {Component, Inject, Injectable, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/observable/throw';
import {AuthenticationService} from '../_services';
import FiiTax from '../forms/FiiTax';
import FiiSubscricao from './FiiSubscricao';


@Component({
    selector: 'app-forms',
    templateUrl: './extract.component.html',
    styleUrls: ['./extract.component.scss'],
})
@Injectable()
export class ExtractComponent implements OnInit {
    public pageData;
    baseUrl = `https://fiiztax.technology/tax/fii/subscricao`;
    public show_image_xp = false;
    public alert_sucess_upload = false;
    public alert_fail_upload = false;
    public message_error_automatic;
    public selecioneOsArquivos = 'Selecione o arquivo';
    clientId: string;
    message: string;
    count: number;
    username: string;
    public fiiName;
    public uploadSubscricao: File;
    public dataOutUpload: FiiSubscricao[];


    constructor(private router: Router, private authenticationService: AuthenticationService,
                private route: ActivatedRoute, private httpClient: HttpClient) {
    }

    ngOnInit() {
        this.pageData = <any>this.route.snapshot.data;
        this.clientId = this.authenticationService.currentUserValueId.clientId.toString();
        console.log('client_id: ', this.clientId);
        if (this.authenticationService.currentUserValue.username === '') {
            this.authenticationService.logout();
            this.router.navigate(['/login']);
        }

    }

    myFunctionXp() {
        this.show_image_xp = !this.show_image_xp;
    }

    onUploadSubscricao(files) {
        if (files.length > 1) {
            this.alert_fail_upload = true;
            this.alert_sucess_upload = false;
            this.message_error_automatic = 'Você só pode enviar no máximo 1 PDF.';
        } else {
            this.alert_sucess_upload = true;
            this.alert_fail_upload = false;
        }
        this.uploadSubscricao = files[0];
        this.selecioneOsArquivos = files[0].name;
    }

    sendFiles() {

        const uploadData = new FormData();

        uploadData.append('corrretora', 'XP');
        uploadData.append('client_id', this.clientId);
        uploadData.append('extract', this.uploadSubscricao);


        this.httpClient.post(this.baseUrl, uploadData, {
            headers: new HttpHeaders(
                {
                    'Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token}
            )})
            .subscribe(
                (data: any) => {
                    console.log(data);
                    this.dataOutUpload = data['fiiSubscricaoList'] as FiiSubscricao[];
                    this.alert_sucess_upload = true;
                    this.alert_fail_upload = false;
                    console.log(this.dataOutUpload);
                    if (this.dataOutUpload.length === 0) {
                        this.alert_fail_upload = true;
                        this.alert_sucess_upload = false;
                        this.message_error_automatic = 'Não indentificamos nenhuma subscrição';
                    }
                },
                (err: any) => {
                    this.alert_fail_upload = true;
                    this.alert_sucess_upload = false;
                    if (err.status === 400) {
                        this.message_error_automatic = 'Valores fornecidos inválidos.';
                    } else if (err.status === 422) {
                        this.message_error_automatic = 'Tamanho do PDF muito grande.';
                    } else if (err.status === 403) {
                        console.log('redirectiong to login');
                        this.authenticationService.logout();
                        this.router.navigate(['/login']);
                    } else {
                        console.log(err);
                    }

                });
    }

}
