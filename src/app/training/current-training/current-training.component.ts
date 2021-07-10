import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  @Output() trainingExit = new EventEmitter<void>();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer()  
  }
  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
     },1000)
  }
  onStop() {
    clearInterval(this.timer);
   const dialogref =  this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
   });
    dialogref.afterClosed().subscribe(
      (result) => {
        if (result === true) {
          this.trainingExit.emit()
        } else {
          this.startOrResumeTimer()
        }
      }
    )
  }

}
