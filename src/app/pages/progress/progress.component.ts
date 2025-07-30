import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

interface ProgressEntry {
  date: string; // ISO string
  weight: number;
  height: number;
}

@Component({
  selector: 'app-progress',
  standalone: false,
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  entries: ProgressEntry[] = [];
  newEntry: ProgressEntry = {
    date: new Date().toISOString().split('T')[0],
    weight: 0,
    height: 0,
  };

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  ngOnInit(): void {
    const stored = localStorage.getItem('progressEntries');
    if (stored) {
      this.entries = JSON.parse(stored);
    }
    this.updateChart();
  }

  addEntry(): void {
    this.entries.push({ ...this.newEntry });
    localStorage.setItem('progressEntries', JSON.stringify(this.entries));
    this.newEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: 0,
      height: 0,
    };
    this.updateChart();
  }

  deleteEntry(index: number): void {
    this.entries.splice(index, 1);
    localStorage.setItem('progressEntries', JSON.stringify(this.entries));
    this.updateChart();
  }

  private updateChart(): void {
    const sorted = [...this.entries].sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    const labels = sorted.map((e) => e.date);
    const weights = sorted.map((e) => e.weight);
    const bmis = sorted.map((e) =>
      e.height ? +(e.weight / (e.height / 100) ** 2).toFixed(1) : 0
    );

    this.chartData = {
      labels,
      datasets: [
        {
          data: weights,
          label: 'Peso (kg)',
          borderColor: '#3498db',
          fill: false,
          tension: 0.3,
        },
        {
          data: bmis,
          label: 'IMC',
          borderColor: '#f1c40f',
          fill: false,
          tension: 0.3,
        },
      ],
    };
  }
}
