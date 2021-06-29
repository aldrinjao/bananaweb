import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(private db: AngularFirestore) { }


  updateFarm(userData): any {
    console.log(userData.uid);
    const param = 'index';
    userData.farms.forEach(element => {
      element[param] = userData.farms.indexOf(element);

    });
    this.db.collection('users').doc(userData.uid).set(userData);

  }

  getAllFarms(): any {
    console.log('getAll');
  }

  getFarm(): any {
    console.log('getone');
  }


  getLocations(): any {
    return this.db.collection('weather').valueChanges();

  }

}
