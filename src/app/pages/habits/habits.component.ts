import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habits',
  standalone: false,
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss'],
})
export class HabitsComponent implements OnInit {
  goal: string = '';
  habits: { name: string; done: boolean }[] = [];

  ngOnInit(): void {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const user = JSON.parse(storedProfile);
      this.goal = user.goal;
    }

    const todayKey = this.getTodayKey();
    const stored = localStorage.getItem(todayKey);
    if (stored) {
      this.habits = JSON.parse(stored);
    } else {
      this.generateHabits();
    }
  }

  getTodayKey(): string {
    const today = new Date().toISOString().split('T')[0];
    return `habits-${today}`;
  }

  generateHabits(): void {
    const baseHabits = [
      { name: 'Beber 2L de agua', done: false },
      { name: 'Dormir al menos 7h', done: false },
    ];

    const muscleHabits = [
      { name: 'Comer en superávit calórico', done: false },
      { name: 'Entrenar fuerza 45 min', done: false },
      { name: 'Consumir suficiente proteína', done: false },
    ];

    const weightLossHabits = [
      { name: 'Comer en déficit calórico', done: false },
      { name: 'Caminar 10.000 pasos', done: false },
      { name: 'Evitar azúcares añadidos', done: false },
    ];

    switch (this.goal) {
      case 'Ganar masa muscular':
        this.habits = [...baseHabits, ...muscleHabits];
        break;
      case 'Perder peso':
        this.habits = [...baseHabits, ...weightLossHabits];
        break;
      case 'Mantener forma':
        this.habits = [...baseHabits];
        break;
      default:
        this.habits = [];
    }
  }

  toggleHabit(index: number): void {
    this.habits[index].done = !this.habits[index].done;
  }

  saveHabits(): void {
    localStorage.setItem(this.getTodayKey(), JSON.stringify(this.habits));
    alert('✅ Hábitos guardados correctamente');
  }
}
