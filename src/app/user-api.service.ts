import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';

interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<User[]> {
    return this.http.get<ApiUser[]>(this.apiUrl).pipe(
      // Demo delay so the loading state is visible on screen.
      map((users) =>
        users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          company: user.company.name,
          // JSONPlaceholder has no status, so add one for this learning example.
          active: user.id % 2 === 0
        }))
      )
    );
  }
}
