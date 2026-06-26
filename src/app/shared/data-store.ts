import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class DataStore {
  #http = inject(HttpClient);
  #apiUrl: string = 'http://localhost:5107';
}
