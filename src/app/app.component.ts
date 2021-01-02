import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawableDirective } from './drawable.directive';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  linearModel!: tf.Sequential;
  imageprediction: any[] = [];
  predictedNumber!: string;
  model!: tf.LayersModel;
  predictions: any[] = [];
  imageModel: any;
  loading!: boolean;
  imgSrc: any;
  @ViewChild('img')
  public imageEl!: ElementRef;

  @ViewChild(DrawableDirective)
  canvas!: DrawableDirective;

  ngOnInit() {
    this.loadModel();
  }


  //// LOAD PRETRAINED KERAS MODEL ////

  async loadModel() {
    this.model = await tf.loadLayersModel('/assets/model.json');
    this.loading = true;
    this.imageModel = await mobilenet.load();
    this.loading = false;
  }

  async predict(event: any) {
    let imageData = event as ImageData;
    const pred = await tf.tidy(() => {

      // Convert the canvas pixels to 
      let img = tf.browser.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = this.model.predict(img) as any;

      // Save predictions on the component
      this.predictions = Array.from(output.dataSync());

      for (let i = 0; i < this.predictions.length; i++) {
        if (this.predictions[i] == "1") {
          this.predictedNumber = i.toString();
          break;
        }
      }
      if (this.predictedNumber == "") {
        this.predictedNumber = "Try Again";
      }
    });

  }

  public async fileChangeEvent(event: any): Promise<void> {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (res: any) => {
        this.imgSrc = res.target.result;
        setTimeout(async () => {
          const imgEl = this.imageEl.nativeElement;
          this.imageprediction = await this.imageModel.classify(imgEl);
        }, 0);
      };
    }
  }

  clear() {
    this.predictedNumber = '';
    this.canvas.clear();
    this.predictions.length = 0;
  }
}
