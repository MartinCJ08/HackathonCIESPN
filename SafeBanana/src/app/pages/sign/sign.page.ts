import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {
  inputValue = '';
  inputLast = '';
  inputEmail = '';
  inputPass =  '';
  inputPass2 = '';
  inputPhone = '';
  inputUser = '';

  user: any[];
  currentImage: any;
  imageUrl: any;
  myUser: User;

  public IMGUR_ENDPOINT:string = "https://api.imgur.com/3/image";
  // Imgur client ID
  public IMGUR_CLIENT_ID:string = "fa80da2d29af8e9";

  // Azure Face API endpoint (West-Central US Server)
  // This is my endpoint. Please use your own for it to work.
  public AZURE_ENDPOINT:string = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0";
  // Azure Face API key
  public AZURE_API_KEY:string = "b9ca9870d5f448698e8d6bacb3feae21";

  constructor(private userService: UserService, private camera: Camera, private http: HttpClient) { }

  ngOnInit() {
    this.userService.getUser().subscribe(data => {
      //console.log(data);
    });
  }

  register(){
    let input = this.inputValue;
    let last2 = this.inputLast;
    let email2 = this.inputEmail;
    let pass2 = this.inputPass;
    let phone2 = this.inputPhone;
    let user2 = this.inputUser;
/*
    this.user =User[   
      name: input,
      lastname: last2,
      email: email2,
      phone: phone2,
      user: user2,
      password:pass2
    ];*/

    this.myUser = {
      name: input,
      lastname: last2,
      email: email2,
      phone: phone2,
      user: user2,
      password:pass2,
      moroso: "no"
    };

    
    
    console.log("Agregando "+this.userService.addUser(this.myUser));

    this.userService.getUser().subscribe(data => {
      //console.log(data);
      this.sendToImgur(this.currentImage);
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }

  public sendToImgur(img:string):void {
    img = img.substring(img.indexOf('base64,') + 'base64,'.length);

    let auth:string = `Client-ID ${this.IMGUR_CLIENT_ID}`;
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': auth,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    this.http.post(this.IMGUR_ENDPOINT, {
      image: img
    }, requestOptions).subscribe((response) => {
      this.imageUrl = response;
      this.uploadAzureData();
    });
  }

  public uploadAzureData(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': this.AZURE_API_KEY,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    this.http.post(this.AZURE_ENDPOINT+'/persongroups/fracc-las-torres/persons', {
      name: this.myUser.user
    }, requestOptions).subscribe((response) => {
      console.log(response);
      this.http.post(this.AZURE_ENDPOINT+'/persongroups/fracc-las-torres/persons/'+response+'/persistedFaces', {
        url: this.imageUrl
      }, requestOptions).subscribe((response) => {
        console.log(response);
      });
    });
  }
}
