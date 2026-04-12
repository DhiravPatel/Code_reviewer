
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model GithubIntegration
 * 
 */
export type GithubIntegration = $Result.DefaultSelection<Prisma.$GithubIntegrationPayload>
/**
 * Model EnabledRepository
 * 
 */
export type EnabledRepository = $Result.DefaultSelection<Prisma.$EnabledRepositoryPayload>
/**
 * Model PrReview
 * 
 */
export type PrReview = $Result.DefaultSelection<Prisma.$PrReviewPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.githubIntegration`: Exposes CRUD operations for the **GithubIntegration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GithubIntegrations
    * const githubIntegrations = await prisma.githubIntegration.findMany()
    * ```
    */
  get githubIntegration(): Prisma.GithubIntegrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enabledRepository`: Exposes CRUD operations for the **EnabledRepository** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EnabledRepositories
    * const enabledRepositories = await prisma.enabledRepository.findMany()
    * ```
    */
  get enabledRepository(): Prisma.EnabledRepositoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prReview`: Exposes CRUD operations for the **PrReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PrReviews
    * const prReviews = await prisma.prReview.findMany()
    * ```
    */
  get prReview(): Prisma.PrReviewDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    GithubIntegration: 'GithubIntegration',
    EnabledRepository: 'EnabledRepository',
    PrReview: 'PrReview'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "githubIntegration" | "enabledRepository" | "prReview"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      GithubIntegration: {
        payload: Prisma.$GithubIntegrationPayload<ExtArgs>
        fields: Prisma.GithubIntegrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GithubIntegrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GithubIntegrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          findFirst: {
            args: Prisma.GithubIntegrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GithubIntegrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          findMany: {
            args: Prisma.GithubIntegrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>[]
          }
          create: {
            args: Prisma.GithubIntegrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          createMany: {
            args: Prisma.GithubIntegrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GithubIntegrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>[]
          }
          delete: {
            args: Prisma.GithubIntegrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          update: {
            args: Prisma.GithubIntegrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          deleteMany: {
            args: Prisma.GithubIntegrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GithubIntegrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GithubIntegrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>[]
          }
          upsert: {
            args: Prisma.GithubIntegrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          aggregate: {
            args: Prisma.GithubIntegrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGithubIntegration>
          }
          groupBy: {
            args: Prisma.GithubIntegrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<GithubIntegrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.GithubIntegrationCountArgs<ExtArgs>
            result: $Utils.Optional<GithubIntegrationCountAggregateOutputType> | number
          }
        }
      }
      EnabledRepository: {
        payload: Prisma.$EnabledRepositoryPayload<ExtArgs>
        fields: Prisma.EnabledRepositoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnabledRepositoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnabledRepositoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnabledRepositoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnabledRepositoryPayload>
          }
          findFirst: {
            args: Prisma.EnabledRepositoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnabledRepositoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnabledRepositoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnabledRepositoryPayload>
          }
          findMany: {
            args: Prisma.EnabledRepositoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnabledRepositoryPayload>[]
          }
          create: {
            args: Prisma.EnabledRepositoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnabledRepositoryPayload>
          }
          createMany: {
            args: Prisma.EnabledRepositoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnabledRepositoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnabledRepositoryPayload>[]
          }
          delete: {
            args: Prisma.EnabledRepositoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnabledRepositoryPayload>
          }
          update: {
            args: Prisma.EnabledRepositoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnabledRepositoryPayload>
          }
          deleteMany: {
            args: Prisma.EnabledRepositoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnabledRepositoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnabledRepositoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnabledRepositoryPayload>[]
          }
          upsert: {
            args: Prisma.EnabledRepositoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnabledRepositoryPayload>
          }
          aggregate: {
            args: Prisma.EnabledRepositoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnabledRepository>
          }
          groupBy: {
            args: Prisma.EnabledRepositoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnabledRepositoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnabledRepositoryCountArgs<ExtArgs>
            result: $Utils.Optional<EnabledRepositoryCountAggregateOutputType> | number
          }
        }
      }
      PrReview: {
        payload: Prisma.$PrReviewPayload<ExtArgs>
        fields: Prisma.PrReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrReviewPayload>
          }
          findFirst: {
            args: Prisma.PrReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrReviewPayload>
          }
          findMany: {
            args: Prisma.PrReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrReviewPayload>[]
          }
          create: {
            args: Prisma.PrReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrReviewPayload>
          }
          createMany: {
            args: Prisma.PrReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrReviewPayload>[]
          }
          delete: {
            args: Prisma.PrReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrReviewPayload>
          }
          update: {
            args: Prisma.PrReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrReviewPayload>
          }
          deleteMany: {
            args: Prisma.PrReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrReviewPayload>[]
          }
          upsert: {
            args: Prisma.PrReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrReviewPayload>
          }
          aggregate: {
            args: Prisma.PrReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrReview>
          }
          groupBy: {
            args: Prisma.PrReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrReviewCountArgs<ExtArgs>
            result: $Utils.Optional<PrReviewCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    githubIntegration?: GithubIntegrationOmit
    enabledRepository?: EnabledRepositoryOmit
    prReview?: PrReviewOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    enabledRepos: number
    prReviews: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enabledRepos?: boolean | UserCountOutputTypeCountEnabledReposArgs
    prReviews?: boolean | UserCountOutputTypeCountPrReviewsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEnabledReposArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnabledRepositoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPrReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrReviewWhereInput
  }


  /**
   * Count Type EnabledRepositoryCountOutputType
   */

  export type EnabledRepositoryCountOutputType = {
    prReviews: number
  }

  export type EnabledRepositoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prReviews?: boolean | EnabledRepositoryCountOutputTypeCountPrReviewsArgs
  }

  // Custom InputTypes
  /**
   * EnabledRepositoryCountOutputType without action
   */
  export type EnabledRepositoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepositoryCountOutputType
     */
    select?: EnabledRepositoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EnabledRepositoryCountOutputType without action
   */
  export type EnabledRepositoryCountOutputTypeCountPrReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrReviewWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    provider: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    provider: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    avatarUrl: number
    provider: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    provider?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    provider?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    provider?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    avatarUrl: string | null
    provider: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    githubIntegration?: boolean | User$githubIntegrationArgs<ExtArgs>
    enabledRepos?: boolean | User$enabledReposArgs<ExtArgs>
    prReviews?: boolean | User$prReviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "avatarUrl" | "provider" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    githubIntegration?: boolean | User$githubIntegrationArgs<ExtArgs>
    enabledRepos?: boolean | User$enabledReposArgs<ExtArgs>
    prReviews?: boolean | User$prReviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      githubIntegration: Prisma.$GithubIntegrationPayload<ExtArgs> | null
      enabledRepos: Prisma.$EnabledRepositoryPayload<ExtArgs>[]
      prReviews: Prisma.$PrReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      avatarUrl: string | null
      provider: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    githubIntegration<T extends User$githubIntegrationArgs<ExtArgs> = {}>(args?: Subset<T, User$githubIntegrationArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    enabledRepos<T extends User$enabledReposArgs<ExtArgs> = {}>(args?: Subset<T, User$enabledReposArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    prReviews<T extends User$prReviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$prReviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly provider: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.githubIntegration
   */
  export type User$githubIntegrationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    where?: GithubIntegrationWhereInput
  }

  /**
   * User.enabledRepos
   */
  export type User$enabledReposArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryInclude<ExtArgs> | null
    where?: EnabledRepositoryWhereInput
    orderBy?: EnabledRepositoryOrderByWithRelationInput | EnabledRepositoryOrderByWithRelationInput[]
    cursor?: EnabledRepositoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnabledRepositoryScalarFieldEnum | EnabledRepositoryScalarFieldEnum[]
  }

  /**
   * User.prReviews
   */
  export type User$prReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
    where?: PrReviewWhereInput
    orderBy?: PrReviewOrderByWithRelationInput | PrReviewOrderByWithRelationInput[]
    cursor?: PrReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrReviewScalarFieldEnum | PrReviewScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model GithubIntegration
   */

  export type AggregateGithubIntegration = {
    _count: GithubIntegrationCountAggregateOutputType | null
    _avg: GithubIntegrationAvgAggregateOutputType | null
    _sum: GithubIntegrationSumAggregateOutputType | null
    _min: GithubIntegrationMinAggregateOutputType | null
    _max: GithubIntegrationMaxAggregateOutputType | null
  }

  export type GithubIntegrationAvgAggregateOutputType = {
    githubId: number | null
  }

  export type GithubIntegrationSumAggregateOutputType = {
    githubId: number | null
  }

  export type GithubIntegrationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    githubId: number | null
    username: string | null
    accessToken: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GithubIntegrationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    githubId: number | null
    username: string | null
    accessToken: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GithubIntegrationCountAggregateOutputType = {
    id: number
    userId: number
    githubId: number
    username: number
    accessToken: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GithubIntegrationAvgAggregateInputType = {
    githubId?: true
  }

  export type GithubIntegrationSumAggregateInputType = {
    githubId?: true
  }

  export type GithubIntegrationMinAggregateInputType = {
    id?: true
    userId?: true
    githubId?: true
    username?: true
    accessToken?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GithubIntegrationMaxAggregateInputType = {
    id?: true
    userId?: true
    githubId?: true
    username?: true
    accessToken?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GithubIntegrationCountAggregateInputType = {
    id?: true
    userId?: true
    githubId?: true
    username?: true
    accessToken?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GithubIntegrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GithubIntegration to aggregate.
     */
    where?: GithubIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubIntegrations to fetch.
     */
    orderBy?: GithubIntegrationOrderByWithRelationInput | GithubIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GithubIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GithubIntegrations
    **/
    _count?: true | GithubIntegrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GithubIntegrationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GithubIntegrationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GithubIntegrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GithubIntegrationMaxAggregateInputType
  }

  export type GetGithubIntegrationAggregateType<T extends GithubIntegrationAggregateArgs> = {
        [P in keyof T & keyof AggregateGithubIntegration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGithubIntegration[P]>
      : GetScalarType<T[P], AggregateGithubIntegration[P]>
  }




  export type GithubIntegrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GithubIntegrationWhereInput
    orderBy?: GithubIntegrationOrderByWithAggregationInput | GithubIntegrationOrderByWithAggregationInput[]
    by: GithubIntegrationScalarFieldEnum[] | GithubIntegrationScalarFieldEnum
    having?: GithubIntegrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GithubIntegrationCountAggregateInputType | true
    _avg?: GithubIntegrationAvgAggregateInputType
    _sum?: GithubIntegrationSumAggregateInputType
    _min?: GithubIntegrationMinAggregateInputType
    _max?: GithubIntegrationMaxAggregateInputType
  }

  export type GithubIntegrationGroupByOutputType = {
    id: string
    userId: string
    githubId: number
    username: string
    accessToken: string
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: GithubIntegrationCountAggregateOutputType | null
    _avg: GithubIntegrationAvgAggregateOutputType | null
    _sum: GithubIntegrationSumAggregateOutputType | null
    _min: GithubIntegrationMinAggregateOutputType | null
    _max: GithubIntegrationMaxAggregateOutputType | null
  }

  type GetGithubIntegrationGroupByPayload<T extends GithubIntegrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GithubIntegrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GithubIntegrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GithubIntegrationGroupByOutputType[P]>
            : GetScalarType<T[P], GithubIntegrationGroupByOutputType[P]>
        }
      >
    >


  export type GithubIntegrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    githubId?: boolean
    username?: boolean
    accessToken?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["githubIntegration"]>

  export type GithubIntegrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    githubId?: boolean
    username?: boolean
    accessToken?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["githubIntegration"]>

  export type GithubIntegrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    githubId?: boolean
    username?: boolean
    accessToken?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["githubIntegration"]>

  export type GithubIntegrationSelectScalar = {
    id?: boolean
    userId?: boolean
    githubId?: boolean
    username?: boolean
    accessToken?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GithubIntegrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "githubId" | "username" | "accessToken" | "avatarUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["githubIntegration"]>
  export type GithubIntegrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GithubIntegrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GithubIntegrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GithubIntegrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GithubIntegration"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      githubId: number
      username: string
      accessToken: string
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["githubIntegration"]>
    composites: {}
  }

  type GithubIntegrationGetPayload<S extends boolean | null | undefined | GithubIntegrationDefaultArgs> = $Result.GetResult<Prisma.$GithubIntegrationPayload, S>

  type GithubIntegrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GithubIntegrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GithubIntegrationCountAggregateInputType | true
    }

  export interface GithubIntegrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GithubIntegration'], meta: { name: 'GithubIntegration' } }
    /**
     * Find zero or one GithubIntegration that matches the filter.
     * @param {GithubIntegrationFindUniqueArgs} args - Arguments to find a GithubIntegration
     * @example
     * // Get one GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GithubIntegrationFindUniqueArgs>(args: SelectSubset<T, GithubIntegrationFindUniqueArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GithubIntegration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GithubIntegrationFindUniqueOrThrowArgs} args - Arguments to find a GithubIntegration
     * @example
     * // Get one GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GithubIntegrationFindUniqueOrThrowArgs>(args: SelectSubset<T, GithubIntegrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GithubIntegration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationFindFirstArgs} args - Arguments to find a GithubIntegration
     * @example
     * // Get one GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GithubIntegrationFindFirstArgs>(args?: SelectSubset<T, GithubIntegrationFindFirstArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GithubIntegration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationFindFirstOrThrowArgs} args - Arguments to find a GithubIntegration
     * @example
     * // Get one GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GithubIntegrationFindFirstOrThrowArgs>(args?: SelectSubset<T, GithubIntegrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GithubIntegrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GithubIntegrations
     * const githubIntegrations = await prisma.githubIntegration.findMany()
     * 
     * // Get first 10 GithubIntegrations
     * const githubIntegrations = await prisma.githubIntegration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const githubIntegrationWithIdOnly = await prisma.githubIntegration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GithubIntegrationFindManyArgs>(args?: SelectSubset<T, GithubIntegrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GithubIntegration.
     * @param {GithubIntegrationCreateArgs} args - Arguments to create a GithubIntegration.
     * @example
     * // Create one GithubIntegration
     * const GithubIntegration = await prisma.githubIntegration.create({
     *   data: {
     *     // ... data to create a GithubIntegration
     *   }
     * })
     * 
     */
    create<T extends GithubIntegrationCreateArgs>(args: SelectSubset<T, GithubIntegrationCreateArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GithubIntegrations.
     * @param {GithubIntegrationCreateManyArgs} args - Arguments to create many GithubIntegrations.
     * @example
     * // Create many GithubIntegrations
     * const githubIntegration = await prisma.githubIntegration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GithubIntegrationCreateManyArgs>(args?: SelectSubset<T, GithubIntegrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GithubIntegrations and returns the data saved in the database.
     * @param {GithubIntegrationCreateManyAndReturnArgs} args - Arguments to create many GithubIntegrations.
     * @example
     * // Create many GithubIntegrations
     * const githubIntegration = await prisma.githubIntegration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GithubIntegrations and only return the `id`
     * const githubIntegrationWithIdOnly = await prisma.githubIntegration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GithubIntegrationCreateManyAndReturnArgs>(args?: SelectSubset<T, GithubIntegrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GithubIntegration.
     * @param {GithubIntegrationDeleteArgs} args - Arguments to delete one GithubIntegration.
     * @example
     * // Delete one GithubIntegration
     * const GithubIntegration = await prisma.githubIntegration.delete({
     *   where: {
     *     // ... filter to delete one GithubIntegration
     *   }
     * })
     * 
     */
    delete<T extends GithubIntegrationDeleteArgs>(args: SelectSubset<T, GithubIntegrationDeleteArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GithubIntegration.
     * @param {GithubIntegrationUpdateArgs} args - Arguments to update one GithubIntegration.
     * @example
     * // Update one GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GithubIntegrationUpdateArgs>(args: SelectSubset<T, GithubIntegrationUpdateArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GithubIntegrations.
     * @param {GithubIntegrationDeleteManyArgs} args - Arguments to filter GithubIntegrations to delete.
     * @example
     * // Delete a few GithubIntegrations
     * const { count } = await prisma.githubIntegration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GithubIntegrationDeleteManyArgs>(args?: SelectSubset<T, GithubIntegrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GithubIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GithubIntegrations
     * const githubIntegration = await prisma.githubIntegration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GithubIntegrationUpdateManyArgs>(args: SelectSubset<T, GithubIntegrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GithubIntegrations and returns the data updated in the database.
     * @param {GithubIntegrationUpdateManyAndReturnArgs} args - Arguments to update many GithubIntegrations.
     * @example
     * // Update many GithubIntegrations
     * const githubIntegration = await prisma.githubIntegration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GithubIntegrations and only return the `id`
     * const githubIntegrationWithIdOnly = await prisma.githubIntegration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GithubIntegrationUpdateManyAndReturnArgs>(args: SelectSubset<T, GithubIntegrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GithubIntegration.
     * @param {GithubIntegrationUpsertArgs} args - Arguments to update or create a GithubIntegration.
     * @example
     * // Update or create a GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.upsert({
     *   create: {
     *     // ... data to create a GithubIntegration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GithubIntegration we want to update
     *   }
     * })
     */
    upsert<T extends GithubIntegrationUpsertArgs>(args: SelectSubset<T, GithubIntegrationUpsertArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GithubIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationCountArgs} args - Arguments to filter GithubIntegrations to count.
     * @example
     * // Count the number of GithubIntegrations
     * const count = await prisma.githubIntegration.count({
     *   where: {
     *     // ... the filter for the GithubIntegrations we want to count
     *   }
     * })
    **/
    count<T extends GithubIntegrationCountArgs>(
      args?: Subset<T, GithubIntegrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GithubIntegrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GithubIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GithubIntegrationAggregateArgs>(args: Subset<T, GithubIntegrationAggregateArgs>): Prisma.PrismaPromise<GetGithubIntegrationAggregateType<T>>

    /**
     * Group by GithubIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GithubIntegrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GithubIntegrationGroupByArgs['orderBy'] }
        : { orderBy?: GithubIntegrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GithubIntegrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGithubIntegrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GithubIntegration model
   */
  readonly fields: GithubIntegrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GithubIntegration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GithubIntegrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GithubIntegration model
   */
  interface GithubIntegrationFieldRefs {
    readonly id: FieldRef<"GithubIntegration", 'String'>
    readonly userId: FieldRef<"GithubIntegration", 'String'>
    readonly githubId: FieldRef<"GithubIntegration", 'Int'>
    readonly username: FieldRef<"GithubIntegration", 'String'>
    readonly accessToken: FieldRef<"GithubIntegration", 'String'>
    readonly avatarUrl: FieldRef<"GithubIntegration", 'String'>
    readonly createdAt: FieldRef<"GithubIntegration", 'DateTime'>
    readonly updatedAt: FieldRef<"GithubIntegration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GithubIntegration findUnique
   */
  export type GithubIntegrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which GithubIntegration to fetch.
     */
    where: GithubIntegrationWhereUniqueInput
  }

  /**
   * GithubIntegration findUniqueOrThrow
   */
  export type GithubIntegrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which GithubIntegration to fetch.
     */
    where: GithubIntegrationWhereUniqueInput
  }

  /**
   * GithubIntegration findFirst
   */
  export type GithubIntegrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which GithubIntegration to fetch.
     */
    where?: GithubIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubIntegrations to fetch.
     */
    orderBy?: GithubIntegrationOrderByWithRelationInput | GithubIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GithubIntegrations.
     */
    cursor?: GithubIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GithubIntegrations.
     */
    distinct?: GithubIntegrationScalarFieldEnum | GithubIntegrationScalarFieldEnum[]
  }

  /**
   * GithubIntegration findFirstOrThrow
   */
  export type GithubIntegrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which GithubIntegration to fetch.
     */
    where?: GithubIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubIntegrations to fetch.
     */
    orderBy?: GithubIntegrationOrderByWithRelationInput | GithubIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GithubIntegrations.
     */
    cursor?: GithubIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GithubIntegrations.
     */
    distinct?: GithubIntegrationScalarFieldEnum | GithubIntegrationScalarFieldEnum[]
  }

  /**
   * GithubIntegration findMany
   */
  export type GithubIntegrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which GithubIntegrations to fetch.
     */
    where?: GithubIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubIntegrations to fetch.
     */
    orderBy?: GithubIntegrationOrderByWithRelationInput | GithubIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GithubIntegrations.
     */
    cursor?: GithubIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GithubIntegrations.
     */
    distinct?: GithubIntegrationScalarFieldEnum | GithubIntegrationScalarFieldEnum[]
  }

  /**
   * GithubIntegration create
   */
  export type GithubIntegrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * The data needed to create a GithubIntegration.
     */
    data: XOR<GithubIntegrationCreateInput, GithubIntegrationUncheckedCreateInput>
  }

  /**
   * GithubIntegration createMany
   */
  export type GithubIntegrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GithubIntegrations.
     */
    data: GithubIntegrationCreateManyInput | GithubIntegrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GithubIntegration createManyAndReturn
   */
  export type GithubIntegrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * The data used to create many GithubIntegrations.
     */
    data: GithubIntegrationCreateManyInput | GithubIntegrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GithubIntegration update
   */
  export type GithubIntegrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * The data needed to update a GithubIntegration.
     */
    data: XOR<GithubIntegrationUpdateInput, GithubIntegrationUncheckedUpdateInput>
    /**
     * Choose, which GithubIntegration to update.
     */
    where: GithubIntegrationWhereUniqueInput
  }

  /**
   * GithubIntegration updateMany
   */
  export type GithubIntegrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GithubIntegrations.
     */
    data: XOR<GithubIntegrationUpdateManyMutationInput, GithubIntegrationUncheckedUpdateManyInput>
    /**
     * Filter which GithubIntegrations to update
     */
    where?: GithubIntegrationWhereInput
    /**
     * Limit how many GithubIntegrations to update.
     */
    limit?: number
  }

  /**
   * GithubIntegration updateManyAndReturn
   */
  export type GithubIntegrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * The data used to update GithubIntegrations.
     */
    data: XOR<GithubIntegrationUpdateManyMutationInput, GithubIntegrationUncheckedUpdateManyInput>
    /**
     * Filter which GithubIntegrations to update
     */
    where?: GithubIntegrationWhereInput
    /**
     * Limit how many GithubIntegrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GithubIntegration upsert
   */
  export type GithubIntegrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * The filter to search for the GithubIntegration to update in case it exists.
     */
    where: GithubIntegrationWhereUniqueInput
    /**
     * In case the GithubIntegration found by the `where` argument doesn't exist, create a new GithubIntegration with this data.
     */
    create: XOR<GithubIntegrationCreateInput, GithubIntegrationUncheckedCreateInput>
    /**
     * In case the GithubIntegration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GithubIntegrationUpdateInput, GithubIntegrationUncheckedUpdateInput>
  }

  /**
   * GithubIntegration delete
   */
  export type GithubIntegrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter which GithubIntegration to delete.
     */
    where: GithubIntegrationWhereUniqueInput
  }

  /**
   * GithubIntegration deleteMany
   */
  export type GithubIntegrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GithubIntegrations to delete
     */
    where?: GithubIntegrationWhereInput
    /**
     * Limit how many GithubIntegrations to delete.
     */
    limit?: number
  }

  /**
   * GithubIntegration without action
   */
  export type GithubIntegrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
  }


  /**
   * Model EnabledRepository
   */

  export type AggregateEnabledRepository = {
    _count: EnabledRepositoryCountAggregateOutputType | null
    _avg: EnabledRepositoryAvgAggregateOutputType | null
    _sum: EnabledRepositorySumAggregateOutputType | null
    _min: EnabledRepositoryMinAggregateOutputType | null
    _max: EnabledRepositoryMaxAggregateOutputType | null
  }

  export type EnabledRepositoryAvgAggregateOutputType = {
    githubRepoId: number | null
    webhookId: number | null
  }

  export type EnabledRepositorySumAggregateOutputType = {
    githubRepoId: number | null
    webhookId: number | null
  }

  export type EnabledRepositoryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    githubRepoId: number | null
    fullName: string | null
    name: string | null
    owner: string | null
    language: string | null
    description: string | null
    isPrivate: boolean | null
    defaultBranch: string | null
    webhookId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EnabledRepositoryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    githubRepoId: number | null
    fullName: string | null
    name: string | null
    owner: string | null
    language: string | null
    description: string | null
    isPrivate: boolean | null
    defaultBranch: string | null
    webhookId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EnabledRepositoryCountAggregateOutputType = {
    id: number
    userId: number
    githubRepoId: number
    fullName: number
    name: number
    owner: number
    language: number
    description: number
    isPrivate: number
    defaultBranch: number
    webhookId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EnabledRepositoryAvgAggregateInputType = {
    githubRepoId?: true
    webhookId?: true
  }

  export type EnabledRepositorySumAggregateInputType = {
    githubRepoId?: true
    webhookId?: true
  }

  export type EnabledRepositoryMinAggregateInputType = {
    id?: true
    userId?: true
    githubRepoId?: true
    fullName?: true
    name?: true
    owner?: true
    language?: true
    description?: true
    isPrivate?: true
    defaultBranch?: true
    webhookId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EnabledRepositoryMaxAggregateInputType = {
    id?: true
    userId?: true
    githubRepoId?: true
    fullName?: true
    name?: true
    owner?: true
    language?: true
    description?: true
    isPrivate?: true
    defaultBranch?: true
    webhookId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EnabledRepositoryCountAggregateInputType = {
    id?: true
    userId?: true
    githubRepoId?: true
    fullName?: true
    name?: true
    owner?: true
    language?: true
    description?: true
    isPrivate?: true
    defaultBranch?: true
    webhookId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EnabledRepositoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EnabledRepository to aggregate.
     */
    where?: EnabledRepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnabledRepositories to fetch.
     */
    orderBy?: EnabledRepositoryOrderByWithRelationInput | EnabledRepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnabledRepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnabledRepositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnabledRepositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EnabledRepositories
    **/
    _count?: true | EnabledRepositoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EnabledRepositoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EnabledRepositorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnabledRepositoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnabledRepositoryMaxAggregateInputType
  }

  export type GetEnabledRepositoryAggregateType<T extends EnabledRepositoryAggregateArgs> = {
        [P in keyof T & keyof AggregateEnabledRepository]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnabledRepository[P]>
      : GetScalarType<T[P], AggregateEnabledRepository[P]>
  }




  export type EnabledRepositoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnabledRepositoryWhereInput
    orderBy?: EnabledRepositoryOrderByWithAggregationInput | EnabledRepositoryOrderByWithAggregationInput[]
    by: EnabledRepositoryScalarFieldEnum[] | EnabledRepositoryScalarFieldEnum
    having?: EnabledRepositoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnabledRepositoryCountAggregateInputType | true
    _avg?: EnabledRepositoryAvgAggregateInputType
    _sum?: EnabledRepositorySumAggregateInputType
    _min?: EnabledRepositoryMinAggregateInputType
    _max?: EnabledRepositoryMaxAggregateInputType
  }

  export type EnabledRepositoryGroupByOutputType = {
    id: string
    userId: string
    githubRepoId: number
    fullName: string
    name: string
    owner: string
    language: string | null
    description: string | null
    isPrivate: boolean
    defaultBranch: string
    webhookId: number | null
    createdAt: Date
    updatedAt: Date
    _count: EnabledRepositoryCountAggregateOutputType | null
    _avg: EnabledRepositoryAvgAggregateOutputType | null
    _sum: EnabledRepositorySumAggregateOutputType | null
    _min: EnabledRepositoryMinAggregateOutputType | null
    _max: EnabledRepositoryMaxAggregateOutputType | null
  }

  type GetEnabledRepositoryGroupByPayload<T extends EnabledRepositoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnabledRepositoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnabledRepositoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnabledRepositoryGroupByOutputType[P]>
            : GetScalarType<T[P], EnabledRepositoryGroupByOutputType[P]>
        }
      >
    >


  export type EnabledRepositorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    githubRepoId?: boolean
    fullName?: boolean
    name?: boolean
    owner?: boolean
    language?: boolean
    description?: boolean
    isPrivate?: boolean
    defaultBranch?: boolean
    webhookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    prReviews?: boolean | EnabledRepository$prReviewsArgs<ExtArgs>
    _count?: boolean | EnabledRepositoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enabledRepository"]>

  export type EnabledRepositorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    githubRepoId?: boolean
    fullName?: boolean
    name?: boolean
    owner?: boolean
    language?: boolean
    description?: boolean
    isPrivate?: boolean
    defaultBranch?: boolean
    webhookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enabledRepository"]>

  export type EnabledRepositorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    githubRepoId?: boolean
    fullName?: boolean
    name?: boolean
    owner?: boolean
    language?: boolean
    description?: boolean
    isPrivate?: boolean
    defaultBranch?: boolean
    webhookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enabledRepository"]>

  export type EnabledRepositorySelectScalar = {
    id?: boolean
    userId?: boolean
    githubRepoId?: boolean
    fullName?: boolean
    name?: boolean
    owner?: boolean
    language?: boolean
    description?: boolean
    isPrivate?: boolean
    defaultBranch?: boolean
    webhookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EnabledRepositoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "githubRepoId" | "fullName" | "name" | "owner" | "language" | "description" | "isPrivate" | "defaultBranch" | "webhookId" | "createdAt" | "updatedAt", ExtArgs["result"]["enabledRepository"]>
  export type EnabledRepositoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    prReviews?: boolean | EnabledRepository$prReviewsArgs<ExtArgs>
    _count?: boolean | EnabledRepositoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EnabledRepositoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EnabledRepositoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EnabledRepositoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EnabledRepository"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      prReviews: Prisma.$PrReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      githubRepoId: number
      fullName: string
      name: string
      owner: string
      language: string | null
      description: string | null
      isPrivate: boolean
      defaultBranch: string
      webhookId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["enabledRepository"]>
    composites: {}
  }

  type EnabledRepositoryGetPayload<S extends boolean | null | undefined | EnabledRepositoryDefaultArgs> = $Result.GetResult<Prisma.$EnabledRepositoryPayload, S>

  type EnabledRepositoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnabledRepositoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnabledRepositoryCountAggregateInputType | true
    }

  export interface EnabledRepositoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EnabledRepository'], meta: { name: 'EnabledRepository' } }
    /**
     * Find zero or one EnabledRepository that matches the filter.
     * @param {EnabledRepositoryFindUniqueArgs} args - Arguments to find a EnabledRepository
     * @example
     * // Get one EnabledRepository
     * const enabledRepository = await prisma.enabledRepository.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnabledRepositoryFindUniqueArgs>(args: SelectSubset<T, EnabledRepositoryFindUniqueArgs<ExtArgs>>): Prisma__EnabledRepositoryClient<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EnabledRepository that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnabledRepositoryFindUniqueOrThrowArgs} args - Arguments to find a EnabledRepository
     * @example
     * // Get one EnabledRepository
     * const enabledRepository = await prisma.enabledRepository.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnabledRepositoryFindUniqueOrThrowArgs>(args: SelectSubset<T, EnabledRepositoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnabledRepositoryClient<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EnabledRepository that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnabledRepositoryFindFirstArgs} args - Arguments to find a EnabledRepository
     * @example
     * // Get one EnabledRepository
     * const enabledRepository = await prisma.enabledRepository.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnabledRepositoryFindFirstArgs>(args?: SelectSubset<T, EnabledRepositoryFindFirstArgs<ExtArgs>>): Prisma__EnabledRepositoryClient<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EnabledRepository that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnabledRepositoryFindFirstOrThrowArgs} args - Arguments to find a EnabledRepository
     * @example
     * // Get one EnabledRepository
     * const enabledRepository = await prisma.enabledRepository.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnabledRepositoryFindFirstOrThrowArgs>(args?: SelectSubset<T, EnabledRepositoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnabledRepositoryClient<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EnabledRepositories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnabledRepositoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EnabledRepositories
     * const enabledRepositories = await prisma.enabledRepository.findMany()
     * 
     * // Get first 10 EnabledRepositories
     * const enabledRepositories = await prisma.enabledRepository.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enabledRepositoryWithIdOnly = await prisma.enabledRepository.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnabledRepositoryFindManyArgs>(args?: SelectSubset<T, EnabledRepositoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EnabledRepository.
     * @param {EnabledRepositoryCreateArgs} args - Arguments to create a EnabledRepository.
     * @example
     * // Create one EnabledRepository
     * const EnabledRepository = await prisma.enabledRepository.create({
     *   data: {
     *     // ... data to create a EnabledRepository
     *   }
     * })
     * 
     */
    create<T extends EnabledRepositoryCreateArgs>(args: SelectSubset<T, EnabledRepositoryCreateArgs<ExtArgs>>): Prisma__EnabledRepositoryClient<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EnabledRepositories.
     * @param {EnabledRepositoryCreateManyArgs} args - Arguments to create many EnabledRepositories.
     * @example
     * // Create many EnabledRepositories
     * const enabledRepository = await prisma.enabledRepository.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnabledRepositoryCreateManyArgs>(args?: SelectSubset<T, EnabledRepositoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EnabledRepositories and returns the data saved in the database.
     * @param {EnabledRepositoryCreateManyAndReturnArgs} args - Arguments to create many EnabledRepositories.
     * @example
     * // Create many EnabledRepositories
     * const enabledRepository = await prisma.enabledRepository.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EnabledRepositories and only return the `id`
     * const enabledRepositoryWithIdOnly = await prisma.enabledRepository.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnabledRepositoryCreateManyAndReturnArgs>(args?: SelectSubset<T, EnabledRepositoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EnabledRepository.
     * @param {EnabledRepositoryDeleteArgs} args - Arguments to delete one EnabledRepository.
     * @example
     * // Delete one EnabledRepository
     * const EnabledRepository = await prisma.enabledRepository.delete({
     *   where: {
     *     // ... filter to delete one EnabledRepository
     *   }
     * })
     * 
     */
    delete<T extends EnabledRepositoryDeleteArgs>(args: SelectSubset<T, EnabledRepositoryDeleteArgs<ExtArgs>>): Prisma__EnabledRepositoryClient<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EnabledRepository.
     * @param {EnabledRepositoryUpdateArgs} args - Arguments to update one EnabledRepository.
     * @example
     * // Update one EnabledRepository
     * const enabledRepository = await prisma.enabledRepository.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnabledRepositoryUpdateArgs>(args: SelectSubset<T, EnabledRepositoryUpdateArgs<ExtArgs>>): Prisma__EnabledRepositoryClient<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EnabledRepositories.
     * @param {EnabledRepositoryDeleteManyArgs} args - Arguments to filter EnabledRepositories to delete.
     * @example
     * // Delete a few EnabledRepositories
     * const { count } = await prisma.enabledRepository.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnabledRepositoryDeleteManyArgs>(args?: SelectSubset<T, EnabledRepositoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EnabledRepositories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnabledRepositoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EnabledRepositories
     * const enabledRepository = await prisma.enabledRepository.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnabledRepositoryUpdateManyArgs>(args: SelectSubset<T, EnabledRepositoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EnabledRepositories and returns the data updated in the database.
     * @param {EnabledRepositoryUpdateManyAndReturnArgs} args - Arguments to update many EnabledRepositories.
     * @example
     * // Update many EnabledRepositories
     * const enabledRepository = await prisma.enabledRepository.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EnabledRepositories and only return the `id`
     * const enabledRepositoryWithIdOnly = await prisma.enabledRepository.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EnabledRepositoryUpdateManyAndReturnArgs>(args: SelectSubset<T, EnabledRepositoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EnabledRepository.
     * @param {EnabledRepositoryUpsertArgs} args - Arguments to update or create a EnabledRepository.
     * @example
     * // Update or create a EnabledRepository
     * const enabledRepository = await prisma.enabledRepository.upsert({
     *   create: {
     *     // ... data to create a EnabledRepository
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EnabledRepository we want to update
     *   }
     * })
     */
    upsert<T extends EnabledRepositoryUpsertArgs>(args: SelectSubset<T, EnabledRepositoryUpsertArgs<ExtArgs>>): Prisma__EnabledRepositoryClient<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EnabledRepositories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnabledRepositoryCountArgs} args - Arguments to filter EnabledRepositories to count.
     * @example
     * // Count the number of EnabledRepositories
     * const count = await prisma.enabledRepository.count({
     *   where: {
     *     // ... the filter for the EnabledRepositories we want to count
     *   }
     * })
    **/
    count<T extends EnabledRepositoryCountArgs>(
      args?: Subset<T, EnabledRepositoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnabledRepositoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EnabledRepository.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnabledRepositoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnabledRepositoryAggregateArgs>(args: Subset<T, EnabledRepositoryAggregateArgs>): Prisma.PrismaPromise<GetEnabledRepositoryAggregateType<T>>

    /**
     * Group by EnabledRepository.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnabledRepositoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnabledRepositoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnabledRepositoryGroupByArgs['orderBy'] }
        : { orderBy?: EnabledRepositoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnabledRepositoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnabledRepositoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EnabledRepository model
   */
  readonly fields: EnabledRepositoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EnabledRepository.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnabledRepositoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    prReviews<T extends EnabledRepository$prReviewsArgs<ExtArgs> = {}>(args?: Subset<T, EnabledRepository$prReviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EnabledRepository model
   */
  interface EnabledRepositoryFieldRefs {
    readonly id: FieldRef<"EnabledRepository", 'String'>
    readonly userId: FieldRef<"EnabledRepository", 'String'>
    readonly githubRepoId: FieldRef<"EnabledRepository", 'Int'>
    readonly fullName: FieldRef<"EnabledRepository", 'String'>
    readonly name: FieldRef<"EnabledRepository", 'String'>
    readonly owner: FieldRef<"EnabledRepository", 'String'>
    readonly language: FieldRef<"EnabledRepository", 'String'>
    readonly description: FieldRef<"EnabledRepository", 'String'>
    readonly isPrivate: FieldRef<"EnabledRepository", 'Boolean'>
    readonly defaultBranch: FieldRef<"EnabledRepository", 'String'>
    readonly webhookId: FieldRef<"EnabledRepository", 'Int'>
    readonly createdAt: FieldRef<"EnabledRepository", 'DateTime'>
    readonly updatedAt: FieldRef<"EnabledRepository", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EnabledRepository findUnique
   */
  export type EnabledRepositoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryInclude<ExtArgs> | null
    /**
     * Filter, which EnabledRepository to fetch.
     */
    where: EnabledRepositoryWhereUniqueInput
  }

  /**
   * EnabledRepository findUniqueOrThrow
   */
  export type EnabledRepositoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryInclude<ExtArgs> | null
    /**
     * Filter, which EnabledRepository to fetch.
     */
    where: EnabledRepositoryWhereUniqueInput
  }

  /**
   * EnabledRepository findFirst
   */
  export type EnabledRepositoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryInclude<ExtArgs> | null
    /**
     * Filter, which EnabledRepository to fetch.
     */
    where?: EnabledRepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnabledRepositories to fetch.
     */
    orderBy?: EnabledRepositoryOrderByWithRelationInput | EnabledRepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EnabledRepositories.
     */
    cursor?: EnabledRepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnabledRepositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnabledRepositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnabledRepositories.
     */
    distinct?: EnabledRepositoryScalarFieldEnum | EnabledRepositoryScalarFieldEnum[]
  }

  /**
   * EnabledRepository findFirstOrThrow
   */
  export type EnabledRepositoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryInclude<ExtArgs> | null
    /**
     * Filter, which EnabledRepository to fetch.
     */
    where?: EnabledRepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnabledRepositories to fetch.
     */
    orderBy?: EnabledRepositoryOrderByWithRelationInput | EnabledRepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EnabledRepositories.
     */
    cursor?: EnabledRepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnabledRepositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnabledRepositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnabledRepositories.
     */
    distinct?: EnabledRepositoryScalarFieldEnum | EnabledRepositoryScalarFieldEnum[]
  }

  /**
   * EnabledRepository findMany
   */
  export type EnabledRepositoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryInclude<ExtArgs> | null
    /**
     * Filter, which EnabledRepositories to fetch.
     */
    where?: EnabledRepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnabledRepositories to fetch.
     */
    orderBy?: EnabledRepositoryOrderByWithRelationInput | EnabledRepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EnabledRepositories.
     */
    cursor?: EnabledRepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnabledRepositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnabledRepositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnabledRepositories.
     */
    distinct?: EnabledRepositoryScalarFieldEnum | EnabledRepositoryScalarFieldEnum[]
  }

  /**
   * EnabledRepository create
   */
  export type EnabledRepositoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryInclude<ExtArgs> | null
    /**
     * The data needed to create a EnabledRepository.
     */
    data: XOR<EnabledRepositoryCreateInput, EnabledRepositoryUncheckedCreateInput>
  }

  /**
   * EnabledRepository createMany
   */
  export type EnabledRepositoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EnabledRepositories.
     */
    data: EnabledRepositoryCreateManyInput | EnabledRepositoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EnabledRepository createManyAndReturn
   */
  export type EnabledRepositoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * The data used to create many EnabledRepositories.
     */
    data: EnabledRepositoryCreateManyInput | EnabledRepositoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EnabledRepository update
   */
  export type EnabledRepositoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryInclude<ExtArgs> | null
    /**
     * The data needed to update a EnabledRepository.
     */
    data: XOR<EnabledRepositoryUpdateInput, EnabledRepositoryUncheckedUpdateInput>
    /**
     * Choose, which EnabledRepository to update.
     */
    where: EnabledRepositoryWhereUniqueInput
  }

  /**
   * EnabledRepository updateMany
   */
  export type EnabledRepositoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EnabledRepositories.
     */
    data: XOR<EnabledRepositoryUpdateManyMutationInput, EnabledRepositoryUncheckedUpdateManyInput>
    /**
     * Filter which EnabledRepositories to update
     */
    where?: EnabledRepositoryWhereInput
    /**
     * Limit how many EnabledRepositories to update.
     */
    limit?: number
  }

  /**
   * EnabledRepository updateManyAndReturn
   */
  export type EnabledRepositoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * The data used to update EnabledRepositories.
     */
    data: XOR<EnabledRepositoryUpdateManyMutationInput, EnabledRepositoryUncheckedUpdateManyInput>
    /**
     * Filter which EnabledRepositories to update
     */
    where?: EnabledRepositoryWhereInput
    /**
     * Limit how many EnabledRepositories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EnabledRepository upsert
   */
  export type EnabledRepositoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryInclude<ExtArgs> | null
    /**
     * The filter to search for the EnabledRepository to update in case it exists.
     */
    where: EnabledRepositoryWhereUniqueInput
    /**
     * In case the EnabledRepository found by the `where` argument doesn't exist, create a new EnabledRepository with this data.
     */
    create: XOR<EnabledRepositoryCreateInput, EnabledRepositoryUncheckedCreateInput>
    /**
     * In case the EnabledRepository was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnabledRepositoryUpdateInput, EnabledRepositoryUncheckedUpdateInput>
  }

  /**
   * EnabledRepository delete
   */
  export type EnabledRepositoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryInclude<ExtArgs> | null
    /**
     * Filter which EnabledRepository to delete.
     */
    where: EnabledRepositoryWhereUniqueInput
  }

  /**
   * EnabledRepository deleteMany
   */
  export type EnabledRepositoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EnabledRepositories to delete
     */
    where?: EnabledRepositoryWhereInput
    /**
     * Limit how many EnabledRepositories to delete.
     */
    limit?: number
  }

  /**
   * EnabledRepository.prReviews
   */
  export type EnabledRepository$prReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
    where?: PrReviewWhereInput
    orderBy?: PrReviewOrderByWithRelationInput | PrReviewOrderByWithRelationInput[]
    cursor?: PrReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrReviewScalarFieldEnum | PrReviewScalarFieldEnum[]
  }

  /**
   * EnabledRepository without action
   */
  export type EnabledRepositoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnabledRepository
     */
    select?: EnabledRepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnabledRepository
     */
    omit?: EnabledRepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnabledRepositoryInclude<ExtArgs> | null
  }


  /**
   * Model PrReview
   */

  export type AggregatePrReview = {
    _count: PrReviewCountAggregateOutputType | null
    _avg: PrReviewAvgAggregateOutputType | null
    _sum: PrReviewSumAggregateOutputType | null
    _min: PrReviewMinAggregateOutputType | null
    _max: PrReviewMaxAggregateOutputType | null
  }

  export type PrReviewAvgAggregateOutputType = {
    prNumber: number | null
    additions: number | null
    deletions: number | null
    filesChanged: number | null
    score: number | null
    githubCommentId: number | null
  }

  export type PrReviewSumAggregateOutputType = {
    prNumber: number | null
    additions: number | null
    deletions: number | null
    filesChanged: number | null
    score: number | null
    githubCommentId: bigint | null
  }

  export type PrReviewMinAggregateOutputType = {
    id: string | null
    userId: string | null
    repoId: string | null
    prNumber: number | null
    prTitle: string | null
    prAuthor: string | null
    prBranch: string | null
    additions: number | null
    deletions: number | null
    filesChanged: number | null
    status: string | null
    score: number | null
    verdict: string | null
    githubCommentId: bigint | null
    reviewedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrReviewMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    repoId: string | null
    prNumber: number | null
    prTitle: string | null
    prAuthor: string | null
    prBranch: string | null
    additions: number | null
    deletions: number | null
    filesChanged: number | null
    status: string | null
    score: number | null
    verdict: string | null
    githubCommentId: bigint | null
    reviewedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrReviewCountAggregateOutputType = {
    id: number
    userId: number
    repoId: number
    prNumber: number
    prTitle: number
    prAuthor: number
    prBranch: number
    additions: number
    deletions: number
    filesChanged: number
    status: number
    score: number
    verdict: number
    summary: number
    reviewComments: number
    githubCommentId: number
    reviewedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PrReviewAvgAggregateInputType = {
    prNumber?: true
    additions?: true
    deletions?: true
    filesChanged?: true
    score?: true
    githubCommentId?: true
  }

  export type PrReviewSumAggregateInputType = {
    prNumber?: true
    additions?: true
    deletions?: true
    filesChanged?: true
    score?: true
    githubCommentId?: true
  }

  export type PrReviewMinAggregateInputType = {
    id?: true
    userId?: true
    repoId?: true
    prNumber?: true
    prTitle?: true
    prAuthor?: true
    prBranch?: true
    additions?: true
    deletions?: true
    filesChanged?: true
    status?: true
    score?: true
    verdict?: true
    githubCommentId?: true
    reviewedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrReviewMaxAggregateInputType = {
    id?: true
    userId?: true
    repoId?: true
    prNumber?: true
    prTitle?: true
    prAuthor?: true
    prBranch?: true
    additions?: true
    deletions?: true
    filesChanged?: true
    status?: true
    score?: true
    verdict?: true
    githubCommentId?: true
    reviewedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrReviewCountAggregateInputType = {
    id?: true
    userId?: true
    repoId?: true
    prNumber?: true
    prTitle?: true
    prAuthor?: true
    prBranch?: true
    additions?: true
    deletions?: true
    filesChanged?: true
    status?: true
    score?: true
    verdict?: true
    summary?: true
    reviewComments?: true
    githubCommentId?: true
    reviewedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PrReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrReview to aggregate.
     */
    where?: PrReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrReviews to fetch.
     */
    orderBy?: PrReviewOrderByWithRelationInput | PrReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PrReviews
    **/
    _count?: true | PrReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrReviewMaxAggregateInputType
  }

  export type GetPrReviewAggregateType<T extends PrReviewAggregateArgs> = {
        [P in keyof T & keyof AggregatePrReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrReview[P]>
      : GetScalarType<T[P], AggregatePrReview[P]>
  }




  export type PrReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrReviewWhereInput
    orderBy?: PrReviewOrderByWithAggregationInput | PrReviewOrderByWithAggregationInput[]
    by: PrReviewScalarFieldEnum[] | PrReviewScalarFieldEnum
    having?: PrReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrReviewCountAggregateInputType | true
    _avg?: PrReviewAvgAggregateInputType
    _sum?: PrReviewSumAggregateInputType
    _min?: PrReviewMinAggregateInputType
    _max?: PrReviewMaxAggregateInputType
  }

  export type PrReviewGroupByOutputType = {
    id: string
    userId: string
    repoId: string
    prNumber: number
    prTitle: string
    prAuthor: string
    prBranch: string
    additions: number
    deletions: number
    filesChanged: number
    status: string
    score: number | null
    verdict: string | null
    summary: JsonValue | null
    reviewComments: JsonValue | null
    githubCommentId: bigint | null
    reviewedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PrReviewCountAggregateOutputType | null
    _avg: PrReviewAvgAggregateOutputType | null
    _sum: PrReviewSumAggregateOutputType | null
    _min: PrReviewMinAggregateOutputType | null
    _max: PrReviewMaxAggregateOutputType | null
  }

  type GetPrReviewGroupByPayload<T extends PrReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrReviewGroupByOutputType[P]>
            : GetScalarType<T[P], PrReviewGroupByOutputType[P]>
        }
      >
    >


  export type PrReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    repoId?: boolean
    prNumber?: boolean
    prTitle?: boolean
    prAuthor?: boolean
    prBranch?: boolean
    additions?: boolean
    deletions?: boolean
    filesChanged?: boolean
    status?: boolean
    score?: boolean
    verdict?: boolean
    summary?: boolean
    reviewComments?: boolean
    githubCommentId?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    repo?: boolean | EnabledRepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prReview"]>

  export type PrReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    repoId?: boolean
    prNumber?: boolean
    prTitle?: boolean
    prAuthor?: boolean
    prBranch?: boolean
    additions?: boolean
    deletions?: boolean
    filesChanged?: boolean
    status?: boolean
    score?: boolean
    verdict?: boolean
    summary?: boolean
    reviewComments?: boolean
    githubCommentId?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    repo?: boolean | EnabledRepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prReview"]>

  export type PrReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    repoId?: boolean
    prNumber?: boolean
    prTitle?: boolean
    prAuthor?: boolean
    prBranch?: boolean
    additions?: boolean
    deletions?: boolean
    filesChanged?: boolean
    status?: boolean
    score?: boolean
    verdict?: boolean
    summary?: boolean
    reviewComments?: boolean
    githubCommentId?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    repo?: boolean | EnabledRepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prReview"]>

  export type PrReviewSelectScalar = {
    id?: boolean
    userId?: boolean
    repoId?: boolean
    prNumber?: boolean
    prTitle?: boolean
    prAuthor?: boolean
    prBranch?: boolean
    additions?: boolean
    deletions?: boolean
    filesChanged?: boolean
    status?: boolean
    score?: boolean
    verdict?: boolean
    summary?: boolean
    reviewComments?: boolean
    githubCommentId?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PrReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "repoId" | "prNumber" | "prTitle" | "prAuthor" | "prBranch" | "additions" | "deletions" | "filesChanged" | "status" | "score" | "verdict" | "summary" | "reviewComments" | "githubCommentId" | "reviewedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["prReview"]>
  export type PrReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    repo?: boolean | EnabledRepositoryDefaultArgs<ExtArgs>
  }
  export type PrReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    repo?: boolean | EnabledRepositoryDefaultArgs<ExtArgs>
  }
  export type PrReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    repo?: boolean | EnabledRepositoryDefaultArgs<ExtArgs>
  }

  export type $PrReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PrReview"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      repo: Prisma.$EnabledRepositoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      repoId: string
      prNumber: number
      prTitle: string
      prAuthor: string
      prBranch: string
      additions: number
      deletions: number
      filesChanged: number
      status: string
      score: number | null
      verdict: string | null
      summary: Prisma.JsonValue | null
      reviewComments: Prisma.JsonValue | null
      githubCommentId: bigint | null
      reviewedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["prReview"]>
    composites: {}
  }

  type PrReviewGetPayload<S extends boolean | null | undefined | PrReviewDefaultArgs> = $Result.GetResult<Prisma.$PrReviewPayload, S>

  type PrReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrReviewCountAggregateInputType | true
    }

  export interface PrReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PrReview'], meta: { name: 'PrReview' } }
    /**
     * Find zero or one PrReview that matches the filter.
     * @param {PrReviewFindUniqueArgs} args - Arguments to find a PrReview
     * @example
     * // Get one PrReview
     * const prReview = await prisma.prReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrReviewFindUniqueArgs>(args: SelectSubset<T, PrReviewFindUniqueArgs<ExtArgs>>): Prisma__PrReviewClient<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PrReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrReviewFindUniqueOrThrowArgs} args - Arguments to find a PrReview
     * @example
     * // Get one PrReview
     * const prReview = await prisma.prReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, PrReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrReviewClient<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PrReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrReviewFindFirstArgs} args - Arguments to find a PrReview
     * @example
     * // Get one PrReview
     * const prReview = await prisma.prReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrReviewFindFirstArgs>(args?: SelectSubset<T, PrReviewFindFirstArgs<ExtArgs>>): Prisma__PrReviewClient<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PrReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrReviewFindFirstOrThrowArgs} args - Arguments to find a PrReview
     * @example
     * // Get one PrReview
     * const prReview = await prisma.prReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, PrReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrReviewClient<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PrReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PrReviews
     * const prReviews = await prisma.prReview.findMany()
     * 
     * // Get first 10 PrReviews
     * const prReviews = await prisma.prReview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prReviewWithIdOnly = await prisma.prReview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrReviewFindManyArgs>(args?: SelectSubset<T, PrReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PrReview.
     * @param {PrReviewCreateArgs} args - Arguments to create a PrReview.
     * @example
     * // Create one PrReview
     * const PrReview = await prisma.prReview.create({
     *   data: {
     *     // ... data to create a PrReview
     *   }
     * })
     * 
     */
    create<T extends PrReviewCreateArgs>(args: SelectSubset<T, PrReviewCreateArgs<ExtArgs>>): Prisma__PrReviewClient<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PrReviews.
     * @param {PrReviewCreateManyArgs} args - Arguments to create many PrReviews.
     * @example
     * // Create many PrReviews
     * const prReview = await prisma.prReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrReviewCreateManyArgs>(args?: SelectSubset<T, PrReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PrReviews and returns the data saved in the database.
     * @param {PrReviewCreateManyAndReturnArgs} args - Arguments to create many PrReviews.
     * @example
     * // Create many PrReviews
     * const prReview = await prisma.prReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PrReviews and only return the `id`
     * const prReviewWithIdOnly = await prisma.prReview.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, PrReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PrReview.
     * @param {PrReviewDeleteArgs} args - Arguments to delete one PrReview.
     * @example
     * // Delete one PrReview
     * const PrReview = await prisma.prReview.delete({
     *   where: {
     *     // ... filter to delete one PrReview
     *   }
     * })
     * 
     */
    delete<T extends PrReviewDeleteArgs>(args: SelectSubset<T, PrReviewDeleteArgs<ExtArgs>>): Prisma__PrReviewClient<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PrReview.
     * @param {PrReviewUpdateArgs} args - Arguments to update one PrReview.
     * @example
     * // Update one PrReview
     * const prReview = await prisma.prReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrReviewUpdateArgs>(args: SelectSubset<T, PrReviewUpdateArgs<ExtArgs>>): Prisma__PrReviewClient<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PrReviews.
     * @param {PrReviewDeleteManyArgs} args - Arguments to filter PrReviews to delete.
     * @example
     * // Delete a few PrReviews
     * const { count } = await prisma.prReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrReviewDeleteManyArgs>(args?: SelectSubset<T, PrReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PrReviews
     * const prReview = await prisma.prReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrReviewUpdateManyArgs>(args: SelectSubset<T, PrReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrReviews and returns the data updated in the database.
     * @param {PrReviewUpdateManyAndReturnArgs} args - Arguments to update many PrReviews.
     * @example
     * // Update many PrReviews
     * const prReview = await prisma.prReview.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PrReviews and only return the `id`
     * const prReviewWithIdOnly = await prisma.prReview.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PrReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, PrReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PrReview.
     * @param {PrReviewUpsertArgs} args - Arguments to update or create a PrReview.
     * @example
     * // Update or create a PrReview
     * const prReview = await prisma.prReview.upsert({
     *   create: {
     *     // ... data to create a PrReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PrReview we want to update
     *   }
     * })
     */
    upsert<T extends PrReviewUpsertArgs>(args: SelectSubset<T, PrReviewUpsertArgs<ExtArgs>>): Prisma__PrReviewClient<$Result.GetResult<Prisma.$PrReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PrReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrReviewCountArgs} args - Arguments to filter PrReviews to count.
     * @example
     * // Count the number of PrReviews
     * const count = await prisma.prReview.count({
     *   where: {
     *     // ... the filter for the PrReviews we want to count
     *   }
     * })
    **/
    count<T extends PrReviewCountArgs>(
      args?: Subset<T, PrReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PrReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrReviewAggregateArgs>(args: Subset<T, PrReviewAggregateArgs>): Prisma.PrismaPromise<GetPrReviewAggregateType<T>>

    /**
     * Group by PrReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrReviewGroupByArgs['orderBy'] }
        : { orderBy?: PrReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PrReview model
   */
  readonly fields: PrReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PrReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    repo<T extends EnabledRepositoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EnabledRepositoryDefaultArgs<ExtArgs>>): Prisma__EnabledRepositoryClient<$Result.GetResult<Prisma.$EnabledRepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PrReview model
   */
  interface PrReviewFieldRefs {
    readonly id: FieldRef<"PrReview", 'String'>
    readonly userId: FieldRef<"PrReview", 'String'>
    readonly repoId: FieldRef<"PrReview", 'String'>
    readonly prNumber: FieldRef<"PrReview", 'Int'>
    readonly prTitle: FieldRef<"PrReview", 'String'>
    readonly prAuthor: FieldRef<"PrReview", 'String'>
    readonly prBranch: FieldRef<"PrReview", 'String'>
    readonly additions: FieldRef<"PrReview", 'Int'>
    readonly deletions: FieldRef<"PrReview", 'Int'>
    readonly filesChanged: FieldRef<"PrReview", 'Int'>
    readonly status: FieldRef<"PrReview", 'String'>
    readonly score: FieldRef<"PrReview", 'Int'>
    readonly verdict: FieldRef<"PrReview", 'String'>
    readonly summary: FieldRef<"PrReview", 'Json'>
    readonly reviewComments: FieldRef<"PrReview", 'Json'>
    readonly githubCommentId: FieldRef<"PrReview", 'BigInt'>
    readonly reviewedAt: FieldRef<"PrReview", 'DateTime'>
    readonly createdAt: FieldRef<"PrReview", 'DateTime'>
    readonly updatedAt: FieldRef<"PrReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PrReview findUnique
   */
  export type PrReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
    /**
     * Filter, which PrReview to fetch.
     */
    where: PrReviewWhereUniqueInput
  }

  /**
   * PrReview findUniqueOrThrow
   */
  export type PrReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
    /**
     * Filter, which PrReview to fetch.
     */
    where: PrReviewWhereUniqueInput
  }

  /**
   * PrReview findFirst
   */
  export type PrReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
    /**
     * Filter, which PrReview to fetch.
     */
    where?: PrReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrReviews to fetch.
     */
    orderBy?: PrReviewOrderByWithRelationInput | PrReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrReviews.
     */
    cursor?: PrReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrReviews.
     */
    distinct?: PrReviewScalarFieldEnum | PrReviewScalarFieldEnum[]
  }

  /**
   * PrReview findFirstOrThrow
   */
  export type PrReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
    /**
     * Filter, which PrReview to fetch.
     */
    where?: PrReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrReviews to fetch.
     */
    orderBy?: PrReviewOrderByWithRelationInput | PrReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrReviews.
     */
    cursor?: PrReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrReviews.
     */
    distinct?: PrReviewScalarFieldEnum | PrReviewScalarFieldEnum[]
  }

  /**
   * PrReview findMany
   */
  export type PrReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
    /**
     * Filter, which PrReviews to fetch.
     */
    where?: PrReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrReviews to fetch.
     */
    orderBy?: PrReviewOrderByWithRelationInput | PrReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PrReviews.
     */
    cursor?: PrReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrReviews.
     */
    distinct?: PrReviewScalarFieldEnum | PrReviewScalarFieldEnum[]
  }

  /**
   * PrReview create
   */
  export type PrReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a PrReview.
     */
    data: XOR<PrReviewCreateInput, PrReviewUncheckedCreateInput>
  }

  /**
   * PrReview createMany
   */
  export type PrReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PrReviews.
     */
    data: PrReviewCreateManyInput | PrReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PrReview createManyAndReturn
   */
  export type PrReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * The data used to create many PrReviews.
     */
    data: PrReviewCreateManyInput | PrReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PrReview update
   */
  export type PrReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a PrReview.
     */
    data: XOR<PrReviewUpdateInput, PrReviewUncheckedUpdateInput>
    /**
     * Choose, which PrReview to update.
     */
    where: PrReviewWhereUniqueInput
  }

  /**
   * PrReview updateMany
   */
  export type PrReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PrReviews.
     */
    data: XOR<PrReviewUpdateManyMutationInput, PrReviewUncheckedUpdateManyInput>
    /**
     * Filter which PrReviews to update
     */
    where?: PrReviewWhereInput
    /**
     * Limit how many PrReviews to update.
     */
    limit?: number
  }

  /**
   * PrReview updateManyAndReturn
   */
  export type PrReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * The data used to update PrReviews.
     */
    data: XOR<PrReviewUpdateManyMutationInput, PrReviewUncheckedUpdateManyInput>
    /**
     * Filter which PrReviews to update
     */
    where?: PrReviewWhereInput
    /**
     * Limit how many PrReviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PrReview upsert
   */
  export type PrReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the PrReview to update in case it exists.
     */
    where: PrReviewWhereUniqueInput
    /**
     * In case the PrReview found by the `where` argument doesn't exist, create a new PrReview with this data.
     */
    create: XOR<PrReviewCreateInput, PrReviewUncheckedCreateInput>
    /**
     * In case the PrReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrReviewUpdateInput, PrReviewUncheckedUpdateInput>
  }

  /**
   * PrReview delete
   */
  export type PrReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
    /**
     * Filter which PrReview to delete.
     */
    where: PrReviewWhereUniqueInput
  }

  /**
   * PrReview deleteMany
   */
  export type PrReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrReviews to delete
     */
    where?: PrReviewWhereInput
    /**
     * Limit how many PrReviews to delete.
     */
    limit?: number
  }

  /**
   * PrReview without action
   */
  export type PrReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrReview
     */
    select?: PrReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrReview
     */
    omit?: PrReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrReviewInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    avatarUrl: 'avatarUrl',
    provider: 'provider',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GithubIntegrationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    githubId: 'githubId',
    username: 'username',
    accessToken: 'accessToken',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GithubIntegrationScalarFieldEnum = (typeof GithubIntegrationScalarFieldEnum)[keyof typeof GithubIntegrationScalarFieldEnum]


  export const EnabledRepositoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    githubRepoId: 'githubRepoId',
    fullName: 'fullName',
    name: 'name',
    owner: 'owner',
    language: 'language',
    description: 'description',
    isPrivate: 'isPrivate',
    defaultBranch: 'defaultBranch',
    webhookId: 'webhookId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EnabledRepositoryScalarFieldEnum = (typeof EnabledRepositoryScalarFieldEnum)[keyof typeof EnabledRepositoryScalarFieldEnum]


  export const PrReviewScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    repoId: 'repoId',
    prNumber: 'prNumber',
    prTitle: 'prTitle',
    prAuthor: 'prAuthor',
    prBranch: 'prBranch',
    additions: 'additions',
    deletions: 'deletions',
    filesChanged: 'filesChanged',
    status: 'status',
    score: 'score',
    verdict: 'verdict',
    summary: 'summary',
    reviewComments: 'reviewComments',
    githubCommentId: 'githubCommentId',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PrReviewScalarFieldEnum = (typeof PrReviewScalarFieldEnum)[keyof typeof PrReviewScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    provider?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    githubIntegration?: XOR<GithubIntegrationNullableScalarRelationFilter, GithubIntegrationWhereInput> | null
    enabledRepos?: EnabledRepositoryListRelationFilter
    prReviews?: PrReviewListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    githubIntegration?: GithubIntegrationOrderByWithRelationInput
    enabledRepos?: EnabledRepositoryOrderByRelationAggregateInput
    prReviews?: PrReviewOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    provider?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    githubIntegration?: XOR<GithubIntegrationNullableScalarRelationFilter, GithubIntegrationWhereInput> | null
    enabledRepos?: EnabledRepositoryListRelationFilter
    prReviews?: PrReviewListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    provider?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GithubIntegrationWhereInput = {
    AND?: GithubIntegrationWhereInput | GithubIntegrationWhereInput[]
    OR?: GithubIntegrationWhereInput[]
    NOT?: GithubIntegrationWhereInput | GithubIntegrationWhereInput[]
    id?: StringFilter<"GithubIntegration"> | string
    userId?: StringFilter<"GithubIntegration"> | string
    githubId?: IntFilter<"GithubIntegration"> | number
    username?: StringFilter<"GithubIntegration"> | string
    accessToken?: StringFilter<"GithubIntegration"> | string
    avatarUrl?: StringNullableFilter<"GithubIntegration"> | string | null
    createdAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GithubIntegrationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    username?: SortOrder
    accessToken?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type GithubIntegrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    githubId?: number
    AND?: GithubIntegrationWhereInput | GithubIntegrationWhereInput[]
    OR?: GithubIntegrationWhereInput[]
    NOT?: GithubIntegrationWhereInput | GithubIntegrationWhereInput[]
    username?: StringFilter<"GithubIntegration"> | string
    accessToken?: StringFilter<"GithubIntegration"> | string
    avatarUrl?: StringNullableFilter<"GithubIntegration"> | string | null
    createdAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId" | "githubId">

  export type GithubIntegrationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    username?: SortOrder
    accessToken?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GithubIntegrationCountOrderByAggregateInput
    _avg?: GithubIntegrationAvgOrderByAggregateInput
    _max?: GithubIntegrationMaxOrderByAggregateInput
    _min?: GithubIntegrationMinOrderByAggregateInput
    _sum?: GithubIntegrationSumOrderByAggregateInput
  }

  export type GithubIntegrationScalarWhereWithAggregatesInput = {
    AND?: GithubIntegrationScalarWhereWithAggregatesInput | GithubIntegrationScalarWhereWithAggregatesInput[]
    OR?: GithubIntegrationScalarWhereWithAggregatesInput[]
    NOT?: GithubIntegrationScalarWhereWithAggregatesInput | GithubIntegrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GithubIntegration"> | string
    userId?: StringWithAggregatesFilter<"GithubIntegration"> | string
    githubId?: IntWithAggregatesFilter<"GithubIntegration"> | number
    username?: StringWithAggregatesFilter<"GithubIntegration"> | string
    accessToken?: StringWithAggregatesFilter<"GithubIntegration"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"GithubIntegration"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GithubIntegration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GithubIntegration"> | Date | string
  }

  export type EnabledRepositoryWhereInput = {
    AND?: EnabledRepositoryWhereInput | EnabledRepositoryWhereInput[]
    OR?: EnabledRepositoryWhereInput[]
    NOT?: EnabledRepositoryWhereInput | EnabledRepositoryWhereInput[]
    id?: StringFilter<"EnabledRepository"> | string
    userId?: StringFilter<"EnabledRepository"> | string
    githubRepoId?: IntFilter<"EnabledRepository"> | number
    fullName?: StringFilter<"EnabledRepository"> | string
    name?: StringFilter<"EnabledRepository"> | string
    owner?: StringFilter<"EnabledRepository"> | string
    language?: StringNullableFilter<"EnabledRepository"> | string | null
    description?: StringNullableFilter<"EnabledRepository"> | string | null
    isPrivate?: BoolFilter<"EnabledRepository"> | boolean
    defaultBranch?: StringFilter<"EnabledRepository"> | string
    webhookId?: IntNullableFilter<"EnabledRepository"> | number | null
    createdAt?: DateTimeFilter<"EnabledRepository"> | Date | string
    updatedAt?: DateTimeFilter<"EnabledRepository"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    prReviews?: PrReviewListRelationFilter
  }

  export type EnabledRepositoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    githubRepoId?: SortOrder
    fullName?: SortOrder
    name?: SortOrder
    owner?: SortOrder
    language?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    defaultBranch?: SortOrder
    webhookId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    prReviews?: PrReviewOrderByRelationAggregateInput
  }

  export type EnabledRepositoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_githubRepoId?: EnabledRepositoryUserIdGithubRepoIdCompoundUniqueInput
    AND?: EnabledRepositoryWhereInput | EnabledRepositoryWhereInput[]
    OR?: EnabledRepositoryWhereInput[]
    NOT?: EnabledRepositoryWhereInput | EnabledRepositoryWhereInput[]
    userId?: StringFilter<"EnabledRepository"> | string
    githubRepoId?: IntFilter<"EnabledRepository"> | number
    fullName?: StringFilter<"EnabledRepository"> | string
    name?: StringFilter<"EnabledRepository"> | string
    owner?: StringFilter<"EnabledRepository"> | string
    language?: StringNullableFilter<"EnabledRepository"> | string | null
    description?: StringNullableFilter<"EnabledRepository"> | string | null
    isPrivate?: BoolFilter<"EnabledRepository"> | boolean
    defaultBranch?: StringFilter<"EnabledRepository"> | string
    webhookId?: IntNullableFilter<"EnabledRepository"> | number | null
    createdAt?: DateTimeFilter<"EnabledRepository"> | Date | string
    updatedAt?: DateTimeFilter<"EnabledRepository"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    prReviews?: PrReviewListRelationFilter
  }, "id" | "userId_githubRepoId">

  export type EnabledRepositoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    githubRepoId?: SortOrder
    fullName?: SortOrder
    name?: SortOrder
    owner?: SortOrder
    language?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    defaultBranch?: SortOrder
    webhookId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EnabledRepositoryCountOrderByAggregateInput
    _avg?: EnabledRepositoryAvgOrderByAggregateInput
    _max?: EnabledRepositoryMaxOrderByAggregateInput
    _min?: EnabledRepositoryMinOrderByAggregateInput
    _sum?: EnabledRepositorySumOrderByAggregateInput
  }

  export type EnabledRepositoryScalarWhereWithAggregatesInput = {
    AND?: EnabledRepositoryScalarWhereWithAggregatesInput | EnabledRepositoryScalarWhereWithAggregatesInput[]
    OR?: EnabledRepositoryScalarWhereWithAggregatesInput[]
    NOT?: EnabledRepositoryScalarWhereWithAggregatesInput | EnabledRepositoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EnabledRepository"> | string
    userId?: StringWithAggregatesFilter<"EnabledRepository"> | string
    githubRepoId?: IntWithAggregatesFilter<"EnabledRepository"> | number
    fullName?: StringWithAggregatesFilter<"EnabledRepository"> | string
    name?: StringWithAggregatesFilter<"EnabledRepository"> | string
    owner?: StringWithAggregatesFilter<"EnabledRepository"> | string
    language?: StringNullableWithAggregatesFilter<"EnabledRepository"> | string | null
    description?: StringNullableWithAggregatesFilter<"EnabledRepository"> | string | null
    isPrivate?: BoolWithAggregatesFilter<"EnabledRepository"> | boolean
    defaultBranch?: StringWithAggregatesFilter<"EnabledRepository"> | string
    webhookId?: IntNullableWithAggregatesFilter<"EnabledRepository"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"EnabledRepository"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EnabledRepository"> | Date | string
  }

  export type PrReviewWhereInput = {
    AND?: PrReviewWhereInput | PrReviewWhereInput[]
    OR?: PrReviewWhereInput[]
    NOT?: PrReviewWhereInput | PrReviewWhereInput[]
    id?: StringFilter<"PrReview"> | string
    userId?: StringFilter<"PrReview"> | string
    repoId?: StringFilter<"PrReview"> | string
    prNumber?: IntFilter<"PrReview"> | number
    prTitle?: StringFilter<"PrReview"> | string
    prAuthor?: StringFilter<"PrReview"> | string
    prBranch?: StringFilter<"PrReview"> | string
    additions?: IntFilter<"PrReview"> | number
    deletions?: IntFilter<"PrReview"> | number
    filesChanged?: IntFilter<"PrReview"> | number
    status?: StringFilter<"PrReview"> | string
    score?: IntNullableFilter<"PrReview"> | number | null
    verdict?: StringNullableFilter<"PrReview"> | string | null
    summary?: JsonNullableFilter<"PrReview">
    reviewComments?: JsonNullableFilter<"PrReview">
    githubCommentId?: BigIntNullableFilter<"PrReview"> | bigint | number | null
    reviewedAt?: DateTimeNullableFilter<"PrReview"> | Date | string | null
    createdAt?: DateTimeFilter<"PrReview"> | Date | string
    updatedAt?: DateTimeFilter<"PrReview"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    repo?: XOR<EnabledRepositoryScalarRelationFilter, EnabledRepositoryWhereInput>
  }

  export type PrReviewOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    repoId?: SortOrder
    prNumber?: SortOrder
    prTitle?: SortOrder
    prAuthor?: SortOrder
    prBranch?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    filesChanged?: SortOrder
    status?: SortOrder
    score?: SortOrderInput | SortOrder
    verdict?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    reviewComments?: SortOrderInput | SortOrder
    githubCommentId?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    repo?: EnabledRepositoryOrderByWithRelationInput
  }

  export type PrReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    repoId_prNumber?: PrReviewRepoIdPrNumberCompoundUniqueInput
    AND?: PrReviewWhereInput | PrReviewWhereInput[]
    OR?: PrReviewWhereInput[]
    NOT?: PrReviewWhereInput | PrReviewWhereInput[]
    userId?: StringFilter<"PrReview"> | string
    repoId?: StringFilter<"PrReview"> | string
    prNumber?: IntFilter<"PrReview"> | number
    prTitle?: StringFilter<"PrReview"> | string
    prAuthor?: StringFilter<"PrReview"> | string
    prBranch?: StringFilter<"PrReview"> | string
    additions?: IntFilter<"PrReview"> | number
    deletions?: IntFilter<"PrReview"> | number
    filesChanged?: IntFilter<"PrReview"> | number
    status?: StringFilter<"PrReview"> | string
    score?: IntNullableFilter<"PrReview"> | number | null
    verdict?: StringNullableFilter<"PrReview"> | string | null
    summary?: JsonNullableFilter<"PrReview">
    reviewComments?: JsonNullableFilter<"PrReview">
    githubCommentId?: BigIntNullableFilter<"PrReview"> | bigint | number | null
    reviewedAt?: DateTimeNullableFilter<"PrReview"> | Date | string | null
    createdAt?: DateTimeFilter<"PrReview"> | Date | string
    updatedAt?: DateTimeFilter<"PrReview"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    repo?: XOR<EnabledRepositoryScalarRelationFilter, EnabledRepositoryWhereInput>
  }, "id" | "repoId_prNumber">

  export type PrReviewOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    repoId?: SortOrder
    prNumber?: SortOrder
    prTitle?: SortOrder
    prAuthor?: SortOrder
    prBranch?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    filesChanged?: SortOrder
    status?: SortOrder
    score?: SortOrderInput | SortOrder
    verdict?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    reviewComments?: SortOrderInput | SortOrder
    githubCommentId?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PrReviewCountOrderByAggregateInput
    _avg?: PrReviewAvgOrderByAggregateInput
    _max?: PrReviewMaxOrderByAggregateInput
    _min?: PrReviewMinOrderByAggregateInput
    _sum?: PrReviewSumOrderByAggregateInput
  }

  export type PrReviewScalarWhereWithAggregatesInput = {
    AND?: PrReviewScalarWhereWithAggregatesInput | PrReviewScalarWhereWithAggregatesInput[]
    OR?: PrReviewScalarWhereWithAggregatesInput[]
    NOT?: PrReviewScalarWhereWithAggregatesInput | PrReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PrReview"> | string
    userId?: StringWithAggregatesFilter<"PrReview"> | string
    repoId?: StringWithAggregatesFilter<"PrReview"> | string
    prNumber?: IntWithAggregatesFilter<"PrReview"> | number
    prTitle?: StringWithAggregatesFilter<"PrReview"> | string
    prAuthor?: StringWithAggregatesFilter<"PrReview"> | string
    prBranch?: StringWithAggregatesFilter<"PrReview"> | string
    additions?: IntWithAggregatesFilter<"PrReview"> | number
    deletions?: IntWithAggregatesFilter<"PrReview"> | number
    filesChanged?: IntWithAggregatesFilter<"PrReview"> | number
    status?: StringWithAggregatesFilter<"PrReview"> | string
    score?: IntNullableWithAggregatesFilter<"PrReview"> | number | null
    verdict?: StringNullableWithAggregatesFilter<"PrReview"> | string | null
    summary?: JsonNullableWithAggregatesFilter<"PrReview">
    reviewComments?: JsonNullableWithAggregatesFilter<"PrReview">
    githubCommentId?: BigIntNullableWithAggregatesFilter<"PrReview"> | bigint | number | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"PrReview"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PrReview"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PrReview"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    githubIntegration?: GithubIntegrationCreateNestedOneWithoutUserInput
    enabledRepos?: EnabledRepositoryCreateNestedManyWithoutUserInput
    prReviews?: PrReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    githubIntegration?: GithubIntegrationUncheckedCreateNestedOneWithoutUserInput
    enabledRepos?: EnabledRepositoryUncheckedCreateNestedManyWithoutUserInput
    prReviews?: PrReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    githubIntegration?: GithubIntegrationUpdateOneWithoutUserNestedInput
    enabledRepos?: EnabledRepositoryUpdateManyWithoutUserNestedInput
    prReviews?: PrReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    githubIntegration?: GithubIntegrationUncheckedUpdateOneWithoutUserNestedInput
    enabledRepos?: EnabledRepositoryUncheckedUpdateManyWithoutUserNestedInput
    prReviews?: PrReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationCreateInput = {
    id?: string
    githubId: number
    username: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGithubIntegrationInput
  }

  export type GithubIntegrationUncheckedCreateInput = {
    id?: string
    userId: string
    githubId: number
    username: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGithubIntegrationNestedInput
  }

  export type GithubIntegrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationCreateManyInput = {
    id?: string
    userId: string
    githubId: number
    username: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnabledRepositoryCreateInput = {
    id?: string
    githubRepoId: number
    fullName: string
    name: string
    owner: string
    language?: string | null
    description?: string | null
    isPrivate?: boolean
    defaultBranch?: string
    webhookId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEnabledReposInput
    prReviews?: PrReviewCreateNestedManyWithoutRepoInput
  }

  export type EnabledRepositoryUncheckedCreateInput = {
    id?: string
    userId: string
    githubRepoId: number
    fullName: string
    name: string
    owner: string
    language?: string | null
    description?: string | null
    isPrivate?: boolean
    defaultBranch?: string
    webhookId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prReviews?: PrReviewUncheckedCreateNestedManyWithoutRepoInput
  }

  export type EnabledRepositoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubRepoId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    defaultBranch?: StringFieldUpdateOperationsInput | string
    webhookId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEnabledReposNestedInput
    prReviews?: PrReviewUpdateManyWithoutRepoNestedInput
  }

  export type EnabledRepositoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    githubRepoId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    defaultBranch?: StringFieldUpdateOperationsInput | string
    webhookId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prReviews?: PrReviewUncheckedUpdateManyWithoutRepoNestedInput
  }

  export type EnabledRepositoryCreateManyInput = {
    id?: string
    userId: string
    githubRepoId: number
    fullName: string
    name: string
    owner: string
    language?: string | null
    description?: string | null
    isPrivate?: boolean
    defaultBranch?: string
    webhookId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnabledRepositoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubRepoId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    defaultBranch?: StringFieldUpdateOperationsInput | string
    webhookId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnabledRepositoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    githubRepoId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    defaultBranch?: StringFieldUpdateOperationsInput | string
    webhookId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrReviewCreateInput = {
    id?: string
    prNumber: number
    prTitle: string
    prAuthor: string
    prBranch: string
    additions?: number
    deletions?: number
    filesChanged?: number
    status?: string
    score?: number | null
    verdict?: string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: bigint | number | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPrReviewsInput
    repo: EnabledRepositoryCreateNestedOneWithoutPrReviewsInput
  }

  export type PrReviewUncheckedCreateInput = {
    id?: string
    userId: string
    repoId: string
    prNumber: number
    prTitle: string
    prAuthor: string
    prBranch: string
    additions?: number
    deletions?: number
    filesChanged?: number
    status?: string
    score?: number | null
    verdict?: string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: bigint | number | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    prNumber?: IntFieldUpdateOperationsInput | number
    prTitle?: StringFieldUpdateOperationsInput | string
    prAuthor?: StringFieldUpdateOperationsInput | string
    prBranch?: StringFieldUpdateOperationsInput | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    filesChanged?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    verdict?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPrReviewsNestedInput
    repo?: EnabledRepositoryUpdateOneRequiredWithoutPrReviewsNestedInput
  }

  export type PrReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    repoId?: StringFieldUpdateOperationsInput | string
    prNumber?: IntFieldUpdateOperationsInput | number
    prTitle?: StringFieldUpdateOperationsInput | string
    prAuthor?: StringFieldUpdateOperationsInput | string
    prBranch?: StringFieldUpdateOperationsInput | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    filesChanged?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    verdict?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrReviewCreateManyInput = {
    id?: string
    userId: string
    repoId: string
    prNumber: number
    prTitle: string
    prAuthor: string
    prBranch: string
    additions?: number
    deletions?: number
    filesChanged?: number
    status?: string
    score?: number | null
    verdict?: string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: bigint | number | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    prNumber?: IntFieldUpdateOperationsInput | number
    prTitle?: StringFieldUpdateOperationsInput | string
    prAuthor?: StringFieldUpdateOperationsInput | string
    prBranch?: StringFieldUpdateOperationsInput | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    filesChanged?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    verdict?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    repoId?: StringFieldUpdateOperationsInput | string
    prNumber?: IntFieldUpdateOperationsInput | number
    prTitle?: StringFieldUpdateOperationsInput | string
    prAuthor?: StringFieldUpdateOperationsInput | string
    prBranch?: StringFieldUpdateOperationsInput | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    filesChanged?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    verdict?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GithubIntegrationNullableScalarRelationFilter = {
    is?: GithubIntegrationWhereInput | null
    isNot?: GithubIntegrationWhereInput | null
  }

  export type EnabledRepositoryListRelationFilter = {
    every?: EnabledRepositoryWhereInput
    some?: EnabledRepositoryWhereInput
    none?: EnabledRepositoryWhereInput
  }

  export type PrReviewListRelationFilter = {
    every?: PrReviewWhereInput
    some?: PrReviewWhereInput
    none?: PrReviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EnabledRepositoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PrReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GithubIntegrationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    username?: SortOrder
    accessToken?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GithubIntegrationAvgOrderByAggregateInput = {
    githubId?: SortOrder
  }

  export type GithubIntegrationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    username?: SortOrder
    accessToken?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GithubIntegrationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    username?: SortOrder
    accessToken?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GithubIntegrationSumOrderByAggregateInput = {
    githubId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnabledRepositoryUserIdGithubRepoIdCompoundUniqueInput = {
    userId: string
    githubRepoId: number
  }

  export type EnabledRepositoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubRepoId?: SortOrder
    fullName?: SortOrder
    name?: SortOrder
    owner?: SortOrder
    language?: SortOrder
    description?: SortOrder
    isPrivate?: SortOrder
    defaultBranch?: SortOrder
    webhookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnabledRepositoryAvgOrderByAggregateInput = {
    githubRepoId?: SortOrder
    webhookId?: SortOrder
  }

  export type EnabledRepositoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubRepoId?: SortOrder
    fullName?: SortOrder
    name?: SortOrder
    owner?: SortOrder
    language?: SortOrder
    description?: SortOrder
    isPrivate?: SortOrder
    defaultBranch?: SortOrder
    webhookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnabledRepositoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubRepoId?: SortOrder
    fullName?: SortOrder
    name?: SortOrder
    owner?: SortOrder
    language?: SortOrder
    description?: SortOrder
    isPrivate?: SortOrder
    defaultBranch?: SortOrder
    webhookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnabledRepositorySumOrderByAggregateInput = {
    githubRepoId?: SortOrder
    webhookId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnabledRepositoryScalarRelationFilter = {
    is?: EnabledRepositoryWhereInput
    isNot?: EnabledRepositoryWhereInput
  }

  export type PrReviewRepoIdPrNumberCompoundUniqueInput = {
    repoId: string
    prNumber: number
  }

  export type PrReviewCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    repoId?: SortOrder
    prNumber?: SortOrder
    prTitle?: SortOrder
    prAuthor?: SortOrder
    prBranch?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    filesChanged?: SortOrder
    status?: SortOrder
    score?: SortOrder
    verdict?: SortOrder
    summary?: SortOrder
    reviewComments?: SortOrder
    githubCommentId?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrReviewAvgOrderByAggregateInput = {
    prNumber?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    filesChanged?: SortOrder
    score?: SortOrder
    githubCommentId?: SortOrder
  }

  export type PrReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    repoId?: SortOrder
    prNumber?: SortOrder
    prTitle?: SortOrder
    prAuthor?: SortOrder
    prBranch?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    filesChanged?: SortOrder
    status?: SortOrder
    score?: SortOrder
    verdict?: SortOrder
    githubCommentId?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrReviewMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    repoId?: SortOrder
    prNumber?: SortOrder
    prTitle?: SortOrder
    prAuthor?: SortOrder
    prBranch?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    filesChanged?: SortOrder
    status?: SortOrder
    score?: SortOrder
    verdict?: SortOrder
    githubCommentId?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrReviewSumOrderByAggregateInput = {
    prNumber?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    filesChanged?: SortOrder
    score?: SortOrder
    githubCommentId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type GithubIntegrationCreateNestedOneWithoutUserInput = {
    create?: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutUserInput
    connect?: GithubIntegrationWhereUniqueInput
  }

  export type EnabledRepositoryCreateNestedManyWithoutUserInput = {
    create?: XOR<EnabledRepositoryCreateWithoutUserInput, EnabledRepositoryUncheckedCreateWithoutUserInput> | EnabledRepositoryCreateWithoutUserInput[] | EnabledRepositoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EnabledRepositoryCreateOrConnectWithoutUserInput | EnabledRepositoryCreateOrConnectWithoutUserInput[]
    createMany?: EnabledRepositoryCreateManyUserInputEnvelope
    connect?: EnabledRepositoryWhereUniqueInput | EnabledRepositoryWhereUniqueInput[]
  }

  export type PrReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<PrReviewCreateWithoutUserInput, PrReviewUncheckedCreateWithoutUserInput> | PrReviewCreateWithoutUserInput[] | PrReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrReviewCreateOrConnectWithoutUserInput | PrReviewCreateOrConnectWithoutUserInput[]
    createMany?: PrReviewCreateManyUserInputEnvelope
    connect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
  }

  export type GithubIntegrationUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutUserInput
    connect?: GithubIntegrationWhereUniqueInput
  }

  export type EnabledRepositoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EnabledRepositoryCreateWithoutUserInput, EnabledRepositoryUncheckedCreateWithoutUserInput> | EnabledRepositoryCreateWithoutUserInput[] | EnabledRepositoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EnabledRepositoryCreateOrConnectWithoutUserInput | EnabledRepositoryCreateOrConnectWithoutUserInput[]
    createMany?: EnabledRepositoryCreateManyUserInputEnvelope
    connect?: EnabledRepositoryWhereUniqueInput | EnabledRepositoryWhereUniqueInput[]
  }

  export type PrReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PrReviewCreateWithoutUserInput, PrReviewUncheckedCreateWithoutUserInput> | PrReviewCreateWithoutUserInput[] | PrReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrReviewCreateOrConnectWithoutUserInput | PrReviewCreateOrConnectWithoutUserInput[]
    createMany?: PrReviewCreateManyUserInputEnvelope
    connect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GithubIntegrationUpdateOneWithoutUserNestedInput = {
    create?: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutUserInput
    upsert?: GithubIntegrationUpsertWithoutUserInput
    disconnect?: GithubIntegrationWhereInput | boolean
    delete?: GithubIntegrationWhereInput | boolean
    connect?: GithubIntegrationWhereUniqueInput
    update?: XOR<XOR<GithubIntegrationUpdateToOneWithWhereWithoutUserInput, GithubIntegrationUpdateWithoutUserInput>, GithubIntegrationUncheckedUpdateWithoutUserInput>
  }

  export type EnabledRepositoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<EnabledRepositoryCreateWithoutUserInput, EnabledRepositoryUncheckedCreateWithoutUserInput> | EnabledRepositoryCreateWithoutUserInput[] | EnabledRepositoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EnabledRepositoryCreateOrConnectWithoutUserInput | EnabledRepositoryCreateOrConnectWithoutUserInput[]
    upsert?: EnabledRepositoryUpsertWithWhereUniqueWithoutUserInput | EnabledRepositoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EnabledRepositoryCreateManyUserInputEnvelope
    set?: EnabledRepositoryWhereUniqueInput | EnabledRepositoryWhereUniqueInput[]
    disconnect?: EnabledRepositoryWhereUniqueInput | EnabledRepositoryWhereUniqueInput[]
    delete?: EnabledRepositoryWhereUniqueInput | EnabledRepositoryWhereUniqueInput[]
    connect?: EnabledRepositoryWhereUniqueInput | EnabledRepositoryWhereUniqueInput[]
    update?: EnabledRepositoryUpdateWithWhereUniqueWithoutUserInput | EnabledRepositoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EnabledRepositoryUpdateManyWithWhereWithoutUserInput | EnabledRepositoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EnabledRepositoryScalarWhereInput | EnabledRepositoryScalarWhereInput[]
  }

  export type PrReviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<PrReviewCreateWithoutUserInput, PrReviewUncheckedCreateWithoutUserInput> | PrReviewCreateWithoutUserInput[] | PrReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrReviewCreateOrConnectWithoutUserInput | PrReviewCreateOrConnectWithoutUserInput[]
    upsert?: PrReviewUpsertWithWhereUniqueWithoutUserInput | PrReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PrReviewCreateManyUserInputEnvelope
    set?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    disconnect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    delete?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    connect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    update?: PrReviewUpdateWithWhereUniqueWithoutUserInput | PrReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PrReviewUpdateManyWithWhereWithoutUserInput | PrReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PrReviewScalarWhereInput | PrReviewScalarWhereInput[]
  }

  export type GithubIntegrationUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutUserInput
    upsert?: GithubIntegrationUpsertWithoutUserInput
    disconnect?: GithubIntegrationWhereInput | boolean
    delete?: GithubIntegrationWhereInput | boolean
    connect?: GithubIntegrationWhereUniqueInput
    update?: XOR<XOR<GithubIntegrationUpdateToOneWithWhereWithoutUserInput, GithubIntegrationUpdateWithoutUserInput>, GithubIntegrationUncheckedUpdateWithoutUserInput>
  }

  export type EnabledRepositoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EnabledRepositoryCreateWithoutUserInput, EnabledRepositoryUncheckedCreateWithoutUserInput> | EnabledRepositoryCreateWithoutUserInput[] | EnabledRepositoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EnabledRepositoryCreateOrConnectWithoutUserInput | EnabledRepositoryCreateOrConnectWithoutUserInput[]
    upsert?: EnabledRepositoryUpsertWithWhereUniqueWithoutUserInput | EnabledRepositoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EnabledRepositoryCreateManyUserInputEnvelope
    set?: EnabledRepositoryWhereUniqueInput | EnabledRepositoryWhereUniqueInput[]
    disconnect?: EnabledRepositoryWhereUniqueInput | EnabledRepositoryWhereUniqueInput[]
    delete?: EnabledRepositoryWhereUniqueInput | EnabledRepositoryWhereUniqueInput[]
    connect?: EnabledRepositoryWhereUniqueInput | EnabledRepositoryWhereUniqueInput[]
    update?: EnabledRepositoryUpdateWithWhereUniqueWithoutUserInput | EnabledRepositoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EnabledRepositoryUpdateManyWithWhereWithoutUserInput | EnabledRepositoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EnabledRepositoryScalarWhereInput | EnabledRepositoryScalarWhereInput[]
  }

  export type PrReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PrReviewCreateWithoutUserInput, PrReviewUncheckedCreateWithoutUserInput> | PrReviewCreateWithoutUserInput[] | PrReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrReviewCreateOrConnectWithoutUserInput | PrReviewCreateOrConnectWithoutUserInput[]
    upsert?: PrReviewUpsertWithWhereUniqueWithoutUserInput | PrReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PrReviewCreateManyUserInputEnvelope
    set?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    disconnect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    delete?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    connect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    update?: PrReviewUpdateWithWhereUniqueWithoutUserInput | PrReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PrReviewUpdateManyWithWhereWithoutUserInput | PrReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PrReviewScalarWhereInput | PrReviewScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGithubIntegrationInput = {
    create?: XOR<UserCreateWithoutGithubIntegrationInput, UserUncheckedCreateWithoutGithubIntegrationInput>
    connectOrCreate?: UserCreateOrConnectWithoutGithubIntegrationInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutGithubIntegrationNestedInput = {
    create?: XOR<UserCreateWithoutGithubIntegrationInput, UserUncheckedCreateWithoutGithubIntegrationInput>
    connectOrCreate?: UserCreateOrConnectWithoutGithubIntegrationInput
    upsert?: UserUpsertWithoutGithubIntegrationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGithubIntegrationInput, UserUpdateWithoutGithubIntegrationInput>, UserUncheckedUpdateWithoutGithubIntegrationInput>
  }

  export type UserCreateNestedOneWithoutEnabledReposInput = {
    create?: XOR<UserCreateWithoutEnabledReposInput, UserUncheckedCreateWithoutEnabledReposInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnabledReposInput
    connect?: UserWhereUniqueInput
  }

  export type PrReviewCreateNestedManyWithoutRepoInput = {
    create?: XOR<PrReviewCreateWithoutRepoInput, PrReviewUncheckedCreateWithoutRepoInput> | PrReviewCreateWithoutRepoInput[] | PrReviewUncheckedCreateWithoutRepoInput[]
    connectOrCreate?: PrReviewCreateOrConnectWithoutRepoInput | PrReviewCreateOrConnectWithoutRepoInput[]
    createMany?: PrReviewCreateManyRepoInputEnvelope
    connect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
  }

  export type PrReviewUncheckedCreateNestedManyWithoutRepoInput = {
    create?: XOR<PrReviewCreateWithoutRepoInput, PrReviewUncheckedCreateWithoutRepoInput> | PrReviewCreateWithoutRepoInput[] | PrReviewUncheckedCreateWithoutRepoInput[]
    connectOrCreate?: PrReviewCreateOrConnectWithoutRepoInput | PrReviewCreateOrConnectWithoutRepoInput[]
    createMany?: PrReviewCreateManyRepoInputEnvelope
    connect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutEnabledReposNestedInput = {
    create?: XOR<UserCreateWithoutEnabledReposInput, UserUncheckedCreateWithoutEnabledReposInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnabledReposInput
    upsert?: UserUpsertWithoutEnabledReposInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEnabledReposInput, UserUpdateWithoutEnabledReposInput>, UserUncheckedUpdateWithoutEnabledReposInput>
  }

  export type PrReviewUpdateManyWithoutRepoNestedInput = {
    create?: XOR<PrReviewCreateWithoutRepoInput, PrReviewUncheckedCreateWithoutRepoInput> | PrReviewCreateWithoutRepoInput[] | PrReviewUncheckedCreateWithoutRepoInput[]
    connectOrCreate?: PrReviewCreateOrConnectWithoutRepoInput | PrReviewCreateOrConnectWithoutRepoInput[]
    upsert?: PrReviewUpsertWithWhereUniqueWithoutRepoInput | PrReviewUpsertWithWhereUniqueWithoutRepoInput[]
    createMany?: PrReviewCreateManyRepoInputEnvelope
    set?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    disconnect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    delete?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    connect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    update?: PrReviewUpdateWithWhereUniqueWithoutRepoInput | PrReviewUpdateWithWhereUniqueWithoutRepoInput[]
    updateMany?: PrReviewUpdateManyWithWhereWithoutRepoInput | PrReviewUpdateManyWithWhereWithoutRepoInput[]
    deleteMany?: PrReviewScalarWhereInput | PrReviewScalarWhereInput[]
  }

  export type PrReviewUncheckedUpdateManyWithoutRepoNestedInput = {
    create?: XOR<PrReviewCreateWithoutRepoInput, PrReviewUncheckedCreateWithoutRepoInput> | PrReviewCreateWithoutRepoInput[] | PrReviewUncheckedCreateWithoutRepoInput[]
    connectOrCreate?: PrReviewCreateOrConnectWithoutRepoInput | PrReviewCreateOrConnectWithoutRepoInput[]
    upsert?: PrReviewUpsertWithWhereUniqueWithoutRepoInput | PrReviewUpsertWithWhereUniqueWithoutRepoInput[]
    createMany?: PrReviewCreateManyRepoInputEnvelope
    set?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    disconnect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    delete?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    connect?: PrReviewWhereUniqueInput | PrReviewWhereUniqueInput[]
    update?: PrReviewUpdateWithWhereUniqueWithoutRepoInput | PrReviewUpdateWithWhereUniqueWithoutRepoInput[]
    updateMany?: PrReviewUpdateManyWithWhereWithoutRepoInput | PrReviewUpdateManyWithWhereWithoutRepoInput[]
    deleteMany?: PrReviewScalarWhereInput | PrReviewScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPrReviewsInput = {
    create?: XOR<UserCreateWithoutPrReviewsInput, UserUncheckedCreateWithoutPrReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type EnabledRepositoryCreateNestedOneWithoutPrReviewsInput = {
    create?: XOR<EnabledRepositoryCreateWithoutPrReviewsInput, EnabledRepositoryUncheckedCreateWithoutPrReviewsInput>
    connectOrCreate?: EnabledRepositoryCreateOrConnectWithoutPrReviewsInput
    connect?: EnabledRepositoryWhereUniqueInput
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutPrReviewsNestedInput = {
    create?: XOR<UserCreateWithoutPrReviewsInput, UserUncheckedCreateWithoutPrReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrReviewsInput
    upsert?: UserUpsertWithoutPrReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPrReviewsInput, UserUpdateWithoutPrReviewsInput>, UserUncheckedUpdateWithoutPrReviewsInput>
  }

  export type EnabledRepositoryUpdateOneRequiredWithoutPrReviewsNestedInput = {
    create?: XOR<EnabledRepositoryCreateWithoutPrReviewsInput, EnabledRepositoryUncheckedCreateWithoutPrReviewsInput>
    connectOrCreate?: EnabledRepositoryCreateOrConnectWithoutPrReviewsInput
    upsert?: EnabledRepositoryUpsertWithoutPrReviewsInput
    connect?: EnabledRepositoryWhereUniqueInput
    update?: XOR<XOR<EnabledRepositoryUpdateToOneWithWhereWithoutPrReviewsInput, EnabledRepositoryUpdateWithoutPrReviewsInput>, EnabledRepositoryUncheckedUpdateWithoutPrReviewsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type GithubIntegrationCreateWithoutUserInput = {
    id?: string
    githubId: number
    username: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationUncheckedCreateWithoutUserInput = {
    id?: string
    githubId: number
    username: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationCreateOrConnectWithoutUserInput = {
    where: GithubIntegrationWhereUniqueInput
    create: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput>
  }

  export type EnabledRepositoryCreateWithoutUserInput = {
    id?: string
    githubRepoId: number
    fullName: string
    name: string
    owner: string
    language?: string | null
    description?: string | null
    isPrivate?: boolean
    defaultBranch?: string
    webhookId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prReviews?: PrReviewCreateNestedManyWithoutRepoInput
  }

  export type EnabledRepositoryUncheckedCreateWithoutUserInput = {
    id?: string
    githubRepoId: number
    fullName: string
    name: string
    owner: string
    language?: string | null
    description?: string | null
    isPrivate?: boolean
    defaultBranch?: string
    webhookId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prReviews?: PrReviewUncheckedCreateNestedManyWithoutRepoInput
  }

  export type EnabledRepositoryCreateOrConnectWithoutUserInput = {
    where: EnabledRepositoryWhereUniqueInput
    create: XOR<EnabledRepositoryCreateWithoutUserInput, EnabledRepositoryUncheckedCreateWithoutUserInput>
  }

  export type EnabledRepositoryCreateManyUserInputEnvelope = {
    data: EnabledRepositoryCreateManyUserInput | EnabledRepositoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PrReviewCreateWithoutUserInput = {
    id?: string
    prNumber: number
    prTitle: string
    prAuthor: string
    prBranch: string
    additions?: number
    deletions?: number
    filesChanged?: number
    status?: string
    score?: number | null
    verdict?: string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: bigint | number | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    repo: EnabledRepositoryCreateNestedOneWithoutPrReviewsInput
  }

  export type PrReviewUncheckedCreateWithoutUserInput = {
    id?: string
    repoId: string
    prNumber: number
    prTitle: string
    prAuthor: string
    prBranch: string
    additions?: number
    deletions?: number
    filesChanged?: number
    status?: string
    score?: number | null
    verdict?: string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: bigint | number | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrReviewCreateOrConnectWithoutUserInput = {
    where: PrReviewWhereUniqueInput
    create: XOR<PrReviewCreateWithoutUserInput, PrReviewUncheckedCreateWithoutUserInput>
  }

  export type PrReviewCreateManyUserInputEnvelope = {
    data: PrReviewCreateManyUserInput | PrReviewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GithubIntegrationUpsertWithoutUserInput = {
    update: XOR<GithubIntegrationUpdateWithoutUserInput, GithubIntegrationUncheckedUpdateWithoutUserInput>
    create: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput>
    where?: GithubIntegrationWhereInput
  }

  export type GithubIntegrationUpdateToOneWithWhereWithoutUserInput = {
    where?: GithubIntegrationWhereInput
    data: XOR<GithubIntegrationUpdateWithoutUserInput, GithubIntegrationUncheckedUpdateWithoutUserInput>
  }

  export type GithubIntegrationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnabledRepositoryUpsertWithWhereUniqueWithoutUserInput = {
    where: EnabledRepositoryWhereUniqueInput
    update: XOR<EnabledRepositoryUpdateWithoutUserInput, EnabledRepositoryUncheckedUpdateWithoutUserInput>
    create: XOR<EnabledRepositoryCreateWithoutUserInput, EnabledRepositoryUncheckedCreateWithoutUserInput>
  }

  export type EnabledRepositoryUpdateWithWhereUniqueWithoutUserInput = {
    where: EnabledRepositoryWhereUniqueInput
    data: XOR<EnabledRepositoryUpdateWithoutUserInput, EnabledRepositoryUncheckedUpdateWithoutUserInput>
  }

  export type EnabledRepositoryUpdateManyWithWhereWithoutUserInput = {
    where: EnabledRepositoryScalarWhereInput
    data: XOR<EnabledRepositoryUpdateManyMutationInput, EnabledRepositoryUncheckedUpdateManyWithoutUserInput>
  }

  export type EnabledRepositoryScalarWhereInput = {
    AND?: EnabledRepositoryScalarWhereInput | EnabledRepositoryScalarWhereInput[]
    OR?: EnabledRepositoryScalarWhereInput[]
    NOT?: EnabledRepositoryScalarWhereInput | EnabledRepositoryScalarWhereInput[]
    id?: StringFilter<"EnabledRepository"> | string
    userId?: StringFilter<"EnabledRepository"> | string
    githubRepoId?: IntFilter<"EnabledRepository"> | number
    fullName?: StringFilter<"EnabledRepository"> | string
    name?: StringFilter<"EnabledRepository"> | string
    owner?: StringFilter<"EnabledRepository"> | string
    language?: StringNullableFilter<"EnabledRepository"> | string | null
    description?: StringNullableFilter<"EnabledRepository"> | string | null
    isPrivate?: BoolFilter<"EnabledRepository"> | boolean
    defaultBranch?: StringFilter<"EnabledRepository"> | string
    webhookId?: IntNullableFilter<"EnabledRepository"> | number | null
    createdAt?: DateTimeFilter<"EnabledRepository"> | Date | string
    updatedAt?: DateTimeFilter<"EnabledRepository"> | Date | string
  }

  export type PrReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: PrReviewWhereUniqueInput
    update: XOR<PrReviewUpdateWithoutUserInput, PrReviewUncheckedUpdateWithoutUserInput>
    create: XOR<PrReviewCreateWithoutUserInput, PrReviewUncheckedCreateWithoutUserInput>
  }

  export type PrReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: PrReviewWhereUniqueInput
    data: XOR<PrReviewUpdateWithoutUserInput, PrReviewUncheckedUpdateWithoutUserInput>
  }

  export type PrReviewUpdateManyWithWhereWithoutUserInput = {
    where: PrReviewScalarWhereInput
    data: XOR<PrReviewUpdateManyMutationInput, PrReviewUncheckedUpdateManyWithoutUserInput>
  }

  export type PrReviewScalarWhereInput = {
    AND?: PrReviewScalarWhereInput | PrReviewScalarWhereInput[]
    OR?: PrReviewScalarWhereInput[]
    NOT?: PrReviewScalarWhereInput | PrReviewScalarWhereInput[]
    id?: StringFilter<"PrReview"> | string
    userId?: StringFilter<"PrReview"> | string
    repoId?: StringFilter<"PrReview"> | string
    prNumber?: IntFilter<"PrReview"> | number
    prTitle?: StringFilter<"PrReview"> | string
    prAuthor?: StringFilter<"PrReview"> | string
    prBranch?: StringFilter<"PrReview"> | string
    additions?: IntFilter<"PrReview"> | number
    deletions?: IntFilter<"PrReview"> | number
    filesChanged?: IntFilter<"PrReview"> | number
    status?: StringFilter<"PrReview"> | string
    score?: IntNullableFilter<"PrReview"> | number | null
    verdict?: StringNullableFilter<"PrReview"> | string | null
    summary?: JsonNullableFilter<"PrReview">
    reviewComments?: JsonNullableFilter<"PrReview">
    githubCommentId?: BigIntNullableFilter<"PrReview"> | bigint | number | null
    reviewedAt?: DateTimeNullableFilter<"PrReview"> | Date | string | null
    createdAt?: DateTimeFilter<"PrReview"> | Date | string
    updatedAt?: DateTimeFilter<"PrReview"> | Date | string
  }

  export type UserCreateWithoutGithubIntegrationInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enabledRepos?: EnabledRepositoryCreateNestedManyWithoutUserInput
    prReviews?: PrReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGithubIntegrationInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enabledRepos?: EnabledRepositoryUncheckedCreateNestedManyWithoutUserInput
    prReviews?: PrReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGithubIntegrationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGithubIntegrationInput, UserUncheckedCreateWithoutGithubIntegrationInput>
  }

  export type UserUpsertWithoutGithubIntegrationInput = {
    update: XOR<UserUpdateWithoutGithubIntegrationInput, UserUncheckedUpdateWithoutGithubIntegrationInput>
    create: XOR<UserCreateWithoutGithubIntegrationInput, UserUncheckedCreateWithoutGithubIntegrationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGithubIntegrationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGithubIntegrationInput, UserUncheckedUpdateWithoutGithubIntegrationInput>
  }

  export type UserUpdateWithoutGithubIntegrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enabledRepos?: EnabledRepositoryUpdateManyWithoutUserNestedInput
    prReviews?: PrReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGithubIntegrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enabledRepos?: EnabledRepositoryUncheckedUpdateManyWithoutUserNestedInput
    prReviews?: PrReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEnabledReposInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    githubIntegration?: GithubIntegrationCreateNestedOneWithoutUserInput
    prReviews?: PrReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEnabledReposInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    githubIntegration?: GithubIntegrationUncheckedCreateNestedOneWithoutUserInput
    prReviews?: PrReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEnabledReposInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEnabledReposInput, UserUncheckedCreateWithoutEnabledReposInput>
  }

  export type PrReviewCreateWithoutRepoInput = {
    id?: string
    prNumber: number
    prTitle: string
    prAuthor: string
    prBranch: string
    additions?: number
    deletions?: number
    filesChanged?: number
    status?: string
    score?: number | null
    verdict?: string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: bigint | number | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPrReviewsInput
  }

  export type PrReviewUncheckedCreateWithoutRepoInput = {
    id?: string
    userId: string
    prNumber: number
    prTitle: string
    prAuthor: string
    prBranch: string
    additions?: number
    deletions?: number
    filesChanged?: number
    status?: string
    score?: number | null
    verdict?: string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: bigint | number | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrReviewCreateOrConnectWithoutRepoInput = {
    where: PrReviewWhereUniqueInput
    create: XOR<PrReviewCreateWithoutRepoInput, PrReviewUncheckedCreateWithoutRepoInput>
  }

  export type PrReviewCreateManyRepoInputEnvelope = {
    data: PrReviewCreateManyRepoInput | PrReviewCreateManyRepoInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEnabledReposInput = {
    update: XOR<UserUpdateWithoutEnabledReposInput, UserUncheckedUpdateWithoutEnabledReposInput>
    create: XOR<UserCreateWithoutEnabledReposInput, UserUncheckedCreateWithoutEnabledReposInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEnabledReposInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEnabledReposInput, UserUncheckedUpdateWithoutEnabledReposInput>
  }

  export type UserUpdateWithoutEnabledReposInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    githubIntegration?: GithubIntegrationUpdateOneWithoutUserNestedInput
    prReviews?: PrReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEnabledReposInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    githubIntegration?: GithubIntegrationUncheckedUpdateOneWithoutUserNestedInput
    prReviews?: PrReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PrReviewUpsertWithWhereUniqueWithoutRepoInput = {
    where: PrReviewWhereUniqueInput
    update: XOR<PrReviewUpdateWithoutRepoInput, PrReviewUncheckedUpdateWithoutRepoInput>
    create: XOR<PrReviewCreateWithoutRepoInput, PrReviewUncheckedCreateWithoutRepoInput>
  }

  export type PrReviewUpdateWithWhereUniqueWithoutRepoInput = {
    where: PrReviewWhereUniqueInput
    data: XOR<PrReviewUpdateWithoutRepoInput, PrReviewUncheckedUpdateWithoutRepoInput>
  }

  export type PrReviewUpdateManyWithWhereWithoutRepoInput = {
    where: PrReviewScalarWhereInput
    data: XOR<PrReviewUpdateManyMutationInput, PrReviewUncheckedUpdateManyWithoutRepoInput>
  }

  export type UserCreateWithoutPrReviewsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    githubIntegration?: GithubIntegrationCreateNestedOneWithoutUserInput
    enabledRepos?: EnabledRepositoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPrReviewsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    githubIntegration?: GithubIntegrationUncheckedCreateNestedOneWithoutUserInput
    enabledRepos?: EnabledRepositoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPrReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPrReviewsInput, UserUncheckedCreateWithoutPrReviewsInput>
  }

  export type EnabledRepositoryCreateWithoutPrReviewsInput = {
    id?: string
    githubRepoId: number
    fullName: string
    name: string
    owner: string
    language?: string | null
    description?: string | null
    isPrivate?: boolean
    defaultBranch?: string
    webhookId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEnabledReposInput
  }

  export type EnabledRepositoryUncheckedCreateWithoutPrReviewsInput = {
    id?: string
    userId: string
    githubRepoId: number
    fullName: string
    name: string
    owner: string
    language?: string | null
    description?: string | null
    isPrivate?: boolean
    defaultBranch?: string
    webhookId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnabledRepositoryCreateOrConnectWithoutPrReviewsInput = {
    where: EnabledRepositoryWhereUniqueInput
    create: XOR<EnabledRepositoryCreateWithoutPrReviewsInput, EnabledRepositoryUncheckedCreateWithoutPrReviewsInput>
  }

  export type UserUpsertWithoutPrReviewsInput = {
    update: XOR<UserUpdateWithoutPrReviewsInput, UserUncheckedUpdateWithoutPrReviewsInput>
    create: XOR<UserCreateWithoutPrReviewsInput, UserUncheckedCreateWithoutPrReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPrReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPrReviewsInput, UserUncheckedUpdateWithoutPrReviewsInput>
  }

  export type UserUpdateWithoutPrReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    githubIntegration?: GithubIntegrationUpdateOneWithoutUserNestedInput
    enabledRepos?: EnabledRepositoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPrReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    githubIntegration?: GithubIntegrationUncheckedUpdateOneWithoutUserNestedInput
    enabledRepos?: EnabledRepositoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EnabledRepositoryUpsertWithoutPrReviewsInput = {
    update: XOR<EnabledRepositoryUpdateWithoutPrReviewsInput, EnabledRepositoryUncheckedUpdateWithoutPrReviewsInput>
    create: XOR<EnabledRepositoryCreateWithoutPrReviewsInput, EnabledRepositoryUncheckedCreateWithoutPrReviewsInput>
    where?: EnabledRepositoryWhereInput
  }

  export type EnabledRepositoryUpdateToOneWithWhereWithoutPrReviewsInput = {
    where?: EnabledRepositoryWhereInput
    data: XOR<EnabledRepositoryUpdateWithoutPrReviewsInput, EnabledRepositoryUncheckedUpdateWithoutPrReviewsInput>
  }

  export type EnabledRepositoryUpdateWithoutPrReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubRepoId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    defaultBranch?: StringFieldUpdateOperationsInput | string
    webhookId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEnabledReposNestedInput
  }

  export type EnabledRepositoryUncheckedUpdateWithoutPrReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    githubRepoId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    defaultBranch?: StringFieldUpdateOperationsInput | string
    webhookId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnabledRepositoryCreateManyUserInput = {
    id?: string
    githubRepoId: number
    fullName: string
    name: string
    owner: string
    language?: string | null
    description?: string | null
    isPrivate?: boolean
    defaultBranch?: string
    webhookId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrReviewCreateManyUserInput = {
    id?: string
    repoId: string
    prNumber: number
    prTitle: string
    prAuthor: string
    prBranch: string
    additions?: number
    deletions?: number
    filesChanged?: number
    status?: string
    score?: number | null
    verdict?: string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: bigint | number | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnabledRepositoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubRepoId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    defaultBranch?: StringFieldUpdateOperationsInput | string
    webhookId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prReviews?: PrReviewUpdateManyWithoutRepoNestedInput
  }

  export type EnabledRepositoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubRepoId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    defaultBranch?: StringFieldUpdateOperationsInput | string
    webhookId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prReviews?: PrReviewUncheckedUpdateManyWithoutRepoNestedInput
  }

  export type EnabledRepositoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubRepoId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    defaultBranch?: StringFieldUpdateOperationsInput | string
    webhookId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrReviewUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    prNumber?: IntFieldUpdateOperationsInput | number
    prTitle?: StringFieldUpdateOperationsInput | string
    prAuthor?: StringFieldUpdateOperationsInput | string
    prBranch?: StringFieldUpdateOperationsInput | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    filesChanged?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    verdict?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repo?: EnabledRepositoryUpdateOneRequiredWithoutPrReviewsNestedInput
  }

  export type PrReviewUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoId?: StringFieldUpdateOperationsInput | string
    prNumber?: IntFieldUpdateOperationsInput | number
    prTitle?: StringFieldUpdateOperationsInput | string
    prAuthor?: StringFieldUpdateOperationsInput | string
    prBranch?: StringFieldUpdateOperationsInput | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    filesChanged?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    verdict?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrReviewUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoId?: StringFieldUpdateOperationsInput | string
    prNumber?: IntFieldUpdateOperationsInput | number
    prTitle?: StringFieldUpdateOperationsInput | string
    prAuthor?: StringFieldUpdateOperationsInput | string
    prBranch?: StringFieldUpdateOperationsInput | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    filesChanged?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    verdict?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrReviewCreateManyRepoInput = {
    id?: string
    userId: string
    prNumber: number
    prTitle: string
    prAuthor: string
    prBranch: string
    additions?: number
    deletions?: number
    filesChanged?: number
    status?: string
    score?: number | null
    verdict?: string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: bigint | number | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrReviewUpdateWithoutRepoInput = {
    id?: StringFieldUpdateOperationsInput | string
    prNumber?: IntFieldUpdateOperationsInput | number
    prTitle?: StringFieldUpdateOperationsInput | string
    prAuthor?: StringFieldUpdateOperationsInput | string
    prBranch?: StringFieldUpdateOperationsInput | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    filesChanged?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    verdict?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPrReviewsNestedInput
  }

  export type PrReviewUncheckedUpdateWithoutRepoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    prNumber?: IntFieldUpdateOperationsInput | number
    prTitle?: StringFieldUpdateOperationsInput | string
    prAuthor?: StringFieldUpdateOperationsInput | string
    prBranch?: StringFieldUpdateOperationsInput | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    filesChanged?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    verdict?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrReviewUncheckedUpdateManyWithoutRepoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    prNumber?: IntFieldUpdateOperationsInput | number
    prTitle?: StringFieldUpdateOperationsInput | string
    prAuthor?: StringFieldUpdateOperationsInput | string
    prBranch?: StringFieldUpdateOperationsInput | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    filesChanged?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    verdict?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableJsonNullValueInput | InputJsonValue
    reviewComments?: NullableJsonNullValueInput | InputJsonValue
    githubCommentId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}