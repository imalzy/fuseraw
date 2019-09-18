import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'sample',
  templateUrl: './sample2.component.html',
  styleUrls: ['./sample2.component.scss']
})
export class AutocompleteAutoActiveFirstOptionExample implements OnInit {
  displayedColumns = ['Id Produk', 'Nama Produk', 'Merk Produk', 'Harga Produk'];
  dataSource = [];
  myControl: FormControl = new FormControl();
  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  ELEMENT_DATA: Pengguna[] = [];

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    this.ambil_data();
  }
  constructor(http: Http, private API: ApiService) {

  }

  ambil_data() {
    this.API.ListPengguna()
      .subscribe(result => {
        console.log(result.json().Output);
        // this.ELEMENT_DATA = result.json().Output;
        this.dataSource = result.json().Output;
        console.log(this.dataSource);
      });
  }
  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}

export interface Pengguna {
  username: string;
  namalengkap: string;
  profile: string;
}


@Component({
  selector: 'sample2-dialog',
  templateUrl: 'sample2-dialog.html',
  styleUrls: ['sample2.component.scss'],
})
export class Sample2Dialog {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(Sample2ViewDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'sample2-dialog',
  templateUrl: 'sample2-dialog.html',
})
export class Sample2ViewDialog {

  constructor(
    public dialogRef: MatDialogRef<Sample2ViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  animal: string;
  name: string;
}
  // const ELEMENT_DATA: Pengguna[] = [
  //   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  //   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  //   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  //   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  //   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  //   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  //   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  //   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  //   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  //   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  // ];