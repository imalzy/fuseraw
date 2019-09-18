import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{
    ref:any=[];
    items: any[];
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,private db:AngularFireDatabase
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
       
      
   }
        
    
    ngOnInit() {
      this.db.list('/debug/produk')
        .valueChanges()
        .subscribe(item =>{
          this.items = item;
          console.log(this.items)
        });
    }
    // postBoards(){
    //    var ref = this.ref;
    //     var data =({
    //         'nama':'Mahesa Putra',
    //     });
    //     return new Observable((observer) => {
    //       ref.set(data).then((doc) => {
    //         console.log(doc)
    //       });
    //     });
    //   }
}
