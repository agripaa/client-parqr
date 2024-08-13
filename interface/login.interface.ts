interface login {
  password: string;
}

export interface IOwnerLogin extends login {
  email: string;
}

export interface IOperatorLogin extends login {
  NIK: string;
}