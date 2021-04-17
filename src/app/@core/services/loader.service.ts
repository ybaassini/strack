import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {
  public loaded = false;
  public onLoad: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() {}
}
