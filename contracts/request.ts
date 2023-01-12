import UserTokenPayload from "App/Auth/JWT/UserTokenPayload";

declare module '@ioc:Adonis/Core/Request' {
    interface RequestContract {
      getJWTPayload(): Promise<UserTokenPayload>
    }
  }