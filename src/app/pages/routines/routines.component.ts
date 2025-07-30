import { Component, OnInit } from '@angular/core';
import { ExerciseService, Exercise } from '../../services/exercise.service';

interface ExerciseWithRoutineData extends Exercise {
  sets?: number;
  reps?: number;
  weight?: number;
}

interface Routine {
  name: string;
  description: string;
  days: string[];
  exercises: ExerciseWithRoutineData[];
}

@Component({
  selector: 'app-routines',
  standalone: false,
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.scss'],
})
export class RoutinesComponent implements OnInit {
  routines: Routine[] = [];
  routine: Routine = {
    name: '',
    description: '',
    days: [],
    exercises: [],
  };

  exercises: Exercise[] = [];
  pagedExercises: Exercise[] = [];
  bodyParts: string[] = [];
  selectedBodyPart: string = 'all';

  // Paginación
  currentPage = 1;
  pageSize = 12;

  showForm = false;
  editIndex: number | null = null;

  days: string[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit() {
    this.exerciseService.getBodyParts().subscribe((parts) => {
      this.bodyParts = parts;
    });

    this.exerciseService.getExercises().subscribe((data) => {
      this.exercises = data;
      this.updatePagedExercises();
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.cancel();
  }

  toggleDay(day: string) {
    const index = this.routine.days.indexOf(day);
    if (index === -1) {
      this.routine.days.push(day);
    } else {
      this.routine.days.splice(index, 1);
    }
  }

  addExerciseToRoutine(exercise: Exercise) {
    const exists = this.routine.exercises.find((e) => e.id === exercise.id);
    if (!exists) {
      this.routine.exercises.push({
        ...exercise,
        sets: 3,
        reps: 10,
        weight: 0,
      });
    }
  }

  removeExerciseFromRoutine(id: string) {
    this.routine.exercises = this.routine.exercises.filter((e) => e.id !== id);
  }

  isExerciseAdded(id: string): boolean {
    return this.routine.exercises.some((e) => e.id === id);
  }

  saveRoutine() {
    if (this.editIndex !== null) {
      this.routines[this.editIndex] = { ...this.routine };
    } else {
      this.routines.push({ ...this.routine });
    }
    this.cancel();
  }

  editRoutine(index: number) {
    this.routine = { ...this.routines[index] };
    this.editIndex = index;
    this.showForm = true;
  }

  deleteRoutine(index: number) {
    this.routines.splice(index, 1);
  }

  cancel() {
    this.routine = { name: '', description: '', days: [], exercises: [] };
    this.showForm = false;
    this.editIndex = null;
  }

  get totalPages() {
    return Math.ceil(this.filteredExercises.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedExercises();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedExercises();
    }
  }

  filterByBodyPart(part: string) {
    this.selectedBodyPart = part;
    this.currentPage = 1;
    this.updatePagedExercises();
  }

  get filteredExercises(): Exercise[] {
    if (this.selectedBodyPart === 'all') {
      return this.exercises;
    }
    return this.exercises.filter((e) => e.bodyPart === this.selectedBodyPart);
  }

  updatePagedExercises() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedExercises = this.filteredExercises.slice(start, end);
  }

  get allBodyParts(): string[] {
  return ['all', ...this.bodyParts];
}
}
