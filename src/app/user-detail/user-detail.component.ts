import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { Address } from '../shared/classes/address';
import { User } from '../shared/classes/user';
import { voivodeships } from '../shared/data/data-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnChanges {

  @Input() user: User;
  userForm: FormGroup;
  voivodeships = voivodeships;
  selectedAddress = 0;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      name: '',
      email: '',
      addresses: this.fb.array([])
    });
  }

  rebuildForm() {
    this.userForm.reset({
      name: this.user.name,
      email: this.user.email,
    });
    this.setAddresses(this.user.addresses);
  }

  setAddresses(addresses: Address[]) {
    const addressFormGroups = addresses.map(address => this.fb.group(address));
    this.userForm.setControl('addresses', this.fb.array(addressFormGroups));
  }

  revert() {
    this.rebuildForm();
  }

  onSubmit() {
    this.user = this.prepareUserForSave();
    this.userService.updateUser(this.user).subscribe();
    this.rebuildForm();
  }

  prepareUserForSave(): User {
    const formModel = this.userForm.value;
    const addressesDeepCopy: Address[] = formModel.addresses.map(
      (address: Address) => Object.assign({}, address)
    );

    const saveUser: User = {
      id: this.user.id,
      name: formModel.name as string,
      email: formModel.email as string,
      addresses: addressesDeepCopy
    };
    return saveUser;
  }

  get countAddresses(): number {
    return this.addresses.length;
  }

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  selectAddress(index: number) {
    this.selectedAddress = index;
    if (this.selectedAddress < 0) {
      this.selectedAddress = this.countAddresses - 1;
    }
    if (this.selectedAddress > this.countAddresses - 1) {
       this.selectedAddress = 0;
    }
  }

  addAddress() {
    if (this.countAddresses < 4) {
      this.addresses.push(this.fb.group(new Address()));
      this.selectedAddress = this.countAddresses - 1;
    }
  }

  remove(index: number) {
    this.addresses.removeAt(index);
    this.selectedAddress = (this.selectedAddress - 1) > 0 ? this.selectedAddress - 1 : 0;
  }

  // sliceMin(selectedNum): number {
  //   let min = this.selectedAddress-2;
  //   if(min < 0) {
  //     min = 0;
  //   }
  //   console.log('min', min, this.selectedAddress);
  //   return min;
  // }

  // sliceMax() {
  //   let max = this.selectedAddress+2;
  //   if(max > this.countAddresses) {
  //     max = this.countAddresses-1;
  //   }
  //   console.log('max', max, this.selectedAddress);
  // }

  ngOnChanges() {
    this.rebuildForm();
  }

  ngOnInit() {
  }

}
