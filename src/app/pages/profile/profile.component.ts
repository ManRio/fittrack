import { Component, OnInit } from '@angular/core';

interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  goal: string;
  photoUrl: string;
}

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: UserProfile = {
    name: '',
    age: 0,
    height: 0,
    weight: 0,
    goal: '',
    photoUrl: '',
  };

  goals: string[] = ['Ganar masa muscular', 'Perder peso', 'Mantener forma'];
  editMode = false;
  defaultPhoto = 'assets/default-user.png';

  ngOnInit() {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      this.user = JSON.parse(stored);
    }
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    localStorage.setItem('userProfile', JSON.stringify(this.user));
    this.editMode = false;
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.photoUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
