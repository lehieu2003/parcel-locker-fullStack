export interface Parcel{
  parcel_id: number ;
  width: number;
  length: number;
  height: number;
  weight: number;
  parcel_size: Size ;
  date_created: Date |  string;
}


export class Size{
  private static S = new Size("S", "Small");
  private static M = new Size("M","Medium");
  private static L = new Size("L", "Large");
  private constructor(public readonly value: string, public readonly label: string) {
    this.value = value; 
    this.label = label;
  }
  public toString(): string {
    return this.value;
  }
  public static values(): Size[] {
    return [Size.S, Size.M, Size.L];
  }
  public static parse(size: string): Size{
    switch(size){
      case "S": return Size.S;
      case "M": return Size.M;
      case "L": return Size.L;
      default: throw new Error("Invalid size");
    }
  }
}