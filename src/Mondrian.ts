
// The one that paints
export class Mondrian {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width = 800;
  private height = 800;

  constructor(rootElementId: string) {
    this.canvas = document.getElementById(rootElementId) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  draw() {

  }
}