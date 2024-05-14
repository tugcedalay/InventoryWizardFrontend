import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { ShelfListComponent } from './shelf-list/shelf-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppModule } from '../../app.module';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ShelfListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WarehouseRoutingModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class WarehouseModule { }
