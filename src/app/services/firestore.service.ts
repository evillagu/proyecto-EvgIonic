import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public dtaFireBase: AngularFirestore) { }

  createDoc(data: any, path: string, id: string) {
    const collectionDta = this.dtaFireBase.collection(path);
    return collectionDta.doc(id).set(data);
  }
  //meteodo para un elemento.
  getDoc(path: string, id: string) {
    const collectionDta = this.dtaFireBase.collection(path);
    return collectionDta.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collectionDta = this.dtaFireBase.collection(path);
    return collectionDta.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collectionDta = this.dtaFireBase.collection(path);
    return collectionDta.doc(id).update(data);
  }
  getCollection<tipo>(path: string){
    const collectionDta = this.dtaFireBase.collection<tipo>(path);
    return collectionDta.valueChanges();
  }
  // crea el id, automaticamente.
  getId(){
    return this.dtaFireBase.createId();
  }
}
