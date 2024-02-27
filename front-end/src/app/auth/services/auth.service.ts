import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal, EventEmitter } from '@angular/core';
import { Observable, map, tap, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private isLoggedIn: boolean = false;
  // Observable para nombre en el inicio de sesion
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  private idUser: string='';
  private username: string = '';
  // authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser= signal <User|null> (null);
  private _authStatus= signal<AuthStatus>(AuthStatus.checking);


  //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());



  constructor() { 
    this.obtenerUsuario();
  }

  login( email: string|null|undefined, password: string|null|undefined ) : Observable<any> {

    // const urlLogin = `${ this.baseUrl }/auth/login`;
    const urlLogin = 'http://localhost:3001/api/auth/login';
    const user= { email, password };
    const body = { user};

    return this.http.post<LoginResponse>( urlLogin, body )
      .pipe(
        tap(({ user, token }) => {
          this._currentUser.set( user );
          this._authStatus.set( AuthStatus.authenticated );
          localStorage.setItem( 'token', token );
          localStorage.setItem('usuario',JSON.stringify(user));
          // console.log({ user, token });
          // this.isLoggedIn = true;
          // this.username = user.name;
          // this.authChanged.emit(true);
          this.isLoggedInSubject.next(true);
          this.obtenerUsuario();
        }),
        map( () => true )
      )
      
  };
  
  obtenerUsuario(){
    if (localStorage.length === 0) {
      this.username='';
      this.idUser='';
      this.isLoggedInSubject.next(false)
    } else {      
      let usuario=localStorage.getItem('usuario')
      console.log(usuario);
      if (usuario!==null){
        this.isLoggedInSubject.next(true)
        let usuariojson=JSON.parse(usuario);
        this.username=usuariojson.name; 
        this.idUser=usuariojson.id_user;       
      } else{
        this.username='';
      }
    }
    
  }

  Logout(){
    // logica cerrar sesion
    localStorage.clear();
    // this.isLoggedIn = false;
    // this.username = '';
    // this.authChanged.emit(false);
    this.isLoggedInSubject.next(false);
  }

  // get isLoggedInUser() {
  //   return this.isLoggedIn;
  // }

  get getUsername() {
    return this.username;
  }
  getUserId(){
    return this.idUser;
  }

  register (user:User): Observable<User>{
    const urlRegister = 'http://localhost:3001/api/auth/register';
    const body = { user };
    return this.http.post<User>( urlRegister, body )
      .pipe(  
        map(  () => user   ),
      )
  }
}
