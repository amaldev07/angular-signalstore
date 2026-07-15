import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { User, UserApiService } from './user-api.service';

export type UserFilter = 'all' | 'active';

type UsersState = {
  users: User[];
  filter: UserFilter;
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  users: [],
  filter: 'all',
  loading: false,
  error: null
};

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ users, filter }) => ({
    
    visibleUsers: computed(() => {
      const filteredUsers = filter() === 'active' ? users().
        filter((user) => user.active) : users();
      return filteredUsers;
    }),

    activeCount: computed(() => {
      let count = users().filter((user) => user.active).length;
      return count;
    })
  })),
  withMethods((store, userApi = inject(UserApiService)) => ({
    
    setFilter(filter: UserFilter): void {
      patchState(store, { filter: filter });
    },

    async loadUsers(): Promise<void> {
      patchState(store, { loading: true, error: null });

      try {
        const users = await firstValueFrom(userApi.getUsers());
        patchState(store, { users, loading: false });
      } catch {
        patchState(store, {
          loading: false,
          error: 'Could not load users. Please check your connection and try again.'
        });
      }
    }
  })),
  
  withHooks({
    onInit(store) {
      void store.loadUsers();
    }
  })
);
