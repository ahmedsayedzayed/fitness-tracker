import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";
@Injectable({
    providedIn: 'root'
})
export class TrainingService {

    exericseChanged = new Subject<Exercise>();
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    private runningExercise: Exercise;
    private exercises: Exercise[] = [];

     

    getExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        const selectedExersice = this.availableExercises.find(ex => ex.id === selectedId);
        this.runningExercise = selectedExersice;
        this.exericseChanged.next({ ...this.runningExercise })
    }

    completeExersice() {
        this.exercises.push({
            ...this.runningExercise,
            date: new Date(),
            state: "completed"
        });
        this.runningExercise = null;
        this.exericseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            duration: this.runningExercise.duration * (progress/100),
            calories:this.runningExercise.calories * (progress/100),
            ...this.runningExercise,
            date: new Date(),
            state: "cancelled"
        });
        this.runningExercise = null;
        this.exericseChanged.next(null);
    }
    getRuningExersice() {
        return {...this.runningExercise}
    }
}