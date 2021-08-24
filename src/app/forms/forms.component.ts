import {Router, ActivatedRoute} from '@angular/router';
import {Component, Inject, Injectable, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import FiiData from './FiiData';
import FiiTax from './FiiTax';
import 'rxjs/add/observable/throw';
import {AuthenticationService} from '../_services';


@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss'],
})
@Injectable()
export class FormsComponent implements OnInit {
    public pageData;
    baseUrl = `https://fiiztax.technology/tax/fii/manual`;
    baseUrlA = `https://fiiztax.technology/tax/fii/automatic`;

    public alert_sucess_manual = false;
    public alert_fail_manual = false;
    public message_error_manual;
    public alert_sucess_upload = false;
    public alert_fail_upload = false;
    public message_error_automatic;
    public selecioneOsArquivos = 'Selecione os arquivos';
    clientId: string;
    oneFileOnly: boolean;

    public name2: string;
    public buy: number;
    public sell: number;
    public dataOut: FiiTax;
    public dataOutUpload: FiiTax[];

    public emolumentosFeeString;
    public fixedTaxString;
    public irrffeeString;
    public liquidacaoFeeString;
    public totalProfitPercentageString;
    public totalProfitValueString;
    public corretoraFeeString;

    public fiiName;
    public uploadCorretagem: File[];
    public isChecked: string;
    public date = 'empty';
    public corretora: 'XP';
    public hideSub = true;

    message: string;
    count: number;
    username: string;

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
        this.isChecked = 'false';
    }

    onNameKeyUp(event: any) {
        this.name2 = event.target.value;
    }

    onBuyKeyUp(event: any) {
        this.buy = event.target.value;
    }

    onSellKeyUp(event: any) {
        this.sell = event.target.value;
    }

    postProfile() {

        if (this.date === 'empty') {
            this.alert_fail_manual = true;
            this.alert_sucess_manual = false;
            this.message_error_manual = 'Selecione uma data válida.';

        } else {
            this.alert_sucess_manual = true;
            this.alert_fail_manual = false;
            // @ts-ignore

            const newContent = <FiiData>({
                clientId: this.clientId,
                name: this.name2,
                purchasePriceUnit: 0,
                quantityBought: 0,
                quantitySold: 0,
                soldPriceUnit: 0,
                totalValueBought: this.buy,
                totalValueSold: this.sell,
                date: this.date
            });
            console.log(newContent.totalValueBought);
            console.log(newContent.totalValueSold);
            this.alert_sucess_manual = false;
            this.alert_fail_manual = false;

            this.httpClient.post(this.baseUrl,
                JSON.stringify(newContent),
                {
                    headers: new HttpHeaders(
                        {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token
                        }
                    )
                })
                .subscribe(
                    (data: any) => {
                        console.log(data);
                        this.dataOut = data;
                        this.emolumentosFeeString = `Emolumentos: R$ ${this.dataOut.emolumentosFee.toLocaleString('pt-BR')}`;
                        this.liquidacaoFeeString = `Liquidação: R$ ${this.dataOut.liquidacaoFee.toLocaleString('pt-BR')}`;
                        this.irrffeeString = `IRRF: R$ ${this.dataOut.irrffee.toLocaleString('pt-BR')}`;
                        this.corretoraFeeString = `Corretora: R$ ${this.dataOut.corretoraFee.toLocaleString('pt-BR')}`;
                        this.fixedTaxString = `Valor do DARF: R$ ${this.dataOut.fixedTax.toLocaleString('pt-BR')}`;
                        this.totalProfitValueString = `Lucro Líquido Total: R$ ${this.dataOut.totalProfitValue.toLocaleString('pt-BR')}`;
                        this.totalProfitPercentageString = `Lucro Líquido (%): ${(this.dataOut.totalProfitPercentage * 100)
                            .toLocaleString('pt-BR')}%`;
                        this.alert_sucess_manual = true;
                        this.alert_fail_manual = false;
                    }, (err: any) => {
                        this.alert_fail_manual = true;
                        this.alert_sucess_manual = false;
                        if (err.status === 400) {
                            this.message_error_manual = 'Valores fornecidos inválidos.';
                        } else if (err.status === 422) {
                            this.message_error_automatic = err.error.message;
                        } else if (err.status === 403) {
                            console.log('redirectiong to login');
                            this.authenticationService.logout();
                            this.router.navigate(['/login']);
                        } else {
                            console.log(err.status);
                        }
                    }
                );
        }
    }

    onUploadVenda(selectedFiles) {

        if (selectedFiles.length > 12) {
            this.alert_fail_upload = true;
            this.alert_sucess_upload = false;
            this.message_error_automatic = 'Você só pode enviar no máximo 12 PDFs.';
        } else {
            this.alert_sucess_upload = true;
            this.alert_fail_upload = false;
        }


        for (let i = 0; i < selectedFiles.length; i++) {
            if (selectedFiles[i].size > 1048576) {
                this.alert_fail_upload = true;
                this.alert_sucess_upload = false;
                this.message_error_automatic = 'O tamanho máximo de cada PDF é de 1 MB.';
            } else {
                this.alert_sucess_upload = true;
                this.alert_fail_upload = false;
            }
        }

        this.uploadCorretagem = selectedFiles;

        this.selecioneOsArquivos = selectedFiles[0].name;

        for (let i = 1; i < selectedFiles.length; i++) {
            this.selecioneOsArquivos = this.selecioneOsArquivos + ', ' + selectedFiles[i].name;
        }


    }

    sendFiles() {

        const uploadData = new FormData();

        if (this.uploadCorretagem.length === 1) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
        } else if (this.uploadCorretagem.length === 2) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
            uploadData.append('corretagem1', this.uploadCorretagem[1]);
        } else if (this.uploadCorretagem.length === 3) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
            uploadData.append('corretagem1', this.uploadCorretagem[1]);
            uploadData.append('corretagem2', this.uploadCorretagem[2]);
        } else if (this.uploadCorretagem.length === 4) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
            uploadData.append('corretagem1', this.uploadCorretagem[1]);
            uploadData.append('corretagem2', this.uploadCorretagem[2]);
            uploadData.append('corretagem3', this.uploadCorretagem[3]);
        } else if (this.uploadCorretagem.length === 5) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
            uploadData.append('corretagem1', this.uploadCorretagem[1]);
            uploadData.append('corretagem2', this.uploadCorretagem[2]);
            uploadData.append('corretagem3', this.uploadCorretagem[3]);
            uploadData.append('corretagem4', this.uploadCorretagem[4]);
        } else if (this.uploadCorretagem.length === 6) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
            uploadData.append('corretagem1', this.uploadCorretagem[1]);
            uploadData.append('corretagem2', this.uploadCorretagem[2]);
            uploadData.append('corretagem3', this.uploadCorretagem[3]);
            uploadData.append('corretagem4', this.uploadCorretagem[4]);
            uploadData.append('corretagem5', this.uploadCorretagem[5]);
        } else if (this.uploadCorretagem.length === 7) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
            uploadData.append('corretagem1', this.uploadCorretagem[1]);
            uploadData.append('corretagem2', this.uploadCorretagem[2]);
            uploadData.append('corretagem3', this.uploadCorretagem[3]);
            uploadData.append('corretagem4', this.uploadCorretagem[4]);
            uploadData.append('corretagem5', this.uploadCorretagem[5]);
            uploadData.append('corretagem6', this.uploadCorretagem[6]);
        } else if (this.uploadCorretagem.length === 8) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
            uploadData.append('corretagem1', this.uploadCorretagem[1]);
            uploadData.append('corretagem2', this.uploadCorretagem[2]);
            uploadData.append('corretagem3', this.uploadCorretagem[3]);
            uploadData.append('corretagem4', this.uploadCorretagem[4]);
            uploadData.append('corretagem5', this.uploadCorretagem[5]);
            uploadData.append('corretagem6', this.uploadCorretagem[6]);
            uploadData.append('corretagem7', this.uploadCorretagem[7]);
        } else if (this.uploadCorretagem.length === 9) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
            uploadData.append('corretagem1', this.uploadCorretagem[1]);
            uploadData.append('corretagem2', this.uploadCorretagem[2]);
            uploadData.append('corretagem3', this.uploadCorretagem[3]);
            uploadData.append('corretagem4', this.uploadCorretagem[4]);
            uploadData.append('corretagem5', this.uploadCorretagem[5]);
            uploadData.append('corretagem6', this.uploadCorretagem[6]);
            uploadData.append('corretagem7', this.uploadCorretagem[7]);
            uploadData.append('corretagem8', this.uploadCorretagem[8]);
        } else if (this.uploadCorretagem.length === 10) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
            uploadData.append('corretagem2', this.uploadCorretagem[1]);
            uploadData.append('corretagem1', this.uploadCorretagem[2]);
            uploadData.append('corretagem3', this.uploadCorretagem[3]);
            uploadData.append('corretagem4', this.uploadCorretagem[4]);
            uploadData.append('corretagem5', this.uploadCorretagem[5]);
            uploadData.append('corretagem6', this.uploadCorretagem[6]);
            uploadData.append('corretagem7', this.uploadCorretagem[7]);
            uploadData.append('corretagem8', this.uploadCorretagem[8]);
            uploadData.append('corretagem9', this.uploadCorretagem[9]);
        } else if (this.uploadCorretagem.length === 11) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
            uploadData.append('corretagem1', this.uploadCorretagem[1]);
            uploadData.append('corretagem2', this.uploadCorretagem[2]);
            uploadData.append('corretagem3', this.uploadCorretagem[3]);
            uploadData.append('corretagem4', this.uploadCorretagem[4]);
            uploadData.append('corretagem5', this.uploadCorretagem[5]);
            uploadData.append('corretagem6', this.uploadCorretagem[6]);
            uploadData.append('corretagem7', this.uploadCorretagem[7]);
            uploadData.append('corretagem8', this.uploadCorretagem[8]);
            uploadData.append('corretagem9', this.uploadCorretagem[9]);
            uploadData.append('corretagem10', this.uploadCorretagem[10]);
        } else if (this.uploadCorretagem.length === 12) {
            uploadData.append('name', this.fiiName);
            uploadData.append('client_id', this.clientId);
            uploadData.append('subscricao', this.isChecked);
            uploadData.append('corretagem0', this.uploadCorretagem[0]);
            uploadData.append('corretagem1', this.uploadCorretagem[1]);
            uploadData.append('corretagem2', this.uploadCorretagem[2]);
            uploadData.append('corretagem3', this.uploadCorretagem[3]);
            uploadData.append('corretagem4', this.uploadCorretagem[4]);
            uploadData.append('corretagem5', this.uploadCorretagem[5]);
            uploadData.append('corretagem6', this.uploadCorretagem[6]);
            uploadData.append('corretagem7', this.uploadCorretagem[7]);
            uploadData.append('corretagem8', this.uploadCorretagem[8]);
            uploadData.append('corretagem9', this.uploadCorretagem[9]);
            uploadData.append('corretagem10', this.uploadCorretagem[10]);
            uploadData.append('corretagem11', this.uploadCorretagem[11]);
        }

        this.httpClient.post(this.baseUrlA, uploadData, {
            headers: new HttpHeaders(
                {
                    'Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token}
            )})
            .subscribe(
                (data: any) => {
                    console.log(data);
                    this.dataOutUpload = data['fiiTaxesList'] as FiiTax[];
                    this.alert_sucess_upload = true;
                    this.alert_fail_upload = false;
                    console.log(this.dataOutUpload);
                    if (this.dataOutUpload.length === 0) {
                        this.alert_fail_upload = true;
                        this.alert_sucess_upload = false;
                        this.message_error_automatic = 'Não indentificamos transações de venda de FIIs.';
                    }
                },
                (err: any) => {
                    this.alert_fail_upload = true;
                    this.alert_sucess_upload = false;
                    if (err.status === 400) {
                        this.message_error_automatic = 'Valores fornecidos inválidos.';
                    } else if (err.status === 422) {
                        this.message_error_automatic = err.error.message;
                    } else if (err.status === 403) {
                        console.log('redirectiong to login');
                        this.authenticationService.logout();
                        this.router.navigate(['/login']);
                    } else {
                        console.log(err);
                    }

                });
    }

    onCheckBox(event: any) {
        if (event.target.checked) {
            this.isChecked = 'true';
        } else {
            this.isChecked = 'false';
        }
    }

    onDateKeyUp(event: any) {
        this.date = event.target.value;
    }

    selectCorretora(event: any) {
        this.corretora = event.target.value;
        if (this.corretora !== 'XP') {
            this.hideSub = false;
        } else {
            this.hideSub = true;
        }
    }
}
