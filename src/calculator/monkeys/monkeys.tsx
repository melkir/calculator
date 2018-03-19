import { store } from '../store';
import { Operation } from './operation';
import * as actions from '../store/actions/';

export interface MonkeysProps {
  timer: NodeJS.Timer | null;
  toggleMonkeys: () => void;
  enclose: () => void;
  unleash: () => void;
}

export class Monkeys implements MonkeysProps {
  timer: NodeJS.Timer | null;

  public toggleMonkeys(): void {
    const { isMonkeysFreed } = store.getState();
    store.dispatch({ ...new actions.ToggleMonkeysStatus() });
    isMonkeysFreed ? this.enclose() : this.unleash();
  }

  public unleash(): void {
    if (this.timer != null) {
      return;
    }
    this.timer = setInterval(() => this.simulateMonkeyActions(), 100);
  }

  public enclose(): void {
    if (this.timer == null) {
      return;
    }
    clearInterval(this.timer);
    this.timer = null;
  }

  private simulateMonkeyActions() {
    store.dispatch({ ...new actions.ClearScreen() });
    Operation.generateValidRandomOperation()
      .split('')
      .forEach(key => store.dispatch({ ...actions.onTapKey(key) }));
    store.dispatch({ ...new actions.ComputeResult() });
  }
}
