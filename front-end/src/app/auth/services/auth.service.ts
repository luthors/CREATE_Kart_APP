import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser= signal <User|null> (null);
  private _authStatus= signal<AuthStatus>(AuthStatus.checking);


  //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());



    constructor() { }

  login( email: string|null|undefined, password: string|null|undefined ) : Observable<boolean> {

    // const urlLogin = `${ this.baseUrl }/auth/login`;
    const urlLogin = 'http://localhost:3001/auth/login';
    const body = { email, password };

    return this.http.post<LoginResponse>( urlLogin, body )
      .pipe(
        tap(({ user, token }) => {
          this._currentUser.set( user );
          this._authStatus.set( AuthStatus.authenticated );
          localStorage.setItem( 'token', token );
          console.log({ user, token });
        }),

        map( () => true )
      )
  }

  register (user:User): Observable<User>{
    const urlRegister = 'http://localhost:3001/api/auth/register';
    const body = { user };
    console.log(body)
    return this.http.post<User>( urlRegister, body )
      .pipe(

        map(  () => user   ),

      )

  }
}
