// External
import { Observable, Subject } from 'rxjs';

export class Overlay<T> {

  public instance: T;

  public onPresent: Observable<void>;
  public onDismiss: Observable<void>;

  private onPresentSubject: Subject<void>;
  private onDismissSubject: Subject<void>;

  constructor() {
    this.onPresentSubject = new Subject();
    this.onPresent = this.onPresentSubject.asObservable();

    this.onDismissSubject = new Subject();
    this.onDismiss = this.onDismissSubject.asObservable();
  }

  public present() {
    this.onPresentSubject.next();
  }

  public dismiss() {
    this.onDismissSubject.next();
  }
}
