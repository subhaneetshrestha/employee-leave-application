import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';

import {
  selectLeaveById,
  selectLeaveError,
  selectUserLeave,
} from '../../../../core/selectors/leave.selectors';
import { Leave } from '../../types/leave.types';
import { createLeave, updateLeave } from '../../../../core/store/leave.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './leave-form.component.html',
  styleUrl: './leave-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveFormComponent implements OnInit {
  private store = inject(Store);
  private ref = inject(ChangeDetectorRef);
  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<any>);
  private snackBar = inject(MatSnackBar);

  formType: WritableSignal<string> = signal('add');
  title: WritableSignal<string> = signal('Create a new leave');
  user$ = this.store.pipe(select(selectUserLeave));
  createError$ = this.store.select(selectLeaveError);
  leaveForm = new FormGroup({
    id: new FormControl(''),
    date: new FormControl(new Date(), [
      Validators.required,
      this.dateBeforeToday,
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    employeeId: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required]),
    type: new FormControl('full_time', [Validators.required]),
  });
  types = [
    {
      value: 'part_time',
      name: 'Part Time',
    },
    {
      value: 'full_time',
      name: 'Full Time',
    },
  ];

  ngOnInit(): void {
    if (this.data) {
      this.store
        .select(selectLeaveById(this.data))
        .pipe(take(1))
        .subscribe((data) => {
          if (data) {
            this.leaveForm.patchValue(data);
            this.ref.markForCheck();
          }
        });
    } else {
      this.store
        .select(selectUserLeave)
        .pipe(take(1))
        .subscribe((data) => {
          this.leaveForm.get('firstName')?.setValue(data.firstName);
          this.leaveForm.get('lastName')?.setValue(data.lastName);
          this.leaveForm.get('employeeId')?.setValue(data.employeeId);
        });
    }

    this.createError$.subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'dismiss', {
          duration: 3000,
          horizontalPosition: 'right',
        });
      }
    });
  }

  /**
   * Custom validation to check if entered date is valid
   * @param control
   * @returns ValidationErrors | null
   */
  dateBeforeToday(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const today = new Date();
    const inputDate = new Date(control.value);

    if (inputDate < today) {
      return { dateBeforeToday: true };
    }

    return null;
  }

  submit(): void {
    if (this.leaveForm.invalid) return;
    if (!this.data) {
      this.leaveForm.controls['id'].setValue(crypto.randomUUID());
      this.store.dispatch(
        createLeave({ leave: this.leaveForm.value as Leave })
      );
    } else {
      this.store.dispatch(
        updateLeave({ leave: this.leaveForm.value as Leave })
      );
    }
    this.ref.markForCheck();
    this.dialogRef.close();
  }
}
