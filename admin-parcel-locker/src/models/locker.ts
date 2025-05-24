import { ReactNode } from 'react';

// export interface Locker{
//   locker_id: number;
//   address: string;
//   latitude: number;
//   longitude: number;
//   cells: Cell[];
// }

export interface Locker {
	address: string;
	cells: Cell;
	longitude: number;
	latitude: number;
	locker_id: number ;
}

export interface Cell{
  length: ReactNode;
  cell_id: number;
  occupied: boolean;
  size: string;
}
