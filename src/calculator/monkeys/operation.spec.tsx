import { Operation } from './operation';
import { compute } from '../store';

describe('Operation class', () => {
  it('should generate valid random operations', () => {
    for (let i = 0; i < 100; i++) {
      const operation = Operation.generateValidRandomOperation();
      const result = compute(operation);
      expect(result).not.toBeNaN();
    }
  });

  it('should throw an error if the max number of retry is reached', () => {
    expect(() => {
      Operation.generateValidRandomOperation(0);
    }).toThrow();
  });
});
