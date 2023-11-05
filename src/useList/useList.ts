import { useState } from 'react';

/**
 * ListFunctions is an interface that defines the functions that can be used to manipulate a list.
 * @template T The type of the items in the list.
 */
type ListFunctions<T> = {
 /**
  * Sets the list to a new list.
  * @param newList The new list.
  */
 set: (newList: T[]) => void;
 /**
  * Adds an item to the end of the list.
  * @param item The item to add to the list.
  */
 add: (item: T) => void;
 /**
  * Inserts an item at a specific index in the list.
  * @param item The item to insert into the list.
  * @param index The index at which to insert the item.
  */
 insertAt: (index: number, item: T) => void;
 /**
  * Updates an item at a specific index in the list.
  * @param index The index of the item to update.
  * @param item The new value of the item.
  */
 updateAt: (index: number, item: T) => void;
 /**
  * Removes an item at a specific index from the list.
  * @param index The index of the item to remove from the list.
  */
 removeAt: (index: number) => void;
 /**
  * Removes all items from the list.
  */
 clear: () => void;
};

/**
 * UseList is a custom hook that provides a list and functions to manipulate the list.
 * @template T The type of the items in the list.
 */
type UseList<T> = [list: T[], listActions: ListFunctions<T>];

/**
 * useList is a custom hook that provides a list and functions to manipulate the list.
 * @template T The type of the items in the list.
 * @param initialList The initial list to use.
 * @returns An object containing the list and functions to manipulate the list.
 */
export function useList<T>(initialList: T[] = []): UseList<T> {
 const [list, setList] = useState<T[]>(initialList);

 const set = (newList: T[]) => {
  setList(newList);
 };

 const add = (item: T) => {
  setList([...list, item]);
 };

 const insertAt = (index: number, item: T) => {
  setList([...list.slice(0, index), item, ...list.slice(index)]);
 };

 const updateAt = (index: number, item: T) => {
  setList([...list.slice(0, index), item, ...list.slice(index + 1)]);
 };

 const removeAt = (index: number) => {
  setList(list.filter((_, i) => i !== index));
 };

 const clear = () => {
  setList([]);
 };

 return [list, { set, add, insertAt, updateAt, removeAt, clear }];
}
