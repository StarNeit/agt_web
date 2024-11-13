import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import * as ProductActions from '../../store/product/actions';
import { IStore } from '../../interfaces/store.interface';
import { IProduct } from '../../interfaces/product.interface';
import * as ActivityActions from '../../store/activity/actions';
import { IUser } from '../../interfaces/user.interface';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-create-product-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatError, MatFormField, MatInput, MatLabel, NgIf, ReactiveFormsModule],
  templateUrl: './create-product-dialog.component.html',
  styleUrl: './create-product-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductDialogComponent {
  private readonly store:Store<IStore> = inject(Store);
  readonly dialogRef = inject(MatDialogRef<CreateProductDialogComponent>);

  profile: IUser;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  protected readonly onsubmit = onsubmit;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProduct | undefined,
    private readonly localService: LocalService,
  ) {
    if (this.data) {
      this.productForm.setValue({
        name: this.data.name,
        description: this.data.description,
        price: this.data.price,
        category: this.data.category,
      });
    }

    const stringUser = this.localService.getData('auth_token');
    this.profile = JSON.parse(stringUser);
  }

  onSubmit() {
    const payload = {
      id: this.data ? this.data.id : uuidv4(),
      ...this.productForm.value,
    } as IProduct;

    if (this.data) {
      this.store.dispatch(ProductActions.updateProduct({
        id: this.data.id,
        value: payload
      }));
      this.store.dispatch(ActivityActions.addActivity({
        value: {
          userId: this.profile.id,
          time: new Date().toISOString(),
          content: `Updated Product - ${payload.name}`
        }
      }));
    } else {
      this.store.dispatch(ProductActions.addProduct({
        value: payload
      }));
      this.store.dispatch(ActivityActions.addActivity({
        value: {
          userId: this.profile.id,
          time: new Date().toISOString(),
          content: `Created Product - ${payload.name}`
        }
      }));
    }

    this.dialogRef.close();
  }
}
