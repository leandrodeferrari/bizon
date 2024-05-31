import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarConfig } from './interface/snack-bar-config';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private snackBar: MatSnackBar = inject(MatSnackBar);

  constructor() { }

  openTop(message: string, config: SnackBarConfig, action?: string){
    this.snackBar.open(message, action, {
      duration: config.duration,
      panelClass: config.panelClass,
      verticalPosition: 'top'
    });
  }
}
