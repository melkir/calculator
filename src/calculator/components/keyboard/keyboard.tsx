import * as React from 'react';
import { Monkeys } from '../../monkeys';

export interface Props {}

const SPACE_KEY = 32;

export class Keyboard extends React.Component<Props, object> {
  private monkeys: Monkeys;

  constructor(props: Props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.monkeys = new Monkeys();
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.keyCode === SPACE_KEY) {
      this.monkeys.toggleMonkeys();
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  render() {
    return '';
  }
}
