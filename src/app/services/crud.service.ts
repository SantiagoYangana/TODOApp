import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';

export class TODO{
  id: string;
  title:string;
  description:string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private ngFirestore:AngularFirestore, private router:Router) { }
  
  create(todo:TODO) {
    return this.ngFirestore.collection('tasks').add(todo);
  }
  getTasks(){
    return this.ngFirestore.collection('tasks').snapshotChanges();
  }
  getTask(id:string){
    return this.ngFirestore.collection('tasks').doc(id).valueChanges();
  }
  update(id:string, todo:TODO) {
    this.ngFirestore
    .collection('tasks')
    .doc(id)
    .update(todo)
    .then(() => {
      this.router.navigate(['/todo-list']);
    })
    .catch((err) => {console.log(err)});
  }

  delete(id: string) {
    this.ngFirestore.doc('tasks/'+id).delete();
  }
}
