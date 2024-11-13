import { Component, inject, OnInit } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductDialogComponent } from '../../common/create-product-dialog/create-product-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { IStore } from '../../interfaces/store.interface';
import { productsSelector } from '../../store/product/selectors';
import { IProduct } from '../../interfaces/product.interface';
import * as ProductActions from '../../store/product/actions';
import { IUser } from '../../interfaces/user.interface';
import { LocalService } from '../../services/local.service';
import { NgIf } from '@angular/common';
import * as ActivityActions from '../../store/activity/actions';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInput,
    MatPaginator,
    MatButton,
    MatIcon,
    MatIconButton,
    NgIf,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  private readonly store: Store<IStore> = inject(Store);

  readonly products$ = this.store.select(productsSelector);

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'category', 'action'];
  dataSource: any = new MatTableDataSource([]);

  profile: IUser;

  constructor(private localService: LocalService) {
    const stringUser = this.localService.getData('auth_token');
    this.profile = JSON.parse(stringUser);
  }

  ngOnInit() {
    this.products$.subscribe((products) => {
      this.dataSource = new MatTableDataSource(products);
    });
  }

  openDialog(): void {
    this.dialog.open(CreateProductDialogComponent, {
      width: '400px',
    });
  }

  openEditDialog(element: IProduct): void {
    this.dialog.open(CreateProductDialogComponent, {
      width: '400px',
      data: element,
    });
  }

  deleteProduct(id: string, name: string): void {
    this.store.dispatch(ProductActions.deleteProduct({ id }));
    this.store.dispatch(ActivityActions.addActivity({
      value: {
        userId: this.profile.id,
        time: new Date().toISOString(),
        content: `Deleted Product - ${name}`
      }
    }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
