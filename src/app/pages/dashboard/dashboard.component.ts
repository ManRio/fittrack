import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service'; // ajusta la ruta

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user = { name: '', goal: '', weight: 0 };
  habits: { name: string; done: boolean }[] = [];
  news: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) this.user = JSON.parse(storedUser);

    const todayKey = this.getTodayKey();
    const todayHabits = localStorage.getItem(todayKey);
    if (todayHabits) this.habits = JSON.parse(todayHabits);

    this.newsService.getHealthNews().subscribe((res) => {
      console.log('🧪 Noticias recibidas:', res);
      this.news = res.data || [];
    });
  }

  getTodayKey(): string {
    const today = new Date().toISOString().split('T')[0];
    return `habits-${today}`;
  }

  habitsDone(): number {
    return this.habits.filter((h) => h.done).length;
  }

  totalHabits(): number {
    return this.habits.length;
  }
}
