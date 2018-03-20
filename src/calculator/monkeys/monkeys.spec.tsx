import { Monkeys } from './monkeys';

describe('Monkeys class', () => {
  let monkeys: Monkeys;

  beforeEach(() => {
    monkeys = new Monkeys();
  });

  it('should correctly instanciate monkeys class', () => {
    expect(monkeys).toBeInstanceOf(Monkeys);
  });

  it('should toggle monkeys state', () => {
    expect(monkeys.timer).toBeUndefined();
    monkeys.toggleMonkeys();
    expect(monkeys.timer).toBeDefined();
    monkeys.toggleMonkeys();
    expect(monkeys.timer).toBeNull();
  });

  it('should not refresh the timer if the monkeys are already unleashed', () => {
    monkeys.unleash();
    const timer = monkeys.timer;
    expect(timer).toBeDefined();
    monkeys.unleash();
    expect(monkeys.timer).toBe(timer);
  });

  it('should clear the timer if the monkeys are enclosed', () => {
    monkeys.unleash();
    monkeys.enclose();
    expect(monkeys.timer).toBeNull();
  });
});
