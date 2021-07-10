import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
 
  @Output() startTraining = new EventEmitter<void>();

  exercises: Exercise[] = [];

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.exercises = this.trainingService.getExercises();
  }

  onStartTraining() {
    this.startTraining.emit()
    
  }
}
