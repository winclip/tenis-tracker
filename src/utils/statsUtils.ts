import { v4 as uuidv4 } from 'uuid';

export interface StatEntry {
  id: string;
  type: string;
  result: string;
}

export function addStatEntry(type: string, result: string): StatEntry {
  return {
    id: uuidv4(),
    type,
    result,
  };
}