import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  inject,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Leave, UserLeave } from '../../types/leave.types';
import {
  selectLeaveError,
  selectLeavesList,
  selectUserLeave,
} from '../../../../core/selectors/leave.selectors';
import { ModalService } from '../../../../shared/components/ui/modal/modal.service';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import {
  deleteLeave,
  getLeaves,
  getUserLeaves,
} from '../../../../core/store/leave.actions';
import { DisableNonUserDirective } from '../../../../shared/directives/disable-non-user.directive';

@Component({
  selector: 'app-leave-view',
  standalone: true,
  imports: [
    AsyncPipe,
    MatTableModule,
    MatButton,
    MatMenu,
    MatIcon,
    MatMenuTrigger,
    MatMenuItem,
    RouterLink,
    DatePipe,
    DisableNonUserDirective,
  ],
  providers: [ModalService],
  templateUrl: './leave-view.component.html',
  styleUrl: './leave-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveViewComponent implements OnInit, OnDestroy {
  store = inject(Store);
  modalService = inject(ModalService);
  dialog = inject(MatDialog);
  private ref = inject(ChangeDetectorRef);

  displayColumns = [
    'employeeId',
    'firstName',
    'lastName',
    'date',
    'reason',
    'actions',
  ];
  leaveSource$: Observable<CdkTableDataSourceInput<Leave>> | undefined;
  user$: Observable<UserLeave> = this.store.pipe(select(selectUserLeave));
  destroy$ = new Subject<boolean>();
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.store.dispatch(getLeaves());
    this.leaveSource$ = this.store.pipe(select(selectLeavesList));

    this.store
      .select(selectLeaveError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        if (error) {
          this.snackBar.open(error, 'dismiss', {
            duration: 1000,
            horizontalPosition: 'right',
          });
        }
        this.ref.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  openLeaveForm(leave?: Leave) {
    this.dialog.open(LeaveFormComponent, {
      data: leave?.id,
    });
    this.ref.markForCheck();
  }

  deleteLeave(templateRef: TemplateRef<any>, leave: Leave): void {
    this.modalService
      .open(templateRef, {
        title: 'Are you sure?',
        size: 'md',
      })
      .subscribe((action) => {
        if (action === 'confirm') {
          this.store.dispatch(deleteLeave({ leave }));
        }
        this.ref.markForCheck();
      });
  }
}
