import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public dtaFireBase: AngularFirestore) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.dtaFireBase.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc(path: string, id: string) {
    const collection = this.dtaFireBase.collection(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.dtaFireBase.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.dtaFireBase.collection(path);
    return collection.doc(id).update(data);
  }
  getCollection<tipo>(path: string){
    const collection = this.dtaFireBase.collection<tipo>(path);
    return collection.valueChanges();
  }
  getId(){
    return this.dtaFireBase.createId();
  }
}
