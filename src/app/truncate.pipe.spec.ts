import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();
  const dummy = '1234567890';

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return truncated text', () => {
    expect(pipe.transform(dummy, 5)).toBe('12345...');
  });

  it('should return text as is', () => {
    expect(pipe.transform(dummy, 20)).toBe(dummy);
  });
});
