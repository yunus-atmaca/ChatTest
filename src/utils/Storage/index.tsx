import * as KEYS from './keys';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null, //never expire
});

const save = async (key: string, data: unknown) => {
  return await storage.save({
    key: key,
    data: JSON.stringify(data),
    expires: null, //never expire
  });
};

const load = async (key: string): Promise<unknown> => {
  let res: unknown = null;
  try {
    res = await storage.load({key});
  } catch (error) {}

  return res;
};

const remove = async (key: string): Promise<void> => {
  try {
    await storage.remove({key});
  } catch (error) {}
};

const clear = async (): Promise<void> => {
  try {
    await storage.clearMap();
  } catch (error) {}
};

export {clear, remove, load, save, KEYS};
