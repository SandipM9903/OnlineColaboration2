import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup,Validators} from '@angular/forms';
import {User} from'../../model/user';
import { data } from 'jquery';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  user:User=new User();
  currentUser:any;
  submitted=false;

  constructor(private userservice:UserService , private router:Router) { }

  ngOnInit(): void {
    this.submitted=false;
  }

  loginform=new FormGroup({
    username:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    });
  

  login(login){
    this.user=new User();
    this.user.username=this.Username.value;
      this.user.password=this.Password.value;
      this.userservice.validateUser(this.user).subscribe(data=>{
        console.log(data);
        if(data!=null){
          this.currentUser=data;
          if(this.currentUser.role==="Admin" && this.currentUser.isOnline === true){
            this.router.navigateByUrl('/admin-home/' + `${this.currentUser.userId}`);
           }
           else{
             this.router.navigateByUrl('/user-home' + `${this.currentUser.userId}`);
           }
          console.log(this.currentUser.userId);
        }else {
          console.log("ObjectEmpty");
        }
      },error=>console.log(error));
    
    
  }

  get Username(){
    return this.loginform.get('username');
  }
  get Password(){
    return this.loginform.get('password');
  }

  }
