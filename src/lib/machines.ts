export type MachineType = "lave-linge" | "seche-linge";

export type MachineStatus = "libre" | "occupe" | "en-cours";

export interface Machine {
  id: string;
  name: string;
  type: MachineType;
  status: MachineStatus;
  /**
   * Temps restant estimé en minutes.
   */
  timeRemaining: number;
  /**
   * Durée totale du cycle en minutes.
   */
  duration: number;
  /**
   * Prix en euros.
   */
  price: number;
  /**
   * Nom du programme affiché (ex: "Eco 30°C").
   */
  program: string;
}

export const machines: Machine[] = [
  {
    id: "1",
    name: "Laverie 1",
    type: "lave-linge",
    status: "libre",
    timeRemaining: 18,
    duration: 30,
    price: 4.5,
    program: "Eco 30°C",
  },
  {
    id: "2",
    name: "Sèche-linge 2",
    type: "seche-linge",
    status: "en-cours",
    timeRemaining: 12,
    duration: 30,
    price: 3.5,
    program: "Standard 60°C",
  },
  {
    id: "3",
    name: "Laverie 2",
    type: "lave-linge",
    status: "occupe",
    timeRemaining: 25,
    duration: 40,
    price: 5.0,
    program: "Intensif 40°C",
  },
  {
    id: "4",
    name: "Laverie 3",
    type: "lave-linge",
    status: "libre",
    timeRemaining: 0,
    duration: 30,
    price: 4.0,
    program: "Rapide 30°C",
  },
];

