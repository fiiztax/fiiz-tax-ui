
import { NgModule } from '@angular/core';
import { ContactRoutingModule } from './contact-routing/contact-routing.module';
import { ContactComponent } from './contact.component';
@NgModule({
  imports: [
    ContactRoutingModule
  ],
  declarations: [ ContactComponent ],
  providers: []
})
export class ContactModule { }
