import debounce from '../debounce';
import { describe, expect, test, vitest } from 'vitest';

describe('Function is debounced', () => {
 test('Function is not called immediately', () => {
  const mockFn = vitest.fn();
  const debouncedFn = debounce(mockFn, 300);
  debouncedFn();
  expect(mockFn).not.toBeCalled();
 });

 test('Function is called after delay', async () => {
  const mockFn = vitest.fn();
  const debouncedFn = debounce(mockFn, 100);
  debouncedFn();
  await new Promise((resolve) => setTimeout(resolve, 200));
  expect(mockFn).toBeCalled();
 });

 test('Function is called with latest arguments', async () => {
  const mockFn = vitest.fn();
  const debouncedFn = debounce(mockFn, 100);
  debouncedFn(1);
  debouncedFn(2);
  debouncedFn(3);
  await new Promise((resolve) => setTimeout(resolve, 200));
  expect(mockFn).toBeCalledWith(3);
 });

 test('Function execution can be cancelled', async () => {
  const mockFn = vitest.fn();
  const debouncedFn = debounce(mockFn, 100);
  debouncedFn();
  debouncedFn.cancel();
  await new Promise((resolve) => setTimeout(resolve, 200));
  expect(mockFn).not.toBeCalled();
 });

 test('Function execution can be cancelled and then called again', async () => {
  const mockFn = vitest.fn();
  const debouncedFn = debounce(mockFn, 100);
  debouncedFn();
  debouncedFn.cancel();
  debouncedFn();
  await new Promise((resolve) => setTimeout(resolve, 200));
  expect(mockFn).toBeCalled();
 });

 test('Function execution can be cancelled and then called again with new arguments', async () => {
  const mockFn = vitest.fn();
  const debouncedFn = debounce(mockFn, 100);
  debouncedFn(1);
  debouncedFn.cancel();
  debouncedFn(2);
  await new Promise((resolve) => setTimeout(resolve, 200));
  expect(mockFn).toBeCalledWith(2);
 });

 test('Debounce function can be called without delay', async () => {
  const mockFn = vitest.fn();
  const debouncedFn = debounce(mockFn);
  debouncedFn();
  await new Promise((resolve) => setTimeout(resolve, 400));
  expect(mockFn).toBeCalled();
 });

 test('Debounce function can be called without delay and then cancelled', async () => {
  const mockFn = vitest.fn();
  const debouncedFn = debounce(mockFn);
  debouncedFn();
  debouncedFn.cancel();
  await new Promise((resolve) => setTimeout(resolve, 400));
  expect(mockFn).not.toBeCalled();
 });

 test('Debounce function can be called and then flushed', async () => {
  const mockFn = vitest.fn();
  const debouncedFn = debounce(mockFn);
  debouncedFn();
  debouncedFn.flush();
  expect(mockFn).toBeCalled();
 });
});
