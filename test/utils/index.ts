const assert = chai.assert;
import * as utils from '../../src/utils';

suite('utils', () => {

  setup(() => {
  });

  teardown(() => {
  });

  test('assertEmpty(): undefinedを指定した場合', () => {
    const fn = () => utils.assertEmpty(undefined);
    assert.throws(fn, 'Specified value is undefined.');
  });

  test('assertEmpty(): nullを指定した場合', () => {
    const fn = () => utils.assertEmpty(null);
    assert.throws(fn, 'Specified value is null.');
  });

  test('assertEmpty(): 空文字を指定した場合', () => {
    const fn = () => utils.assertEmpty('');
    assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
  });

  test('assertEmpty(): 0を指定した場合', () => {
    const fn = () => utils.assertEmpty(0);
    assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
  });

  test('assertEmpty(): 任意の文字列を指定した場合', () => {
    const fn = () => utils.assertEmpty('hello');
    assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
  });

  test('assertUndefined(): undefinedを指定した場合', () => {
    const fn = () => utils.assertUndefined(undefined);
    assert.throws(fn, 'Specified value is undefined.');
  });

  test('assertUndefined(): nullを指定した場合', () => {
    const fn = () => utils.assertUndefined(null);
    assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
  });

  test('assertUndefined(): 空文字を指定した場合', () => {
    const fn = () => utils.assertUndefined('');
    assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
  });

  test('assertUndefined(): 0を指定した場合', () => {
    const fn = () => utils.assertUndefined(0);
    assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
  });

  test('assertUndefined(): 任意の文字列を指定した場合', () => {
    const fn = () => utils.assertUndefined('hello');
    assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
  });

  test('assertNull(): nullを指定した場合', () => {
    const fn = () => utils.assertNull(null);
    assert.throws(fn, 'Specified value is null.');
  });

  test('assertNull(): undefinedを指定した場合', () => {
    const fn = () => utils.assertNull(undefined);
    assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
  });

  test('assertNull(): 空文字を指定した場合', () => {
    const fn = () => utils.assertNull('');
    assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
  });

  test('assertNull(): 0を指定した場合', () => {
    const fn = () => utils.assertNull(0);
    assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
  });

  test('assertNull(): 任意の文字列を指定した場合', () => {
    const fn = () => utils.assertNull('hello');
    assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
  });

  test('randomInt(): No.1', () => {
    for (let i = 0; i < 100; i++) {
      const actual = utils.randomInt(-10, 10);
      assert.isAtLeast(actual, -11);
      assert.isAtMost(actual, 11);
    }
  });

});
