import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

import { User } from './shared/services/user';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userData: User;

  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFirestore,) {
    this.user = firebaseAuth.authState;
    this.user.subscribe(res => {
      this.setUserData(res.email, res.email);
    }
    );
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.setUserData(email, password);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    const temp: User =
    {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      emailVerified: false
    }

    this.userData = temp;
    this.firebaseAuth
      .auth
      .signOut();
  }

  setUserData(email, password) {
    const temp: User =
    {
      uid: email,
      email: email,
      displayName: email,
      photoURL: email,
      emailVerified: true
    }

    this.userData = temp;
  }


  saveUserData() {
    return this.db.collection('users').add(this.userData);
  }




}

