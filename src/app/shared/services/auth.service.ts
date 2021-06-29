import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import { User, Farm } from './user';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user: any;
  userData: User;
  tem: any;
  userInfo: any;

  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFirestore) {
    this.user = firebaseAuth.authState;

    const myObserver = {
      next: x => {
          this.userInfo = this.getUser();
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),

    };

    this.user.subscribe(myObserver);




  }


  getUid(): any {
    return this.firebaseAuth.auth.currentUser.uid;
  }

  signup(email: string, password: string): void {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.userInfo = this.getUser();
        this.setUserData(email, password);
        this.saveUserData();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string): void {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.userInfo = this.getUser();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });


  }

  logout(): void {
    this.firebaseAuth
      .auth
      .signOut();
    // this.userInfo.unsubscribe();
  }

  setFarmData(farmData): void {
    const param = farmData.id;

    const tempFarm: Farm = {
      owner: '111',
      date: new Date(),
      location: farmData.location,
      variety: farmData.variety,
      stage: farmData.stage,
      schedule: farmData.growthSched

    };

    console.log('tempFarm :>> ', tempFarm);
  }

  setUserData(tEmail, password): void {

    const tempFarm: Farm = {
      owner: 'aaaa',
      date: new Date(),
      location: 'location',
      variety: 'variety',
      stage: 'stage',
      schedule: 'stages'

    };

    const tUid = this.getUid();
    const temp: User =
    {
      uid: tUid,
      email: tEmail,
      displayName: tEmail,
      photoURL: tEmail,
      emailVerified: true,
      // farms: []
    };

    this.userData = temp;
  }

  saveUserData(): any {
    return this.db.collection('users').add(this.userData).catch(err => {
      console.log('Something went wrong:', err.message);
    });
  }


  getUsers(): any {
    return this.db.collection('/users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  findUser(email): any {
    return this.db.collection('/users', ref => ref.where('email', '>=', email)
      .where('email', '<=', email + '\uf8ff'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }



  getUser(): any {
    const uid = this.getUid();
    return this.db.collection('users').doc(uid).valueChanges();

  }

  getFarmsServe(): any {
    return this.userInfo;
  }

  updateFarms(temp): any {
    const param = 'index';
    temp.farms.forEach(element => {
      element[param] = temp.farms.indexOf(element);

    });
    this.db.collection('users').doc(temp.uid).set(temp);


  }

  getLocations(): any {
    return this.db.collection('weather').valueChanges();

  }

}
