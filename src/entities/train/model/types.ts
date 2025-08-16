export interface ClassInfo {
  type: string;
  status: string;
  quota: string;
  price: string;
}

export interface StationInfo {
  time: string;
  date: string;
  station: string;
}

export interface Train {
  id: string;
  number: number;
  name: string;
  runsOn: string;
  duration: string;
  departure: StationInfo;
  arrival: StationInfo;
  classes: ClassInfo[];
}

export interface TrainCardProps {
  train: Train;
  onSelectClass?: (classInfo: ClassInfo) => void;
}


