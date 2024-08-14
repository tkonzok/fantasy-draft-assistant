import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private readonly SETTINGS: string[] = ["hppr1qb", "hpprSf"];
  private selectedSettingSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(this.SETTINGS[0]);

  get availableSettings(): string[] {
    return this.SETTINGS;
  }

  get selectedSetting$(): Observable<string> {
    return this.selectedSettingSubject.asObservable();
  }

  get selectedSetting(): string {
    return this.selectedSettingSubject.value;
  }

  selectSetting(setting: string): void {
    this.selectedSettingSubject.next(setting);
  }
}
