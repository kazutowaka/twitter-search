import { HashtagsPipe } from './hashtags.pipe';

describe('HashtagsPipe', () => {
  const pipe = new HashtagsPipe();
  const dummy = ['#tag1', '#tag2', '#tag3', '#tag4', '#tag5'];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('If number of hashtags > 2, then just display 2', () => {
    expect(pipe.transform(dummy)).toBe('#tag1, #tag2');
  });

  it('If number of hashtags < 3, then just display as it is', () => {
    expect(pipe.transform(['#tag1'])).toBe('#tag1');
  });
});
