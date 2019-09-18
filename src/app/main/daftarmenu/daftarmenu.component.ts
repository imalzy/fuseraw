import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { FuseSplashScreenService } from '../../../@fuse/services/splash-screen.service';

import { MatPaginator, MatSort, MatTableDataSource, MatProgressSpinnerModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'daftarmenu',
  templateUrl: './daftarmenu.component.html',
  styleUrls: ['./daftarmenu.component.scss']
})
export class DaftarMenu {
  ref: any = [];
  items: any[];
  selectedRowIndex = [];
  displayedColumns = ['id', 'category'];
  loadRef: any = [];

  listmenu: UserData[] = [];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   */



  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService, private db: AngularFireDatabase,
    private _fuseSplashScreenService: FuseSplashScreenService, public dialog: MatDialog
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, turkish);



  }

  ngOnInit() {
    this.loadSpinner();
    this.db.list('/debug/produk')
      .snapshotChanges()
      .subscribe(items => {
        items.forEach(item => {
          // console.log(item.key);
          // console.log(item.payload.val());
          // console.log(item.payload.val()['category']);
          this.listmenu.push(createNewUser(item.payload.val()['category'], item.key, item.payload.val()['image']));
        });
        this.dataSource = new MatTableDataSource(this.listmenu);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.closeSpinner();
      });

  }

  // openDialog(): void {
  //   let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: { name: this.name, animal: this.animal }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }
  loadSpinner() {
    this.loadRef = this.dialog.open(LoadingDaftarmenu, {
      panelClass: 'transparent',
      disableClose: true,
    });
  }
  closeSpinner() {
    this.loadRef.close();
  }
  getRecord(row) {
    this.selectedRowIndex = row.id;
    const dialogRef = this.dialog.open(DialogDaftarmenu, {
      // height: '350px',
      // width:'80%'
      panelClass: 'transparent',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

@Component({
  selector: 'daftarmenu-dialog',
  templateUrl: './daftarmenu-dialog.html',
  styleUrls: ['./daftarmenu.component.scss']
})

export class DialogDaftarmenu {
  color = 'accent';
  mode = 'indeterminate';
  value = 30;
  constructor(
    public dialogRef: MatDialogRef<DialogDaftarmenu>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'daftarmenu-loading',
  templateUrl: './daftarmenu-loading.html',
  styleUrls: ['./daftarmenu.component.scss']
})
export class LoadingDaftarmenu {
  color = 'accent';
  mode = 'indeterminate';
  value = 30;
  constructor(
    public dialogRef: MatDialogRef<LoadingDaftarmenu>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

}

/** Builds and returns a new User. */
function createNewUser(category: string, id: string, image: string): UserData {

  return {
    id: id.toString(),
    category: category,
    image: image,
  };
}

export interface UserData {
  id: string;
  category: string;
  image: string;
}

export const COMPONENT_LIST = [
  DaftarMenu,
  DialogDaftarmenu,
  LoadingDaftarmenu,
]