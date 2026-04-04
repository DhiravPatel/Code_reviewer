
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
 * Model sample_testing
 * 
 */
export type sample_testing = $Result.DefaultSelection<Prisma.$sample_testingPayload>
/**
 * Model GithubIntegration
 * 
 */
export type GithubIntegration = $Result.DefaultSelection<Prisma.$GithubIntegrationPayload>

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
   * `prisma.sample_testing`: Exposes CRUD operations for the **sample_testing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sample_testings
    * const sample_testings = await prisma.sample_testing.findMany()
    * ```
    */
  get sample_testing(): Prisma.sample_testingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.githubIntegration`: Exposes CRUD operations for the **GithubIntegration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GithubIntegrations
    * const githubIntegrations = await prisma.githubIntegration.findMany()
    * ```
    */
  get githubIntegration(): Prisma.GithubIntegrationDelegate<ExtArgs, ClientOptions>;
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
    sample_testing: 'sample_testing',
    GithubIntegration: 'GithubIntegration'
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
      modelProps: "user" | "sample_testing" | "githubIntegration"
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
      sample_testing: {
        payload: Prisma.$sample_testingPayload<ExtArgs>
        fields: Prisma.sample_testingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sample_testingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sample_testingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sample_testingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sample_testingPayload>
          }
          findFirst: {
            args: Prisma.sample_testingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sample_testingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sample_testingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sample_testingPayload>
          }
          findMany: {
            args: Prisma.sample_testingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sample_testingPayload>[]
          }
          create: {
            args: Prisma.sample_testingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sample_testingPayload>
          }
          createMany: {
            args: Prisma.sample_testingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sample_testingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sample_testingPayload>[]
          }
          delete: {
            args: Prisma.sample_testingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sample_testingPayload>
          }
          update: {
            args: Prisma.sample_testingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sample_testingPayload>
          }
          deleteMany: {
            args: Prisma.sample_testingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sample_testingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sample_testingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sample_testingPayload>[]
          }
          upsert: {
            args: Prisma.sample_testingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sample_testingPayload>
          }
          aggregate: {
            args: Prisma.Sample_testingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSample_testing>
          }
          groupBy: {
            args: Prisma.sample_testingGroupByArgs<ExtArgs>
            result: $Utils.Optional<Sample_testingGroupByOutputType>[]
          }
          count: {
            args: Prisma.sample_testingCountArgs<ExtArgs>
            result: $Utils.Optional<Sample_testingCountAggregateOutputType> | number
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
    sample_testing?: sample_testingOmit
    githubIntegration?: GithubIntegrationOmit
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
    githubIntegrations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    githubIntegrations?: boolean | UserCountOutputTypeCountGithubIntegrationsArgs
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
  export type UserCountOutputTypeCountGithubIntegrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GithubIntegrationWhereInput
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
    githubIntegrations?: boolean | User$githubIntegrationsArgs<ExtArgs>
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
    githubIntegrations?: boolean | User$githubIntegrationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      githubIntegrations: Prisma.$GithubIntegrationPayload<ExtArgs>[]
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
    githubIntegrations<T extends User$githubIntegrationsArgs<ExtArgs> = {}>(args?: Subset<T, User$githubIntegrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * User.githubIntegrations
   */
  export type User$githubIntegrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    orderBy?: GithubIntegrationOrderByWithRelationInput | GithubIntegrationOrderByWithRelationInput[]
    cursor?: GithubIntegrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GithubIntegrationScalarFieldEnum | GithubIntegrationScalarFieldEnum[]
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
   * Model sample_testing
   */

  export type AggregateSample_testing = {
    _count: Sample_testingCountAggregateOutputType | null
    _min: Sample_testingMinAggregateOutputType | null
    _max: Sample_testingMaxAggregateOutputType | null
  }

  export type Sample_testingMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type Sample_testingMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type Sample_testingCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type Sample_testingMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type Sample_testingMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type Sample_testingCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type Sample_testingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sample_testing to aggregate.
     */
    where?: sample_testingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sample_testings to fetch.
     */
    orderBy?: sample_testingOrderByWithRelationInput | sample_testingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sample_testingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sample_testings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sample_testings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sample_testings
    **/
    _count?: true | Sample_testingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Sample_testingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Sample_testingMaxAggregateInputType
  }

  export type GetSample_testingAggregateType<T extends Sample_testingAggregateArgs> = {
        [P in keyof T & keyof AggregateSample_testing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSample_testing[P]>
      : GetScalarType<T[P], AggregateSample_testing[P]>
  }




  export type sample_testingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sample_testingWhereInput
    orderBy?: sample_testingOrderByWithAggregationInput | sample_testingOrderByWithAggregationInput[]
    by: Sample_testingScalarFieldEnum[] | Sample_testingScalarFieldEnum
    having?: sample_testingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Sample_testingCountAggregateInputType | true
    _min?: Sample_testingMinAggregateInputType
    _max?: Sample_testingMaxAggregateInputType
  }

  export type Sample_testingGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    _count: Sample_testingCountAggregateOutputType | null
    _min: Sample_testingMinAggregateOutputType | null
    _max: Sample_testingMaxAggregateOutputType | null
  }

  type GetSample_testingGroupByPayload<T extends sample_testingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Sample_testingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Sample_testingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Sample_testingGroupByOutputType[P]>
            : GetScalarType<T[P], Sample_testingGroupByOutputType[P]>
        }
      >
    >


  export type sample_testingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sample_testing"]>

  export type sample_testingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sample_testing"]>

  export type sample_testingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sample_testing"]>

  export type sample_testingSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type sample_testingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["sample_testing"]>

  export type $sample_testingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sample_testing"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["sample_testing"]>
    composites: {}
  }

  type sample_testingGetPayload<S extends boolean | null | undefined | sample_testingDefaultArgs> = $Result.GetResult<Prisma.$sample_testingPayload, S>

  type sample_testingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sample_testingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Sample_testingCountAggregateInputType | true
    }

  export interface sample_testingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sample_testing'], meta: { name: 'sample_testing' } }
    /**
     * Find zero or one Sample_testing that matches the filter.
     * @param {sample_testingFindUniqueArgs} args - Arguments to find a Sample_testing
     * @example
     * // Get one Sample_testing
     * const sample_testing = await prisma.sample_testing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sample_testingFindUniqueArgs>(args: SelectSubset<T, sample_testingFindUniqueArgs<ExtArgs>>): Prisma__sample_testingClient<$Result.GetResult<Prisma.$sample_testingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sample_testing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sample_testingFindUniqueOrThrowArgs} args - Arguments to find a Sample_testing
     * @example
     * // Get one Sample_testing
     * const sample_testing = await prisma.sample_testing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sample_testingFindUniqueOrThrowArgs>(args: SelectSubset<T, sample_testingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sample_testingClient<$Result.GetResult<Prisma.$sample_testingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sample_testing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sample_testingFindFirstArgs} args - Arguments to find a Sample_testing
     * @example
     * // Get one Sample_testing
     * const sample_testing = await prisma.sample_testing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sample_testingFindFirstArgs>(args?: SelectSubset<T, sample_testingFindFirstArgs<ExtArgs>>): Prisma__sample_testingClient<$Result.GetResult<Prisma.$sample_testingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sample_testing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sample_testingFindFirstOrThrowArgs} args - Arguments to find a Sample_testing
     * @example
     * // Get one Sample_testing
     * const sample_testing = await prisma.sample_testing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sample_testingFindFirstOrThrowArgs>(args?: SelectSubset<T, sample_testingFindFirstOrThrowArgs<ExtArgs>>): Prisma__sample_testingClient<$Result.GetResult<Prisma.$sample_testingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sample_testings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sample_testingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sample_testings
     * const sample_testings = await prisma.sample_testing.findMany()
     * 
     * // Get first 10 Sample_testings
     * const sample_testings = await prisma.sample_testing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sample_testingWithIdOnly = await prisma.sample_testing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sample_testingFindManyArgs>(args?: SelectSubset<T, sample_testingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sample_testingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sample_testing.
     * @param {sample_testingCreateArgs} args - Arguments to create a Sample_testing.
     * @example
     * // Create one Sample_testing
     * const Sample_testing = await prisma.sample_testing.create({
     *   data: {
     *     // ... data to create a Sample_testing
     *   }
     * })
     * 
     */
    create<T extends sample_testingCreateArgs>(args: SelectSubset<T, sample_testingCreateArgs<ExtArgs>>): Prisma__sample_testingClient<$Result.GetResult<Prisma.$sample_testingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sample_testings.
     * @param {sample_testingCreateManyArgs} args - Arguments to create many Sample_testings.
     * @example
     * // Create many Sample_testings
     * const sample_testing = await prisma.sample_testing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sample_testingCreateManyArgs>(args?: SelectSubset<T, sample_testingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sample_testings and returns the data saved in the database.
     * @param {sample_testingCreateManyAndReturnArgs} args - Arguments to create many Sample_testings.
     * @example
     * // Create many Sample_testings
     * const sample_testing = await prisma.sample_testing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sample_testings and only return the `id`
     * const sample_testingWithIdOnly = await prisma.sample_testing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sample_testingCreateManyAndReturnArgs>(args?: SelectSubset<T, sample_testingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sample_testingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sample_testing.
     * @param {sample_testingDeleteArgs} args - Arguments to delete one Sample_testing.
     * @example
     * // Delete one Sample_testing
     * const Sample_testing = await prisma.sample_testing.delete({
     *   where: {
     *     // ... filter to delete one Sample_testing
     *   }
     * })
     * 
     */
    delete<T extends sample_testingDeleteArgs>(args: SelectSubset<T, sample_testingDeleteArgs<ExtArgs>>): Prisma__sample_testingClient<$Result.GetResult<Prisma.$sample_testingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sample_testing.
     * @param {sample_testingUpdateArgs} args - Arguments to update one Sample_testing.
     * @example
     * // Update one Sample_testing
     * const sample_testing = await prisma.sample_testing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sample_testingUpdateArgs>(args: SelectSubset<T, sample_testingUpdateArgs<ExtArgs>>): Prisma__sample_testingClient<$Result.GetResult<Prisma.$sample_testingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sample_testings.
     * @param {sample_testingDeleteManyArgs} args - Arguments to filter Sample_testings to delete.
     * @example
     * // Delete a few Sample_testings
     * const { count } = await prisma.sample_testing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sample_testingDeleteManyArgs>(args?: SelectSubset<T, sample_testingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sample_testings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sample_testingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sample_testings
     * const sample_testing = await prisma.sample_testing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sample_testingUpdateManyArgs>(args: SelectSubset<T, sample_testingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sample_testings and returns the data updated in the database.
     * @param {sample_testingUpdateManyAndReturnArgs} args - Arguments to update many Sample_testings.
     * @example
     * // Update many Sample_testings
     * const sample_testing = await prisma.sample_testing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sample_testings and only return the `id`
     * const sample_testingWithIdOnly = await prisma.sample_testing.updateManyAndReturn({
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
    updateManyAndReturn<T extends sample_testingUpdateManyAndReturnArgs>(args: SelectSubset<T, sample_testingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sample_testingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sample_testing.
     * @param {sample_testingUpsertArgs} args - Arguments to update or create a Sample_testing.
     * @example
     * // Update or create a Sample_testing
     * const sample_testing = await prisma.sample_testing.upsert({
     *   create: {
     *     // ... data to create a Sample_testing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sample_testing we want to update
     *   }
     * })
     */
    upsert<T extends sample_testingUpsertArgs>(args: SelectSubset<T, sample_testingUpsertArgs<ExtArgs>>): Prisma__sample_testingClient<$Result.GetResult<Prisma.$sample_testingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sample_testings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sample_testingCountArgs} args - Arguments to filter Sample_testings to count.
     * @example
     * // Count the number of Sample_testings
     * const count = await prisma.sample_testing.count({
     *   where: {
     *     // ... the filter for the Sample_testings we want to count
     *   }
     * })
    **/
    count<T extends sample_testingCountArgs>(
      args?: Subset<T, sample_testingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Sample_testingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sample_testing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sample_testingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Sample_testingAggregateArgs>(args: Subset<T, Sample_testingAggregateArgs>): Prisma.PrismaPromise<GetSample_testingAggregateType<T>>

    /**
     * Group by Sample_testing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sample_testingGroupByArgs} args - Group by arguments.
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
      T extends sample_testingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sample_testingGroupByArgs['orderBy'] }
        : { orderBy?: sample_testingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, sample_testingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSample_testingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sample_testing model
   */
  readonly fields: sample_testingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sample_testing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sample_testingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the sample_testing model
   */
  interface sample_testingFieldRefs {
    readonly id: FieldRef<"sample_testing", 'String'>
    readonly name: FieldRef<"sample_testing", 'String'>
    readonly createdAt: FieldRef<"sample_testing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * sample_testing findUnique
   */
  export type sample_testingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
    /**
     * Filter, which sample_testing to fetch.
     */
    where: sample_testingWhereUniqueInput
  }

  /**
   * sample_testing findUniqueOrThrow
   */
  export type sample_testingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
    /**
     * Filter, which sample_testing to fetch.
     */
    where: sample_testingWhereUniqueInput
  }

  /**
   * sample_testing findFirst
   */
  export type sample_testingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
    /**
     * Filter, which sample_testing to fetch.
     */
    where?: sample_testingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sample_testings to fetch.
     */
    orderBy?: sample_testingOrderByWithRelationInput | sample_testingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sample_testings.
     */
    cursor?: sample_testingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sample_testings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sample_testings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sample_testings.
     */
    distinct?: Sample_testingScalarFieldEnum | Sample_testingScalarFieldEnum[]
  }

  /**
   * sample_testing findFirstOrThrow
   */
  export type sample_testingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
    /**
     * Filter, which sample_testing to fetch.
     */
    where?: sample_testingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sample_testings to fetch.
     */
    orderBy?: sample_testingOrderByWithRelationInput | sample_testingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sample_testings.
     */
    cursor?: sample_testingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sample_testings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sample_testings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sample_testings.
     */
    distinct?: Sample_testingScalarFieldEnum | Sample_testingScalarFieldEnum[]
  }

  /**
   * sample_testing findMany
   */
  export type sample_testingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
    /**
     * Filter, which sample_testings to fetch.
     */
    where?: sample_testingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sample_testings to fetch.
     */
    orderBy?: sample_testingOrderByWithRelationInput | sample_testingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sample_testings.
     */
    cursor?: sample_testingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sample_testings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sample_testings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sample_testings.
     */
    distinct?: Sample_testingScalarFieldEnum | Sample_testingScalarFieldEnum[]
  }

  /**
   * sample_testing create
   */
  export type sample_testingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
    /**
     * The data needed to create a sample_testing.
     */
    data: XOR<sample_testingCreateInput, sample_testingUncheckedCreateInput>
  }

  /**
   * sample_testing createMany
   */
  export type sample_testingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sample_testings.
     */
    data: sample_testingCreateManyInput | sample_testingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sample_testing createManyAndReturn
   */
  export type sample_testingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
    /**
     * The data used to create many sample_testings.
     */
    data: sample_testingCreateManyInput | sample_testingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sample_testing update
   */
  export type sample_testingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
    /**
     * The data needed to update a sample_testing.
     */
    data: XOR<sample_testingUpdateInput, sample_testingUncheckedUpdateInput>
    /**
     * Choose, which sample_testing to update.
     */
    where: sample_testingWhereUniqueInput
  }

  /**
   * sample_testing updateMany
   */
  export type sample_testingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sample_testings.
     */
    data: XOR<sample_testingUpdateManyMutationInput, sample_testingUncheckedUpdateManyInput>
    /**
     * Filter which sample_testings to update
     */
    where?: sample_testingWhereInput
    /**
     * Limit how many sample_testings to update.
     */
    limit?: number
  }

  /**
   * sample_testing updateManyAndReturn
   */
  export type sample_testingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
    /**
     * The data used to update sample_testings.
     */
    data: XOR<sample_testingUpdateManyMutationInput, sample_testingUncheckedUpdateManyInput>
    /**
     * Filter which sample_testings to update
     */
    where?: sample_testingWhereInput
    /**
     * Limit how many sample_testings to update.
     */
    limit?: number
  }

  /**
   * sample_testing upsert
   */
  export type sample_testingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
    /**
     * The filter to search for the sample_testing to update in case it exists.
     */
    where: sample_testingWhereUniqueInput
    /**
     * In case the sample_testing found by the `where` argument doesn't exist, create a new sample_testing with this data.
     */
    create: XOR<sample_testingCreateInput, sample_testingUncheckedCreateInput>
    /**
     * In case the sample_testing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sample_testingUpdateInput, sample_testingUncheckedUpdateInput>
  }

  /**
   * sample_testing delete
   */
  export type sample_testingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
    /**
     * Filter which sample_testing to delete.
     */
    where: sample_testingWhereUniqueInput
  }

  /**
   * sample_testing deleteMany
   */
  export type sample_testingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sample_testings to delete
     */
    where?: sample_testingWhereInput
    /**
     * Limit how many sample_testings to delete.
     */
    limit?: number
  }

  /**
   * sample_testing without action
   */
  export type sample_testingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sample_testing
     */
    select?: sample_testingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sample_testing
     */
    omit?: sample_testingOmit<ExtArgs> | null
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
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GithubIntegrationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    githubId: number | null
    username: string | null
    accessToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GithubIntegrationCountAggregateOutputType = {
    id: number
    userId: number
    githubId: number
    username: number
    accessToken: number
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
    createdAt?: true
    updatedAt?: true
  }

  export type GithubIntegrationMaxAggregateInputType = {
    id?: true
    userId?: true
    githubId?: true
    username?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GithubIntegrationCountAggregateInputType = {
    id?: true
    userId?: true
    githubId?: true
    username?: true
    accessToken?: true
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
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GithubIntegrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "githubId" | "username" | "accessToken" | "createdAt" | "updatedAt", ExtArgs["result"]["githubIntegration"]>
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


  export const Sample_testingScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type Sample_testingScalarFieldEnum = (typeof Sample_testingScalarFieldEnum)[keyof typeof Sample_testingScalarFieldEnum]


  export const GithubIntegrationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    githubId: 'githubId',
    username: 'username',
    accessToken: 'accessToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GithubIntegrationScalarFieldEnum = (typeof GithubIntegrationScalarFieldEnum)[keyof typeof GithubIntegrationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
    githubIntegrations?: GithubIntegrationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    githubIntegrations?: GithubIntegrationOrderByRelationAggregateInput
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
    githubIntegrations?: GithubIntegrationListRelationFilter
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

  export type sample_testingWhereInput = {
    AND?: sample_testingWhereInput | sample_testingWhereInput[]
    OR?: sample_testingWhereInput[]
    NOT?: sample_testingWhereInput | sample_testingWhereInput[]
    id?: StringFilter<"sample_testing"> | string
    name?: StringFilter<"sample_testing"> | string
    createdAt?: DateTimeFilter<"sample_testing"> | Date | string
  }

  export type sample_testingOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type sample_testingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: sample_testingWhereInput | sample_testingWhereInput[]
    OR?: sample_testingWhereInput[]
    NOT?: sample_testingWhereInput | sample_testingWhereInput[]
    name?: StringFilter<"sample_testing"> | string
    createdAt?: DateTimeFilter<"sample_testing"> | Date | string
  }, "id">

  export type sample_testingOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: sample_testingCountOrderByAggregateInput
    _max?: sample_testingMaxOrderByAggregateInput
    _min?: sample_testingMinOrderByAggregateInput
  }

  export type sample_testingScalarWhereWithAggregatesInput = {
    AND?: sample_testingScalarWhereWithAggregatesInput | sample_testingScalarWhereWithAggregatesInput[]
    OR?: sample_testingScalarWhereWithAggregatesInput[]
    NOT?: sample_testingScalarWhereWithAggregatesInput | sample_testingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"sample_testing"> | string
    name?: StringWithAggregatesFilter<"sample_testing"> | string
    createdAt?: DateTimeWithAggregatesFilter<"sample_testing"> | Date | string
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type GithubIntegrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    githubId?: number
    AND?: GithubIntegrationWhereInput | GithubIntegrationWhereInput[]
    OR?: GithubIntegrationWhereInput[]
    NOT?: GithubIntegrationWhereInput | GithubIntegrationWhereInput[]
    userId?: StringFilter<"GithubIntegration"> | string
    username?: StringFilter<"GithubIntegration"> | string
    accessToken?: StringFilter<"GithubIntegration"> | string
    createdAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "githubId">

  export type GithubIntegrationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    username?: SortOrder
    accessToken?: SortOrder
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
    createdAt?: DateTimeWithAggregatesFilter<"GithubIntegration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GithubIntegration"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    githubIntegrations?: GithubIntegrationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    githubIntegrations?: GithubIntegrationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    githubIntegrations?: GithubIntegrationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    githubIntegrations?: GithubIntegrationUncheckedUpdateManyWithoutUserNestedInput
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

  export type sample_testingCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type sample_testingUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type sample_testingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sample_testingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sample_testingCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type sample_testingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sample_testingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationCreateInput = {
    id?: string
    githubId: number
    username: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGithubIntegrationsInput
  }

  export type GithubIntegrationUncheckedCreateInput = {
    id?: string
    userId: string
    githubId: number
    username: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGithubIntegrationsNestedInput
  }

  export type GithubIntegrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationCreateManyInput = {
    id?: string
    userId: string
    githubId: number
    username: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
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

  export type GithubIntegrationListRelationFilter = {
    every?: GithubIntegrationWhereInput
    some?: GithubIntegrationWhereInput
    none?: GithubIntegrationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GithubIntegrationOrderByRelationAggregateInput = {
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

  export type sample_testingCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type sample_testingMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type sample_testingMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GithubIntegrationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    username?: SortOrder
    accessToken?: SortOrder
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

  export type GithubIntegrationCreateNestedManyWithoutUserInput = {
    create?: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput> | GithubIntegrationCreateWithoutUserInput[] | GithubIntegrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutUserInput | GithubIntegrationCreateOrConnectWithoutUserInput[]
    createMany?: GithubIntegrationCreateManyUserInputEnvelope
    connect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
  }

  export type GithubIntegrationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput> | GithubIntegrationCreateWithoutUserInput[] | GithubIntegrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutUserInput | GithubIntegrationCreateOrConnectWithoutUserInput[]
    createMany?: GithubIntegrationCreateManyUserInputEnvelope
    connect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
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

  export type GithubIntegrationUpdateManyWithoutUserNestedInput = {
    create?: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput> | GithubIntegrationCreateWithoutUserInput[] | GithubIntegrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutUserInput | GithubIntegrationCreateOrConnectWithoutUserInput[]
    upsert?: GithubIntegrationUpsertWithWhereUniqueWithoutUserInput | GithubIntegrationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GithubIntegrationCreateManyUserInputEnvelope
    set?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    disconnect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    delete?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    connect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    update?: GithubIntegrationUpdateWithWhereUniqueWithoutUserInput | GithubIntegrationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GithubIntegrationUpdateManyWithWhereWithoutUserInput | GithubIntegrationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GithubIntegrationScalarWhereInput | GithubIntegrationScalarWhereInput[]
  }

  export type GithubIntegrationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput> | GithubIntegrationCreateWithoutUserInput[] | GithubIntegrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutUserInput | GithubIntegrationCreateOrConnectWithoutUserInput[]
    upsert?: GithubIntegrationUpsertWithWhereUniqueWithoutUserInput | GithubIntegrationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GithubIntegrationCreateManyUserInputEnvelope
    set?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    disconnect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    delete?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    connect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    update?: GithubIntegrationUpdateWithWhereUniqueWithoutUserInput | GithubIntegrationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GithubIntegrationUpdateManyWithWhereWithoutUserInput | GithubIntegrationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GithubIntegrationScalarWhereInput | GithubIntegrationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGithubIntegrationsInput = {
    create?: XOR<UserCreateWithoutGithubIntegrationsInput, UserUncheckedCreateWithoutGithubIntegrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGithubIntegrationsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutGithubIntegrationsNestedInput = {
    create?: XOR<UserCreateWithoutGithubIntegrationsInput, UserUncheckedCreateWithoutGithubIntegrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGithubIntegrationsInput
    upsert?: UserUpsertWithoutGithubIntegrationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGithubIntegrationsInput, UserUpdateWithoutGithubIntegrationsInput>, UserUncheckedUpdateWithoutGithubIntegrationsInput>
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

  export type GithubIntegrationCreateWithoutUserInput = {
    id?: string
    githubId: number
    username: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationUncheckedCreateWithoutUserInput = {
    id?: string
    githubId: number
    username: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationCreateOrConnectWithoutUserInput = {
    where: GithubIntegrationWhereUniqueInput
    create: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput>
  }

  export type GithubIntegrationCreateManyUserInputEnvelope = {
    data: GithubIntegrationCreateManyUserInput | GithubIntegrationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GithubIntegrationUpsertWithWhereUniqueWithoutUserInput = {
    where: GithubIntegrationWhereUniqueInput
    update: XOR<GithubIntegrationUpdateWithoutUserInput, GithubIntegrationUncheckedUpdateWithoutUserInput>
    create: XOR<GithubIntegrationCreateWithoutUserInput, GithubIntegrationUncheckedCreateWithoutUserInput>
  }

  export type GithubIntegrationUpdateWithWhereUniqueWithoutUserInput = {
    where: GithubIntegrationWhereUniqueInput
    data: XOR<GithubIntegrationUpdateWithoutUserInput, GithubIntegrationUncheckedUpdateWithoutUserInput>
  }

  export type GithubIntegrationUpdateManyWithWhereWithoutUserInput = {
    where: GithubIntegrationScalarWhereInput
    data: XOR<GithubIntegrationUpdateManyMutationInput, GithubIntegrationUncheckedUpdateManyWithoutUserInput>
  }

  export type GithubIntegrationScalarWhereInput = {
    AND?: GithubIntegrationScalarWhereInput | GithubIntegrationScalarWhereInput[]
    OR?: GithubIntegrationScalarWhereInput[]
    NOT?: GithubIntegrationScalarWhereInput | GithubIntegrationScalarWhereInput[]
    id?: StringFilter<"GithubIntegration"> | string
    userId?: StringFilter<"GithubIntegration"> | string
    githubId?: IntFilter<"GithubIntegration"> | number
    username?: StringFilter<"GithubIntegration"> | string
    accessToken?: StringFilter<"GithubIntegration"> | string
    createdAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"GithubIntegration"> | Date | string
  }

  export type UserCreateWithoutGithubIntegrationsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutGithubIntegrationsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutGithubIntegrationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGithubIntegrationsInput, UserUncheckedCreateWithoutGithubIntegrationsInput>
  }

  export type UserUpsertWithoutGithubIntegrationsInput = {
    update: XOR<UserUpdateWithoutGithubIntegrationsInput, UserUncheckedUpdateWithoutGithubIntegrationsInput>
    create: XOR<UserCreateWithoutGithubIntegrationsInput, UserUncheckedCreateWithoutGithubIntegrationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGithubIntegrationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGithubIntegrationsInput, UserUncheckedUpdateWithoutGithubIntegrationsInput>
  }

  export type UserUpdateWithoutGithubIntegrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutGithubIntegrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationCreateManyUserInput = {
    id?: string
    githubId: number
    username: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
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